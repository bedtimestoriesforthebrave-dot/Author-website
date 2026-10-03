import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { getContent, locales } from '../portfolio-src/content';
import { createRenderer } from '../portfolio-src/render';
import { documentationIndex, documentationRoot, documents, renderMarkdown } from '../portfolio-src/documentation';
const writeHtml = (path: string, html: string) => writeFile(path, html.replace(/[ \t]+$/gm, ''));
for (const locale of locales) {
  const prefix = locale === 'en' ? '' : 'fi/';
  const renderer = createRenderer(locale);
  const content = getContent(locale);
  // Planned captures produce text only. Published slots must have real local assets.
  for (const project of content.projects) {
    for (const slot of project.mediaSlots.filter(item => item.available)) {
      for (const asset of [slot.assetPath, ...(slot.poster ? [slot.poster] : []), ...Object.values(slot.captions ?? {})]) {
        if (!/^\/assets\/portfolio\/[a-zA-Z0-9/_.-]+$/.test(asset) || asset.includes('..')) throw new Error(`Invalid media asset: ${asset}`);
        await access(`.${asset}`);
      }
    }
  }
  await mkdir(`${prefix}case-studies`, { recursive: true });
  await writeHtml(`${prefix}portfolio.html`, renderer.renderPortfolio());
  await writeHtml(`${prefix}404.html`, renderer.render404());
  await writeFile(`assets/portfolio/social-preview${locale === 'fi' ? '-fi' : ''}.svg`, renderer.renderSocialPreview());
  for (const project of content.projects) {
    await writeHtml(`${prefix}case-studies/${project.slug}.html`, renderer.renderStudy(project));
  }
}
const docsRenderer = createRenderer('en');
await mkdir(`.${documentationRoot}`, { recursive: true });
await writeHtml(`.${documentationRoot}/index.html`, docsRenderer.renderDocumentation('Technical Documentation', 'Curated engineering evidence for ReorderOps: the review workflow, system architecture, deterministic planning, AI evaluation and public-demo controls.'));
for (const doc of documents) {
  const source = await readFile(`content/reorderops/${doc.slug}.md`, 'utf8');
  await writeHtml(`.${documentationRoot}/${doc.slug}.html`, docsRenderer.renderDocumentation(doc.title, doc.description, `${documentationRoot}/${doc.slug}.html`, { ...renderMarkdown(source), note: doc.note }));
}
console.log(`Generated English technical documentation at ${documentationIndex}.`);
console.log('Generated English and Finnish portfolios, case studies and 404 pages from shared typed content.');
