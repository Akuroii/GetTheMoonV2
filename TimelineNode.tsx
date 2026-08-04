"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion";
import type { ContentItem } from "@/lib/types";
import { TypeGlyph } from "@/components/content/TypeGlyph";
import { ContentCard } from "@/components/content/ContentCard";
import { formatDate } from "@/lib/format";

const TYPE_COLOR: Record<ContentItem["type"], string> = {
  video: "var(--violet)",
  stream: "var(--pink)",
  short: "var(--gold)",
};

export function TimelineNode({ item, index }: { item: ContentItem; index?: number }) {
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

  const isWeekendPeak = item.viewCount > 50000;

  return (
    <div className="relative shrink-0 group/node">
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        aria-label={`${item.type}: ${item.title}, ${formatDate(item.publishedAt, "short")}`}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center outline-none"
      >
        {/* Outer ring on hover */}
        <motion.div
          className="absolute h-8 w-8 rounded-full border"
          initial={false}
          animate={{ scale: open ? 1 : 0.8, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderColor: TYPE_COLOR[item.type], borderWidth: "1px" }}
        />

        {/* Pulse for high views */}
        {isWeekendPeak && (
          <motion.span
            aria-hidden="true"
            className="absolute h-6 w-6 rounded-full"
            style={{ background: TYPE_COLOR[item.type] }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: (index || 0) * 0.1 }}
          />
        )}

        {/* Core dot */}
        <motion.span
          aria-hidden="true"
          className="relative h-3 w-3 rounded-full z-10"
          style={{
            background: TYPE_COLOR[item.type],
            boxShadow: `0 0 12px ${TYPE_COLOR[item.type]}, 0 0 0 1px ${TYPE_COLOR[item.type]}40`,
          }}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        />

        {/* Type glyph mini */}
        <motion.div
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2"
          initial={false}
          animate={{ y: open ? -1 : 0, opacity: 1 }}
        >
          <TypeGlyph
            type={item.type}
            className="h-2.5 w-2.5 text-[var(--text-faint)] group-hover/node:text-[var(--text-dim)] transition-colors"
          />
        </motion.div>
      </button>

      {/* Connector line to next node - subtle */}
      <div className="absolute top-1/2 left-full h-px w-1 bg-[var(--line)] -translate-y-1/2 hidden sm:block" />

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-full left-1/2 z-30 mb-4 -translate-x-1/2"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-[var(--surface)] border-r border-b border-[var(--glass-border)]" />
            <ContentCard item={item} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
