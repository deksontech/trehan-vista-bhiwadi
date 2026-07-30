"use client";

import { project } from "@/data/project";

export function AnnouncementBar({ onPrice }: { onPrice: () => void }) {
  return (
    <div className="relative z-50 bg-[#161512] text-[#FFFDF8]">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-3 px-4 text-xs sm:px-6 sm:text-sm lg:px-8">
        <p className="truncate">
          2 & 3 BHK Apartments in Bhiwadi | Starting from {project.pricing.displayStartingPrice}
        </p>
        <button
          type="button"
          onClick={onPrice}
          className="shrink-0 font-semibold text-[#D7C29A] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D7C29A]"
        >
          Get Price List
        </button>
      </div>
    </div>
  );
}
