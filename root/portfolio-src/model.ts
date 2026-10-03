export type Locale = 'en' | 'fi';
export type ProjectSlug = 'reorderops' | 'a-chain-of-pain' | 'storycodex' | 'author-website';
export interface Link { label: string; url: string; download?: string }
export interface StudyVisual {
  kind: 'layers' | 'priority' | 'integration'; label: string; caption: string;
  items: { title: string; description: string; note?: string }[];
}
export interface StudyCopy { title: string; paragraphs: string[]; bullets?: string[]; visual?: StudyVisual; note?: string }
export interface StudySection extends StudyCopy { id: string }
export interface MediaSlotMetadata {
  id: string; sectionId: string | 'hero'; kind: 'image' | 'video';
  assetPath: string; available: boolean; width: number; height: number;
  poster?: string; captions?: Partial<Record<Locale, string>>;
}
export interface MediaSlotCopy { title: string; description: string; alt: string; caption: string }
export interface MediaSlot extends MediaSlotMetadata, MediaSlotCopy {}
export interface ProjectMetadata {
  slug: ProjectSlug; title: string; number: string;
  prominence: 'flagship' | 'featured' | 'selected'; technologies: string[];
  additionalTechnologies?: string[];
  links: { demo: string | null; github: string | null; caseStudy: string; documentation?: string };
  media: { src: string; width: number; height: number } | null;
  sources: string[]; studyIds: string[];
  mediaSlots?: MediaSlotMetadata[];
}
export interface ProjectCopy {
  category: string; description: string; summary: string; role: string | null; status: string;
  highlights: string[]; architecture: string; challenges: string[]; verification: string[];
  study: StudyCopy[];
  linkLabels: { demo: string; github: string; caseStudy: string };
  mediaText: { alt: string; caption: string } | null;
  mediaSlots?: Record<string, MediaSlotCopy>;
}
export interface Project extends Omit<ProjectMetadata, 'links' | 'media' | 'studyIds' | 'mediaSlots'>, Omit<ProjectCopy, 'linkLabels' | 'mediaText' | 'study' | 'mediaSlots'> {
  links: { demo: Link | null; github: Link | null; caseStudy: Link; documentation: Link | null };
  media: (NonNullable<ProjectMetadata['media']> & NonNullable<ProjectCopy['mediaText']>) | null;
  study: StudySection[];
  mediaSlots: MediaSlot[];
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
