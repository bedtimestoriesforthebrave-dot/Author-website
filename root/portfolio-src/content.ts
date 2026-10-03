import { sharedSite, projectMetadata } from './content.shared';
import { english } from './content.en';
import { finnish } from './content.fi';
import { getUi } from './ui';
import type { Locale, Project } from './model';

export const locales = ['en', 'fi'] as const;

/** Localize portfolio routes only; assets, CVs and technical document URLs are shared. */
export function localizePath(path: string, locale: Locale): string {
  const base = path.replace(/^\/fi(?=\/)/, '');
  return locale === 'fi' ? `/fi${base}` : base;
}

export function getContent(locale: Locale = 'en') {
  const copy = locale === 'fi' ? finnish : english;
  const ui = getUi(locale);
  const site = {
    ...sharedSite, ...copy.site,
    social: sharedSite.social.map(item => ({ ...item })),
    navigation: sharedSite.navigationIds.map(id => ({ label: copy.site.navigationLabels[id], url: `#${id}` })),
    cv: { ...sharedSite.cv, label: copy.site.cvLabel },
    cvDownload: { ...sharedSite.cvDownload, label: copy.site.cvDownloadLabel },
    background: { ...copy.site.background, education: { ...copy.site.background.education, period: sharedSite.educationPeriod } },
    skills: sharedSite.skills.map(group => ({
      title: copy.site.skillLabels[group.id],
      items: group.items.map(item => item.startsWith('@') ? copy.site.skillTerms[item.slice(1) as keyof typeof copy.site.skillTerms] : item),
    })),
  };
  const projects: Project[] = projectMetadata.map(metadata => {
    const presentation = copy.projects[metadata.slug];
    if (presentation.study.length !== metadata.studyIds.length) throw new Error(`Incomplete ${locale} case study: ${metadata.slug}`);
    if (Boolean(metadata.media) !== Boolean(presentation.mediaText)) throw new Error(`Incomplete ${locale} media text: ${metadata.slug}`);
    return {
      ...metadata, ...presentation,
      sources: metadata.sources.map(source => source.startsWith('@') ? ui[source.slice(1) as keyof typeof ui] : source),
      links: {
        demo: metadata.links.demo ? { url: metadata.links.demo, label: presentation.linkLabels.demo } : null,
        github: metadata.links.github ? { url: metadata.links.github, label: presentation.linkLabels.github } : null,
        caseStudy: { url: localizePath(metadata.links.caseStudy, locale), label: presentation.linkLabels.caseStudy },
      },
      media: metadata.media && presentation.mediaText ? { ...metadata.media, ...presentation.mediaText } : null,
      mediaSlots: (metadata.mediaSlots ?? []).map(slot => {
        const slotCopy = presentation.mediaSlots?.[slot.id];
        if (!slotCopy) throw new Error(`Incomplete ${locale} media slot: ${metadata.slug}/${slot.id}`);
        if (slot.sectionId !== 'hero' && !metadata.studyIds.includes(slot.sectionId)) throw new Error(`Unknown media section: ${slot.sectionId}`);
        return { ...slot, ...slotCopy };
      }),
      study: presentation.study.map((section, index) => ({ ...section, id: metadata.studyIds[index] })),
    };
  });
  return { site, projects, evidencePath: copy.evidencePath, ui };
}
