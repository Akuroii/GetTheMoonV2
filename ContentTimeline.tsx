"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion";
import { Container, SectionHeading } from "@/components/ui";
import { TimelineNode } from "./TimelineNode";
import type { ContentItem } from "@/lib/types";

export function ContentTimeline({ items }: { items: ContentItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragLeft, setDragLeft] = useState(0);
  const { scrollXProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollXProgress, [0, 1], [0, 1]);

  const sorted = [...items].sort(
    (a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt)
  );

  if (sorted.length === 0) {
    return (
      <section className="pb-[var(--space-section)]">
        <Container size="wide">
          <SectionHeading>The Journey</SectionHeading>
          <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--line)] p-12 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center mb-4">
              <span className="text-xl">🌙</span>
            </div>
            <p className="text-sm text-[var(--text-dim)]">No journey data yet. Ingestion will populate orbit.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-[var(--space-section-sm)] relative overflow-hidden">
      {/* Subtle background grid for section */}
      <div className="absolute inset-0 -z-10 opacity-[0.015]">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }} />
      </div>

      <Container size="wide">
        <div className="flex items-baseline justify-between mb-8">
          <SectionHeading className="mb-0">The Journey</SectionHeading>
          <div className="hidden sm:flex items-center gap-3">
            <span className="font-[var(--font-data)] text-[11px] text-[var(--text-faint)] tracking-wider uppercase">
              Drag to explore · {sorted.length} orbits
            </span>
            <div className="h-px w-12 bg-[var(--line)]" />
          </div>
        </div>

        {/* Rail container with drag */}
        <div className="relative">
          {/* Progress bar - Linear style */}
          <div className="relative mb-10 h-[2px] w-full overflow-hidden rounded-full bg-[var(--line)]">
            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-left rounded-full bg-gradient-to-r from-[var(--violet)] via-[var(--pink)] to-[var(--gold)]"
              style={{ scaleX }}
            />
            {/* Glow under progress */}
            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-left blur-[4px] rounded-full bg-gradient-to-r from-[var(--violet)] to-[var(--pink)] opacity-50"
              style={{ scaleX }}
            />
          </div>

          {/* Timeline rail */}
          <div
            ref={containerRef}
            className="flex gap-1 overflow-x-auto pb-8 scrollbar-none"
            style={{ scrollSnapType: "x proximity", overscrollBehaviorX: "contain", scrollbarWidth: "none" }}
          >
            <div className="flex gap-1 px-2">
              {sorted.map((item, i) => (
                <motion.div
                  key={item.videoId}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <TimelineNode item={item} index={i} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 bottom-8 left-0 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-8 right-0 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="font-[var(--font-data)] text-[11px] tracking-wide text-[var(--text-faint)]">
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--violet)]" />
              {sorted.length} uploads since 100K milestone
              <span className="hidden sm:inline">· hover or tap to explore</span>
            </span>
          </p>
          <div className="flex items-center gap-3 text-[10px] text-[var(--text-faint)]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--violet)] shadow-[0_0_6px_var(--violet)]" /> Video</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--pink)] shadow-[0_0_6px_var(--pink)]" /> Stream</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_6px_var(--gold)]" /> Short</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
