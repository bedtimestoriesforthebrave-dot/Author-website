import { copyFile, lstat, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const extensions = new Set(['.html', '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.mp4', '.webm', '.vtt']);
const directories = ['admin', 'assets', 'case-studies', 'css', 'docs', 'fi', 'js', 'pictures'];

// Stage only browser assets, never source code, API handlers or local reports.
export async function createPublicOutput(base = projectRoot) {
  const source = resolve(base);
  const output = join(source, 'public');
  const previous = await lstat(output).catch(error => {
    if (error.code !== 'ENOENT') throw error;
    return null;
  });
  if (previous && (!previous.isDirectory() || previous.isSymbolicLink())) throw new Error('The generated public output must be a normal directory.');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });

  async function copy(relative) {
    const from = join(source, relative);
    if (!(await lstat(from)).isFile()) throw new Error(`Public asset must be a normal file: ${relative}`);
    const to = join(output, relative);
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
  }

  async function copyDirectory(relative) {
    const directory = await lstat(join(source, relative));
    if (!directory.isDirectory() || directory.isSymbolicLink()) throw new Error(`Public asset directory must be a normal directory: ${relative}`);
    for (const entry of await readdir(join(source, relative), { withFileTypes: true })) {
      const path = join(relative, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Public asset must not be a symbolic link: ${path}`);
      if (entry.isDirectory()) await copyDirectory(path);
      else if (entry.isFile() && (extensions.has(extname(entry.name)) || path === join('assets', 'portfolio', 'font-license.txt'))) await copy(path);
    }
  }

  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.isFile() && extname(entry.name) === '.html') await copy(entry.name);
  }
  for (const directory of directories) await copyDirectory(directory);
  for (const file of ['data/cv.pdf', 'data/books.json', 'robots.txt', 'sitemap.xml']) await copy(file);
  console.log('Staged deployable pages and assets in public/.');
}
