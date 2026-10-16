"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven motion pass (GSAP + ScrollTrigger). Wires effects by selector
 * so pages stay server components:
 *   - top HUD scroll-progress bar (scaleX driven by document scroll)
 *   - section headings sweep up as they enter
 *   - .fx-parallax visuals drift on scroll
 *   - .fx-stagger children cascade in
 * Everything is skipped under prefers-reduced-motion and torn down on route
 * change so each page re-scans its own DOM.
 */
export default function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // --- top progress bar ---
      const bar = document.getElementById("scroll-progress");
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        });
      }

      // Visibility stays owned by the CSS Reveal system (which has an
      // above-the-fold safety net). GSAP here only drives transform-based
      // motion with a VISIBLE end state, so a mis-fire can never leave
      // content hidden.

      // --- parallax drift on framed visuals (scrubbed, never hides) ---
      gsap.utils.toArray<HTMLElement>(".fx-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { y: -22 },
          {
            y: 22,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // --- section headings: subtle rise that ALWAYS settles at y:0 ---
      gsap.utils.toArray<HTMLElement>(".section-title, .cs-h2").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return <div id="scroll-progress" aria-hidden="true" />;
}
