"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Project card thumbnail with a looping video preview.
 * - Static poster by default.
 * - Desktop (hover: hover): plays on hover, pauses on leave.
 * - Mobile: plays muted when scrolled into view (IntersectionObserver),
 *   pauses when it leaves. Respects reduced-motion and the Save-Data header.
 * - No video prop -> just the poster image (graceful fallback).
 */
export default function VideoThumb({
  src,
  poster,
  alt,
  className = "",
}: {
  src?: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!src) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error saveData is non-standard
    const saveData = navigator.connection?.saveData === true;
    if (reduce || saveData) return;
    // one-shot: enable video only after reading reduced-motion + Save-Data (client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanPlay(true);
  }, [src]);

  // Mobile autoplay-in-view
  useEffect(() => {
    if (!canPlay || !wrap.current || !video.current) return;
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (hoverCapable) return; // desktop uses hover handlers instead

    const el = video.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.play().catch(() => {});
          else el.pause();
        });
      },
      { threshold: 0.6 }
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [canPlay]);

  const onEnter = () => {
    if (canPlay && video.current) video.current.play().catch(() => {});
  };
  const onLeave = () => {
    if (canPlay && video.current) {
      video.current.pause();
      video.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={wrap}
      className={`vthumb ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} loading="lazy" className="vthumb-poster" />
      {src && canPlay && (
        <video
          ref={video}
          className="vthumb-video"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={(e) => e.currentTarget.classList.add("is-playing")}
          onPause={(e) => e.currentTarget.classList.remove("is-playing")}
        />
      )}
    </div>
  );
}
