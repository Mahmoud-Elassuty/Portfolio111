// Two shared IntersectionObservers drive every reveal.
// "enter" fires once an element is 12% inside the viewport (from the bottom),
// "exit" fires once it leaves a viewport shrunk by 6%. The gap between the two
// thresholds is a hysteresis band, so elements hovering at an edge never flicker.
let enterIO = null;
let exitIO = null;
let count = 0;

function create() {
  enterIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-in')),
    { rootMargin: '0px 0px -12% 0px', threshold: 0 }
  );
  exitIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => !e.isIntersecting && e.target.classList.remove('is-in')),
    { rootMargin: '-6% 0px -6% 0px', threshold: 0 }
  );
}

export const revealSupported = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

export function observeReveal(el) {
  if (!el) return () => {};
  if (!revealSupported()) { el.classList.add('is-in'); return () => {}; }
  if (!enterIO) create();
  enterIO.observe(el);
  exitIO.observe(el);
  count += 1;
  return () => {
    enterIO?.unobserve(el);
    exitIO?.unobserve(el);
    count -= 1;
    if (count <= 0) { enterIO?.disconnect(); exitIO?.disconnect(); enterIO = exitIO = null; count = 0; }
  };
}
