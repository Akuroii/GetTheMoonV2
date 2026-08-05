"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { AnimatedNumber, SectionLabel, GlassPanel, Container } from "@/components/ui";
import { useRef } from "react";

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [5, -5]);
  const rotateY = useTransform(x, [-80, 80], [-5, 5]);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function StatsRow({
  totalViews,
  contentCount,
  nextMilestone,
}: {
  totalViews: number;
  contentCount: number;
  nextMilestone: number;
}) {
  const stats = [
    { 
      label: "Total Views", 
      value: totalViews,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z M8 11a3 3 0 110-6 3 3 0 010 6z" stroke="currentColor" strokeWidth="1.2"/></svg>
      ),
      accent: "violet" as const
    },
    { 
      label: "Content", 
      value: contentCount,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12v10H2z M2 6h12 M5 3v10" stroke="currentColor" strokeWidth="1.2"/></svg>
      ),
      accent: "pink" as const
    },
    { 
      label: "Next Milestone", 
      value: nextMilestone,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l2 4h4l-3 3 1 4-4-3-4 3 1-4-3-3h4z" stroke="currentColor" strokeWidth="1.2"/></svg>
      ),
      accent: "gold" as const
    },
  ];

  return (
    <Container className="pb-[var(--space-section-sm)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" style={{ perspective: 1000 }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard>
              <GlassPanel spotlight intensity="subtle" glow={s.accent} hover="lift" className="px-5 py-6 text-center relative group">
                {/* Top icon */}
                <div className="absolute top-3.5 right-3.5 h-7 w-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">
                  {s.icon}
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: s.accent === "violet" ? "var(--violet)" : s.accent === "pink" ? "var(--pink)" : "var(--gold)" }}
                />

                <AnimatedNumber value={s.value} className="text-2xl sm:text-[1.7rem] font-medium tracking-tight" />
                <SectionLabel className="mt-2 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[var(--text-dim)] opacity-60" />
                  {s.label}
                </SectionLabel>
              </GlassPanel>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
