"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Gamepad2, Menu, X, Smartphone, ArrowRight } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";

const LINKEDIN = "https://www.linkedin.com/in/hussnain-sajjad-4129302b7";
const MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hussnain.devcodes@gmail.com&su=Let%27s%20work%20together";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-logo" data-cursor="HOME">
          <span className="logo-mark">
            <Gamepad2 size={15} />
          </span>
          Hussnain Sajjad
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link href="/">Home</Link>
          <div className="nav-item">
            <Link href="/#work">Work</Link>
            <div className="nav-dd" role="menu">
              <Link href="/unity" role="menuitem">
                <Smartphone size={15} /> Unity
              </Link>
              <Link href="/roblox" role="menuitem">
                <Gamepad2 size={15} /> Roblox
              </Link>
            </div>
          </div>
          <Link href="/#experience">Experience</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <div className="nav-right">
          <a
            className="nav-icon"
            href={LINKEDIN}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            data-cursor="OPEN"
          >
            <LinkedinIcon size={18} />
          </a>
          <a className="btn btn-primary btn-sm nav-cta" href={MAIL} target="_blank" rel="noopener" data-cursor="EMAIL">
            Let&apos;s Talk
          </a>
          <button
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setOpen(false)}>Home <ArrowRight size={16} /></Link>
          <Link href="/#work" onClick={() => setOpen(false)}>Work <ArrowRight size={16} /></Link>
          <Link href="/unity" onClick={() => setOpen(false)} className="sub">— Unity games <ArrowRight size={16} /></Link>
          <Link href="/roblox" onClick={() => setOpen(false)} className="sub">— Roblox games <ArrowRight size={16} /></Link>
          <Link href="/#experience" onClick={() => setOpen(false)}>Experience <ArrowRight size={16} /></Link>
          <Link href="/#about" onClick={() => setOpen(false)}>About <ArrowRight size={16} /></Link>
          <Link href="/#contact" onClick={() => setOpen(false)}>Contact <ArrowRight size={16} /></Link>
          <a className="btn btn-primary menu-cta" href={MAIL} target="_blank" rel="noopener">Let&apos;s Talk</a>
        </div>
      )}
    </header>
  );
}
