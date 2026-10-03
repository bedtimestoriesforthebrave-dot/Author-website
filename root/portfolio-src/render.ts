import { getContent, localizePath, locales } from './content';
import type { Locale, Link, Project, StudyVisual } from './model';
import { documentationIndex, documentationRoot, documents } from './documentation';

export function createRenderer(locale: Locale = 'en') {
  const { site, projects, evidencePath, ui } = getContent(locale);
  const path = (value: string) => localizePath(value, locale);
  const absolute = (value: string, language: Locale = locale) => `https://vlnikolai.com${localizePath(value, language).replace(/\.html$/, '')}`;
  const socialImage = `/assets/portfolio/social-preview${locale === 'fi' ? '-fi' : ''}.png`;

  const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
  const text = escape;
  const arrow = '<span aria-hidden="true">↗</span>';
  const link = (item: Link, className = 'text-link') => `<a class="${className}" href="${escape(item.url)}"${item.download ? ` download="${escape(item.download)}"` : ''}${item.url.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text(item.label)} ${arrow}${item.url.startsWith('https:') ? `<span class="sr-only"> (${text(ui.newTab)})</span>` : ''}</a>`;
  const tags = (project: Project, detailed = false) => `<ul class="tags" aria-label="${text(project.title)} ${text(ui.technologies)}">${[...project.technologies, ...(detailed ? project.additionalTechnologies ?? [] : [])].map(item => `<li>${text(item)}</li>`).join('')}</ul>`;
  const links = (project: Project) => `<div class="project-actions">${project.links.demo ? link(project.links.demo, 'button primary') : ''}${link(project.links.caseStudy, 'button secondary')}${project.links.github ? link(project.links.github) : ''}</div>`;
  const sectionLabel = (number: string, label: string) => `<p class="section-label"><span>${number}</span> ${text(label)}</p>`;
  const travel = (inner: string) => `<div class="travel-panel">${inner}</div>`;

  function head(title: string, description: string, path: string, bilingual = true) {
    const canonical = absolute(path);
    return `<!doctype html>
  <html lang="${locale}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${text(title)}</title><meta name="description" content="${escape(description)}">
  ${bilingual ? `${locales.map(language => `<link rel="alternate" hreflang="${language}" href="${absolute(path, language)}">`).join('')}<link rel="alternate" hreflang="x-default" href="${absolute(path, 'en')}">` : ''}
  <meta property="og:locale" content="${locale === 'fi' ? 'fi_FI' : 'en_US'}">
  ${bilingual ? `<meta property="og:locale:alternate" content="${locale === 'fi' ? 'en_US' : 'fi_FI'}">` : ''}
  <meta name="theme-color" content="#111310"><link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="${text(site.name)}">
  <meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${canonical}"><meta property="og:image" content="https://vlnikolai.com${socialImage}">
  <meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${text(ui.socialAlt)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="https://vlnikolai.com${socialImage}">
  <link rel="icon" type="image/svg+xml" href="/assets/portfolio/favicon.svg">
  <link rel="stylesheet" href="/css/portfolio.css">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.role, url: absolute('/portfolio.html'), sameAs: site.social.map(item => item.url) }).replace(/</g, '\\u003c')}</script>
  </head>`;
  }

  function header(isStudy = false, pagePath = '/portfolio.html') {
    return `<a class="skip-link" href="#main">${text(ui.skip)}</a>
  <header class="site-header"><div class="header-inner">
  <a class="wordmark" href="${path('/portfolio.html')}" aria-label="${text(site.name)}, ${text(ui.home)}"><span class="monogram" aria-hidden="true">VL<span>_</span></span><span class="wordmark-name">${text(site.name)}</span></a>
  <nav aria-label="${text(ui.mainNavigation)}">${site.navigation.map(item => `<a href="${isStudy ? path('/portfolio.html') : ''}${item.url}" data-nav="${item.url.slice(1)}">${text(item.label)}</a>`).join('')}</nav>
  <div class="header-actions"><div class="language-switch" role="group" aria-label="${text(ui.languageNavigation)}">${locales.map(language => `<a href="${localizePath(pagePath, language)}" lang="${language}" hreflang="${language}" data-locale-switch="${language}" aria-label="${language === 'en' ? 'English' : 'Suomi'}"${language === locale ? ' aria-current="page"' : ''}>${language.toUpperCase()}</a>`).join('<span aria-hidden="true">/</span>')}</div>${link(site.cv, 'cv-link')}<button class="motion-toggle" type="button" aria-pressed="false" data-motion-on="${text(ui.motionOn)}" data-motion-off="${text(ui.motionOff)}" data-motion-enable="${text(ui.motionEnable)}" data-motion-disable="${text(ui.motionDisable)}" hidden>${text(ui.motion)} <span data-motion-label>${text(ui.motionOn)}</span></button></div>
  </div></header>`;
  }

  function footer() {
    return `<footer class="site-footer container"><p>© 2026 ${text(site.name)}</p><p>${text(ui.footer)}</p><a href="#main">${text(ui.backTop)} <span aria-hidden="true">↑</span></a></footer>`;
  }

  function diagram() {
    return `<figure class="system-visual"><div class="visual-topline"><span class="status-dot"></span> ReorderOps <span>${text(ui.architecture)} / 01</span></div>
    <div class="system-diagram"><div class="diagram-source"><span class="diagram-icon" aria-hidden="true">[ ]</span><strong>${text(ui.operationalData)}</strong><span>${text(ui.dataInputs)}</span></div><div class="diagram-connector" aria-hidden="true"></div><div class="diagram-core"><span class="micro-label">${text(ui.authoritativeCalculation)}</span><strong>${text(ui.planningEngine).replace('\n', '<br>')}</strong><span>${text(ui.savedEvidence)}</span></div><div class="diagram-branches"><div><span class="micro-label">${text(ui.interpret)}</span><strong>${text(ui.readOnlyAI)}</strong><span>${text(ui.explainEvidence)}</span></div><div><span class="micro-label">${text(ui.review)}</span><strong>${text(ui.humanApproval)}</strong><span>${text(ui.revalidate)}</span></div></div><div class="diagram-result"><span aria-hidden="true">↳</span> ${text(ui.internalDraft)} <span class="result-divider">/</span> ${text(ui.audit)}</div></div>
    <figcaption>${text(ui.architectureCaption)}</figcaption></figure>`;
  }

  function gameVisual() {
    return `<figure class="game-visual"><div class="visual-topline">Unreal Engine 5 / C++ <span>${text(ui.project)} / 02</span></div><div class="game-wireframe" aria-hidden="true"><svg viewBox="0 0 640 400" fill="none"><g stroke="currentColor"><path d="M50 360 270 210 370 210 590 360M50 40 270 140 370 140 590 40M50 40V360M590 40V360M270 140V210M370 140V210M0 320H640M0 270H640M0 370H640M180 0 292 140M460 0 348 140M0 130 270 160M640 130 370 160M0 230 270 190M640 230 370 190M200 400 295 210M440 400 345 210"/><path d="M296 210V160H344V210" stroke-width="2"/><path d="M296 160 304 167V205L296 210M304 167H337V205H304" opacity=".6"/></g><circle cx="320" cy="186" r="2" fill="currentColor"/></svg><span class="game-visual-title">A CHAIN<br><i>OF PAIN</i></span></div><figcaption>${text(ui.gameCaption)}</figcaption></figure>`;
  }

  function featured(project: Project) {
    return `<section id="${project.slug}" class="project-section ${project.prominence}" aria-labelledby="${project.slug}-title">${travel(`
    ${sectionLabel(project.number, project.prominence === 'flagship' ? ui.flagship : ui.featured)}
    <div class="featured-grid"><div class="project-copy"><p class="eyebrow">${text(project.category)}</p><h2 id="${project.slug}-title">${text(project.title)}</h2><p class="project-statement">${text(project.description)}</p><p class="project-summary">${text(project.summary)}</p>${tags(project)}${links(project)}</div>${project.slug === 'reorderops' ? diagram() : gameVisual()}</div>
    <div class="project-bottom"><p class="project-status"><span class="status-dot ${project.slug === 'reorderops' ? '' : 'neutral'}"></span>${text(project.status)}</p><ul class="highlights">${project.highlights.map(item => `<li>${text(item)}</li>`).join('')}</ul></div>
    ${project.slug === 'reorderops' ? `<div class="evidence-path"><p class="micro-label">${text(ui.decisionPath)}</p><ol>${evidencePath.map(item => `<li>${text(item)}</li>`).join('')}</ol></div>` : ''}
    `)}</section>`;
  }

  function renderPortfolio() {
    const featuredProjects = projects.filter(project => project.prominence !== 'selected');
    const selected = projects.filter(project => project.prominence === 'selected');
    return `${head(site.title, site.description, '/portfolio.html')}<body class="portfolio-page">
    <div class="spatial-background" aria-hidden="true"><svg viewBox="0 0 800 1200" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor"><path d="M130 -100C760 50 20 250 610 430S100 740 640 930 200 1170 570 1350"/><path d="M200 -100C830 50 90 250 680 430S170 740 710 930 270 1170 640 1350"/><path d="M270 -100C900 50 160 250 750 430S240 740 780 930 340 1170 710 1350"/></g></svg></div>
    ${header()}<main id="main" tabindex="-1" class="container">
    <section class="hero" aria-labelledby="hero-title"><div class="hero-top"><p class="eyebrow">${text(site.name)} <span>/</span> ${text(site.role)}</p><p class="hero-location"><span class="status-dot"></span> ${text(site.location)}</p></div>
    <h1 id="hero-title"><span class="sr-only">${text(site.name)} — ${text(site.role)}. </span>${site.hero.lines.map((line, i) => `<span class="hero-line ${i === 1 ? 'accent' : ''}">${text(line)}</span>`).join('')}</h1>
    <div class="hero-bottom"><p>${text(site.hero.summary)}</p><div class="hero-actions"><a class="button primary" href="#work">${text(ui.exploreProjects)} <span aria-hidden="true">↓</span></a>${site.social.map(item => link(item)).join('')}<a class="text-link" href="#contact">${text(ui.contact)} ${arrow}</a></div></div>
    <div class="hero-foot"><span>${text(site.hero.label)}</span><span>${text(ui.scrollExplore)} <span aria-hidden="true">↓</span></span></div></section>
    <div id="work" class="work-region"><div class="work-intro"><p class="eyebrow">${text(ui.selectedProjects)} / 01—04</p><p>${text(site.selection)}</p></div>
    ${featuredProjects.map(featured).join('')}
    <section id="selected-work" class="selected-section" aria-labelledby="selected-title">${travel(`${sectionLabel('03—04', ui.selectedWork)}<div class="section-heading"><h2 id="selected-title">${text(ui.moreWays)}</h2><p>${text(ui.mobileWeb)}</p></div><div class="selected-grid">${selected.map(project => `<article id="${project.slug}" class="selected-card"><div class="selected-top"><span class="micro-label">${project.number} / ${text(project.category)}</span><span class="selected-symbol" aria-hidden="true">${project.slug === 'storycodex' ? 'Aa' : '&lt;/&gt;'}</span></div><h3>${text(project.title)}</h3><p class="selected-statement">${text(project.description)}</p><p>${text(project.summary)}</p>${tags(project)}${links(project)}</article>`).join('')}</div>`)}</section></div>
    <section id="approach" class="approach-section" aria-labelledby="approach-title">${travel(`${sectionLabel('05', ui.workflow)}<div class="approach-grid"><div><h2 id="approach-title">${text(site.workflow.title).replace('\n', '<br>')}</h2><p class="section-summary">${text(site.workflow.summary)}</p><a class="text-link" href="${path('/case-studies/reorderops.html')}#verification-and-honest-limits">${text(ui.reorderEvidence)} ${arrow}</a></div><ol class="workflow">${site.workflow.steps.map((step, i) => `<li><span class="step-number">0${i + 1}</span><div><h3>${text(step.title)}</h3><p>${text(step.description)}</p></div></li>`).join('')}</ol></div>`)}</section>
    <section id="skills" class="skills-section" aria-labelledby="skills-title">${travel(`${sectionLabel('06', ui.skills)}<div class="section-heading"><h2 id="skills-title">${text(ui.toolsBehind)}</h2><p>${text(ui.toolsGrouping)}</p></div><div class="skills-grid">${site.skills.map(group => `<div><h3>${text(group.title)}</h3><ul>${group.items.map(item => `<li>${text(item)}</li>`).join('')}</ul></div>`).join('')}</div><div class="earlier-work"><h3>${text(ui.earlierWork)}</h3><p>${text(site.earlier)}</p></div>`)}</section>
    <section id="background" class="background-section" aria-labelledby="background-title">${travel(`${sectionLabel('07', ui.background)}<div class="background-grid"><div><h2 id="background-title">${text(site.background.title).replace('\n', '<br>')}</h2><p class="section-summary">${text(site.background.summary)}</p></div><div class="education"><p class="micro-label">${text(ui.education)} / ${text(site.background.education.period)}</p><h3>${text(site.background.education.institution)}</h3><p>${text(site.background.education.qualification)}</p><p class="muted">${text(ui.educationDetails)}</p><div class="project-actions">${link(site.cv, 'button secondary')}${link(site.cvDownload)}</div></div></div>`)}</section>
    <section id="contact" class="contact-section" aria-labelledby="contact-title">${travel(`${sectionLabel('08', ui.contactSection)}<h2 id="contact-title">${text(site.contact.title).replace('\n', '<br>')}</h2><div class="contact-bottom"><div><p>${text(site.contact.description)}</p><a class="email-link" href="mailto:${escape(site.email)}">${text(site.email)} ${arrow}</a></div><div class="contact-links">${site.social.map(item => link(item)).join('')}${link(site.cv)}</div></div>`)}</section>
    </main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
  }

  function studyVisual(visual: StudyVisual) {
    const list = visual.kind === 'integration' ? 'ul' : 'ol';
    return `<figure class="study-visual study-visual-${visual.kind}"><p class="micro-label">${text(visual.label)}</p><${list} role="list">${visual.items.map((item, index) => `<li>${visual.kind === 'priority' ? `<span class="state-priority" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>` : ''}<strong>${text(item.title)}</strong><span>${text(item.description)}</span>${item.note ? `<small>${text(item.note)}</small>` : ''}</li>`).join('')}</${list}><figcaption>${text(visual.caption)}</figcaption></figure>`;
  }

  function mediaSlots(project: Project, sectionId: string) {
    return project.mediaSlots.filter(slot => slot.available && slot.sectionId === sectionId).map(slot => {
      const media = slot.kind === 'image'
        ? `<a href="${escape(slot.assetPath)}" aria-label="${text(ui.fullScreenshot.replace('{project}', project.title))}"><img src="${escape(slot.assetPath)}" alt="${text(slot.alt)}" width="${slot.width}" height="${slot.height}" loading="lazy" decoding="async"></a>`
        : `<video controls preload="none" aria-label="${text(slot.alt)}" width="${slot.width}" height="${slot.height}"${slot.poster ? ` poster="${escape(slot.poster)}"` : ''}><source src="${escape(slot.assetPath)}" type="video/mp4">${Object.entries(slot.captions ?? {}).map(([language, url]) => `<track kind="captions" src="${escape(url)}" srclang="${language}" label="${language === 'fi' ? 'Suomi' : 'English'}"${language === locale ? ' default' : ''}>`).join('')}<a href="${escape(slot.assetPath)}">${text(ui.videoFallback)}</a></video>`;
      return `<figure class="project-media study-slot" data-media-slot="${slot.id}">${media}<figcaption>${text(slot.caption)}</figcaption></figure>`;
    }).join('');
  }

  function renderStudy(project: Project) {
    return `${head(`${project.title} — ${site.name}`, project.summary, `/case-studies/${project.slug}.html`)}<body class="study-page">${header(true, `/case-studies/${project.slug}.html`)}<main id="main" class="container study-main" tabindex="-1"><a class="text-link back-link" href="${path('/portfolio.html')}#${project.slug}"><span aria-hidden="true">←</span> ${text(ui.backWork)}</a>
    <header class="study-hero">${sectionLabel(project.number, project.category)}<h1>${text(project.title)}</h1><p class="study-lead">${text(project.summary)}</p>${tags(project, true)}<div class="project-actions">${project.links.demo ? link(project.links.demo, 'button primary') : ''}${project.links.github ? link(project.links.github, 'button secondary') : ''}${project.links.documentation ? link(project.links.documentation, 'button secondary') : ''}</div><dl class="study-facts${project.role ? '' : ' study-facts-compact'}"><div><dt>${text(ui.status)}</dt><dd>${text(project.status)}</dd></div>${project.role ? `<div><dt>${text(ui.role)}</dt><dd>${text(project.role)}</dd></div>` : ''}<div><dt>${text(ui.architecture)}</dt><dd>${text(project.architecture)}</dd></div></dl>${project.media ? `<figure class="project-media"><a href="${escape(project.media.src)}" aria-label="${text(ui.fullScreenshot.replace('{project}', project.title))}"><img src="${escape(project.media.src)}" alt="${escape(project.media.alt)}" width="${project.media.width}" height="${project.media.height}" loading="lazy" decoding="async"></a><figcaption>${text(project.media.caption)} ${text(ui.imageHint)}</figcaption></figure>` : ''}${mediaSlots(project, 'hero')}</header>
    <div class="study-layout"><nav class="study-toc" aria-label="${text(ui.caseNavigation)}"><p class="micro-label">${text(ui.inStudy)}</p>${project.study.map(section => `<a href="#${section.id}">${text(section.title)}</a>`).join('')}${project.links.documentation ? `<a href="#technical-documentation">${text(ui.documentation)}</a>` : ''}</nav><article class="study-body">${project.study.map(section => `<section id="${section.id}"><h2>${text(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${text(paragraph)}</p>`).join('')}${section.bullets ? `<ul>${section.bullets.map(item => `<li>${text(item)}</li>`).join('')}</ul>` : ''}${section.visual ? studyVisual(section.visual) : ''}${mediaSlots(project, section.id)}${section.note ? `<p class="study-note">${text(section.note)}</p>` : ''}</section>`).join('')}
    ${project.verification.length ? `<section id="verification-record"><h2>${text(ui.verification)}</h2><ul>${project.verification.map(item => `<li>${text(item)}</li>`).join('')}</ul></section>` : ''}
    ${project.links.documentation ? `<section id="technical-documentation"><h2>${text(ui.documentation)}</h2><p>${text(ui.documentationSummary)}</p>${link(project.links.documentation)}</section>` : ''}
    <section class="sources"><h2>${text(ui.sources)}</h2><p>${text(ui.sourcesIntro)}</p><ul>${project.sources.map(source => `<li>${text(source)}</li>`).join('')}</ul>${project.slug === 'reorderops' || project.links.github ? `<p class="documentation-language">${text(ui.documentationEnglish)}</p>` : ''}${project.links.github ? link({ label: ui.browseDocs, url: `${project.links.github.url}/tree/main/${project.slug === 'reorderops' ? 'docs' : 'root'}` }) : ''}</section></article></div><div class="study-next"><span class="micro-label">${text(ui.exploreRest)}</span><a class="text-link" href="${path('/portfolio.html')}#work">${text(ui.returnProjects)} ${arrow}</a></div></main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
  }

  function renderDocumentation(title: string, description: string, pagePath = documentationIndex, article?: { html: string; headings: { id: string; title: string }[]; note: string }) {
    const navigation = `<nav class="doc-navigation" aria-label="Documentation navigation"><a class="text-link" href="/case-studies/reorderops.html">Back to ReorderOps case study ${arrow}</a><a class="text-link" href="${documentationIndex}">Documentation index ${arrow}</a><a class="text-link" href="https://reorder-ops.vercel.app/">Live demo ${arrow}</a></nav>`;
    const content = article
      ? `<p class="study-note">${text(article.note)}</p><div class="study-layout"><nav class="study-toc" aria-label="Document sections"><p class="micro-label">In this document</p>${article.headings.map(item => `<a href="#${item.id}">${text(item.title)}</a>`).join('')}</nav><article class="study-body doc-prose" aria-label="${text(title)}">${article.html}</article></div>`
      : `<ul class="doc-index" aria-label="Technical documents">${documents.map(doc => `<li><p class="micro-label">${text(doc.category)}</p><h2><a href="${documentationRoot}/${doc.slug}.html">${text(doc.title)}</a></h2><p>${text(doc.description)}</p><a class="text-link" href="${documentationRoot}/${doc.slug}.html">Read ${text(doc.title)} ${arrow}</a></li>`).join('')}</ul>`;
    const documentHeader = header(true, '/case-studies/reorderops.html').replace(/ data-locale-switch="(?:en|fi)"/g, '');
    return `${head(`${title} — ReorderOps — ${site.name}`, description, pagePath, false)}<body class="study-page">${documentHeader}<main id="main" tabindex="-1" class="container study-main documentation-page">${navigation}<header class="study-hero"><p class="section-label"><span>01</span> ReorderOps / Documentation · English</p><h1>${text(title)}</h1><p class="study-lead">${text(description)}</p><p class="documentation-language">Technical documentation is published in English. The EN / FI switch returns to the matching ReorderOps case study.</p></header>${content}${navigation}</main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
  }

  function render404() {
    return `${head(`${ui.notFoundTitle} — ${site.name}`, ui.notFoundDescription, '/404.html').replace('<meta name="theme-color"', '<meta name="robots" content="noindex"><meta name="theme-color"')}<body class="study-page">${header(true, '/404.html')}<main id="main" tabindex="-1" class="container not-found"><p class="section-label"><span>404</span> ${text(ui.notFoundTitle)}</p><h1>${text(ui.notFoundHeading)}</h1><p>${text(ui.notFoundText)}</p><a class="button primary" href="${path('/portfolio.html')}">${text(ui.returnPortfolio)} <span aria-hidden="true">↗</span></a><a class="text-link" href="${path('/portfolio.html')}#contact">${text(ui.contact)} ${arrow}</a></main>${footer()}<script type="module" src="/assets/portfolio/main.js"></script></body></html>`;
  }

  function renderSocialPreview() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#111310"/>
    <g fill="none" stroke="#343a2e"><path d="M64 100h1072M64 542h1072"/><path d="M920-50c400 130-380 230-30 390s-180 190 60 340M980-50c400 130-380 230-30 390s-180 190 60 340" opacity=".65"/></g>
    <g font-family="Arial,Helvetica,sans-serif"><text x="64" y="68" fill="#f0f1e9" font-size="21">${text(site.name.toUpperCase())}</text><text x="1136" y="68" fill="#a6ae9e" font-size="16" text-anchor="end">${text(site.role.toUpperCase())}</text>
    ${site.hero.lines.map((line, index) => `<text x="60" y="${220 + index * 104}" fill="${index === 1 ? '#d6f68a' : '#f0f1e9'}" font-size="92" letter-spacing="-5">${text(line)}</text>`).join('')}
    <text x="64" y="505" fill="#a6ae9e" font-size="20">${projects.map(project => text(project.title)).join(' / ')}</text><text x="64" y="584" fill="#a6ae9e" font-size="16">${text(ui.selectedProjects.toUpperCase())}</text><text x="1136" y="584" fill="#d6f68a" font-size="16" text-anchor="end">VL_</text></g></svg>`;
  }

  return { renderPortfolio, renderStudy, render404, renderSocialPreview, renderDocumentation };
}
