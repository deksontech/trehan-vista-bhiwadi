"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import { project } from "@/data/project";
import { trackEvent } from "@/lib/analytics";
import { whatsappUrl } from "@/lib/utils";

export function MobileContactBar({ onEnquire }: { onEnquire: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#DED7CB] bg-[#FFFDF8] px-3 py-2 shadow-2xl md:hidden">
      <div className="grid grid-cols-3 gap-2 pb-[env(safe-area-inset-bottom)]">
        <a
          href={`tel:${project.contact.phone}`}
          onClick={() => trackEvent("phone_clicked", { placement: "mobile_bar" })}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#161512] text-xs font-bold text-white"
          aria-label={`Call ${project.contact.displayPhone}`}
        >
          <Phone size={16} /> Call
        </a>
        <a
          href={whatsappUrl(project.contact.whatsapp, project.whatsappMessage)}
          onClick={() => trackEvent("whatsapp_clicked", { placement: "mobile_bar" })}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#35684C] text-xs font-bold text-white"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <button
          type="button"
          onClick={onEnquire}
          className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#B18A4A] text-xs font-bold text-white"
        >
          <Send size={16} /> Enquire
        </button>
      </div>
    </div>
  );
}
