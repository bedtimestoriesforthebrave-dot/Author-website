import { Marked, Renderer } from 'marked';

export const documentationRoot = '/docs/reorderops';
export const documentationIndex = `${documentationRoot}/`;
export const documents = [
  { slug: 'reviewer-guide', title: 'Reviewer Guide', category: 'Review workflow', description: 'Follow inventory evidence, deterministic recommendations and human-controlled purchasing. Distinguishes the public visitor experience from local-only controls.', note: 'Public edition of the reviewer guide. The private deployment diary and milestone-maintenance instructions are omitted; local-only steps remain explicitly identified.' },
  { slug: 'architecture', title: 'Architecture & AI Assistant', category: 'System design', description: 'The V5 architecture: detached evidence, read-only tools, backend-owned cards and explicit human actions. Includes fallback, freshness and limitations.', note: 'Historical V5 architecture record. Later hosted controls are documented separately in Public Demo Controls. Local environment-loading instructions are omitted.' },
  { slug: 'planning-rules', title: 'Planning Rules', category: 'Deterministic decisions', description: 'Demand windows, exact thresholds, receipt timing, supplier constraints and status precedence. Includes formulas, fixed scenarios and saved-run replay.', note: 'Planning-v1.4 rules and recorded V4 state. Public planning-run creation stays blocked; CLI examples describe local development capabilities.' },
  { slug: 'ai-evaluation', title: 'AI Evaluation', category: 'Evaluation evidence', description: 'The expanded multilingual and adversarial protocol, preserved failures, targeted fixes and later full reruns. Structural gates and semantic review remain separate.', note: 'Historical V5 evaluation record. Private artifact locations and environment-loading commands are omitted. Later hosted language and financial-reconciliation limitations remain qualified in Public Demo Controls.' },
  { slug: 'public-demo', title: 'Public Demo Controls', category: 'Isolation & safety', description: 'Anonymous visitor isolation, bounded actions and persistent AI admission. Documents read-only AI, conservative cost reservations and remaining limits.', note: 'Public architecture edition of the recorded V6 controls. Private deployment checkpoints, activation instructions and session identifiers are omitted. Reported checks are historical evidence, not new tests run for this portfolio release.' },
] as const;

const sourceLinks: Record<string, string> = {
  'reviewer-guide.md': 'reviewer-guide', 'v5-assistant.md': 'architecture',
  'planning-rules.md': 'planning-rules', 'v5-live-evaluation-expanded.md': 'ai-evaluation',
  'public-demo-controls.md': 'public-demo',
};
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));

/** Trusted, reviewed Markdown only; reject executable HTML, media and unsafe URL schemes. */
export function renderMarkdown(source: string) {
  const headings: { id: string; title: string }[] = [];
  const usedIds = new Set<string>();
  const renderer = new Renderer();
  renderer.html = ({ text }) => escape(text);
  renderer.image = ({ text }) => escape(text);
  renderer.heading = function ({ tokens, depth }) {
    if (depth === 1) return ''; // The shared page shell owns its single h1.
    const title = tokens.map(token => 'text' in token ? token.text : '').join('');
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
    let id = base;
    for (let suffix = 2; usedIds.has(id); suffix++) id = `${base}-${suffix}`;
    usedIds.add(id);
    if (depth === 2) headings.push({ id, title });
    return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
  };
  renderer.link = function ({ href, tokens }) {
    const label = this.parser.parseInline(tokens);
    if (/^https:\/\//.test(href)) return `<a href="${escape(href)}" rel="noopener noreferrer">${label}</a>`;
    if (href.startsWith('#')) return `<a href="${escape(href)}">${label}</a>`;
    const [file, anchor] = href.split('#');
    const slug = sourceLinks[file];
    // Unpublished source references remain readable text; never point to a private repo.
    return slug ? `<a href="${documentationRoot}/${slug}.html${anchor ? `#${escape(anchor)}` : ''}">${label}</a>` : label;
  };
  renderer.table = function (token) {
    return `<div class="doc-table" role="region" aria-label="Documentation table" tabindex="0">${Renderer.prototype.table.call(this, token)}</div>`;
  };
  const markdown = new Marked({ renderer, gfm: true, async: false });
  return { html: markdown.parse(source) as string, headings };
}
