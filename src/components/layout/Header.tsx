"use client";

/* eslint-disable @next/next/no-img-element */

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { project } from "@/data/project";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { cn } from "@/lib/utils";

const nav = [
  ["Overview", "#overview"],
  ["Homes", "#homes"],
  ["Amenities", "#amenities"],
  ["Furnishing", "#furnishing"],
  ["Location", "#location"],
  ["FAQ", "#faq"],
] as const;

export function Header({ onSiteVisit }: { onSiteVisit: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition",
        scrolled || open
          ? "border-[#DED7CB] bg-[#FFFDF8]/95 shadow-sm backdrop-blur text-[#161512]"
          : "border-white/10 bg-[#161512]/45 text-white backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Trehan Vista home">
          <img
            src="/images/trehan-vista/logo.webp"
            alt={`${project.name} logo`}
            width={116}
            height={70}
            className="h-12 w-auto rounded bg-white object-contain p-1"
          />
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {nav.map(([label, href]) => (
            <a key={label} href={href} className="hover:text-[#B18A4A]">
              {label}
            </a>
          ))}
          <PremiumButton onClick={onSiteVisit} icon={false} className="min-h-10 px-4 py-2">
            Book a Site Visit
          </PremiumButton>
        </nav>
        <button
          type="button"
          className="rounded-md border border-current/20 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[#DED7CB] bg-[#FFFDF8] px-4 pb-5 text-[#161512] lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-3 pt-4 text-sm font-semibold">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} className="py-2">
                {label}
              </a>
            ))}
            <PremiumButton onClick={onSiteVisit} icon={false}>
              Book a Site Visit
            </PremiumButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
