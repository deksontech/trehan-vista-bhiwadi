"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-auto rounded-lg bg-[#FFFDF8] p-5 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-[#DED7CB] p-2 text-[#161512] transition hover:bg-[#F7F3EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B18A4A]"
          aria-label="Close enquiry form"
        >
          <X size={18} />
        </button>
        <h2 id="lead-modal-title" className="pr-10 font-serif text-3xl text-[#161512]">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
