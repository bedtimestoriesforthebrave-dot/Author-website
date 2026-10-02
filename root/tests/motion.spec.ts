import { test, expect, type Page } from '@playwright/test';

async function frame(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}
const panelState = (page: Page) => page.locator('#reorderops .travel-panel').evaluate(element => {
  const style = getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return { x: matrix.m41, y: matrix.m42, z: matrix.m43, opacity: Number(style.opacity) };
});

test('desktop travel is reversible with a stable reading interval', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/portfolio.html');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await page.evaluate(() => document.fonts.ready);
  const range = await page.locator('#reorderops').evaluate(section => {
    const rect = section.getBoundingClientRect();
    return { start: rect.top + scrollY - innerHeight, distance: rect.height + innerHeight };
  });
  const sample = async (progress: number) => {
    await page.evaluate(y => window.scrollTo(0, y), range.start + range.distance * progress);
    await frame(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    return panelState(page);
  };
  const entry = await sample(.1);
  expect(entry.x).toBeLessThan(-1);
  expect(entry.z).toBeLessThan(-1);
  const center = await sample(.4);
  expect(Math.abs(center.x)).toBeLessThan(.1);
  expect(Math.abs(center.y)).toBeLessThan(.1);
  expect(center.opacity).toBe(1);
  const laterCenter = await sample(.65);
  expect(laterCenter).toEqual(center);
  await expect(page.locator('[data-nav="work"]')).toHaveAttribute('aria-current', 'location');
  const exit = await sample(.9);
  expect(exit.x).toBeGreaterThan(1);
  expect(exit.z).toBeLessThan(-1);
  const reversed = await sample(.1);
  expect(Math.abs(reversed.x - entry.x)).toBeLessThan(.5);
  await page.screenshot({ path: 'test-results/spatial-entry.png' });
  await sample(.5);
  await page.screenshot({ path: 'test-results/spatial-reading.png' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.getByRole('button', { name: 'Disable spatial motion' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(await page.locator('#reorderops .travel-panel').evaluate(element => getComputedStyle(element).transform)).toBe('none');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Enable spatial motion' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('keyboard focus, live reduced-motion changes and viewport changes restore static flow', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/portfolio.html');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await page.getByRole('link', { name: 'Read case study' }).focus();
  expect(await page.locator('#reorderops .travel-panel').evaluate(element => getComputedStyle(element).transform)).toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('.motion-toggle')).toBeHidden();
  for (const panel of await page.locator('.travel-panel').all()) {
    expect(await panel.evaluate(element => getComputedStyle(element).transform)).toBe('none');
    expect(await panel.getAttribute('style')).toBeFalsy();
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await page.setViewportSize({ width: 820, height: 1180 });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('.spatial-background')).toBeHidden();
});

for (const setting of ['mobile', 'reduced-motion', 'weak-device', 'failed-animation'] as const) {
  test(`${setting} keeps the static portfolio usable`, async ({ page }) => {
    await page.setViewportSize({ width: setting === 'mobile' ? 390 : 1440, height: 1000 });
    if (setting === 'reduced-motion') await page.emulateMedia({ reducedMotion: 'reduce' });
    if (setting === 'weak-device') await page.addInitScript(() => Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 2 }));
    if (setting === 'failed-animation') await page.route('**/chunks/spatial-*.js', route => route.abort());
    const requests: string[] = [];
    page.on('request', request => requests.push(request.url()));
    await page.goto('/portfolio.html');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    await expect(page.locator('.motion-toggle')).toBeHidden();
    expect(await page.locator('#reorderops .travel-panel').evaluate(element => getComputedStyle(element).transform)).toBe('none');
    if (setting !== 'failed-animation') expect(requests.some(url => url.includes('spatial-'))).toBeFalsy();
    await page.getByRole('link', { name: 'Explore projects' }).click();
    await page.getByRole('link', { name: 'Read case study' }).click();
    await expect(page.locator('h1')).toHaveText('ReorderOps');
  });
}
