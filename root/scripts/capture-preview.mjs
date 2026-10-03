import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const baseURL = process.env.PORTFOLIO_PREVIEW_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch();
try {
  await mkdir('test-results', { recursive: true });
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const locale of ['en', 'fi']) {
    const prefix = locale === 'fi' ? '/fi' : '';
    for (const width of [1440, 820, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
      await page.goto(`${baseURL}${prefix}/portfolio.html`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `test-results/design-${locale}-${width}.png`, fullPage: true });
      await page.screenshot({ path: `test-results/hero-${locale}-${width}.png` });
      for (const id of ['reorderops', 'approach', 'background']) {
        await page.locator(`#${id}`).evaluate(element => element.scrollIntoView());
        await page.screenshot({ path: `test-results/${id}-${locale}-${width}.png` });
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseURL}${prefix}/case-studies/reorderops.html`);
    await page.screenshot({ path: `test-results/case-study-${locale}.png`, fullPage: true });
  }
} finally { await browser.close(); }
