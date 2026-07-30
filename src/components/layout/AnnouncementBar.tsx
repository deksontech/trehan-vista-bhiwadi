"use client";

import { Mail, Phone } from "lucide-react";
import { project } from "@/data/project";
import { trackEvent } from "@/lib/analytics";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 bg-[#161512] text-[#FFFDF8]">
      <div className="mx-auto flex min-h-10 max-w-7xl flex-col justify-center gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 sm:text-sm lg:px-8">
        <p className="truncate">
          2 & 3 BHK Apartments in Bhiwadi | Starting from {project.pricing.displayStartingPrice}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-semibold text-[#D7C29A]">
          <a
            href={`tel:${project.contact.phone}`}
            onClick={() => trackEvent("phone_clicked", { placement: "announcement_bar" })}
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D7C29A]"
          >
            <Phone size={14} aria-hidden="true" />
            {project.contact.displayPhone}
          </a>
          <a
            href={`mailto:${project.contact.email}`}
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D7C29A]"
          >
            <Mail size={14} aria-hidden="true" />
            {project.contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}
