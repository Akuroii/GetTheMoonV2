"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion";
import { Container, SectionHeading } from "@/components/ui";
import { UploadCard } from "@/components/content/UploadCard";
import type { ContentItem } from "@/lib/types";

export function RecentUploads({ items }: { items: ContentItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });

  const recent = [...items]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 12);

  if (recent.length === 0) {
    return (
      <section className="pb-[var(--space-section)]">
        <Container size="wide">
          <SectionHeading>Recent Uploads</SectionHeading>
          <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--line)] p-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <span className="text-lg">🎬</span>
            </div>
            <p className="text-sm text-[var(--text-dim)]">No recent uploads. Run ingestion.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="pb-[var(--space-section-sm)] group/section">
      <Container size="wide">
        <div className="flex items-end justify-between mb-6">
          <div>
            <SectionHeading className="mb-1">Recent Uploads</SectionHeading>
            <p className="font-[var(--font-data)] text-[11px] text-[var(--text-faint)]">Latest orbits from the channel</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[var(--text-faint)]">
            <span className="h-px w-8 bg-[var(--line)]" />
            Drag to explore
            <div className="ml-1 flex gap-1">
              <span className="h-1 w-1 rounded-full bg-[var(--text-faint)] animate-pulse" />
              <span className="h-1 w-1 rounded-full bg-[var(--text-faint)] animate-pulse [animation-delay:200ms]" />
              <span className="h-1 w-1 rounded-full bg-[var(--text-faint)] animate-pulse [animation-delay:400ms]" />
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Subtle progress for this carousel only */}
          <div className="absolute -top-3 left-0 right-0 h-[1px] bg-[var(--line)] overflow-hidden rounded-full hidden sm:block">
            <motion.div className="h-full bg-[var(--violet)] origin-left" style={{ scaleX: scrollXProgress }} />
          </div>

          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto pb-6 pt-2 -mx-1 px-1 scrollbar-none"
            style={{ scrollSnapType: "x proximity", overscrollBehaviorX: "contain", scrollbarWidth: "none" }}
          >
            {recent.map((item, i) => (
              <motion.div
                key={item.videoId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <UploadCard item={item} />
              </motion.div>
            ))}
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        </div>
      </Container>
    </section>
  );
}
