"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// three.js + react-three-fiber (~260 KB gzipped) load only when this decides to show.
const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { ssr: false });

/**
 * Gate for the hero particle field. Desktop only (>= 768px), off for
 * reduced-motion, loaded once the browser is idle so it never competes with
 * the first paint, and paused whenever the hero is scrolled out of view.
 */
export default function ParticleField({ color = "#7C5CFF" }: { color?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const ok =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.innerWidth >= 768;
    if (!ok) return;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setEnabled(true), { timeout: 2500 })
      : window.setTimeout(() => setEnabled(true), 1200);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!enabled || !el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div className="particle-field" ref={box} aria-hidden>
      {enabled && <ParticleCanvas color={color} active={active} />}
    </div>
  );
}
