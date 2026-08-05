"use client";

import { motion, AnimatePresence } from "motion/react";
import { AnimatedNumber, SectionLabel } from "@/components/ui";
import { useChannelStatsStore } from "@/lib/store";
import type { ChannelStats } from "@/lib/types";
import { formatTime } from "@/lib/format";
import { useEffect, useState } from "react";

export function SubscriberCount({ initialStats }: { initialStats: ChannelStats }) {
  const stats = useChannelStatsStore((s) => s.stats) ?? initialStats;
  const [prev, setPrev] = useState(stats.subscriberCount);
  const [isGrowing, setIsGrowing] = useState(false);

  // Adjusting state during render in response to a prop/store change —
  // React's documented pattern for this, not an effect. Keeps the effect
  // below free to do the one thing it actually needs to: own the timeout.
  if (stats.subscriberCount !== prev) {
    setIsGrowing(stats.subscriberCount > prev);
    setPrev(stats.subscriberCount);
  }

  useEffect(() => {
    if (!isGrowing) return;
    const t = setTimeout(() => setIsGrowing(false), 1200);
    return () => clearTimeout(t);
  }, [isGrowing]);

  return (
    <div aria-live="polite" className="text-center relative">
      {/* Glow that pulses on increase */}
      <AnimatePresence>
        {isGrowing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.4 }}
            className="absolute inset-0 -z-10 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(124,111,238,0.25) 0%, transparent 70%)" }}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatedNumber
          value={stats.subscriberCount}
          className="text-7xl font-medium tracking-[-0.04em] sm:text-7xl md:text-8xl relative"
        />
        {/* Underline glow */}
        <motion.div
          className="absolute -bottom-2 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-[var(--violet)] to-transparent"
          initial={{ width: 0, x: "-50%" }}
          animate={{ width: "60%", x: "-50%" }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ left: "50%" }}
        />
        {/* Small live dot */}
        <motion.div
          className="absolute -right-6 top-4 h-2 w-2 rounded-full bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-4 flex flex-col items-center gap-2"
      >
        <SectionLabel className="flex items-center gap-2 text-[11px] tracking-[0.15em]">
          <span className="h-px w-6 bg-[var(--line)]" />
          Subscribers
          <span className="h-px w-6 bg-[var(--line)]" />
        </SectionLabel>
        <p className="text-[11px] font-[var(--font-data)] text-[var(--text-faint)] flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-[live-pulse_2s_ease-in-out_infinite]" />
          updated {formatTime(stats.updatedAt)} · live
        </p>
      </motion.div>
    </div>
  );
}
