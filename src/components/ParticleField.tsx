"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Lightweight drifting particle field for atmosphere behind the hero.
 * - One BufferGeometry of points, additively blended, slow rotation + parallax to cursor.
 * - Disabled for reduced-motion and on small screens (returns null).
 * - Capped DPR; paused when the canvas isn't visible.
 */
function Points({ count = 900, color = "#7C5CFF" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Generated once per mount (useMemo). Randomness is intentional for a
  // decorative field; the compiler flags Math.random as impure, which is
  // exactly what we want here (scatter once, never re-run).
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      /* eslint-disable react-hooks/purity */
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 11;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
      /* eslint-enable react-hooks/purity */
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.008;
    // gentle parallax toward cursor
    ref.current.position.x += (mouse.current.x * 0.4 - ref.current.position.x) * 0.03;
    ref.current.position.y += (-mouse.current.y * 0.25 - ref.current.position.y) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleField({ color = "#7C5CFF" }: { color?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const ok =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.innerWidth >= 768;
    // one-shot: enable only after reading reduced-motion + viewport width (client-only)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(ok);
  }, []);

  if (!enabled) return null;

  return (
    <div className="particle-field" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "low-power" }}
        frameloop="always"
      >
        <Points color={color} />
      </Canvas>
    </div>
  );
}
