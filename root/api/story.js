const { parseRequestBody } = require('./_lib/booksStore');
const { storyOptions } = require('./_lib/storyOptions');

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-6-luna';
const RESPONSES_URL = 'https://api.openai.com/v1/responses';
const MODERATION_URL = 'https://api.openai.com/v1/moderations';
const MODERATION_MODEL = 'omni-moderation-latest';
// Covers a 300-600 word story plus the model's reasoning.
const MAX_OUTPUT_TOKENS = 4000;
const MAX_CHARACTERS = 3;
const APP_API_KEY = process.env.APP_API_KEY || '';

// A saved story can be regenerated after the app language changes, so values from
// either language's lists are accepted; `language` only selects the story language.
const allowed = Object.fromEntries(
  Object.entries(storyOptions).map(([key, lists]) => [key, new Set([...lists.FINNISH, ...lists.ENGLISH])]),
);

function buildSystemPrompt(language) {
  if (language === 'ENGLISH') {
    return [
      'You are a warm storyteller who writes stories in English for children aged 3-8.',
      'Stories never include violence, death, illness, scary creatures, swearing, war, or anything that could frighten or distress a child.',
      'All conflicts are solved through talking, cooperation, or kindness, and adults are safe and trustworthy.',
      'Never present talking to strangers or going somewhere with a stranger as brave or desirable.',
      'Write text that is easy to read aloud.',
      'The ending is safe, comforting, and hopeful.',
      'Start the story with a title in the form **Title Here** on its own line with nothing else on that line.',
    ].join(' ');
  }
  return [
    'Olet lämminhenkinen tarinankertoja, joka kirjoittaa tarinoita 3-8-vuotiaille lapsille suomeksi.',
    'Tarinoissa ei ole väkivaltaa, kuolemaa, sairautta, pelottavia olentoja, kiroilua, sotaa eikä mitään muuta sisältöä, joka voisi pelottaa tai ahdistaa lasta.',
    'Kaikki konfliktit ratkeavat puhumalla, yhteistyöllä tai ystävällisyydellä, ja aikuiset ovat luotettavia ja turvallisia.',
    'Älä koskaan esitä tuntemattomien kanssa puhumista tai tuntemattoman mukaan lähtemistä rohkeana tai toivottavana.',
    'Kirjoita kieliopillisesti virheetöntä ja luontevaa suomen yleiskieltä.',
    'Kirjoitat tekstin niin, että se on helppo lukea ääneen lapselle.',
    'Tarinan lopussa tunnelma on turvallinen, lohdullinen ja toiveikas.',
    'Aloita tarina otsikolla muodossa **Otsikko tähän** omalle rivilleen. Rivillä ei saa olla muuta.',
  ].join(' ');
}

function buildUserPrompt(characters, place, plot, language) {
  if (language === 'ENGLISH') {
    const charactersLine = `Characters: ${formatCharacterList(characters, language)}.`;
    const placeLine = `Setting: ${place.trim()}.`;
    const plotLine = `Plot: ${plot.trim()}.`;
    return [
      'Write a story of about 300-600 words.',
      charactersLine,
      placeLine,
      plotLine,
      'Use simple, clear English that is easy to read aloud.',
      'Avoid scary descriptions and focus on curiosity, friendship, and a safe ending.',
    ].join('\n');
  }
  const charactersLine = `Hahmot: ${formatCharacterList(characters, language)}.`;
  const placeLine = `Tapahtumapaikka: ${place.trim()}.`;
  const plotLine = `Juoni: ${plot.trim()}.`;

  return [
    'Kirjoita satu noin 300-600 sanalla.',
    charactersLine,
    placeLine,
    plotLine,
    'Kirjoita yksinkertaisella, selkeällä suomen kielellä.',
    'Vältä pelottavia kuvauksia ja keskity uteliaisuuteen, ystävyyteen ja turvalliseen loppuratkaisuun.',
  ].join('\n');
}

function formatCharacterList(characters, language) {
  const cleaned = characters.map((name) => name.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    return language === 'ENGLISH' ? 'no specific characters' : 'ei erityisiä hahmoja';
  }
  if (cleaned.length === 1) {
    return cleaned[0];
  }
  const last = cleaned[cleaned.length - 1];
  const start = cleaned.slice(0, -1).join(', ');
  return language === 'ENGLISH' ? `${start}, and ${last}` : `${start} ja ${last}`;
}

