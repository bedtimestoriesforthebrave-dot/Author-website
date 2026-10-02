import { mkdir, writeFile } from 'node:fs/promises';
import { projects } from '../portfolio/content';
import { renderPortfolio, renderStudy } from '../portfolio/render';
await mkdir('case-studies', { recursive: true });
await writeFile('portfolio.html', renderPortfolio());
for (const project of projects) {
  await writeFile(`case-studies/${project.slug}.html`, renderStudy(project));
}
console.log(`Generated portfolio and ${projects.length} case studies from typed content.`);
