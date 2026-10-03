import { mkdir, writeFile } from 'node:fs/promises';
import { getContent, locales } from '../portfolio-src/content';
import { createRenderer } from '../portfolio-src/render';
const writeHtml = (path: string, html: string) => writeFile(path, html.replace(/[ \t]+$/gm, ''));
for (const locale of locales) {
  const prefix = locale === 'en' ? '' : 'fi/';
  const renderer = createRenderer(locale);
  await mkdir(`${prefix}case-studies`, { recursive: true });
  await writeHtml(`${prefix}portfolio.html`, renderer.renderPortfolio());
  await writeHtml(`${prefix}404.html`, renderer.render404());
  await writeFile(`assets/portfolio/social-preview${locale === 'fi' ? '-fi' : ''}.svg`, renderer.renderSocialPreview());
  for (const project of getContent(locale).projects) {
    await writeHtml(`${prefix}case-studies/${project.slug}.html`, renderer.renderStudy(project));
  }
}
console.log('Generated English and Finnish portfolios, case studies and 404 pages from shared typed content.');
