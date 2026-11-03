"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Pause, Play, X, Maximize2 } from "lucide-react";
import VideoThumb from "@/components/VideoThumb";
import { clips, clipLength, type Clip, type ClipKind } from "@/data/clips";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

type Filter = "all" | ClipKind;

const KIND_LABEL: Record<ClipKind, string> = { vfx: "VFX", animation: "Animation" };

/**
 * VFX + animation section: an auto-advancing slideshow on top, the full
 * filterable clip library below, and a full-screen viewer for any clip.
 */
const readClip = () => {
  const id = new URLSearchParams(window.location.search).get("clip");
  return clips.findIndex((c) => c.id === id);
};

export default function ClipShowcase() {
  const [viewer, setViewer] = useState<{ list: Clip[]; i: number } | null>(null);
  const pushed = useRef(false);

  // ?clip=<id> makes every clip shareable; back button closes the viewer
  useEffect(() => {
    const at = readClip();
    // one-shot: open the viewer a shared link points at (URL is client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (at >= 0) setViewer({ list: clips, i: at });
    const onPop = () => {
      const j = readClip();
      if (j < 0) { pushed.current = false; setViewer(null); return; }
      setViewer((v) => {
        const list = v?.list ?? clips;
        const k = list.findIndex((c) => c.id === clips[j].id);
        return k >= 0 ? { list, i: k } : { list: clips, i: j };
      });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const show = useCallback((list: Clip[], i: number) => {
    const url = `${window.location.pathname}?clip=${list[i].id}`;
    if (readClip() >= 0) {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
      pushed.current = true;
    }
    setViewer({ list, i });
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back(); // popstate clears the viewer
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setViewer(null);
    }
  }, []);

  if (!clips.length) return null;
  return (
    <>
      <Slideshow onExpand={(i) => show(clips, i)} />
      <Library onOpen={show} />
      {viewer && (
        <ClipViewer
          list={viewer.list}
          index={viewer.i}
          onIndex={(i) => show(viewer.list, i)}
          onClose={close}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Slideshow                                                           */
/* ------------------------------------------------------------------ */
function Slideshow({ onExpand }: { onExpand: (i: number) => void }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduce, setReduce] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  const c = clips[i];

  useEffect(() => {
    // one-shot: honour reduced-motion (client-only media query)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setReduce(true); setPlaying(false); }
  }, []);

  // only run the slideshow while it is on screen
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      inView.current = e.isIntersecting;
      const v = vid.current;
      if (!v) return;
      if (e.isIntersecting && playing) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [playing]);

  // new slide: restart video + progress
  useEffect(() => {
    const v = vid.current;
    if (bar.current) bar.current.style.transform = "scaleX(0)";
    if (v && playing && inView.current) v.play().catch(() => {});
  }, [i, playing]);

  const go = useCallback((d: number) => setI((x) => (x + d + clips.length) % clips.length), []);

  const toggle = () => {
    const v = vid.current;
    if (v) { if (playing) v.pause(); else v.play().catch(() => {}); }
    setPlaying(!playing);
  };

  return (
    <div className="slides">
      <div className="slides-stage hud-frame" ref={stage}>
        <video
          key={c.id}
          ref={vid}
          className="slides-video"
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          preload="metadata"
          controls={reduce}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (bar.current && v.duration) bar.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
          }}
          onEnded={() => { if (playing) go(1); }}
          aria-label={`${c.title}, ${c.set}`}
        />
        <span className="slides-scan" aria-hidden="true" />
        <span className="slides-badge hud-label">{c.kinds.map((k) => KIND_LABEL[k]).join(" + ")}</span>
        <button type="button" className="slides-expand" onClick={() => onExpand(i)} aria-label={`Open ${c.title} full screen`}>
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="slides-info">
        <div className="slides-count hud-label">
          {String(i + 1).padStart(2, "0")} <span>/ {String(clips.length).padStart(2, "0")}</span>
        </div>
        <div className="slides-set">{c.set}</div>
        <h3 className="slides-title">{c.title}</h3>
        <p className="slides-desc">{c.desc}</p>
        {c.note && <p className="slides-note">{c.note}</p>}
        <div className="slides-tools">
          {c.tools.map((t) => <span className="chip" key={t}>{t}</span>)}
        </div>
        <div className="slides-ctrl">
          <button type="button" className="slides-btn" onClick={() => go(-1)} aria-label="Previous clip"><ChevronLeft size={18} /></button>
          <button type="button" className="slides-btn" onClick={toggle} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" className="slides-btn" onClick={() => go(1)} aria-label="Next clip"><ChevronRight size={18} /></button>
          <span className="slides-progress" aria-hidden="true"><span ref={bar} /></span>
        </div>
      </div>

      <div className="slides-strip" role="tablist" aria-label="Choose a clip">
        {clips.map((x, n) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            className={`slides-thumb${n === i ? " on" : ""}`}
            onClick={() => setI(n)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={x.poster} alt="" loading="lazy" />
            <span>{x.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Library                                                             */
/* ------------------------------------------------------------------ */
function Library({ onOpen }: { onOpen: (list: Clip[], i: number) => void }) {
  const [f, setF] = useState<Filter>("all");
  const list = f === "all" ? clips : clips.filter((c) => c.kinds.includes(f));
  const tabs: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All clips", n: clips.length },
    { id: "vfx", label: "VFX", n: clips.filter((c) => c.kinds.includes("vfx")).length },
    { id: "animation", label: "Animation", n: clips.filter((c) => c.kinds.includes("animation")).length },
  ];

  return (
    <div className="clib">
      <div className="arch-bar">
        <h3 className="clib-head">The library</h3>
        <div role="tablist" aria-label="Filter clips" className="arch-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={f === t.id}
              className={`arch-tab mag${f === t.id ? " on" : ""}`}
              onClick={() => setF(t.id)}
            >
              {t.label} <span>{t.n}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="clib-wall">
        {list.map((c, n) => (
          <button
            key={c.id}
            type="button"
            className="ctile"
            style={{ ["--ratio" as string]: c.ratio.replace("/", " / ") }}
            onClick={() => onOpen(list, n)}
            aria-label={`Play ${c.title}`}
            data-cursor="PLAY"
          >
            <span className="ctile-media">
              <VideoThumb src={c.thumb} poster={c.poster} alt="" mode="view" />
            </span>
            <span className="ctile-len">{clipLength(c.duration)}</span>
            <span className="ctile-body">
              <span className="ctile-title">{c.title}</span>
              <span className="ctile-set">{c.set}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen viewer                                                   */
/* ------------------------------------------------------------------ */
function ClipViewer({
  list, index, onIndex, onClose,
}: {
  list: Clip[]; index: number; onIndex: (i: number) => void; onClose: () => void;
}) {
  const c = list[index];
  const closeBtn = useRef<HTMLButtonElement>(null);
  const go = useCallback((d: number) => onIndex((index + d + list.length) % list.length), [index, list.length, onIndex]);

  useEffect(() => {
    const last = document.activeElement as HTMLElement | null;
    lockScroll();
    closeBtn.current?.focus({ preventScroll: true });
    return () => { unlockScroll(); last?.focus?.({ preventScroll: true }); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return createPortal(
    <div className="cview" role="dialog" aria-modal="true" aria-label={c.title}>
      <div className="cview-backdrop" onClick={onClose} aria-hidden="true" />
      <button type="button" className="cview-nav prev" onClick={() => go(-1)} aria-label="Previous clip"><ChevronLeft size={22} /></button>
      <div className="cview-body">
        <div className="cview-stage" style={{ ["--ratio" as string]: c.ratio.replace("/", " / ") }}>
          <video key={c.id} src={c.src} poster={c.poster} autoPlay muted loop playsInline controls aria-label={c.title} />
        </div>
        <aside className="cview-info">
          <div className="cview-top">
            <span className="hud-label">{c.kinds.map((k) => KIND_LABEL[k]).join(" + ")} · {index + 1} of {list.length}</span>
            <button type="button" ref={closeBtn} className="cmodal-btn cmodal-close" onClick={onClose} aria-label="Close clip viewer"><X size={18} /></button>
          </div>
          <div className="slides-set">{c.set}</div>
          <h3 className="cview-title">{c.title}</h3>
          <p className="slides-desc">{c.desc}</p>
          {c.note && <p className="slides-note">{c.note}</p>}
          <dl className="cview-meta">
            <dt>Length</dt><dd>{clipLength(c.duration)}</dd>
            <dt>Tools</dt><dd>{c.tools.join(" · ")}</dd>
          </dl>
          <div className="cview-strip">
            {list.map((x, n) => (
              <button key={x.id} type="button" className={`cview-thumb${n === index ? " on" : ""}`} onClick={() => onIndex(n)} aria-label={x.title} aria-current={n === index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.poster} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </aside>
      </div>
      <button type="button" className="cview-nav next" onClick={() => go(1)} aria-label="Next clip"><ChevronRight size={22} /></button>
    </div>,
    document.body
  );
}
