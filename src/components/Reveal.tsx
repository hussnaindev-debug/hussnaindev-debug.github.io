"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal via IntersectionObserver (adds .is-in).
 * Honors prefers-reduced-motion (shows immediately). `as` lets it render
 * any element; `delay` staggers via CSS var.
 */
type Props = {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
};

export default function Reveal({ children, as, className = "", delay = 0, style }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as || "div") as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
