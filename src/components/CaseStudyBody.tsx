"use client";

import {
  ArrowLeft, ArrowRight, ArrowUpRight, Play, ExternalLink, Sparkles, Video, Store,
} from "lucide-react";
import Gallery from "@/components/Gallery";
import { Icon } from "@/components/iconMap";
import { projects, type Project } from "@/data/projects";

/**
 * Full case study for one game. Rendered inside the CaseModal popup on the
 * homepage. Section ids are prefixed "cs-" so they never collide with the
 * homepage's own section ids.
 */
export default function CaseStudyBody({
  p,
  onNavigate,
  scrollTo,
}: {
  p: Project;
  onNavigate: (slug: string) => void;
  scrollTo: (id: string) => void;
}) {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const more = projects.filter((x) => x.slug !== p.slug && x.platform === p.platform).slice(0, 3);
  const hasMedia = !p.poster.includes("poster-fallback");
  const playLink = p.links[0];
  const StoreIcon = playLink?.kind === "store" ? Store : Play;

  return (
    <div
      className="cs cs-in-modal"
      data-game={p.slug}
      style={{
        ["--pa" as string]: p.accent,
        ["--pa-soft" as string]: `color-mix(in srgb, ${p.accent} 14%, transparent)`,
        ["--pa-border" as string]: `color-mix(in srgb, ${p.accent} 40%, transparent)`,
      }}
    >
      {/* HERO */}
      <section className="cs-hero" id="cs-top">
        <div className="container">
          <div className="cs-hero-grid">
            <div>
              <div className="cs-hero-kicker hud-label">{"// "}{p.kind} · {p.platform === "unity" ? "Unity · C#" : "Roblox · Luau"}</div>
              {p.status === "in-development" && (
                <span className="cs-devbadge"><Sparkles size={13} /> In Development</span>
              )}
              <h2 className="cs-title" id="cmodal-title">{p.name}</h2>
              <p className="cs-lead">{p.tagline}</p>
              <div className="cs-role-pill"><Icon name="Gamepad2" size={16} /> {p.role}</div>
              <div className="cs-actions">
                {playLink ? (
                  <a className="btn btn-primary" href={playLink.href} target="_blank" rel="noopener" data-cursor="PLAY">
                    <StoreIcon size={18} /> {playLink.label} <ExternalLink size={15} />
                  </a>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={() => scrollTo("cs-gameplay")} data-cursor="PLAY">
                    <Play size={18} /> Watch gameplay
                  </button>
                )}
                <button type="button" className="btn btn-ghost" onClick={() => scrollTo("cs-built")}>See the systems</button>
              </div>
            </div>
            <div className="cs-hero-visual hud-frame">
              {hasMedia ? (
                p.previewVideo ? (
                  <video className="cs-hero-video" src={p.previewVideo} poster={p.cover || p.poster} muted loop autoPlay playsInline aria-label={`${p.name} gameplay loop`} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover || p.poster} alt={`${p.name} key art`} />
                )
              ) : (
                <div className="cs-devbuild">
                  <span className="db-badge"><Sparkles size={14} /> {p.status === "live" ? "Live on Roblox" : "Early Development"}</span>
                  <div className="db-mark"><Icon name={p.build[0]?.icon || "Gamepad2"} size={52} /></div>
                  <p>Media capture is on the way. {playLink ? "Play the live experience in the meantime." : ""}</p>
                </div>
              )}
            </div>
          </div>
          <div className="cs-metrics">
            {p.metrics.map((m) => (
              <div className="cs-metric" key={m.label}>
                <div className="cm-num">{m.num}</div>
                <div className="cm-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW + INFO */}
      <section className="cs-section" id="cs-overview">
        <div className="container">
          <div className="cs-body-grid">
            <div className="cs-prose">
              <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">The game</h3></div>
              {p.overview.map((para, i) => <p key={i} style={i === 0 ? { marginTop: "1rem" } : undefined}>{para}</p>)}
            </div>
            <aside className="cs-info">
              <dl>
                {p.info.map((row) => (
                  <div className="cs-info-row" key={row.k}>
                    <dt>{row.k}</dt><dd>{row.v}</dd>
                  </div>
                ))}
              </dl>
              {playLink && (
                <div className="cs-info-cta">
                  <a className="btn btn-primary" href={playLink.href} target="_blank" rel="noopener" data-cursor="PLAY">
                    <StoreIcon size={18} /> {playLink.label}
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* MY ROLE */}
      <section className="cs-section alt" id="cs-role">
        <div className="container">
          <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">My role</h3></div>
          <div className="cs-role-card">
            <div className="role-title">{p.role}</div>
            <p>{p.roleBody}</p>
          </div>
        </div>
      </section>

      {/* WHAT I BUILT */}
      <section className="cs-section" id="cs-built">
        <div className="container">
          <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">What I built</h3></div>
          <div className="build-grid">
            {p.build.map((b) => (
              <div className="build-card hud-frame" key={b.title}>
                <div className="build-ico"><Icon name={b.icon} /></div>
                <h4>{b.title}</h4>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVES */}
      {p.deepDives.map((d, di) => (
        <section className={`cs-section ${di % 2 === 0 ? "alt" : ""}`} id={di === 0 ? "cs-systems" : undefined} key={d.heading}>
          <div className="container">
            <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">{d.heading}</h3></div>
            <div className="deepdive">
              {d.paras.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </section>
      ))}

      {/* GALLERY */}
      {p.gallery.length > 0 && (
        <section className="cs-section alt" id="cs-gallery">
          <div className="container">
            <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">Inside the game</h3></div>
            <p className="cs-lede">Screenshots from the game. Click any image to enlarge.</p>
            <Gallery shots={p.gallery} />
          </div>
        </section>
      )}

      {/* GAMEPLAY VIDEO */}
      <section className="cs-section" id="cs-gameplay">
        <div className="container">
          <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">Gameplay</h3></div>
          {p.heroVideo ? (
            <div className="cs-video hud-frame">
              <video controls preload="none" poster={p.cover || p.poster}>
                <source src={p.heroVideo} type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="cs-video hud-frame">
              <div className="cs-video-ph">
                <div className="vp-ring"><Video size={24} /></div>
                <span>Gameplay footage coming soon.</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BUILT WITH */}
      <section className="cs-section alt" id="cs-tech">
        <div className="container">
          <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">Built with</h3></div>
          <div className="builtwith">
            {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
          </div>
        </div>
      </section>

      {/* PAGER */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cs-pager">
            <button type="button" className="pg pg-prev" onClick={() => onNavigate(prev.slug)} data-cursor="PREV">
              <ArrowLeft size={18} /><span><span className="pg-label">Previous</span>{prev.name}</span>
            </button>
            <button type="button" className="pg pg-next" onClick={() => onNavigate(next.slug)} data-cursor="NEXT">
              <span><span className="pg-label">Next</span>{next.name}</span><ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* MORE */}
      {more.length > 0 && (
        <section className="cs-section alt">
          <div className="container">
            <div className="cs-h2-mark"><span className="bar" /><h3 className="cs-h2">More {p.platform === "unity" ? "Unity" : "Roblox"} games</h3></div>
            <div className="more-cards">
              {more.map((m) => {
                const mHasMedia = !m.poster.includes("poster-fallback");
                return (
                  <button type="button" className="more-card" key={m.slug} onClick={() => onNavigate(m.slug)} data-cursor="VIEW">
                    <div className="mc-thumb">
                      {mHasMedia ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.cover || m.poster} alt="" loading="lazy" />
                      ) : (
                        <div className="mc-thumb-ph"><Icon name="Gamepad2" size={28} /></div>
                      )}
                    </div>
                    <div className="mc-body">
                      <div className="mc-title">{m.name}</div>
                      <div className="mc-plat">{m.platform === "unity" ? "Unity" : "Roblox"} · {m.status === "live" ? "Live" : "In Development"}</div>
                      <p className="mc-desc">{m.cardDesc}</p>
                      <span className="mc-link">Open case study <ArrowUpRight size={15} /></span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
