import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { project } from "@/data/project";
import { whatsappUrl } from "@/lib/utils";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] text-[#161512]">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-full border border-[#D7C29A] bg-[#F7F3EA] p-4 text-[#35684C]">
          <CheckCircle2 size={42} />
        </div>
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-[#B18A4A]">
          Enquiry Received
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
          Thank You for Your Interest in Trehan Vista
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#6D6962]">
          Your details have been submitted successfully. The authorised project sales team will
          contact you shortly with prices, availability and site-visit assistance.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl(project.contact.whatsapp, project.whatsappMessage)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#35684C] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2f5d44]"
          >
            <MessageCircle size={18} />
            WhatsApp Sales
          </a>
          <a
            href={`tel:${project.contact.phone}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#D7C29A] px-6 py-3 text-sm font-bold text-[#161512] transition hover:bg-[#F7F3EA]"
          >
            <Phone size={18} />
            Call {project.contact.displayPhone}
          </a>
        </div>
        <Link href="/" className="mt-8 text-sm font-semibold text-[#6D6962] underline underline-offset-4">
          Back to project details
        </Link>
      </section>
    </main>
  );
}
