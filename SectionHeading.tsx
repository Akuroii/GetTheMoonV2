import { type ReactNode } from "react";
import clsx from "clsx";

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx("mb-4 flex items-center gap-3", className)}>
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-dim)]">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
    </div>
  );
}
