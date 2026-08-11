"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PLATFORM_LINKS } from "@/lib/platforms";

// Five fixed orbit angles (degrees, 0° = right, clockwise), evenly spaced
// 72° apart starting at top. Matches the confirmed moon-orbit spec:
// always-legible, no identity-gating, ambient streaks fully decoupled
// from any specific moon — see SOCIAL_ORBIT_SPEC.md.
const ORBIT_ANGLES = [-90, -18, 54, 126, 198];

// Clears AvatarOrbit's outermost ring (84cqi diameter / 2 = 42cqi radius)
// with room to spare, same cqi unit AvatarOrbit's own OrbitingBody uses,
// so this scales with the shared container exactly the way the existing
// orbit rings already do.
const ORBIT_RADIUS_CQI = 46;

const SHORT_LABELS: Record<string, string> = {
  "Main Channel": "YT MAIN",
  "EN Channel": "YT EN",
  TikTok: "TIKTOK",
  Facebook: "FACEBOOK",
  Discord: "DISCORD",
};

// Independent ambient streaks — never originate at center, never terminate
// at a specific moon. Pure background weather, not a reveal mechanism.
const STREAKS = [
  { top: "8%", left: "20%", rotate: "22deg", duration: "9s", delay: "0s" },
  { top: "55%", left: "76%", rotate: "-18deg", duration: "11s", delay: "3.5s" },
  { top: "14%", left: "66%", rotate: "-28deg", duration: "13s", delay: "7s" },
];

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SocialConstellation() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="absolute inset-0" style={{ containerType: "inline-size" }}>
      {/* Ambient streaks - decorative only, never gates identifying a platform */}
      {!reducedMotion && (
        <div aria-hidden="true" className="pointer-events-none">
          {STREAKS.map((s, i) => (
            <span
              key={i}
              className="absolute h-[100px] w-[2px] rounded-full opacity-0"
              style={{
                top: s.top,
                left: s.left,
                transform: `rotate(${s.rotate})`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(124,111,238,0.85), transparent)",
                filter: "blur(0.5px)",
                animation: `social-streak-sweep ${s.duration} ease-in-out infinite`,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>
      )}

      {PLATFORM_LINKS.map((link, i) => {
        const angleRad = (ORBIT_ANGLES[i] * Math.PI) / 180;
        const x = Math.cos(angleRad) * ORBIT_RADIUS_CQI;
        const y = Math.sin(angleRad) * ORBIT_RADIUS_CQI;
        const driftDelay = `${i * -1.4}s`;

        return (
          <motion.a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow GetTheMoon on ${link.label}`}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex flex-col items-center gap-1.5 outline-none focus-visible:scale-110"
            style={{ transform: `translate(calc(-50% + ${x}cqi), calc(-50% + ${y}cqi))` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="relative block h-9 w-9 rounded-full"
              style={{
                background: "var(--text)",
                boxShadow: "0 0 14px rgba(124,111,238,0.45)",
                animation: reducedMotion
                  ? undefined
                  : `social-moon-drift 8.5s ease-in-out infinite`,
                animationDelay: driftDelay,
              }}
            >
              <span
                aria-hidden="true"
                className="absolute rounded-full"
                style={{ background: "var(--bg)", top: "3px", left: "10px", right: "3px", bottom: "3px" }}
              />
            </span>
            <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-[var(--text-faint)]">
              {SHORT_LABELS[link.label] ?? link.label}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
