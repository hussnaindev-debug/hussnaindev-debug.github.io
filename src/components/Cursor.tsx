"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a precise dot + a lagging ring.
 * On hover of interactive elements the ring grows; elements with
 * data-cursor="LABEL" show that label inside the ring (e.g. "PLAY", "VIEW").
 * Desktop pointer only; hidden on touch / reduced-motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const interactiveSel = 'a, button, [role="button"], [data-cursor], input, textarea';
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(interactiveSel) as HTMLElement | null;
      if (el) {
        ring.current?.classList.add("is-active");
        setLabel(el.getAttribute("data-cursor") || "");
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest(interactiveSel);
      if (el) {
        ring.current?.classList.remove("is-active");
        setLabel("");
      }
    };
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = "1";
      if (ring.current) ring.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className={`cursor-ring${label ? " has-label" : ""}`} aria-hidden>
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
