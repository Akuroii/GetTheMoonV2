"use client";

import { motion } from "motion/react";

export function Tagline() {
  const words = ["Every", "orbit", "brings", "us", "closer", "to", "the", "Moon."];

  return (
    <div className="mt-6">
      <motion.p
        className="font-[var(--font-display)] text-4xl leading-[0.95] tracking-tight sm:text-5xl md:text-[3.5rem]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
        }}
      >
        <span className="block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            Every orbit brings us{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[var(--gold)] italic">closer</span>
              <motion.span
                className="absolute bottom-[0.15em] left-0 h-[0.2em] w-full bg-[var(--gold)]/20 -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.span>
        </span>
        <span className="block overflow-hidden mt-1">
          <motion.span
            className="inline-block text-[var(--text-dim)] font-light"
            variants={{
              hidden: { y: "100%" },
              visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            to the Moon.
          </motion.span>
        </span>
      </motion.p>
    </div>
  );
}
