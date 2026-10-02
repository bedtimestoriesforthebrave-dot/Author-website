import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch();
try {
  await mkdir('test-results', { recursive: true });
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 820, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
    await page.goto('http://127.0.0.1:4173/portfolio.html');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `test-results/design-${width}.png`, fullPage: true });
    await page.screenshot({ path: `test-results/hero-${width}.png` });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:4173/case-studies/reorderops.html');
  await page.screenshot({ path: 'test-results/case-study.png', fullPage: true });
} finally { await browser.close(); }
