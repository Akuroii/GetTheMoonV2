// components/hero/CloseCircle.tsx
"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { CLOSE_CIRCLE, type CloseCircleIcon } from "@/lib/closeCircle";

// 12 items, evenly spaced 30° apart, starting at top. Larger radius than
// SocialConstellation's 46cqi so the two rings don't collide.
const ORBIT_RADIUS_CQI = 100;

const REPEL_RADIUS = 150; // px, cursor distance that triggers repulsion
const REPEL_STRENGTH = 50; // px, max displacement at zero distance

function angleFor(index: number, total: number) {
  return -90 + (360 / total) * index;
}

// Simple, minimal, single-color glyphs — evoke each platform without
// reproducing anyone's exact trademarked logo artwork. Same viewBox/style
// convention as the existing TypeGlyph.tsx.
function PlatformGlyph({ icon, className }: { icon: CloseCircleIcon; className?: string }) {
  switch (icon) {
    case "gmail":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M2 4l6 4.5L14 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M9.2 5.5H8.3c-.7 0-1 .35-1 1v1.1H9l-.2 1.5H7.3V13H5.8V9.1H4.8V7.6h1V6.3c0-1.15.65-1.9 1.9-1.9h1.5v1.1z" fill="currentColor" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <rect x="2" y="4.5" width="12" height="7.5" rx="3.2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="6" cy="8.2" r="0.9" fill="currentColor" />
          <circle cx="10" cy="8.2" r="0.9" fill="currentColor" />
        </svg>
      );
    case "youtube-main":
    case "youtube-en":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <rect x="1.5" y="3.5" width="13" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6.8 6.3v3.4l3-1.7-3-1.7z" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 16 16" fill="none" className={className}>
          <path
            d="M9.5 2v6.8a1.9 1.9 0 1 1-1.5-1.86V5.4a3.5 3.5 0 1 0 3 3.47V6.3c.55.4 1.2.65 1.9.68V5.4c-1.05-.1-1.9-.9-2-1.95V2H9.5z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// --- Repulsion wrapper ------------------------------------------------
//
// Owns ONLY the cursor-repulsion offset (x/y spring), driven imperatively
// by CloseCircle's single shared rAF loop below via setOffset(). It never
// touches scale/opacity — those live on a separate motion.div one level
// in — and it never receives a raw `style={{ transform: ... }}` string,
// so there's no repeat of the transform-conflict bug documented for this
// project (Motion silently overwriting a manually-set transform on the
// same element). Static column/ring position stays on the plain wrapper
// div in CloseCircle's render, one level further out, which Motion never
// touches at all.
interface RepelIconHandle {
  setOffset: (dx: number, dy: number) => void;
}

const RepelIcon = ({
  children,
  disabled,
  handleRef,
}: {
  children: React.ReactNode;
  disabled: boolean;
  handleRef: (handle: RepelIconHandle | null) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (disabled) {
      handleRef(null);
      return;
    }
    handleRef({
      setOffset(dx, dy) {
        x.set(dx);
        y.set(dy);
      },
    });
    return () => handleRef(null);
  }, [disabled, handleRef, x, y]);

  if (disabled) return <>{children}</>;

  return <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>;
};

function PersonNode({
  name,
  title,
  photoSrc,
}: {
  name: string;
  title: string;
  photoSrc?: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative flex flex-col items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${name}, ${title}`}
        className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full outline-none focus-visible:scale-110"
        style={{ boxShadow: "0 0 14px rgba(124,111,238,0.45)" }}
      >
        {photoSrc ? (
          <Image src={photoSrc} alt={name} fill className="object-cover" sizes="36px" />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[13px] font-medium"
            style={{ background: "var(--surface-2)", color: "var(--text)" }}
          >
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </button>
      <span className="mt-1.5 whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-[var(--text-faint)]">
        {name}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`${name} details`}
            className="absolute bottom-full left-1/2 z-30 mb-3 -translate-x-1/2"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="whitespace-nowrap rounded-[var(--radius-glass)] border px-3.5 py-2.5 text-center backdrop-blur-[var(--glass-blur)]"
              style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
            >
              <p className="text-[13px] font-medium text-[var(--text)]">{name}</p>
              <p className="mt-0.5 text-[11px] text-[var(--text-dim)]">{title}</p>
            </div>
            <div
              className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r"
              style={{ background: "var(--surface)", borderColor: "var(--glass-border)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CloseCircle() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const itemPositionEls = useRef<(HTMLDivElement | null)[]>([]);
  const repelHandles = useRef<(RepelIconHandle | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // One listener, one rAF loop, for all 12 items — not one listener per
  // icon. Each frame reads every icon's live bounding rect (measured off
  // the static, non-Motion position wrapper, not the moving repel layer,
  // so the distance check doesn't feed back on its own offset) and pushes
  // an offset straight into that icon's spring via setOffset().
  useEffect(() => {
    if (reducedMotion) return;

    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }
    function resetMouse() {
      mousePos.current = { x: -9999, y: -9999 };
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", resetMouse);

    let raf = requestAnimationFrame(function tick() {
      for (let i = 0; i < itemPositionEls.current.length; i++) {
        const el = itemPositionEls.current[i];
        const handle = repelHandles.current[i];
        if (!el || !handle) continue;

        const rect = el.getBoundingClientRect();
        const dx = mousePos.current.x - (rect.left + rect.width / 2);
        const dy = mousePos.current.y - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < REPEL_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / REPEL_RADIUS) * REPEL_STRENGTH;
          handle.setOffset(-Math.cos(angle) * force, -Math.sin(angle) * force);
        } else {
          handle.setOffset(0, 0);
        }
      }
      raf = requestAnimationFrame(tick);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", resetMouse);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0" style={{ containerType: "inline-size" }}>
      {CLOSE_CIRCLE.map((entry, i) => {
        const angleRad = (angleFor(i, CLOSE_CIRCLE.length) * Math.PI) / 180;
        const x = Math.cos(angleRad) * ORBIT_RADIUS_CQI;
        const y = Math.sin(angleRad) * ORBIT_RADIUS_CQI;

        return (
          <div
            key={entry.key}
            ref={(el) => {
              itemPositionEls.current[i] = el;
            }}
            className="pointer-events-auto absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}cqi), calc(-50% + ${y}cqi))` }}
          >
            <RepelIcon
              disabled={reducedMotion}
              handleRef={(handle) => {
                repelHandles.current[i] = handle;
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * -1.1,
                  }}
                >
                  {entry.kind === "person" ? (
                    <PersonNode name={entry.name} title={entry.title} photoSrc={entry.photoSrc} />
                  ) : (
                    
                      href={entry.href}
                      target={entry.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={entry.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={`Contact GetTheMoon via ${entry.label}`}
                      className="flex flex-col items-center gap-1.5 outline-none focus-visible:scale-110"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text)]"
                        style={{ background: "var(--surface-2)", boxShadow: "0 0 14px rgba(124,111,238,0.45)" }}
                      >
                        <PlatformGlyph icon={entry.icon} className="h-4 w-4" />
                      </span>
                      <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-[var(--text-faint)]">
                        {entry.label.toUpperCase()}
                      </span>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </RepelIcon>
          </div>
        );
      })}
    </div>
  );
}
