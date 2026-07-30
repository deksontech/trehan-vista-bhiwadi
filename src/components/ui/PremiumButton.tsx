"use client";

import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  icon?: boolean;
};

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  icon?: boolean;
};

const variants = {
  primary:
    "bg-[#B18A4A] text-white hover:bg-[#967238] focus-visible:outline-[#D7C29A]",
  secondary:
    "border border-[#D7C29A] bg-[#FFFDF8] text-[#161512] hover:bg-[#F7F3EA]",
  dark: "bg-[#161512] text-white hover:bg-[#2B241E] focus-visible:outline-[#B18A4A]",
  ghost:
    "border border-white/45 bg-white/10 text-white hover:bg-white/20 backdrop-blur",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

export function PremiumButton({
  children,
  className,
  variant = "primary",
  icon = true,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon ? <ArrowRight aria-hidden="true" size={16} /> : null}
    </button>
  );
}

export function PremiumLink({
  children,
  className,
  variant = "primary",
  icon = true,
  ...props
}: AnchorProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      {children}
      {icon ? <ArrowRight aria-hidden="true" size={16} /> : null}
    </a>
  );
}
