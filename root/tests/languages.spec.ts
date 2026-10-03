import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { getContent, locales } from '../portfolio-src/content';

const slugs = getContent().projects.map(project => project.slug);

test('localized content shares technical metadata and stable section IDs', () => {
  const english = getContent();
  const finnish = getContent('fi');
  expect(english.site.role).toBe('Software & AI Developer');
  expect(finnish.site.cv.url).toBe(english.site.cv.url);
  expect(finnish.site.email).toBe(english.site.email);
  expect(finnish.site.social).toEqual(english.site.social);
  for (const [index, project] of finnish.projects.entries()) {
    const original = english.projects[index];
    expect(project.technologies).toEqual(original.technologies);
    expect(project.links.demo?.url).toBe(original.links.demo?.url);
    expect(project.links.github?.url).toBe(original.links.github?.url);
    expect(project.media?.src).toBe(original.media?.src);
    expect(project.study.map(section => section.id)).toEqual(original.study.map(section => section.id));
    expect(project.summary).not.toBe(original.summary);
    for (const [sectionIndex, section] of project.study.entries()) {
      expect(section.title).not.toBe(original.study[sectionIndex].title);
      expect(section.paragraphs.length).toBe(original.study[sectionIndex].paragraphs.length);
    }
    expect(project.sources.filter(source => source.startsWith('docs/'))).toEqual(original.sources.filter(source => source.startsWith('docs/')));
  }
});

for (const width of [1440, 820, 390, 320]) {
  test(`Finnish portfolio is readable and accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(response.url()); });
    await page.goto('/fi/portfolio.html');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
    await expect(page.locator('h1')).toContainText('Ohjelmistoja.');
    await expect(page.getByRole('group', { name: 'Kieli' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Suomi', exact: true })).toHaveAttribute('aria-current', 'page');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Siirry sisältöön' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    for (const selector of ['#reorderops', '#a-chain-of-pain', '#selected-work', '#approach', '#skills', '#background', '#contact']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), selector).toBeTruthy();
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.locator('body').textContent()).not.toContain('${text(');
    await expect(page.getByRole('link', { name: /GitHub.*avautuu uuteen välilehteen/ }).first()).toHaveCount(1);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `test-results/finnish-${width}.png`, fullPage: true });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `test-results/finnish-hero-${width}.png` });
  });
}

test('all Finnish case studies keep shared documentation, assets and working navigation', async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of slugs) {
    await page.goto(`/case-studies/${slug}.html`);
    const docs = await page.locator('.sources a').evaluateAll(links => links.map(link => link.getAttribute('href')));
    const ids = await page.locator('.study-body section[id]').evaluateAll(sections => sections.map(section => section.id));
    await page.goto(`/fi/case-studies/${slug}.html`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
    expect(await page.locator('.sources a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(docs);
    expect(await page.locator('.study-body section[id]').evaluateAll(sections => sections.map(section => section.id))).toEqual(ids);
    if (slug === 'reorderops' || slug === 'author-website') await expect(page.getByText('Dokumentaatio · englanniksi', { exact: true })).toBeVisible();
    for (const href of new Set(await page.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')!)))) {
      if (href.startsWith('#')) expect(await page.locator(href).count(), href).toBe(1);
      if (href.startsWith('/')) expect((await request.get(href)).status(), href).toBe(200);
    }
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    for (const section of await page.locator('main section').all()) {
      await section.scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    await page.screenshot({ path: `test-results/finnish-${slug}.png`, fullPage: true });
    await page.getByRole('link', { name: 'Takaisin valittuihin töihin' }).click();
    await expect(page).toHaveURL(new RegExp(`/fi/portfolio.html#${slug}$`));
  }
});

test('language switch preserves projects and the current section in both directions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/portfolio.html#approach');
  await page.getByRole('link', { name: 'Suomi', exact: true }).click();
  await expect(page).toHaveURL(/\/fi\/portfolio.html#approach$/);
  await expect(page.locator('#approach')).toBeInViewport();
  await page.evaluate(() => { history.replaceState(null, '', location.pathname); document.getElementById('reorderops')!.scrollIntoView(); });
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio.html#reorderops$/);
  for (const slug of slugs) {
    const anchor = getContent().projects.find(project => project.slug === slug)!.study[0].id;
    await page.goto(`/case-studies/${slug}.html#${anchor}`);
    await page.getByRole('link', { name: 'Suomi', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/fi/case-studies/${slug}.html#${anchor}$`));
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/case-studies/${slug}.html#${anchor}$`));
  }
});

test('native language links and Finnish navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4173/portfolio.html');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.getByRole('link', { name: 'Suomi', exact: true }).click();
    await page.getByRole('link', { name: 'Tutustu projekteihin' }).click();
    await expect(page).toHaveURL(/\/fi\/portfolio.html#work$/);
    await page.getByRole('link', { name: 'Lue projektiesittely', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Toistettava suunnittelu' })).toBeVisible();
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL(/\/case-studies\/reorderops.html$/);
  } finally { await context.close(); }
});

test('motion controls use Finnish accessibility text and keep the stored preference', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/fi/portfolio.html');
  await page.getByRole('button', { name: 'Poista tilallinen liike käytöstä' }).click();
  await expect(page.getByRole('button', { name: 'Ota tilallinen liike käyttöön' })).toHaveText('Liike pois');
  await page.getByRole('link', { name: 'English', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Enable spatial motion' })).toHaveText('Motion off');
});

test('localized routes, metadata, social preview and 404 recovery are correct', async ({ page, request }) => {
  for (const locale of locales) {
    const prefix = locale === 'fi' ? '/fi' : '';
    for (const path of ['/portfolio', ...slugs.map(slug => `/case-studies/${slug}`)]) {
      expect((await request.get(prefix + path)).status()).toBe(200);
      await page.goto(prefix + path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://vlnikolai.com${prefix}${path}`);
      for (const other of locales) await expect(page.locator(`link[hreflang="${other}"]`)).toHaveAttribute('href', `https://vlnikolai.com${other === 'fi' ? '/fi' : ''}${path}`);
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute('href', `https://vlnikolai.com${path}`);
    }
  }
  expect((await request.get('/assets/portfolio/social-preview-fi.png')).status()).toBe(200);
  const missing = await page.goto('/fi/missing-project');
  expect(missing?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
  await expect(page.getByRole('heading', { name: 'Tämä polku päättyy tähän.' })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('link', { name: 'Takaisin portfolioon' }).click();
  await expect(page).toHaveURL(/\/fi\/portfolio.html$/);
});