function sanitizeForTts(text) {
  if (!text) return '';
  const cleaned = text
    .replace(/[#_/`]+/g, '')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // The app reads the **Title** line; asterisks elsewhere would be read aloud.
  const [first, ...rest] = cleaned.split('\n');
  return [first, ...rest.map((line) => line.replace(/\*+/g, ''))].join('\n');
}

async function generateStoryWithLlm(characters, place, plot, language) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key');
  }

  const data = await postOpenAi(RESPONSES_URL, apiKey, {
    model: DEFAULT_MODEL,
    instructions: buildSystemPrompt(language),
    input: buildUserPrompt(characters, place, plot, language),
    max_output_tokens: MAX_OUTPUT_TOKENS,
  }, 'LLM');

  if (data?.status && data.status !== 'completed') {
    throw new Error(`LLM response ${data.status}`);
  }
  const story = extractOutputText(data);
  if (!story) {
    throw new Error('Invalid LLM response payload');
  }

  // Fail closed: a story is only returned after moderation confirms it is not flagged.
  const moderation = await postOpenAi(MODERATION_URL, apiKey, { model: MODERATION_MODEL, input: story }, 'Moderation');
  if (!Array.isArray(moderation?.results) || moderation.results.length === 0) {
    throw new Error('Invalid moderation response payload');
  }
  if (moderation.results.some((result) => result.flagged)) {
    throw new Error('Story flagged by moderation');
  }

  return sanitizeForTts(story);
}

async function postOpenAi(url, apiKey, payload, label) {
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(`${label} request failed: ${err.message}`);
  }

  if (!response || !response.ok) {
    const errorText = response ? await safeReadError(response) : `No response from ${label}`;
    throw new Error(`${label} request failed: ${errorText}`);
  }

  return response.json().catch(() => null);
}

// Responses API: joins the text parts of the assistant message items.
function extractOutputText(data) {
  if (typeof data?.output_text === 'string') return data.output_text.trim();
  return (data?.output || [])
    .filter((item) => item?.type === 'message')
    .flatMap((item) => item.content || [])
    .filter((part) => part?.type === 'output_text' && typeof part.text === 'string')
    .map((part) => part.text)
    .join('')
    .trim();
}

async function safeReadError(response) {
  try {
    const text = await response.text();
    return `${response.status} ${response.statusText}: ${text}`.trim();
  } catch (err) {
    return `HTTP ${response.status} ${response.statusText}: ${err.message}`;
  }
}

// Only the app's own selectable values are accepted: 1-3 distinct characters, one place, one plot.
function isValidRequest(characters, place, plot) {
  if (!Array.isArray(characters) || characters.length === 0 || characters.length > MAX_CHARACTERS) {
    return false;
  }
  if (new Set(characters).size !== characters.length) {
    return false;
  }
  if (characters.some((name) => typeof name !== 'string' || !allowed.characters.has(name.trim()))) {
    return false;
  }
  if (typeof place !== 'string' || !allowed.places.has(place.trim())) {
    return false;
  }
  if (typeof plot !== 'string' || !allowed.plots.has(plot.trim())) {
    return false;
  }
  return true;
}

function buildMockStory(characters, place, plot, language) {
  const cleanedPlace = place.trim();
  const title =
    language === 'ENGLISH'
      ? `${plot.trim()} in ${cleanedPlace}`
      : `${plot.trim()} - ${cleanedPlace}`;
  const intro =
    language === 'ENGLISH'
      ? `On a bright day in ${cleanedPlace.toLowerCase()} the friends ${formatCharacterList(characters, language)} met each other.`
      : `Erään kirkkaana päivänä ${cleanedPlace.toLowerCase()}ssa tapasivat ${formatCharacterList(characters, language)}.`;
  const conflict =
    language === 'ENGLISH'
      ? 'They heard that a small problem was nearby, and they decided to solve it together.'
      : 'He kuulivat, että lähistöllä oli pieni pulma, ja he päättivät ratkaista sen yhdessä.';
  const resolution =
    language === 'ENGLISH'
      ? 'By working together they solved the situation and learned that listening and helping goes a long way.'
      : 'Yhteistyöllä he ratkaisivat tilanteen ja huomasivat, että kuunteleminen ja auttaminen vie pitkälle.';
  const closing =
    language === 'ENGLISH'
      ? `${characters[0].trim()} reminded everyone that the next adventure was waiting tomorrow.`
      : `${characters[0].trim()} muistutti, että seuraava seikkailu odottaa jo huomenna.`;

  return [`**${title}**`, intro, conflict, resolution, closing].join('\n\n');
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (APP_API_KEY) {
    const providedKey = req.headers['x-app-key'];
    if (!providedKey || providedKey !== APP_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const body = parseRequestBody(req);
  const { characters, place, plot, language } = body || {};
  const storyLanguage = language === 'ENGLISH' ? 'ENGLISH' : 'FINNISH';

  if (!isValidRequest(characters, place, plot)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const story = await generateStoryWithLlm(characters, place, plot, storyLanguage);
    return res.json({ story });
  } catch (err) {
    console.error('LLM generation failed, using fallback', err);
    const story = buildMockStory(characters, place, plot, storyLanguage);
    return res.json({ story });
  }
};
