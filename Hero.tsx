"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container, SectionLabel } from "@/components/ui";
import type { ChannelStats } from "@/lib/types";
import { AvatarOrbit } from "./AvatarOrbit";
import { CloseCircle } from "./CloseCircle";
import { SocialConstellation } from "./SocialConstellation";
import { SubscriberCount } from "./SubscriberCount";
import { Tagline } from "./Tagline";

export function Hero({ initialStats }: { initialStats: ChannelStats }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 pb-[var(--space-section)] sm:pt-28">
      {/* Background spotlight that follows mouse - premium Linear effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(124,111,238,0.08)] via-transparent to-transparent" />
        {/* Grid pattern - subtle */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <motion.div style={{ y, opacity, scale, filter: blur }}>
        <Container className="flex flex-col items-center gap-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionLabel className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-3 py-1 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                The Subscriber Watch · Live
              </SectionLabel>
            </motion.div>

            <Tagline />

            <motion.p
              className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-dim)] sm:text-[15px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Every number crackles with orbit physics. Updating on its own — no refresh needed.
              <span className="mt-1 block font-[var(--font-data)] text-xs text-[var(--text-faint)]">Astrophysics meets anime fandom</span>
            </motion.p>
          </motion.div>

          <div className="relative mx-auto aspect-square w-64 md:w-80">
            <CloseCircle />
            <SocialConstellation />
            <AvatarOrbit avatarSrc={initialStats.avatarUrlYoutube} avatarAlt="GetTheMoon's creator" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SubscriberCount initialStats={initialStats} />
          </motion.div>

          {/* Scroll indicator - premium */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="font-[var(--font-data)] text-[10px] tracking-[0.2em] text-[var(--text-faint)] uppercase">Explore Journey</span>
            <motion.div
              className="h-10 w-[1px] bg-gradient-to-b from-[var(--text-faint)] to-transparent"
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </Container>
      </motion.div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </section>
  );
}
