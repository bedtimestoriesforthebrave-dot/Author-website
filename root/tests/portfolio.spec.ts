import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const viewport of [{ width: 1440, height: 1000 }, { width: 820, height: 1180 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
  test(`readable and accessible at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const brokenAssets: string[] = [];
    page.on('response', response => { if (response.status() >= 400) brokenAssets.push(response.url()); });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/portfolio.html');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'ReorderOps', exact: true })).toBeVisible();
    const headings = await page.locator('main h2').allTextContents();
    expect(headings.slice(0, 3)).toEqual(['ReorderOps', 'A Chain of Pain', 'More ways to build.']);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    for (const selector of ['#reorderops', '#a-chain-of-pain', '#selected-work', '#approach', '#skills', '#background', '#contact']) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(brokenAssets).toEqual([]);
    await page.screenshot({ path: `test-results/static-${viewport.width}.png`, fullPage: true });
  });
}

test('all local destinations, CV and case studies resolve', async ({ page, request }) => {
  await page.goto('/portfolio.html');
  const hrefs = await page.locator('a').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
  for (const href of new Set(hrefs)) {
    if (href.startsWith('#')) expect(await page.locator(href).count()).toBe(1);
    else if (href.startsWith('/')) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
      if (href.endsWith('.pdf')) expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
    }
  }
  for (const slug of ['reorderops', 'a-chain-of-pain', 'storycodex', 'author-website']) {
    await page.goto(`/case-studies/${slug}.html`);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    for (const href of await page.locator('a[href^="#"]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!))) expect(await page.locator(href).count()).toBe(1);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.getByRole('link', { name: 'Back to selected work' }).click();
    await expect(page.locator(`#${slug}`)).toBeVisible();
  }
});

test('content and navigation work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/portfolio.html');
  await page.getByRole('link', { name: 'Explore projects' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('heading', { name: 'ReorderOps', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Read case study' }).click();
  await expect(page.getByRole('heading', { name: 'Planning that can be replayed' })).toBeVisible();
  await context.close();
});

test('external links match verified content', async ({ page }) => {
  await page.goto('/portfolio.html');
  await expect(page.getByRole('link', { name: /^Live demo/ })).toHaveAttribute('href', 'https://reorder-ops.vercel.app');
  await expect(page.locator('a[href="https://github.com/bedtimestoriesforthebrave-dot/ReorderOps"]')).toHaveCount(0);
  await expect(page.locator('a[href="https://github.com/bedtimestoriesforthebrave-dot/Author-website"]')).toHaveCount(1);
  await expect(page.locator('a[href="mailto:wilzeu@gmail.com"]')).toHaveCount(1);
  expect(await page.locator('a[target="_blank"]:not([rel~="noopener"])').count()).toBe(0);
});

test('CV download and metadata assets are available', async ({ page, request }) => {
  await page.goto('/portfolio.html');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Ville-Lahteenmaki-CV.pdf');
  expect(await download.failure()).toBeNull();
  for (const path of ['/assets/portfolio/favicon.svg', '/assets/portfolio/social-preview.png', '/assets/portfolio/reorderops-demo.webp']) {
    expect((await request.get(path)).status()).toBe(200);
  }
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://vlnikolai.com/portfolio');
});

test('unknown routes show an accessible 404 with recovery links', async ({ page, request }) => {
  const response = await page.goto('/missing-project');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'This path ends here.' })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('link', { name: 'Return to portfolio' }).click();
  await expect(page).toHaveURL(/portfolio\.html$/);
  for (const path of ['/.env', '/portfolio-src/content.ts', '/.git/config', '/api/login']) expect((await request.get(path)).status()).toBe(404);
});
