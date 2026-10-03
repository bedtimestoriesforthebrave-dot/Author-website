import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { documents, documentationIndex, documentationRoot, renderMarkdown } from '../portfolio-src/documentation';

const cvHash = '816a9a649b9eb6c4c48f7deae6a5ada682383a51a9977415a1a283e90d441c16';
const docsPaths = [documentationIndex, ...documents.map(doc => `${documentationRoot}/${doc.slug}.html`)];
const portfolioPaths = ['/portfolio.html', '/fi/portfolio.html', '/case-studies/reorderops.html', '/fi/case-studies/reorderops.html', '/case-studies/a-chain-of-pain.html', '/fi/case-studies/a-chain-of-pain.html'];
const exposure = /[CE]:\\|C:\\Users\\|localhost|127\.0\.0\.1|\.env\b|\.runtime\/|PROJECT_EVIDENCE\.md|CLAIM_MATRIX\.md|sk-(?:proj-)?[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{20,}/i;

for (const width of [1440, 820, 390, 320]) {
  test(`release pages, documentation and accessibility at ${width}px`, async ({ page, request }) => {
    test.setTimeout(180_000);
    await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    const missing: string[] = [];
    const checked = new Set<string>();
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) missing.push(response.url()); });
    for (const path of [...portfolioPaths, ...docsPaths]) {
      expect((await page.goto(path))?.status(), path).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), path).toBeTruthy();
      expect(await page.locator('main').innerText(), path).not.toMatch(exposure);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations, path).toEqual([]);
      if (docsPaths.includes(path)) {
        await expect(page.locator('html')).toHaveAttribute('lang', 'en');
        const document = documents.find(doc => path.endsWith(`/${doc.slug}.html`));
        await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', document?.description ?? 'Curated engineering evidence for ReorderOps: the review workflow, system architecture, deterministic planning, AI evaluation and public-demo controls.');
        await expect(page.locator('link[hreflang="fi"]')).toHaveCount(0);
        await expect(page.locator('.doc-navigation')).toHaveCount(2);
        if (path === documentationIndex) await expect(page.locator('.doc-index > li')).toHaveCount(5);
        else {
          await expect(page.locator('.doc-prose h2')).not.toHaveCount(0);
          await expect(page.locator('.doc-prose table')).not.toHaveCount(0);
        }
      }
      const links = await page.locator('a').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
      for (const href of new Set(links)) {
        if (href.startsWith('#')) expect(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(href.slice(1))), `${path}: ${href}`).toBeTruthy();
        else if (href.startsWith('/') && !checked.has(href)) {
          checked.add(href);
          const response = await request.get(href);
          expect(response.status(), `${path}: ${href}`).toBe(200);
          if (href.includes('#')) expect(await response.text()).toContain(`id="${decodeURIComponent(href.split('#')[1])}"`);
        }
      }
      if ([documentationIndex, `${documentationRoot}/planning-rules.html`].includes(path) && [1440, 390].includes(width)) {
        await page.screenshot({ path: `test-results/release-${path.endsWith('/') ? 'index' : 'planning'}-${width}.png`, fullPage: path.endsWith('/') });
      }
    }
    expect(errors).toEqual([]);
    expect(missing).toEqual([]);
  });
}

test('both locales serve the authoritative CV bytes and link the same English docs', async ({ page, request }) => {
  expect(existsSync('portfolio'), 'A directory must not shadow the clean /portfolio page').toBe(false);
  for (const path of ['/portfolio', '/fi/portfolio']) expect((await request.get(path)).status()).toBe(200);
  expect(createHash('sha256').update(readFileSync('data/cv.pdf')).digest('hex')).toBe(cvHash);
  const pdf = await request.get('/data/cv.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('application/pdf');
  expect(createHash('sha256').update(await pdf.body()).digest('hex')).toBe(cvHash);
  for (const locale of ['en', 'fi']) {
    const prefix = locale === 'fi' ? '/fi' : '';
    await page.goto(`${prefix}/portfolio.html`);
    for (const link of await page.locator('a[href$=".pdf"]').all()) await expect(link).toHaveAttribute('href', '/data/cv.pdf');
    const download = page.waitForEvent('download');
    await page.getByRole('link', { name: locale === 'fi' ? 'Lataa CV' : 'Download CV' }).click();
    expect(await (await download).failure()).toBeNull();
    await page.goto(`${prefix}/case-studies/reorderops.html`);
    const documentation = page.locator('.study-hero .project-actions').getByRole('link', { name: locale === 'fi' ? 'Dokumentaatio · englanniksi' : 'Documentation', exact: false });
    await expect(documentation).toHaveAttribute('href', documentationIndex);
    await documentation.click();
    await expect(page.locator('h1')).toHaveText('Technical Documentation');
    await expect(page.locator('a[href*="github.com/bedtimestoriesforthebrave-dot/ReorderOps"]')).toHaveCount(0);
  }
});

test('documentation skip links, visible focus, code selection and locale return work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4173${documentationIndex}`);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.locator('.doc-index h2 a').filter({ hasText: 'Planning Rules' }).click();
  await expect(page.locator('pre code').first()).toContainText('available_stock = on_hand - reserved');
  const selection = await page.locator('pre code').first().evaluate(element => {
    const range = document.createRange(); range.selectNodeContents(element);
    const selection = window.getSelection()!; selection.removeAllRanges(); selection.addRange(range); return selection.toString();
  });
  expect(selection).toContain('final_quantity');
  await page.locator('.study-toc a').first().focus();
  expect(await page.locator('.study-toc a').first().evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await page.locator('.language-switch a[lang="fi"]').click();
  await expect(page).toHaveURL(/\/fi\/case-studies\/reorderops\.html$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fi');
  await context.close();
});

test('Markdown rendering keeps semantic evidence while escaping HTML and unsafe links', () => {
  const rendered = renderMarkdown('# Original title\n\n## Evidence\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)\n\n| Input | Result |\n| --- | --- |\n| 75 | 120 |\n\n```text\n<unsafe> & formula\n```');
  expect(rendered.html).not.toContain('<script>');
  expect(rendered.html).not.toContain('href="javascript:');
  expect(rendered.html).not.toContain('<h1');
  expect(rendered.html).toContain('<h2 id="evidence">');
  expect(rendered.html).toContain('<table>');
  expect(rendered.html).toContain('<pre><code');
  expect(rendered.html).toContain('&lt;unsafe&gt;');
});
