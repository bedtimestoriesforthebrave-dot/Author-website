import { site, projects, evidencePath, type Link, type Project } from './content';

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
const text = escape;
const arrow = '<span aria-hidden="true">↗</span>';
const link = (item: Link, className = 'text-link') => `<a class="${className}" href="${escape(item.url)}"${item.url.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text(item.label)} ${arrow}${item.url.startsWith('https:') ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;
const tags = (project: Project) => `<ul class="tags" aria-label="${text(project.title)} technologies">${project.technologies.map(item => `<li>${text(item)}</li>`).join('')}</ul>`;
const links = (project: Project) => `<div class="project-actions">${project.links.demo ? link(project.links.demo, 'button primary') : ''}${link(project.links.caseStudy, 'button secondary')}${project.links.github ? link(project.links.github) : ''}</div>`;
const sectionLabel = (number: string, label: string) => `<p class="section-label"><span>${number}</span> ${text(label)}</p>`;
const travel = (inner: string) => `<div class="travel-panel">${inner}</div>`;

function head(title: string, description: string, path: string) {
  const canonical = `https://vlnikolai.com${path}`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${text(title)}</title><meta name="description" content="${escape(description)}">
<meta name="theme-color" content="#111310"><link rel="canonical" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${text(site.name)}">
<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${canonical}"><meta property="og:image" content="https://vlnikolai.com/assets/portfolio/social-preview.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Ville Lähteenmäki — Software & AI Developer. Selected work: ReorderOps, A Chain of Pain, StoryCodex and Author Website.">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="https://vlnikolai.com/assets/portfolio/social-preview.png">
<link rel="icon" type="image/svg+xml" href="/assets/portfolio/favicon.svg">
<link rel="stylesheet" href="/css/portfolio.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.role, url: 'https://vlnikolai.com/portfolio.html', sameAs: site.social.map(item => item.url) }).replace(/</g, '\\u003c')}</script>
</head>`;
}

function header(isStudy = false) {
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="header-inner">
<a class="wordmark" href="/portfolio.html" aria-label="${text(site.name)}, portfolio home"><span class="monogram" aria-hidden="true">VL<span>_</span></span><span class="wordmark-name">${text(site.name)}</span></a>
<nav aria-label="Main navigation">${site.navigation.map(item => `<a href="${isStudy ? '/portfolio.html' : ''}${item.url}" data-nav="${item.url.slice(1)}">${text(item.label)}</a>`).join('')}</nav>
<div class="header-actions">${link(site.cv, 'cv-link')}<button class="motion-toggle" type="button" aria-pressed="false" hidden>Motion <span data-motion-label>on</span></button></div>
</div></header>`;
}

function footer() {
  return `<footer class="site-footer container"><p>© 2026 ${text(site.name)}</p><p>Software. Evidence. Human judgment.</p><a href="#main">Back to top <span aria-hidden="true">↑</span></a></footer>`;
}

function diagram() {
  return `<figure class="system-visual"><div class="visual-topline"><span class="status-dot"></span> ReorderOps <span>Architecture / 01</span></div>
  <div class="system-diagram"><div class="diagram-source"><span class="diagram-icon" aria-hidden="true">[ ]</span><strong>Operational data</strong><span>Stock · demand · supplier policy</span></div><div class="diagram-connector" aria-hidden="true"></div><div class="diagram-core"><span class="micro-label">Authoritative calculation</span><strong>Deterministic<br>planning engine</strong><span>Saved, immutable evidence</span></div><div class="diagram-branches"><div><span class="micro-label">Interpret</span><strong>Read-only AI</strong><span>Explain the evidence</span></div><div><span class="micro-label">Review</span><strong>Human approval</strong><span>Revalidate before action</span></div></div><div class="diagram-result"><span aria-hidden="true">↳</span> Internal draft <span class="result-divider">/</span> Audit trail</div></div>
  <figcaption>System architecture · AI interprets. Business rules decide.</figcaption></figure>`;
}

function gameVisual() {
  return `<figure class="game-visual"><div class="visual-topline">Unreal Engine 5 / C++ <span>Project / 02</span></div><div class="game-wireframe" aria-hidden="true"><svg viewBox="0 0 640 400" fill="none"><g stroke="currentColor"><path d="M50 360 270 210 370 210 590 360M50 40 270 140 370 140 590 40M50 40V360M590 40V360M270 140V210M370 140V210M0 320H640M0 270H640M0 370H640M180 0 292 140M460 0 348 140M0 130 270 160M640 130 370 160M0 230 270 190M640 230 370 190M200 400 295 210M440 400 345 210"/><path d="M296 210V160H344V210" stroke-width="2"/><path d="M296 160 304 167V205L296 210M304 167H337V205H304" opacity=".6"/></g><circle cx="320" cy="186" r="2" fill="currentColor"/></svg><span class="game-visual-title">A CHAIN<br><i>OF PAIN</i></span></div><figcaption>Concept graphic · Gameplay media forthcoming.</figcaption></figure>`;
}

