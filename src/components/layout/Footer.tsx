/* eslint-disable @next/next/no-img-element */

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { project } from "@/data/project";
import { whatsappUrl } from "@/lib/utils";

export function Footer() {
  const links = [
    ["Overview", "#overview"],
    ["Homes", "#homes"],
    ["Amenities", "#amenities"],
    ["Location", "#location"],
    ["FAQ", "#faq"],
    ["Privacy Policy", "/privacy-policy"],
    ["Disclaimer", "/disclaimer"],
  ];

  return (
    <footer className="bg-[#161512] pb-24 pt-14 text-white md:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <img
            src="/images/trehan-vista/logo.webp"
            alt={`${project.name} logo`}
            width={160}
            height={100}
            className="mb-5 h-auto w-36 rounded bg-white p-2"
          />
          <p className="max-w-md text-sm leading-7 text-white/70">
            {project.name} is a residential campaign microsite for families exploring
            modern 2, 3 and 4 BHK apartments in Sector 54, Bhiwadi.
          </p>
          <p className="mt-5 text-xs text-white/55">
            RERA Number: To be updated after verified project details are received.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-white/72 transition hover:text-[#D7C29A]">
              {label}
            </a>
          ))}
        </nav>
        <div className="space-y-4 text-sm text-white/72">
          <a href={`tel:${project.contact.phone}`} className="flex gap-3 hover:text-[#D7C29A]">
            <Phone size={18} /> {project.contact.displayPhone}
          </a>
          <a href={`mailto:${project.contact.email}`} className="flex gap-3 hover:text-[#D7C29A]">
            <Mail size={18} /> {project.contact.email}
          </a>
          <a
            href={whatsappUrl(project.contact.whatsapp, project.whatsappMessage)}
            className="flex gap-3 hover:text-[#D7C29A]"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <p className="flex gap-3">
            <MapPin size={18} className="mt-1 shrink-0" /> {project.location.fullAddress}
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-4 text-xs leading-6 text-white/50 sm:px-6 lg:px-8">
        <p>{project.footerDisclaimer}</p>
        <p className="mt-5">Copyright {new Date().getFullYear()} {project.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
