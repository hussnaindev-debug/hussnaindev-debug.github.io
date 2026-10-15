"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryShot } from "@/data/projects";

/**
 * Asymmetric gallery grid + lightbox (keyboard arrows, Esc, prev/next,
 * backdrop click). First shot is the large lead.
 */
export default function Gallery({ shots }: { shots: GalleryShot[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [open, close, go]);

  return (
    <>
      <div className="cs-gallery">
        {shots.map((s, i) => (
          <figure
            key={s.src}
            className={i === 0 ? "g-lead" : ""}
            onClick={() => setOpen(i)}
            data-cursor="VIEW"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.caption} loading="lazy" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      {open !== null && (
        <div className="lightbox is-open" role="dialog" aria-modal="true" onClick={close}>
          <button className="lb-btn lb-close" aria-label="Close" onClick={close}><X size={22} /></button>
          <button className="lb-btn lb-prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft size={22} /></button>
          <button className="lb-btn lb-next" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight size={22} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shots[open].src} alt={shots[open].caption} onClick={(e) => e.stopPropagation()} />
          <div className="lb-cap">{shots[open].caption}</div>
        </div>
      )}
    </>
  );
}
