import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getContent, locales } from '../portfolio-src/content';

const route = (locale: string) => `${locale === 'fi' ? '/fi' : ''}/case-studies/a-chain-of-pain.html`;
const states = ['Capture', 'Stunned', 'Chase', 'Investigate', 'Search', 'Listen', 'AlertRoam', 'Roam'];

for (const locale of locales) {
  const project = getContent(locale).projects.find(item => item.slug === 'a-chain-of-pain')!;
  for (const width of [1440, 820, 390, 320]) {
    test(`${locale} game study: accessible, static and complete at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width > 800 ? 1000 : 844 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
      await page.goto(route(locale));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveText('A Chain of Pain');
      await expect(page.locator('.study-lead')).toHaveText(project.summary);
      await expect(page.locator('.study-facts')).toContainText(project.role!);
      await expect(page.locator('#current-playable-focus > p')).toHaveCount(3);
      const story = page.locator('#confirmed-project-scope');
      await expect(story).toContainText(locale === 'fi' ? 'ei ole vielä toteutettu' : 'are not implemented yet');
      await expect(story).toContainText(locale === 'fi' ? 'pelaajan valintoja' : 'player choices');
      await expect(page.locator('#character-development')).toContainText(locale === 'fi' ? 'AI-avusteinen prototypointi' : 'AI-assisted character prototyping');
      await expect(page.locator('#audio-and-original-soundtrack')).toContainText(locale === 'fi' ? 'Sävelsin pelin alkuperäisen soundtrackin.' : 'I composed the game’s original soundtrack.');
      await expect(page.locator('#evidence-to-add .study-note')).toHaveText(locale === 'fi'
        ? 'Projektista voidaan tarvittaessa esitellä gameplayta, AI-debug-näkymiä ja teknistä toteutusta tarkemmin.'
        : 'Gameplay, AI debug views and deeper technical implementation details are available on request.');
      await expect(page.locator('.study-visual-priority li strong')).toHaveText(states);
      await expect(page.locator('.study-visual-priority small')).toContainText(locale === 'fi' ? 'debug-laukaisulle' : 'Debug-triggered');
      await expect(page.locator('aside[data-media-slot]')).toHaveCount(5);
      await expect(page.locator('[data-media-slot] img, [data-media-slot] video, [data-media-slot] source')).toHaveCount(0);
      await expect(page.locator('#verification-record')).toContainText('12/12');
      await expect(page.locator('#verification-record')).toContainText(locale === 'fi' ? 'ei ajettu uudelleen' : 'not a new Unreal test run');
      await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
      for (const section of await page.locator('main section, [data-media-slot], .study-visual').all()) {
        await section.scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      }
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `test-results/hunter-${locale}-${width}-hero.png` });
      await page.screenshot({ path: `test-results/hunter-${locale}-${width}-full.png`, fullPage: true });
      for (const id of ['systemic-enemy-ai', 'behaviour-selection', 'player-and-world']) {
        await page.locator(`#${id}`).evaluate(element => element.scrollIntoView());
        await page.screenshot({ path: `test-results/hunter-${locale}-${width}-${id}.png` });
      }
    });
  }

  test(`${locale} main game card stays concise and distinguishes the playable prototype`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`${locale === 'fi' ? '/fi' : ''}/portfolio.html#a-chain-of-pain`);
    const card = page.locator('#a-chain-of-pain');
    await expect(card.locator('.eyebrow')).toHaveText(project.category);
    await expect(card.locator('.project-summary')).toHaveText(project.summary);
    await expect(card.locator('.project-status')).toContainText(project.status);
    await expect(card.locator('.tags li')).toHaveCount(4);
    await expect(card.getByRole('link', { name: locale === 'fi' ? 'Tutustu projektiin' : 'Explore project', exact: false })).toBeVisible();
    await expect(card.locator('figcaption')).toContainText(locale === 'fi' ? 'Konseptikuva' : 'Concept graphic');
    await expect(page.locator('.study-note')).toHaveCount(0);
    const contact = page.locator('#contact');
    await expect(contact.locator('h2')).toHaveText(locale === 'fi' ? 'Ota yhteyttä.' : 'Get in touch.');
    await expect(contact).not.toContainText(locale === 'fi' ? 'Onko sinulla projekti mielessä?' : 'Have a project in mind?');
    await expect(contact.getByRole('link', { name: /wilzeu@gmail.com/ })).toHaveAttribute('href', 'mailto:wilzeu@gmail.com');
    await expect(contact.locator('.contact-links a')).toHaveCount(3);
    await card.getByRole('link', { name: project.links.caseStudy.label }).click();
    await expect(page).toHaveURL(new RegExp(`${route(locale)}$`));
    await expect(page.locator('#confirmed-project-scope')).toContainText(locale === 'fi' ? 'ei ole vielä toteutettu' : 'are not implemented yet');
  });
}

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

test('Hunter presentation and native navigation remain usable without JavaScript', async ({ browser }) => {
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
  } finally { await context.close(); }
});

test('public game pages contain curated evidence without raw audit content or untranslated Finnish prose', async ({ page }) => {
  const english = getContent().projects.find(item => item.slug === 'a-chain-of-pain')!;
  for (const locale of locales) {
    await page.goto(route(locale));
    const html = await page.content();
    const prose = await page.locator('main').innerText();
    for (const internal of ['PROJECT_EVIDENCE.md', 'CLAIM_MATRIX.md', 'AI_STATE_DIAGRAM.md', 'MEDIA_CAPTURE_PLAN.md', 'Saved/Codex', 'E:\\', 'C:\\Users', 'DESIGNED ONLY', 'PARTIALLY VERIFIED', 'Co-Authored-By']) expect(html).not.toContain(internal);
    await expect(page.locator('a[href*="PROJECT_EVIDENCE"], a[href*="CLAIM_MATRIX"]')).toHaveCount(0);
    if (locale === 'fi') {
      for (const section of english.study) {
        expect(prose).not.toContain(section.title);
        for (const paragraph of section.paragraphs) expect(prose).not.toContain(paragraph);
        if (section.visual) expect(prose).not.toContain(section.visual.caption);
        if (section.note) expect(prose).not.toContain(section.note);
      }
      for (const slot of english.mediaSlots) expect(prose).not.toContain(slot.description);
      expect(prose).not.toContain('Capture planned');
    }
  }
});
