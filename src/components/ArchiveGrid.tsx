"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Gamepad2, Sparkles } from "lucide-react";
import VideoThumb from "@/components/VideoThumb";
import CaseModal from "@/components/CaseModal";
import { Icon } from "@/components/iconMap";
import { projects, getProject, type Project } from "@/data/projects";

type Filter = "all" | "roblox" | "unity";

// Display order: strongest footage first.
const ORDER = [
  "bloom-prison", "steal-a-viral-squishy", "fall-for-brainrot", "four-reaction",
  "circular-pong", "mouse-maze", "rise-and-roll",
];
const ordered = [
  ...ORDER.map((s) => projects.find((p) => p.slug === s)).filter((p): p is Project => !!p),
  ...projects.filter((p) => !ORDER.includes(p.slug)),
];

/**
 * Tile sizes for a 12-column grid. First tile is the big feature (8 cols x 2 rows),
 * second sits beside it (4 x 2); the rest fill full rows as pairs (6+6) and
 * triples (4+4+4), alternating so the grid never ends on a gap.
 */
function layout(n: number): { c: number; r: number }[] {
  const out: { c: number; r: number }[] = [];
  if (n > 0) out.push({ c: n === 1 ? 12 : 8, r: 2 });
  if (n > 1) out.push({ c: 4, r: 2 });
  let rest = n - 2;
  let pair = true;
  while (rest > 0) {
    let take = rest <= 3 ? rest : rest === 4 ? 2 : pair ? 2 : 3;
    if (rest - take === 1) take = take === 2 ? 3 : 2;
    const cols = 12 / take;
    for (let i = 0; i < take; i++) out.push({ c: cols, r: 1 });
    rest -= take;
    pair = !pair;
  }
  return out;
}

const readGame = () => {
  const s = new URLSearchParams(window.location.search).get("game");
  return s && getProject(s) ? s : null;
};

export default function ArchiveGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const pushed = useRef(false);

  // deep link (?game=slug) + browser back/forward
  useEffect(() => {
    const fromUrl = readGame();
    // one-shot: open the popup a shared link points at (URL is client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl) setOpen(fromUrl);
    const onPop = () => {
      const s = readGame();
      if (!s) pushed.current = false;
      setOpen(s);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const openGame = useCallback((slug: string) => {
    const url = `${window.location.pathname}?game=${slug}`;
    if (readGame()) {
      window.history.replaceState(null, "", url);
    } else {
      window.history.pushState(null, "", url);
      pushed.current = true;
    }
    setOpen(slug);
  }, []);

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back(); // popstate clears `open`
    } else {
      window.history.replaceState(null, "", window.location.pathname);
      setOpen(null);
    }
  }, []);

  const list = filter === "all" ? ordered : ordered.filter((p) => p.platform === filter);
  const sizes = layout(list.length);
  const tabs: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: ordered.length },
    { id: "roblox", label: "Roblox", n: ordered.filter((p) => p.platform === "roblox").length },
    { id: "unity", label: "Unity", n: ordered.filter((p) => p.platform === "unity").length },
  ];

  return (
    <>
      <div className="arch-bar">
        <div role="tablist" aria-label="Filter games" className="arch-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={filter === t.id}
              className={`arch-tab${filter === t.id ? " on" : ""}`}
              onClick={() => setFilter(t.id)}
            >
              {t.label} <span>{t.n}</span>
            </button>
          ))}
        </div>
        <span className="arch-hint hud-label">Click a game to open its case study</span>
      </div>

      <div className="bento" key={filter}>
        {list.map((p, i) => (
          <Tile key={p.slug} p={p} c={sizes[i].c} r={sizes[i].r} big={i === 0} onOpen={openGame} />
        ))}
      </div>

      {open && <CaseModal slug={open} onClose={close} onNavigate={openGame} />}
    </>
  );
}

function Tile({ p, c, r, big, onOpen }: { p: Project; c: number; r: number; big: boolean; onOpen: (s: string) => void }) {
  const hasMedia = !p.poster.includes("poster-fallback");
  const plat = p.platform === "unity" ? "Unity" : "Roblox";
  return (
    <button
      type="button"
      className={`btile${big ? " big" : ""} plat-${p.platform}`}
      style={{ ["--c" as string]: c, ["--r" as string]: r, ["--pc" as string]: p.accent }}
      onClick={() => onOpen(p.slug)}
      aria-label={`Open ${p.name} case study`}
      data-cursor="OPEN"
    >
      <span className="btile-media">
        {hasMedia ? (
          <VideoThumb src={p.previewVideo} poster={p.cover || p.poster} alt="" mode="view" />
        ) : (
          <span className="btile-ph">
            <Icon name={p.build[0]?.icon || "Gamepad2"} size={big ? 44 : 30} />
            <span>Preview coming soon</span>
          </span>
        )}
      </span>
      <span className="btile-scrim" aria-hidden="true" />
      <span className="btile-top">
        <span className="btile-plat"><Gamepad2 size={12} /> {plat}</span>
        {p.status === "in-development" ? (
          <span className="btile-dev"><Sparkles size={11} /> In Dev</span>
        ) : (
          <span className="btile-live">Live</span>
        )}
      </span>
      <span className="btile-body">
        <span className="btile-kind">{p.kind}</span>
        <span className="btile-title">{p.name}</span>
        {(big || c >= 6) && <span className="btile-desc">{p.cardDesc}</span>}
        <span className="btile-cta">Case study <ArrowUpRight size={14} /></span>
      </span>
    </button>
  );
}
