import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { execFileSync } from 'node:child_process';
import { readFile, readdir, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { getContent, locales } from '../portfolio-src/content';

const route = (locale: string) => `${locale === 'fi' ? '/fi' : ''}/case-studies/a-chain-of-pain.html`;
// Debug-only states (Stunned) are deliberately not presented as gameplay.
const states = ['Capture', 'Chase', 'Investigate', 'Search', 'Listen', 'AlertRoam', 'Roam'];
// Game first, engineering second.
// Stable remote anchors are reused where the meaning matches (story = confirmed-project-scope, gameplay = current-playable-focus, world = level-composition).
const hierarchy = ['the-game', 'gameplay-showcase', 'confirmed-project-scope', 'gameplay-first', 'current-playable-focus', 'level-composition', 'the-hunter', 'audio-and-original-soundtrack', 'character-development', 'systemic-enemy-ai'];
const video = '/assets/portfolio/a-chain-of-pain/gameplay-showcase.mp4';

for (const locale of locales) {
  const project = getContent(locale).projects.find(item => item.slug === 'a-chain-of-pain')!;
  for (const width of [1440, 820, 390, 320]) {
    test(`${locale} game study: accessible, static and complete at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const errors: string[] = [];
      const requests: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
      page.on('request', request => requests.push(new URL(request.url()).pathname));
      await page.goto(route(locale));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveText('A Chain of Pain');
      await expect(page.locator('.study-lead')).toHaveText(project.summary);
      await expect(page.locator('.study-facts')).toContainText(project.role!);
      expect((await page.locator('.study-body > section[id]').evaluateAll(sections => sections.map(section => section.id))).slice(0, hierarchy.length)).toEqual(hierarchy);
      // The story is established and spoiler-free; it is never framed as unbuilt future work.
      const story = page.locator('#confirmed-project-scope');
      await expect(story).toContainText(locale === 'fi' ? 'ovat jo pitkälle kehitettyjä' : 'are already substantially developed');
      await expect(story).toContainText(locale === 'fi' ? 'vapaa juonipaljastuksista' : 'remains spoiler-free');
      await expect(story).not.toContainText(locale === 'fi' ? 'ei ole vielä toteutettu' : 'not implemented yet');
      await expect(page.locator('#gameplay-first')).toContainText(locale === 'fi' ? 'Tarina määrää suunnan; pelattavassa versiossa kauhua testataan ja hiotaan.' : 'The story sets the direction; the playable build is where the horror is tested and tuned.');
      await expect(page.locator('#character-development')).toContainText(locale === 'fi' ? 'AI-avusteinen prototypointi' : 'AI-assisted character prototyping');
      await expect(page.locator('#audio-and-original-soundtrack')).toContainText(locale === 'fi' ? 'Sävelsin pelin alkuperäisen soundtrackin.' : 'I composed the game’s original soundtrack.');
      await expect(page.locator('#audio-and-original-soundtrack .study-visual li strong')).toHaveText(locale === 'fi' ? ['Äänijärjestelmien suunnittelu', 'Mukautuva musiikki', 'Alkuperäinen soundtrack'] : ['Audio system design', 'Adaptive music', 'Original soundtrack']);
      await expect(page.locator('#engineering-practices .study-note')).toHaveText(locale === 'fi'
        ? 'Projektista voidaan tarvittaessa esitellä gameplayta, AI-debug-näkymiä ja teknistä toteutusta tarkemmin.'
        : 'Gameplay, AI debug views and deeper technical implementation details are available on request.');
      await expect(page.locator('.study-visual-priority li strong')).toHaveText(states);
      await expect(page.locator('.study-visual-priority small')).toHaveCount(0);
      expect(await page.locator('main').innerText()).not.toMatch(/\bstun|tainnut/i);
      await expect(page.locator('[data-media-slot]')).toHaveCount(project.mediaSlots.length);
      await expect(page.locator('main img')).toHaveCount(project.mediaSlots.filter(slot => slot.kind === 'image').length + 2 * project.mediaSlots.filter(slot => slot.kind === 'comparison').length);
      // The study header uses a different capture from the main card; each capture appears once in the study.
      await expect(page.locator('.study-hero img')).toHaveCount(1);
      await expect(page.locator('.study-hero img')).not.toHaveAttribute('src', project.media!.src);
      await expect(page.locator('.study-hero img')).toHaveAttribute('src', /hospital-main-lobby-1600\.webp$/);
      const sources = await page.locator('main img').evaluateAll(images => images.map(image => image.getAttribute('src')));
      expect(new Set(sources).size).toBe(sources.length);
      await expect(page.locator('#verification-record')).toContainText('12/12');
      await expect(page.locator('#verification-record')).toContainText(locale === 'fi' ? 'ei ajettu uudelleen' : 'not a new Unreal test run');
      await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
      for (const section of await page.locator('main section, [data-media-slot], .study-visual').all()) {
        await section.scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      }
      // Every screenshot loads once scrolled into view; the video stays unloaded until the visitor plays it.
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy();
      }
      expect(requests).not.toContain(video);
      expect(requests.filter(path => path.includes('media-inbox'))).toEqual([]);
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `test-results/game-${locale}-${width}-hero.png` });
      await page.screenshot({ path: `test-results/game-${locale}-${width}-full.png`, fullPage: true });
      for (const id of ['gameplay-showcase', 'current-playable-focus', 'the-hunter', 'audio-and-original-soundtrack']) {
        await page.locator(`#${id}`).evaluate(element => element.scrollIntoView());
        await page.screenshot({ path: `test-results/game-${locale}-${width}-${id}.png` });
      }
    });
  }

  test(`${locale} gameplay video: native controls, poster, no autoplay, outline and fallback`, async ({ page }) => {
    await page.goto(route(locale));
    const player = page.locator('#gameplay-showcase video');
    await expect(player).toHaveCount(1);
    await expect(player).toHaveAttribute('controls', '');
    await expect(player).toHaveAttribute('preload', 'none');
    await expect(player).toHaveAttribute('poster', /gameplay-showcase-poster\.webp$/);
    for (const attribute of ['autoplay', 'loop', 'muted']) await expect(player).not.toHaveAttribute(attribute);
    expect(await player.evaluate((element: HTMLVideoElement) => ({ paused: element.paused, readyState: element.readyState }))).toEqual({ paused: true, readyState: 0 });
    await expect(player.locator('source')).toHaveAttribute('src', video);
    const showcase = project.mediaSlots.find(slot => slot.id === 'showcase')!;
    await expect(page.locator('#gameplay-showcase .media-sequence li')).toHaveText(showcase.sequence!);
    await expect(page.locator('#gameplay-showcase figcaption')).toHaveText(showcase.caption);
  });

  test(`${locale} main game card leads with the real gameplay capture and stays concise`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const requests: string[] = [];
    page.on('request', request => requests.push(new URL(request.url()).pathname));
    await page.goto(`${locale === 'fi' ? '/fi' : ''}/portfolio.html#a-chain-of-pain`);
    const card = page.locator('#a-chain-of-pain');
    await expect(card.locator('.eyebrow')).toHaveText(project.category);
    await expect(card.locator('.project-summary')).toHaveText(project.summary);
    await expect(card.locator('.project-status')).toContainText(project.status);
    await expect(card.locator('.tags li')).toHaveCount(4);
    await expect(card.locator('img')).toHaveCount(1);
    await expect(card.locator('img')).toHaveAttribute('src', /manor-staircase-1600\.webp$/);
    await expect(card.getByRole('link', { name: locale === 'fi' ? 'Tutustu projektiin' : 'Explore project', exact: false })).toBeVisible();
    await expect(card.locator('img')).toHaveAttribute('alt', project.media!.alt);
    await expect(card.locator('video, .game-wireframe')).toHaveCount(0);
    await expect(page.locator('.study-note')).toHaveCount(0);
    expect(requests.filter(path => path.endsWith('.mp4') || path.includes('media-inbox'))).toEqual([]);
    const contact = page.locator('#contact');
    await expect(contact.locator('h2')).toHaveText(locale === 'fi' ? 'Ota yhteyttä.' : 'Get in touch.');
    await expect(contact).not.toContainText(locale === 'fi' ? 'Onko sinulla projekti mielessä?' : 'Have a project in mind?');
    await expect(contact.getByRole('link', { name: /wilzeu@gmail.com/ })).toHaveAttribute('href', 'mailto:wilzeu@gmail.com');
    await expect(contact.locator('.contact-links a')).toHaveCount(3);
    await card.getByRole('link', { name: project.links.caseStudy.label }).click();
    await expect(page).toHaveURL(new RegExp(`${route(locale)}$`));
    await expect(page.locator('#confirmed-project-scope')).toContainText(locale === 'fi' ? 'vapaa juonipaljastuksista' : 'spoiler-free');
  });
}

