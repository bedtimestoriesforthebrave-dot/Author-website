import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import { createPublicOutput } from './public-output.mjs';

test('deployment output preserves the approved pages, assets and exact CV', async () => {
  for (const file of ['index.html', 'about.html', 'books.html', 'contact.html', 'admin.html', 'portfolio.html', 'fi/portfolio.html', 'case-studies/reorderops.html', 'fi/case-studies/reorderops.html', 'docs/reorderops/index.html', 'docs/reorderops/reviewer-guide.html', 'docs/reorderops/architecture.html', 'docs/reorderops/planning-rules.html', 'docs/reorderops/ai-evaluation.html', 'docs/reorderops/public-demo.html', 'assets/portfolio/main.js', 'css/portfolio.css', 'css/styles.css', 'js/books.js', 'pictures/front.png', 'data/books.json', 'data/cv.pdf']) {
    assert.deepEqual(await readFile(join('public', file)), await readFile(file), file);
  }
  assert.equal(createHash('sha256').update(await readFile('public/data/cv.pdf')).digest('hex'), '8024b2f3e44b61c0899d9c638377e98efa12a371c77009a435ee551e70ea03fa');
  const output = await readdir('public');
  for (const privateEntry of ['api', 'content', 'portfolio-src', 'scripts', 'tests', '.build', '.env', 'package.json', 'package-lock.json', 'README.md', 'PORTFOLIO.md', 'dev-server.js', 'vercel.json', 'media-inbox']) assert.ok(!output.includes(privateEntry), privateEntry);
  // Only the optimized A Chain of Pain derivatives are deployed.
  for (const file of await readdir('assets/portfolio/a-chain-of-pain')) assert.deepEqual(await readFile(join('public/assets/portfolio/a-chain-of-pain', file)), await readFile(join('assets/portfolio/a-chain-of-pain', file)), file);
  assert.ok((await stat('public/assets/portfolio/a-chain-of-pain/gameplay-showcase.mp4')).size < 40 * 1024 * 1024);
});

test('output regeneration removes stale files and rejects private files inside asset directories', async () => {
  const prefix = join(tmpdir(), 'author-public-output-');
  const fixture = await mkdtemp(prefix);
  try {
    for (const directory of ['admin', 'assets/portfolio', 'case-studies', 'css', 'docs', 'fi', 'js', 'pictures', 'data', 'public', 'media-inbox']) await mkdir(join(fixture, directory), { recursive: true });
    const files = { 'index.html': '<h1>Author</h1>', 'css/site.css': 'body{}', 'assets/portfolio/font-license.txt': 'License', 'data/cv.pdf': 'PDF bytes', 'data/books.json': '[]', 'robots.txt': 'User-agent: *', 'sitemap.xml': '<urlset/>', '.env': 'PRIVATE', 'css/.env': 'PRIVATE', 'assets/internal.md': 'PRIVATE', 'data/private.json': 'PRIVATE', 'public/stale.html': 'stale', 'public/.env': 'PRIVATE', 'media-inbox/raw.mp4': 'RAW', 'media-inbox/raw.png': 'RAW' };
    for (const [file, contents] of Object.entries(files)) await writeFile(join(fixture, file), contents);
    await createPublicOutput(fixture);
    for (const file of ['.env', 'css/.env', 'assets/internal.md', 'data/private.json', 'stale.html', 'media-inbox', 'media-inbox/raw.mp4']) await assert.rejects(access(join(fixture, 'public', file)), { code: 'ENOENT' });
    assert.equal(await readFile(join(fixture, 'public/data/cv.pdf'), 'utf8'), 'PDF bytes');
    assert.equal(await readFile(join(fixture, 'public/assets/portfolio/font-license.txt'), 'utf8'), 'License');
    await access(join(fixture, 'public/css/site.css'));
  } finally {
    assert.ok(resolve(fixture).startsWith(resolve(prefix)), 'Cleanup must remain within the test fixture');
    await rm(fixture, { recursive: true, force: true });
  }
});
