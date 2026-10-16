import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Smartphone, Gamepad2 } from "lucide-react";
import GameCard from "@/components/GameCard";
import Reveal from "@/components/Reveal";
import { unityProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Unity Games — Hussnain Sajjad",
  description:
    "Unity mobile and WebGL games built by Hussnain Sajjad, with gameplay video, screenshots, and case studies.",
};

export default function UnityPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <Link className="back-link" href="/" data-cursor="HOME">
              <ArrowLeft size={15} /> Back to portfolio
            </Link>
            <div className="page-eyebrow hud-label"><Smartphone size={15} /> Unity · C#</div>
            <h1 className="page-title">Unity Games</h1>
            <div className="page-sub">Mobile &amp; WebGL · Lead Developer</div>
            <p className="page-lead">
              Mobile and WebGL games I&apos;ve built with Unity, from casual mobile titles to browser
              games. I own the full game loop: core gameplay and physics, meta systems like shops,
              skins, and progression, and live monetization, shipped to real players on Google Play
              and the web.
            </p>
            <div className="mini-stats">
              <div className="mini-stat"><div className="ms-num">4</div><div className="ms-label">Unity titles</div></div>
              <div className="mini-stat"><div className="ms-num">55K+</div><div className="ms-label">Installs</div></div>
              <div className="mini-stat"><div className="ms-num">C#</div><div className="ms-label">Mobile + WebGL</div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="section-index">{"// Unity Portfolio"}</span>
            <h2 className="section-title">Games</h2>
          </Reveal>
          <div className="game-grid">
            {unityProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <GameCard project={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="collection-banner" style={{ marginTop: "2rem" }}>
            <div className="cb-icon"><Gamepad2 size={22} /></div>
            <div className="cb-text">
              <div className="cb-title">Looking for the Roblox work?</div>
              <div className="cb-desc">Live Roblox experiences and Bloom Prison, my flagship in development.</div>
            </div>
            <Link className="link-btn" href="/roblox" data-cursor="OPEN">
              View Roblox games <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
