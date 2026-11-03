/**
 * Page scroll lock shared by every overlay (nav menu, gallery lightbox,
 * case-study popup, clip viewer). Counted, so nested overlays stay locked
 * until the last one closes. Stops Lenis too: overflow:hidden alone does not
 * stop Lenis from scrolling the page underneath.
 */
type Smooth = { stop(): void; start(): void } | null;

let lenis: Smooth = null;
let count = 0;

export function registerLenis(instance: Smooth) {
  lenis = instance;
  if (instance && count > 0) instance.stop();
}

export function lockScroll() {
  count += 1;
  if (count === 1) {
    document.documentElement.classList.add("scroll-locked");
    lenis?.stop();
  }
}

export function unlockScroll() {
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.documentElement.classList.remove("scroll-locked");
    lenis?.start();
  }
}
