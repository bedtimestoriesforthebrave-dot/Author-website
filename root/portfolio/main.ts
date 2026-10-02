const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const sections = [...navLinks].map(link => document.getElementById(link.dataset.nav!)).filter((section): section is HTMLElement => Boolean(section));
if ('IntersectionObserver' in window) {
  const visible = new Set<HTMLElement>();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
      else visible.delete(entry.target as HTMLElement);
    }
    const current = sections.find(section => visible.has(section));
    for (const link of navLinks) {
      if (current?.id === link.dataset.nav) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  for (const section of sections) observer.observe(section);
}
