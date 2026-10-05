import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('English language hint introduces Finnish without taking focus and stays dismissed during navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/portfolio.html');
  const hint = page.locator('.language-hint');
  await expect(hint).toBeVisible();
  await expect(hint.getByRole('link', { name: 'Myös suomeksi' })).toHaveAttribute('lang', 'fi');
  expect(await page.evaluate(() => document.activeElement === document.body)).toBeTruthy();
  await hint.getByRole('button', { name: 'Dismiss language hint' }).focus();
  await page.keyboard.press('Escape');
  await expect(hint).toBeHidden();
  await expect(page.getByRole('link', { name: 'Suomi', exact: true })).toBeFocused();
  await page.goto('/case-studies/storycodex.html');
  await expect(hint).toBeHidden();
  await page.getByRole('link', { name: 'Suomi', exact: true }).click();
  await expect(page.locator('.language-hint')).toHaveCount(0);
  await page.goto('/docs/reorderops/index.html');
  await expect(page.locator('.language-hint')).toHaveCount(0);
});

test('hint expires quietly, but allows focused visitors time to use the Finnish project link', async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/case-studies/storycodex.html#design-considerations');
  await page.clock.fastForward(1000);
  const hint = page.locator('.language-hint');
  await expect(hint).toBeVisible();
  const link = hint.getByRole('link', { name: 'Myös suomeksi' });
  await link.focus();
  await page.clock.fastForward(9000);
  await expect(hint).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/fi\/case-studies\/storycodex.html#design-considerations$/);
  await page.goto('/portfolio.html');
  await page.evaluate(() => sessionStorage.removeItem('portfolio-language-hint'));
  await page.reload();
  await page.clock.fastForward(1000);
  await expect(hint).toBeVisible();
  await page.mouse.move(0, 300);
  await page.clock.fastForward(9000);
  await expect(hint).toBeHidden();
});

for (const width of [1440, 820, 390, 320]) {
  test(`language hint fits clear of navigation and opening content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => sessionStorage.removeItem('portfolio-language-hint'));
    for (const path of ['/portfolio.html', '/case-studies/storycodex.html']) {
      await page.goto(path);
      const hint = page.locator('.language-hint');
      await expect(hint).toBeVisible();
      expect(await hint.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
      const rect = (await hint.boundingBox())!;
      const navigation = (await page.locator('.site-header nav').boundingBox())!;
      const openingContent = (await page.locator(path === '/portfolio.html' ? '.hero-top .eyebrow' : '.back-link').boundingBox())!;
      expect(rect.x).toBeGreaterThanOrEqual(0);
      expect(rect.x + rect.width).toBeLessThanOrEqual(width);
      expect(rect.y).toBeGreaterThanOrEqual(navigation.y + navigation.height);
      expect(rect.y + rect.height).toBeLessThanOrEqual(openingContent.y);
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
      await page.screenshot({ path: `test-results/language-hint-${width}-${path.includes('storycodex') ? 'study' : 'portfolio'}.png` });
      await hint.getByRole('button', { name: 'Dismiss language hint' }).click();
      await expect(hint).toBeHidden();
    }
  });
}