test('published game media is web-sized, matches declared dimensions and never ships raw sources', async ({ request }) => {
  const { projects } = getContent();
  const project = projects.find(item => item.slug === 'a-chain-of-pain')!;
  const images = [project.media!, ...project.mediaSlots.filter(slot => slot.kind !== 'video').flatMap(slot => [
    { src: slot.assetPath, small: slot.small, width: slot.width, height: slot.height },
    ...(slot.compare ? [{ src: slot.compare.assetPath, small: slot.compare.small, width: slot.width, height: slot.height }] : []),
  ])];
  for (const image of images) {
    const metadata = await sharp(`.${image.src}`).metadata();
    expect([metadata.format, metadata.width, metadata.height], image.src).toEqual(['webp', image.width, image.height]);
    expect((await sharp(`.${image.small!}`).metadata()).width, image.small).toBe(960);
    expect((await stat(`.${image.src}`)).size, image.src).toBeLessThan(400 * 1024);
  }
  expect((await stat(`.${video}`)).size).toBeLessThan(40 * 1024 * 1024);
  expect((await stat('./assets/portfolio/a-chain-of-pain/gameplay-showcase-poster.webp')).size).toBeLessThan(200 * 1024);
  // Raw captures are ignored by Git and Vercel and are not served.
  expect(execFileSync('git', ['check-ignore', 'media-inbox/showcase-a-chain-of-pain.mp4'], { encoding: 'utf8' }).trim()).toBe('media-inbox/showcase-a-chain-of-pain.mp4');
  expect(execFileSync('git', ['ls-files', 'media-inbox'], { encoding: 'utf8' }).trim()).toBe('');
  expect((await request.get('/media-inbox/manor-staircase.png')).status()).toBe(404);
  // The deployable public/ tree carries the same optimized derivatives and nothing from media-inbox/.
  for (const file of [video, project.media!.src, ...images.map(image => image.small!)]) expect((await readFile(`./public${file}`)).equals(await readFile(`.${file}`)), file).toBe(true);
  expect((await readdir('./public')).includes('media-inbox')).toBe(false);
});

