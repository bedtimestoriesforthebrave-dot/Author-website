export type Locale = 'en' | 'fi';
export type ProjectSlug = 'reorderops' | 'a-chain-of-pain' | 'storycodex' | 'author-website';
export interface Link { label: string; url: string; download?: string }
export interface StudyCopy { title: string; paragraphs: string[]; bullets?: string[] }
export interface StudySection extends StudyCopy { id: string }
export interface ProjectMetadata {
  slug: ProjectSlug; title: string; number: string;
  prominence: 'flagship' | 'featured' | 'selected'; technologies: string[];
  links: { demo: string | null; github: string | null; caseStudy: string };
  media: { src: string; width: number; height: number } | null;
  sources: string[]; studyIds: string[];
}
export interface ProjectCopy {
  category: string; description: string; summary: string; role: string | null; status: string;
  highlights: string[]; architecture: string; challenges: string[]; verification: string[];
  placeholders: string[]; study: StudyCopy[];
  linkLabels: { demo: string; github: string; caseStudy: string };
  mediaText: { alt: string; caption: string } | null;
}
export interface Project extends Omit<ProjectMetadata, 'links' | 'media' | 'studyIds'>, Omit<ProjectCopy, 'linkLabels' | 'mediaText' | 'study'> {
  links: { demo: Link | null; github: Link | null; caseStudy: Link };
  media: (NonNullable<ProjectMetadata['media']> & NonNullable<ProjectCopy['mediaText']>) | null;
  study: StudySection[];
}
export interface SiteCopy {
  role: string; location: string; title: string; description: string;
  hero: { label: string; lines: string[]; summary: string };
  navigationLabels: Record<'work' | 'approach' | 'background' | 'contact', string>;
  cvLabel: string; cvDownloadLabel: string; selection: string;
  workflow: { title: string; summary: string; steps: { title: string; description: string }[] };
  skillLabels: Record<'core' | 'development' | 'ai' | 'infrastructure', string>;
  skillTerms: Record<'llmApis' | 'codingAgents' | 'aiEvaluation' | 'promptContext' | 'aiDebugReview' | 'restApis', string>;
  earlier: string;
  background: { title: string; summary: string; education: { institution: string; qualification: string; note: string } };
  contact: { title: string; description: string };
}
export interface LocaleCopy {
  site: SiteCopy; evidencePath: string[]; projects: Record<ProjectSlug, ProjectCopy>;
}
