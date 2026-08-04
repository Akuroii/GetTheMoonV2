"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion";
import type { ContentItem } from "@/lib/types";
import { GlassPanel } from "@/components/ui";
import { TypeGlyph } from "@/components/content/TypeGlyph";
import { formatDate } from "@/lib/format";
import { useRef } from "react";

export function UploadCard({ item }: { item: ContentItem }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = ref.current.getBoundingClientRect().top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const isViral = item.viewCount > 100000;

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-64 shrink-0 relative"
      style={{ scrollSnapAlign: "start", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {/* Gradient border wrapper */}
        <div className="rounded-[var(--radius-card)] p-[1px] bg-gradient-to-b from-white/15 via-[rgba(124,111,238,0.2)] to-transparent">
          <GlassPanel spotlight intensity="subtle" className="overflow-hidden p-0 rounded-[calc(var(--radius-card)-1px)]">
            {/* Image container with zoom */}
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[600ms] ease-[var(--ease-premium)] group-hover:scale-[1.07]"
                sizes="256px"
              />
              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Type glyph */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10">
                <TypeGlyph type={item.type} className="h-3 w-3 text-white" />
                <span className="text-[10px] font-medium tracking-wide text-white/90 uppercase">{item.type}</span>
              </div>

              {/* Viral badge */}
              {isViral && (
                <div className="absolute top-2.5 left-2.5 rounded-full bg-[var(--gold)]/90 backdrop-blur-md px-2 py-1 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-black animate-[live-pulse_1s_ease-in-out_infinite]" />
                  <span className="text-[10px] font-bold tracking-wider text-black uppercase">Viral</span>
                </div>
              )}

              {/* Play icon on hover - premium */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300 ease-[var(--ease-premium)]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-[1px]">
                    <path d="M5 3.5v9l8-4.5-8-4.5z" fill="black" />
                  </svg>
                </div>
              </div>

              {/* Shimmer */}
              <div className="shimmer" />
            </div>

            {/* Content */}
            <div className="p-3.5 pb-3">
              <p className="line-clamp-2 text-[13px] font-medium leading-snug text-[var(--text)] group-hover:text-white transition-colors" dir="auto">
                {item.title}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-[var(--font-data)] text-[11px] text-[var(--text-dim)] flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" opacity="0.6"><path d="M8 3C4 3 1 8 1 8s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 110-6 3 3 0 010 6z" fill="currentColor"/></svg>
                    {item.viewCount.toLocaleString()}
                  </span>
                  <span className="opacity-40">·</span>
                  {formatDate(item.publishedAt, "compact")}
                </p>
                {item.durationSeconds ? (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--text-faint)]">
                    {Math.floor(item.durationSeconds / 60)}:{String(item.durationSeconds % 60).padStart(2, "0")}
                  </span>
                ) : null}
              </div>
            </div>
          </GlassPanel>
        </div>
      </motion.div>
    </motion.a>
  );
}
