import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Gamepad2, Smartphone, Sparkles, Play } from "lucide-react";
import GameCard from "@/components/GameCard";
import VideoThumb from "@/components/VideoThumb";
import Reveal from "@/components/Reveal";
import { robloxProjects, getProject } from "@/data/projects";

export const metadata: Metadata = {
  title: "Roblox Games — Hussnain Sajjad",
  description:
    "Roblox experiences built by Hussnain Sajjad in Roblox Studio and Luau, including Bloom Prison, his flagship roguelike in development.",
};

const flagship = getProject("bloom-prison")!;
// grid = all roblox except the flagship (shown on its own above)
const grid = robloxProjects.filter((p) => p.slug !== "bloom-prison");

export default function RobloxPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <Link className="back-link" href="/" data-cursor="HOME">
              <ArrowLeft size={15} /> Back to portfolio
            </Link>
            <div className="page-eyebrow hud-label"><Gamepad2 size={15} /> Roblox · Luau</div>
            <h1 className="page-title">Roblox Games</h1>
            <div className="page-sub">Live experiences &amp; a flagship in development</div>
            <p className="page-lead">
              Roblox experiences I&apos;ve built in Roblox Studio with Luau, covering gameplay systems,
              cutscenes, weapons, gacha, tycoon economies, and UI, tuned to run well on low-end devices
              on a server-authoritative model.
            </p>
            <div className="mini-stats">
              <div className="mini-stat"><div className="ms-num">155K+</div><div className="ms-label">Visits</div></div>
              <div className="mini-stat"><div className="ms-num">6</div><div className="ms-label">Experiences</div></div>
              <div className="mini-stat"><div className="ms-num">Luau</div><div className="ms-label">Server + Client</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Flagship */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">// Flagship</span>
            <h2 className="section-title">Bloom Prison</h2>
          </Reveal>
          <Reveal>
            <div className="flagship" style={{ ["--pc" as string]: flagship.accent }}>
              <div className="flagship-body">
                <span className="flag-badge"><Sparkles size={14} /> Flagship · In Development</span>
                <h3 className="flagship-title">Bloom Prison</h3>
                <div className="flagship-meta">Roguelike Action-Adventure · Sole Developer</div>
                <p className="flagship-desc">{flagship.roleBody}</p>
                <div className="g-tags" style={{ margin: "1.25rem 0 1.5rem" }}>
                  {flagship.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="g-links">
                  <Link className="link-btn primary" href="/projects/bloom-prison" data-cursor="VIEW">
                    Read case study <ArrowRight size={15} />
                  </Link>
                  <a className="link-btn" href={flagship.links[0]?.href} target="_blank" rel="noopener" data-cursor="PLAY">
                    <Play size={14} /> Play on Roblox
                  </a>
                </div>
              </div>
              <div className="flagship-art hud-frame">
                <VideoThumb src={flagship.previewVideo} poster={flagship.cover || flagship.poster} alt="Bloom Prison key art" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Live experiences grid */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">// Live Experiences</span>
            <h2 className="section-title">Shipped on Roblox</h2>
          </Reveal>
          <div className="game-grid">
            {grid.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <GameCard project={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="collection-banner" style={{ marginTop: "2rem" }}>
            <div className="cb-icon"><Smartphone size={22} /></div>
            <div className="cb-text">
              <div className="cb-title">Unity mobile &amp; WebGL games</div>
              <div className="cb-desc">Shipped titles with real screenshots and gameplay video.</div>
            </div>
            <Link className="link-btn" href="/unity" data-cursor="OPEN">
              View Unity games <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
