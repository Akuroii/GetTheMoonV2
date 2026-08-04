import { type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const glassPanel = cva(
  "group rounded-[var(--radius-glass)] border backdrop-blur-[var(--glass-blur)] transition-all duration-[var(--duration-standard)] ease-[var(--ease-premium)] glass-highlight relative overflow-hidden",
  {
    variants: {
      intensity: {
        subtle: "bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-[var(--shadow-card)]",
        strong: "bg-[var(--glass-bg-strong)] backdrop-blur-[var(--glass-blur-strong)] border-[rgba(124,111,238,0.28)] shadow-[var(--shadow-glow-violet)]",
        ultra: "bg-[rgba(18,18,42,0.85)] backdrop-blur-[28px] border-[rgba(124,111,238,0.32)] shadow-[var(--shadow-glow-violet-strong)]",
      },
      glow: {
        none: "",
        violet: "hover:shadow-[0_0_60px_-12px_rgba(124,111,238,0.45),0_0_0_1px_rgba(124,111,238,0.28)] hover:border-[var(--glass-border-hover)]",
        pink: "hover:shadow-[0_0_60px_-12px_rgba(255,94,168,0.45)] hover:border-[rgba(255,94,168,0.28)]",
        gold: "hover:shadow-[0_0_60px_-12px_rgba(245,196,83,0.35)] hover:border-[rgba(245,196,83,0.28)]",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-[2px] hover:scale-[1.01]",
        scale: "hover:scale-[1.02]",
      }
    },
    defaultVariants: {
      intensity: "subtle",
      glow: "violet",
      hover: "none",
    },
  }
);

interface GlassPanelProps
  extends VariantProps<typeof glassPanel>,
    ComponentPropsWithoutRef<"div"> {
  spotlight?: boolean;
}

export function GlassPanel({ children, className, intensity, glow, hover, spotlight = false, ...rest }: GlassPanelProps) {
  return (
    <div className={clsx(glassPanel({ intensity, glow, hover }), className)} {...rest}>
      {spotlight && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
          <div className="absolute -top-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      )}
      {/* Inner content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
