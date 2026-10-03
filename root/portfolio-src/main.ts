const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const sections = [...navLinks].map(link => document.getElementById(link.dataset.nav!)).filter((section): section is HTMLElement => Boolean(section));
if ('IntersectionObserver' in window) {
  const visible = new Set<HTMLElement>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
      else visible.delete(entry.target as HTMLElement);
    }
    const current = sections.find(section => visible.has(section))
      ?? [...sections].reverse().find(section => section.getBoundingClientRect().top < innerHeight * .4);
    for (const link of navLinks) {
      if (current?.id === link.dataset.nav) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  for (const section of sections) observer.observe(section);
}

// The animation dependency is fetched only for capable desktop contexts.
const desktop = window.matchMedia('(min-width: 1100px) and (min-height: 650px) and (hover: hover) and (pointer: fine)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
const constrained = Boolean(device.connection?.saveData || (device.deviceMemory && device.deviceMemory <= 2) || (device.hardwareConcurrency && device.hardwareConcurrency <= 2));
const motionButton = document.querySelector<HTMLButtonElement>('.motion-toggle');
let optedOut = false;
try { optedOut = localStorage.getItem('portfolio-motion') === 'off'; } catch { /* Storage is optional. */ }
let cleanup: (() => void) | undefined;
let generation = 0;

async function syncMotion() {
  const currentGeneration = ++generation;
  cleanup?.();
  cleanup = undefined;
  const eligible = desktop.matches && !reduced.matches && !constrained && document.querySelector('.travel-panel');
  document.documentElement.dataset.motion = 'off';
  if (motionButton) {
    motionButton.hidden = !eligible;
    motionButton.setAttribute('aria-pressed', String(optedOut));
    motionButton.setAttribute('aria-label', (optedOut ? motionButton.dataset.motionEnable : motionButton.dataset.motionDisable)!);
    const label = motionButton.querySelector('[data-motion-label]');
    if (label) label.textContent = (optedOut ? motionButton.dataset.motionOff : motionButton.dataset.motionOn)!;
  }
  if (!eligible || optedOut) return;
  try {
    const { enableSpatialTravel } = await import('./spatial');
    if (currentGeneration !== generation) return;
    cleanup = enableSpatialTravel();
  } catch {
    // Failed enhancement must leave a readable, fully functional static page.
    document.documentElement.dataset.motion = 'off';
    if (motionButton) motionButton.hidden = true;
  }
}

motionButton?.addEventListener('click', () => {
  optedOut = !optedOut;
  try { localStorage.setItem('portfolio-motion', optedOut ? 'off' : 'on'); } catch { /* Continue without persistence. */ }
  void syncMotion();
});
desktop.addEventListener('change', () => void syncMotion());
reduced.addEventListener('change', () => void syncMotion());
void syncMotion();

/** Keep the counterpart project page and a useful, locale-independent anchor. */
function currentAnchor(): string {
  const readingLine = innerHeight * .3;
  const candidates = [...document.querySelectorAll<HTMLElement>('main section[id], main article[id]')]
    .map(element => ({ element, rect: element.getBoundingClientRect() }));
  const atReadingLine = candidates.filter(({ rect }) => rect.top <= readingLine && rect.bottom > readingLine)
    .sort((a, b) => a.rect.height - b.rect.height)[0];
  if (atReadingLine) return `#${atReadingLine.element.id}`;
  const nextVisible = candidates.find(({ rect }) => rect.top >= 0 && rect.top < innerHeight * .7);
  if (nextVisible) return `#${nextVisible.element.id}`;
  if (location.hash) {
    try {
      const element = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) return location.hash;
      }
    } catch { /* A malformed fragment must not block a native language link. */ }
  }
  return '';
}
for (const languageLink of document.querySelectorAll<HTMLAnchorElement>('[data-locale-switch]')) {
  const counterpart = languageLink.getAttribute('href')!;
  const preservePosition = () => { languageLink.href = counterpart + currentAnchor(); };
  languageLink.addEventListener('pointerenter', preservePosition);
  languageLink.addEventListener('focus', preservePosition);
  languageLink.addEventListener('click', preservePosition);
}
