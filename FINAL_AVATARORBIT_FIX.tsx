"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { OrbitRing } from "./OrbitRing";
import { OrbitingBody, type OrbitingBodyProps } from "./OrbitingBody";
import { GravityParticles } from "./GravityParticles";
import { useRef } from "react";

const RINGS = [42, 62, 84];

const BODIES: OrbitingBodyProps[] = [
  { color: "var(--violet)", radiusPercent: 21, size: 7, duration: 46, startAngle: 15 },
  { color: "var(--pink)", radiusPercent: 31, size: 6, duration: 68, startAngle: 170 },
  { color: "var(--gold)", radiusPercent: 42, size: 5, duration: 94, startAngle: 290 },
];

export function AvatarOrbit({
  avatarSrc,
  avatarAlt,
}: {
  avatarSrc: string | null;
  avatarAlt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto aspect-square w-64 md:w-80"
        style={{ containerType: "inline-size", perspective: 1000, rotateX, rotateY, transformStyle: "preserve-3d" as any }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-[12%] rounded-full blur-[40px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(124,111,238,0.4), rgba(255,94,168,0.18) 50%, transparent 75%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div aria-hidden="true">
          {RINGS.map((size, i) => (
            <motion.div key={size} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}>
              <OrbitRing sizePercent={size} />
            </motion.div>
          ))}
        </div>

        <GravityParticles />

        <div aria-hidden="true">
          {BODIES.map((b) => (
            <OrbitingBody key={b.color} {...b} />
          ))}
        </div>

        {/* Avatar - FIXED: no black bg covering photo, uses mask border from globals.css */}
        <div className="absolute inset-[18%] rounded-full">
          <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-white/20 via-[rgba(124,111,238,0.3)] to-transparent pointer-events-none">
            <div className="h-full w-full rounded-full" style={{ background: "transparent" }} />
          </div>
          <div className="absolute inset-0 rounded-full shadow-[0_0_60px_rgba(124,111,238,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] pointer-events-none z-10" />
          <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-white/10">
            {avatarSrc ? (
              <Image src={avatarSrc} alt={avatarAlt} fill className="object-cover" priority />
            ) : (
              <div role="img" aria-label={avatarAlt} className="h-full w-full" style={{ background: "radial-gradient(circle at 35% 30%, var(--violet), var(--surface) 70%)" }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        <motion.div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <div className="h-2 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--violet)]/30 to-transparent blur-[2px]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 blur-[80px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, var(--violet), transparent 60%)" }} />
    </div>
  );
}
