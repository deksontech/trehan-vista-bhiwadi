"use client";

import { RotateCcw } from "lucide-react";
import { project } from "@/data/project";

export default function Error({ reset }: { reset: () => void }) {
  const whatsappHref = `https://wa.me/${project.contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F3EA] px-4 py-12 text-[#161512]">
      <section className="max-w-lg rounded-lg border border-[#D7C29A] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#B18A4A]">
          Trehan Vista
        </p>
        <h1 className="mt-3 font-serif text-3xl">Something did not load properly</h1>
        <p className="mt-4 text-sm leading-7 text-[#6D6962]">
          Please reload the page. If the form gives trouble, you can still call or WhatsApp the
          sales team directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md bg-[#B18A4A] px-4 py-3 text-sm font-bold text-white"
          >
            <RotateCcw size={16} />
            Reload
          </button>
          <a
            href={whatsappHref}
            className="inline-flex items-center rounded-md border border-[#D7C29A] px-4 py-3 text-sm font-bold text-[#161512]"
          >
            WhatsApp Sales
          </a>
        </div>
      </section>
    </main>
  );
}
