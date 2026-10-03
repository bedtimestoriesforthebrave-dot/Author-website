import { mkdir, writeFile } from 'node:fs/promises';
import { projects } from '../portfolio-src/content';
import { renderPortfolio, renderStudy, render404 } from '../portfolio-src/render';
await mkdir('case-studies', { recursive: true });
await writeFile('portfolio.html', renderPortfolio());
await writeFile('404.html', render404());
for (const project of projects) {
  await writeFile(`case-studies/${project.slug}.html`, renderStudy(project));
}
console.log(`Generated portfolio and ${projects.length} case studies from typed content.`);