function featured(project: Project) {
  return `<section id="${project.slug}" class="project-section ${project.prominence}" aria-labelledby="${project.slug}-title">${travel(`
  ${sectionLabel(project.number, project.prominence === 'flagship' ? 'Flagship project' : 'Featured project')}
  <div class="featured-grid"><div class="project-copy"><p class="eyebrow">${text(project.category)}</p><h2 id="${project.slug}-title">${text(project.title)}</h2><p class="project-statement">${text(project.description)}</p><p class="project-summary">${text(project.summary)}</p>${tags(project)}${links(project)}</div>${project.slug === 'reorderops' ? diagram() : gameVisual()}</div>
  <div class="project-bottom"><p class="project-status"><span class="status-dot ${project.slug === 'reorderops' ? '' : 'neutral'}"></span>${text(project.status)}</p><ul class="highlights">${project.highlights.map(item => `<li>${text(item)}</li>`).join('')}</ul></div>
  ${project.slug === 'reorderops' ? `<div class="evidence-path"><p class="micro-label">The decision path</p><ol>${evidencePath.map(item => `<li>${text(item)}</li>`).join('')}</ol></div>` : ''}
  `)}</section>`;
}

export function renderPortfolio() {
  const featuredProjects = projects.filter(project => project.prominence !== 'selected');
  const selected = projects.filter(project => project.prominence === 'selected');
  return `${head(site.title, site.description, '/portfolio.html')}<body class="portfolio-page">
  <div class="spatial-background" aria-hidden="true"><svg viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor"><path d="M130 -100C760 50 20 250 610 430S100 740 640 930 200 1170 570 1350"/><path d="M200 -100C830 50 90 250 680 430S170 740 710 930 270 1170 640 1350"/><path d="M270 -100C900 50 160 250 750 430S240 740 780 930 340 1170 710 1350"/></g></svg></div>
  ${header()}<main id="main" tabindex="-1" class="container">
  <section class="hero" aria-labelledby="hero-title"><div class="hero-top"><p class="eyebrow">${text(site.name)} <span>/</span> ${text(site.role)}</p><p class="hero-location"><span class="status-dot"></span> ${text(site.location)}</p></div>
  <h1 id="hero-title"><span class="sr-only">${text(site.name)} — ${text(site.role)}. </span>${site.hero.lines.map((line, i) => `<span class="hero-line ${i === 1 ? 'accent' : ''}">${text(line)}</span>`).join('')}</h1>
  <div class="hero-bottom"><p>${text(site.hero.summary)}</p><div class="hero-actions"><a class="button primary" href="#work">Explore projects <span aria-hidden="true">↓</span></a>${site.social.map(item => link(item)).join('')}<a class="text-link" href="#contact">Contact ${arrow}</a></div></div>
  <div class="hero-foot"><span>${text(site.hero.label)}</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div></section>
  <div id="work" class="work-intro"><p class="eyebrow">Selected projects / 01—04</p><p>${text(site.selection)}</p></div>
  ${featuredProjects.map(featured).join('')}
  <section id="selected-work" class="selected-section" aria-labelledby="selected-title">${travel(`${sectionLabel('03—04', 'Selected work')}<div class="section-heading"><h2 id="selected-title">More ways to build.</h2><p>Mobile experiences and the web.</p></div><div class="selected-grid">${selected.map(project => `<article class="selected-card"><div class="selected-top"><span class="micro-label">${project.number} / ${text(project.category)}</span><span class="selected-symbol" aria-hidden="true">${project.slug === 'storycodex' ? 'Aa' : '&lt;/&gt;'}</span></div><h3>${text(project.title)}</h3><p class="selected-statement">${text(project.description)}</p><p>${text(project.summary)}</p>${tags(project)}${links(project)}</article>`).join('')}</div>`)}</section>
  <section id="approach" class="approach-section" aria-labelledby="approach-title">${travel(`${sectionLabel('05', 'Development / AI workflow')}<div class="approach-grid"><div><h2 id="approach-title">${text(site.workflow.title).replace('\n', '<br>')}</h2><p class="section-summary">${text(site.workflow.summary)}</p><a class="text-link" href="/case-studies/reorderops.html#verification-and-honest-limits">See the ReorderOps evidence ${arrow}</a></div><ol class="workflow">${site.workflow.steps.map((step, i) => `<li><span class="step-number">0${i + 1}</span><div><h3>${text(step.title)}</h3><p>${text(step.description)}</p></div></li>`).join('')}</ol></div>`)}</section>
  <section id="skills" class="skills-section" aria-labelledby="skills-title">${travel(`${sectionLabel('06', 'Skills / Technologies')}<div class="section-heading"><h2 id="skills-title">Tools behind the work.</h2><p>Grouped by where they earn their place.</p></div><div class="skills-grid">${site.skills.map(group => `<div><h3>${text(group.title)}</h3><ul>${group.items.map(item => `<li>${text(item)}</li>`).join('')}</ul></div>`).join('')}</div><div class="earlier-work"><h3>Earlier work & additional experience</h3><p>${text(site.earlier)}</p></div>`)}</section>
  <section id="background" class="background-section" aria-labelledby="background-title">${travel(`${sectionLabel('07', 'Background / Education')}<div class="background-grid"><div><h2 id="background-title">${text(site.background.title).replace('\n', '<br>')}</h2><p class="section-summary">${text(site.background.summary)}</p></div><div class="education"><p class="micro-label">Education / ${text(site.background.education.period)}</p><h3>${text(site.background.education.institution)}</h3><p>${text(site.background.education.qualification)}</p><p class="muted">Software development, data management, analytics, automation and project work.</p>${link(site.cv, 'button secondary')}</div></div>`)}</section>
  <section id="contact" class="contact-section" aria-labelledby="contact-title">${travel(`${sectionLabel('08', 'Contact')}<p class="eyebrow">Have a project in mind?</p><h2 id="contact-title">${text(site.contact.title).replace('\n', '<br>')}</h2><div class="contact-bottom"><div><p>${text(site.contact.description)}</p><a class="email-link" href="mailto:${escape(site.email)}">${text(site.email)} ${arrow}</a></div><div class="contact-links">${site.social.map(item => link(item)).join('')}${link(site.cv)}</div></div>`)}</section>
  </main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
}

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function renderStudy(project: Project) {
  return `${head(`${project.title} — ${site.name}`, project.summary, `/case-studies/${project.slug}.html`)}<body class="study-page">${header(true)}<main id="main" class="container study-main" tabindex="-1"><a class="text-link back-link" href="/portfolio.html#${project.slug}"><span aria-hidden="true">←</span> Back to selected work</a>
  <header class="study-hero">${sectionLabel(project.number, project.category)}<h1>${text(project.title)}</h1><p class="study-lead">${text(project.summary)}</p>${tags(project)}<div class="project-actions">${project.links.demo ? link(project.links.demo, 'button primary') : ''}${project.links.github ? link(project.links.github, 'button secondary') : ''}</div><dl class="study-facts"><div><dt>Status</dt><dd>${text(project.status)}</dd></div><div><dt>Role</dt><dd>${text(project.role ?? 'Role documentation forthcoming')}</dd></div><div><dt>Architecture</dt><dd>${text(project.architecture)}</dd></div></dl>${project.media ? `<figure class="project-media"><a href="${escape(project.media.src)}" aria-label="View full-size ${text(project.title)} screenshot"><img src="${escape(project.media.src)}" alt="${escape(project.media.alt)}" width="${project.media.width}" height="${project.media.height}" loading="lazy" decoding="async"></a><figcaption>${text(project.media.caption)} Select the image to view full size.</figcaption></figure>` : ''}</header>
  <div class="study-layout"><nav class="study-toc" aria-label="Case study sections"><p class="micro-label">In this study</p>${project.study.map(section => `<a href="#${slugify(section.title)}">${text(section.title)}</a>`).join('')}${project.placeholders.length ? '<a href="#forthcoming-evidence">Forthcoming evidence</a>' : ''}</nav><article class="study-body">${project.study.map(section => `<section id="${slugify(section.title)}"><h2>${text(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${text(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map(item => `<li>${text(item)}</li>`).join('')}</ul>` : ''}</section>`).join('')}
  ${project.verification.length ? `<section id="verification-record"><h2>Verification record</h2><ul>${project.verification.map(item => `<li>${text(item)}</li>`).join('')}</ul></section>` : ''}
  ${project.placeholders.length ? `<section id="forthcoming-evidence" class="evidence-placeholder"><p class="micro-label">Documentation status</p><h2>Forthcoming evidence</h2><ul>${project.placeholders.map(item => `<li>${text(item)}</li>`).join('')}</ul></section>` : ''}
  <section class="sources"><h2>Source material</h2><p>This presentation is grounded in the following project material.</p><ul>${project.sources.map(source => `<li>${text(source)}</li>`).join('')}</ul>${project.links.github ? link({ label: 'Browse project documentation', url: `${project.links.github.url}/tree/main/${project.slug === 'reorderops' ? 'docs' : 'root'}` }) : ''}</section></article></div><div class="study-next"><span class="micro-label">Explore the rest</span><a class="text-link" href="/portfolio.html#work">Return to selected projects ${arrow}</a></div></main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
}
