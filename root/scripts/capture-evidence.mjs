import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await mkdir('.build/evidence', { recursive: true });
  for (const url of ['https://reorder-ops.vercel.app', 'https://github.com/bedtimestoriesforthebrave-dot/ReorderOps', 'https://github.com/bedtimestoriesforthebrave-dot/Author-website', 'https://github.com/bedtimestoriesforthebrave-dot', 'https://vlnikolai.com']) {
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      console.log(`${response?.status()} ${url} / ${await page.title()}`);
      if (url.includes('reorder-ops.vercel.app')) {
        await page.waitForTimeout(5000);
        const body = await page.locator('body').innerText();
        await writeFile('.build/evidence/reorderops-live.txt', body);
        await page.screenshot({ path: '.build/evidence/reorderops-live.png' });
        console.log(body.slice(0, 1200));
      }
    } catch (error) { console.log(`${url}: ${error.message.split('\n')[0]}`); }
  }
} finally { await browser.close(); }
