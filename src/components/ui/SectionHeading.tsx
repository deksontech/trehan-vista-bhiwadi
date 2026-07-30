import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  inverse,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-bold uppercase tracking-[0.24em]",
            inverse ? "text-[#D7C29A]" : "text-[#B18A4A]",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-serif text-4xl leading-tight md:text-5xl",
          inverse ? "text-[#FFFDF8]" : "text-[#161512]",
        )}
      >
        {title}
      </h2>
      {copy ? (
        <p className={cn("mt-5 text-base leading-8", inverse ? "text-white/72" : "text-[#6D6962]")}>
          {copy}
        </p>
      ) : null}
    </div>
  );
}
