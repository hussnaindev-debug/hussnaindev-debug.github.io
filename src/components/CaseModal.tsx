"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Link2 } from "lucide-react";
import CaseStudyBody from "@/components/CaseStudyBody";
import { projects, getProject } from "@/data/projects";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

/**
 * Case-study popup. A page-sized window over the homepage: the visitor never
 * leaves the page or opens a tab. Esc, the backdrop, the close button and the
 * browser back button all close it. Focus stays inside while it is open.
 */
export default function CaseModal({
  slug,
  onClose,
  onNavigate,
}: {
  slug: string;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const p = getProject(slug);
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const copied = useRef<HTMLSpanElement>(null);

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  // lock the page + remember what had focus
  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    lockScroll();
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      unlockScroll();
      lastFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  // new project -> back to the top of the popup
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // keyboard: Esc closes (unless the gallery lightbox is open), arrows page, Tab is trapped
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector(".lightbox.is-open")) return;
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "VIDEO" || tag === "INPUT") return;
      if (e.key === "ArrowLeft" && e.altKey) onNavigate(prev.slug);
      if (e.key === "ArrowRight" && e.altKey) onNavigate(next.slug);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, prev.slug, next.slug]);

  const scrollTo = useCallback((id: string) => {
    const box = scroller.current;
    const el = box?.querySelector<HTMLElement>(`#${id}`);
    if (box && el) box.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
  }, []);

  const copyLink = () => {
    const url = `${window.location.origin}/?game=${slug}`;
    navigator.clipboard?.writeText(url).then(() => {
      if (copied.current) {
        copied.current.textContent = "Copied";
        window.setTimeout(() => { if (copied.current) copied.current.textContent = "Copy link"; }, 1600);
      }
    }).catch(() => {});
  };

  if (!p) return null;

  const jumps = [
    { id: "cs-overview", label: "Overview" },
    { id: "cs-built", label: "What I built" },
    ...(p.deepDives.length ? [{ id: "cs-systems", label: "Systems" }] : []),
    ...(p.gallery.length ? [{ id: "cs-gallery", label: "Gallery" }] : []),
    { id: "cs-gameplay", label: "Gameplay" },
    { id: "cs-tech", label: "Tech" },
  ];

  return createPortal(
    <div className="cmodal" role="dialog" aria-modal="true" aria-labelledby="cmodal-title">
      <div className="cmodal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="cmodal-panel" ref={panel}>
        <div className="cmodal-bar">
          <div className="cmodal-crumb">
            <span className="hud-label">{p.platform === "unity" ? "Unity" : "Roblox"}</span>
            <span className="cmodal-count">{String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <nav className="cmodal-jumps" aria-label="Case study sections">
            {jumps.map((j) => (
              <button type="button" key={j.id} onClick={() => scrollTo(j.id)}>{j.label}</button>
            ))}
          </nav>
          <div className="cmodal-actions">
            <button type="button" className="cmodal-btn cmodal-copy" onClick={copyLink} aria-label="Copy link to this case study">
              <Link2 size={16} /> <span ref={copied}>Copy link</span>
            </button>
            <button type="button" className="cmodal-btn" onClick={() => onNavigate(prev.slug)} aria-label={`Previous: ${prev.name}`}>
              <ChevronLeft size={18} />
            </button>
            <button type="button" className="cmodal-btn" onClick={() => onNavigate(next.slug)} aria-label={`Next: ${next.name}`}>
              <ChevronRight size={18} />
            </button>
            <button type="button" className="cmodal-btn cmodal-close" ref={closeBtn} onClick={onClose} aria-label="Close case study">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="cmodal-scroll" ref={scroller} data-lenis-prevent>
          <CaseStudyBody key={p.slug} p={p} onNavigate={onNavigate} scrollTo={scrollTo} />
        </div>
      </div>
    </div>,
    document.body
  );
}