test('keyboard language switching preserves the Hunter section and project in both directions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/case-studies/a-chain-of-pain.html#path-aware-hearing');
  await page.getByRole('link', { name: 'Suomi', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/fi\/case-studies\/a-chain-of-pain.html#path-aware-hearing$/);
  await expect(page.locator('#path-aware-hearing')).toBeInViewport();
  await page.getByRole('link', { name: 'English', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/case-studies\/a-chain-of-pain.html#path-aware-hearing$/);
  await page.getByRole('link', { name: 'Back to selected work' }).click();
  await expect(page).toHaveURL(/\/portfolio.html#a-chain-of-pain$/);
});

test('game presentation and native navigation remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4173${route('en')}`);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await page.getByRole('link', { name: 'Hearing the route, not just the radius', exact: true }).click();
    await expect(page).toHaveURL(/#path-aware-hearing$/);
    await page.getByRole('link', { name: 'Suomi', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route('fi')}$`));
    await page.getByRole('link', { name: 'Kuulo huomioi reitin, ei vain etäisyyttä', exact: true }).click();
    await expect(page.locator('#path-aware-hearing')).toBeInViewport();
    await expect(page.locator('.study-visual-priority li strong')).toHaveText(states);
    await expect(page.locator('#gameplay-showcase video')).toHaveAttribute('poster', /gameplay-showcase-poster\.webp$/);
  } finally { await context.close(); }
});

test('public game pages describe the current game without roadmap promises, spoilers, raw audit content or untranslated Finnish prose', async ({ page }) => {
  const english = getContent().projects.find(item => item.slug === 'a-chain-of-pain')!;
  for (const locale of locales) {
    await page.goto(route(locale));
    const html = await page.content();
    const prose = await page.locator('main').innerText();
    for (const internal of ['PROJECT_EVIDENCE.md', 'CLAIM_MATRIX.md', 'AI_STATE_DIAGRAM.md', 'MEDIA_CAPTURE_PLAN.md', 'Saved/Codex', 'E:\\', 'C:\\Users', 'DESIGNED ONLY', 'PARTIALLY VERIFIED', 'Co-Authored-By', 'media-inbox', 'Door 14', 'Door-14']) expect(html).not.toContain(internal);
    await expect(page.locator('a[href*="PROJECT_EVIDENCE"], a[href*="CLAIM_MATRIX"]')).toHaveCount(0);
    // Current systems only: no future features, unimplemented enemies or story-is-missing framing.
    const roadmap = locale === 'fi'
      ? /tulevaisuudessa|tuleva työ|tulevaan työhön|seuraavat vaiheet|suunnitteilla|lisätään myöhemmin|ei ole vielä toteutettu|H2-hunter|Korsto|naulapyssy/i
      : /\bwill (have|be added|include)|future work|next steps|planned feature|not implemented yet|to be added later|H2-hunter|Korsto|nail[- ]gun/i;
    expect(prose).not.toMatch(roadmap);
    if (locale === 'fi') {
      for (const section of english.study) {
        expect(prose).not.toContain(section.title);
        for (const paragraph of section.paragraphs) expect(prose).not.toContain(paragraph);
        if (section.visual) expect(prose).not.toContain(section.visual.caption);
        if (section.note) expect(prose).not.toContain(section.note);
      }
      for (const slot of english.mediaSlots) expect(prose).not.toContain(slot.caption);
    }
    for (const placeholder of ['Capture planned', 'Forthcoming evidence', 'Kuvaus tulossa', 'Täydennettävä näyttö', 'tulossa', 'forthcoming']) expect(prose).not.toContain(placeholder);
  }
});
