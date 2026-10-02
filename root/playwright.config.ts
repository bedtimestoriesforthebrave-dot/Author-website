import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: true, workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: { command: 'node scripts/preview.mjs', url: 'http://127.0.0.1:4173/portfolio.html', reuseExistingServer: false },
});
