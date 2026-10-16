"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export default function CaseSubnav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, [items]);

  return (
    <nav className="cs-subnav" aria-label="On this page">
      <div className="cs-subnav-inner">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className={active === it.id ? "active" : ""}>
            {it.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
