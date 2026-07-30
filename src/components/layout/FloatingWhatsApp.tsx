"use client";

import { MessageCircle } from "lucide-react";
import { project } from "@/data/project";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/utils";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(project.contact.whatsapp, project.whatsappMessage)}
      onClick={() => trackEvent("whatsapp_clicked", { placement: "floating" })}
      className="fixed bottom-6 right-6 z-40 hidden rounded-full bg-[#35684C] p-4 text-white shadow-2xl transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7C29A] md:inline-flex"
      aria-label="Chat with Trehan Vista sales team on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
