"use client";

/* eslint-disable @next/next/no-img-element */

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { project } from "@/data/project";

export function ImageLightbox() {
  const [active, setActive] = useState<number | null>(null);
  const image = active === null ? null : project.gallery[active];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {project.gallery.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setActive(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#DED7CB] bg-[#F7F3EA] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B18A4A]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm font-semibold text-white">
              {item.label}
              {!item.actual ? (
                <span className="block text-xs font-normal text-white/75">
                  Representative visual
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
      {image ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#161512]"
            onClick={() => setActive(null)}
            aria-label="Close gallery image"
          >
            <X size={20} />
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl" onMouseDown={(e) => e.stopPropagation()}>
            <img src={image.src} alt={image.alt} className="h-full w-full object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
