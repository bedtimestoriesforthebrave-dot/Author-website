import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('.build', { recursive: true });
await build({ entryPoints: ['scripts/generate.ts'], outfile: '.build/generate.mjs', bundle: true, platform: 'node', format: 'esm', target: 'node22' });
await import(`../.build/generate.mjs?build=${Date.now()}`);
await build({ entryPoints: { main: 'portfolio/main.ts' }, outdir: 'assets/portfolio', chunkNames: 'chunks/[name]-[hash]', bundle: true, minify: true, format: 'esm', target: 'es2022', splitting: true });
await sharp('assets/portfolio/social-preview.svg').png().toFile('assets/portfolio/social-preview.png');
