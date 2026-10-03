import { build } from 'esbuild';
import { mkdir, readdir, unlink } from 'node:fs/promises';
import sharp from 'sharp';
import { createPublicOutput } from './public-output.mjs';
await mkdir('.build', { recursive: true });
await build({ entryPoints: ['scripts/generate.ts'], outfile: '.build/generate.mjs', bundle: true, platform: 'node', format: 'esm', target: 'node22' });
await import(`../.build/generate.mjs?build=${Date.now()}`);
const previousChunks = await readdir('assets/portfolio/chunks').catch(() => []);
const result = await build({ entryPoints: { main: 'portfolio-src/main.ts' }, outdir: 'assets/portfolio', chunkNames: 'chunks/[name]-[hash]', bundle: true, minify: true, format: 'esm', target: 'es2022', splitting: true, metafile: true });
const outputs = new Set(Object.keys(result.metafile.outputs).map(path => path.replaceAll('\\', '/')));
// Remove only obsolete generated chunks, after a successful build.
for (const name of previousChunks) {
  const path = `assets/portfolio/chunks/${name}`;
  if (/^spatial-[A-Z0-9]+\.js$/.test(name) && !outputs.has(path)) await unlink(path);
}
await sharp('assets/portfolio/social-preview.svg').png().toFile('assets/portfolio/social-preview.png');
await sharp('assets/portfolio/social-preview-fi.svg').png().toFile('assets/portfolio/social-preview-fi.png');
await createPublicOutput();
