import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Play, ExternalLink, Sparkles, Video, Store,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import CaseSubnav from "@/components/CaseSubnav";
import { Icon } from "@/components/iconMap";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Case Study | Hussnain Sajjad`,
    description: p.tagline,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const more = projects.filter((x) => x.slug !== slug && x.platform === p.platform).slice(0, 3);
  const backHref = p.platform === "unity" ? "/unity" : "/roblox";
  const backLabel = p.platform === "unity" ? "Unity Games" : "Roblox Games";
  const hasMedia = !p.poster.includes("poster-fallback");
  const playLink = p.links[0];
  const StoreIcon = playLink?.kind === "store" ? Store : Play;

  const subnav = [
    { id: "overview", label: "Overview" },
    { id: "role", label: "My Role" },
    { id: "built", label: "What I Built" },
    ...(p.deepDives.length ? [{ id: "systems", label: "Systems" }] : []),
    ...(p.gallery.length ? [{ id: "gallery", label: "Gallery" }] : []),
    { id: "gameplay", label: "Gameplay" },
    { id: "tech", label: "Built With" },
  ];

  return (
    <main
      id="main"
      className="cs"
      style={{
        ["--pa" as string]: p.accent,
        ["--pa-soft" as string]: `color-mix(in srgb, ${p.accent} 14%, transparent)`,
        ["--pa-border" as string]: `color-mix(in srgb, ${p.accent} 40%, transparent)`,
      }}
    >
      <CaseSubnav items={subnav} />

      {/* HERO */}
      <section className="cs-hero">
        <div className="container">
          <Link className="back-link" href={backHref} data-cursor="BACK">
            <ArrowLeft size={15} /> Selected Work / {backLabel}
          </Link>
          <div className="cs-hero-grid">
            <div>
              <div className="cs-hero-kicker hud-label">// {p.kind} · {p.platform === "unity" ? "Unity · C#" : "Roblox · Luau"}</div>
              {p.status === "in-development" && (
                <span className="cs-devbadge"><Sparkles size={13} /> In Development</span>
              )}
              <h1 className="cs-title">{p.name}</h1>
              <p className="cs-lead">{p.tagline}</p>
              <div className="cs-role-pill"><Icon name="Gamepad2" size={16} /> {p.role}</div>
              <div className="cs-actions">
                {playLink ? (
                  <a className="btn btn-primary" href={playLink.href} target="_blank" rel="noopener" data-cursor="PLAY">
                    <StoreIcon size={18} /> {playLink.label} <ExternalLink size={15} />
                  </a>
                ) : (
                  <a className="btn btn-primary" href="#gameplay" data-cursor="PLAY">
                    <Play size={18} /> Watch gameplay
                  </a>
                )}
                <a className="btn btn-ghost" href="#built">See the systems</a>
              </div>
            </div>
            <div className="cs-hero-visual hud-frame">
              {hasMedia ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover || p.poster} alt={`${p.name} key art`} />
              ) : (
                <div className="cs-devbuild">
                  <span className="db-badge"><Sparkles size={14} /> {p.status === "live" ? "Live on Roblox" : "Early Development"}</span>
                  <div className="db-mark"><Icon name={p.build[0]?.icon || "Gamepad2"} size={52} /></div>
                  <p>Media capture is on the way. {playLink ? "Play the live experience on Roblox in the meantime." : ""}</p>
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
      <section className="cs-section" id="overview">
        <div className="container">
          <div className="cs-body-grid">
            <Reveal className="cs-prose">
              <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">The game</h2></div>
              {p.overview.map((para, i) => <p key={i} style={i === 0 ? { marginTop: "1rem" } : undefined}>{para}</p>)}
            </Reveal>
            <Reveal as="aside" className="cs-info">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* MY ROLE */}
      <section className="cs-section alt" id="role">
        <div className="container">
          <Reveal>
            <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">My role</h2></div>
            <div className="cs-role-card">
              <div className="role-title">{p.role}</div>
              <p>{p.roleBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT I BUILT */}
      <section className="cs-section" id="built">
        <div className="container">
          <Reveal>
            <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">What I built</h2></div>
          </Reveal>
          <div className="build-grid">
            {p.build.map((b, i) => (
              <Reveal key={b.title} delay={i * 50}>
                <div className="build-card hud-frame">
                  <div className="build-ico"><Icon name={b.icon} /></div>
                  <h4>{b.title}</h4>
                  <p>{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEEP DIVES */}
      {p.deepDives.map((d, di) => (
        <section className={`cs-section ${di % 2 === 0 ? "alt" : ""}`} id={di === 0 ? "systems" : undefined} key={d.heading}>
          <div className="container">
            <Reveal>
              <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">{d.heading}</h2></div>
              <div className="deepdive">
                {d.paras.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* GALLERY */}
      {p.gallery.length > 0 && (
        <section className="cs-section alt" id="gallery">
          <div className="container">
            <Reveal>
              <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">Inside the game</h2></div>
              <p className="cs-lede">Screenshots from the game. Click any image to enlarge.</p>
            </Reveal>
            <Gallery shots={p.gallery} />
          </div>
        </section>
      )}

      {/* GAMEPLAY VIDEO */}
      <section className="cs-section" id="gameplay">
        <div className="container">
          <Reveal>
            <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">Gameplay</h2></div>
            {p.heroVideo ? (
              <div className="cs-video hud-frame">
                <video controls preload="none" poster={p.poster}>
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
          </Reveal>
        </div>
      </section>

      {/* BUILT WITH */}
      <section className="cs-section alt" id="tech">
        <div className="container">
          <Reveal>
            <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">Built with</h2></div>
            <div className="builtwith">
              {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PAGER */}
      <section className="cs-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cs-pager">
            <Link className="pg pg-prev" href={`/projects/${prev.slug}`} data-cursor="PREV">
              <ArrowLeft size={18} /><span><span className="pg-label">Previous</span>{prev.name}</span>
            </Link>
            <Link className="pg-all" href="/#work">All projects</Link>
            <Link className="pg pg-next" href={`/projects/${next.slug}`} data-cursor="NEXT">
              <span><span className="pg-label">Next</span>{next.name}</span><ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* MORE */}
      {more.length > 0 && (
        <section className="cs-section alt">
          <div className="container">
            <Reveal>
              <div className="cs-h2-mark"><span className="bar" /><h2 className="cs-h2">More projects</h2></div>
            </Reveal>
            <div className="more-cards">
              {more.map((m, i) => {
                const mHasMedia = !m.poster.includes("poster-fallback");
                return (
                  <Reveal key={m.slug} delay={i * 60}>
                    <Link className="more-card" href={`/projects/${m.slug}`} data-cursor="VIEW">
                      <div className="mc-thumb">
                        {mHasMedia ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.cover || m.poster} alt={m.name} loading="lazy" />
                        ) : (
                          <div className="mc-thumb-ph"><Icon name="Gamepad2" size={28} /></div>
                        )}
                      </div>
                      <div className="mc-body">
                        <div className="mc-title">{m.name}</div>
                        <div className="mc-plat">{m.platform === "unity" ? "Unity" : "Roblox"} · {m.status === "live" ? "Live" : "In Development"}</div>
                        <p className="mc-desc">{m.cardDesc}</p>
                        <span className="mc-link">View project <ArrowUpRight size={15} /></span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
