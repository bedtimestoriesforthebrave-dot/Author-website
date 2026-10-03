import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Native document scrolling, with an extended neutral interval for reading. */
export function enableSpatialTravel(): () => void {
  const panels = [...document.querySelectorAll<HTMLElement>('.travel-panel')];
  const context = gsap.context(() => {
    for (const panel of panels) {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: panel.parentElement,
          start: 'top bottom', end: 'bottom top', scrub: true,
          invalidateOnRefresh: true,
          onToggle: trigger => { panel.style.willChange = trigger.isActive ? 'transform, opacity' : ''; },
        },
      });
      timeline
        .fromTo(panel,
          { x: -55, y: -28, z: -160, rotationX: 4, rotationY: -7, scale: .98, opacity: .88 },
          { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, scale: 1, opacity: 1, duration: .2, immediateRender: false })
        // Keep every transform neutral across the central 60% of the range.
        .to(panel, { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, scale: 1, opacity: 1, duration: .6 })
        .to(panel, { x: 55, y: 28, z: -160, rotationX: -4, rotationY: 7, scale: .98, opacity: .88, duration: .2 });
    }
    gsap.fromTo('.spatial-background svg', { y: -45, rotation: -2 }, {
      y: 45, rotation: 2, ease: 'none',
      scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  });
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
  document.documentElement.dataset.motion = 'on';
  return () => {
    context.revert();
    for (const panel of panels) panel.style.willChange = '';
    delete document.documentElement.dataset.motion;
  };
}
