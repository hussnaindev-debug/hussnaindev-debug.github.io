"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { LinkedinIcon } from "@/components/BrandIcons";

const LINKEDIN = "https://www.linkedin.com/in/hussnain-sajjad-4129302b7";
const MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hussnain.devcodes@gmail.com&su=Let%27s%20work%20together";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#roblox", label: "Roblox" },
  { href: "/#unity", label: "Unity" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

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
        <Link href="/#home" className="nav-logo" data-cursor="HOME">
          <span className="logo-mark">HS</span>
          <span className="nav-logo-txt">
            Hussnain Sajjad
            <span className="nav-status"><span className="stat-dot" /> System Online</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
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
            <LinkedinIcon size={17} />
          </a>
          <a className="btn btn-primary btn-sm nav-cta" href={MAIL} target="_blank" rel="noopener" data-cursor="EMAIL">
            Transmission
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
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label} <ArrowRight size={16} />
            </Link>
          ))}
          <a className="btn btn-primary menu-cta" href={MAIL} target="_blank" rel="noopener">
            Open Transmission
          </a>
        </div>
      )}
    </header>
  );
}
