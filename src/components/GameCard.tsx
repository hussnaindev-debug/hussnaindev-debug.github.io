"use client";

import Link from "next/link";
import { ArrowUpRight, Play, Gamepad2 } from "lucide-react";
import VideoThumb from "@/components/VideoThumb";
import type { Project } from "@/data/projects";

/**
 * Collection-page game card: video-preview thumbnail + info + case-study / play links.
 * Per-project accent via --pc. Platform badge + status badge on the thumb.
 */
export default function GameCard({ project: p }: { project: Project }) {
  const hasMedia = !p.poster.includes("poster-fallback");
  const playLink = p.links.find((l) => l.kind === "play" || l.kind === "store" || l.kind === "itch");

  return (
    <article className="game-card" style={{ ["--pc" as string]: p.accent }}>
      <div className="game-thumb hud-frame">
        <span className="game-badge">
          <Gamepad2 size={13} /> {p.platform === "unity" ? "Unity" : "Roblox"}
        </span>
        {p.status === "in-development" && <span className="game-devbadge">In Dev</span>}
        {hasMedia ? (
          <VideoThumb src={p.previewVideo} poster={p.poster} alt={`${p.name} preview`} />
        ) : (
          <div className="game-thumb-ph">
            <Gamepad2 size={30} />
            <span>Media coming soon</span>
          </div>
        )}
      </div>
      <div className="game-info">
        <h3 className="g-title">{p.name}</h3>
        <div className="g-studio">{p.kind}</div>
        <p className="g-desc">{p.cardDesc}</p>
        <div className="g-tags">
          {p.tags.slice(0, 4).map((t) => (
            <span className="chip" key={t}>{t}</span>
          ))}
        </div>
        <div className="g-links">
          <Link className="link-btn primary" href={`/projects/${p.slug}`} data-cursor="VIEW">
            Case study <ArrowUpRight size={15} />
          </Link>
          {playLink && (
            <a className="link-btn" href={playLink.href} target="_blank" rel="noopener" data-cursor="PLAY">
              <Play size={14} /> {playLink.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
