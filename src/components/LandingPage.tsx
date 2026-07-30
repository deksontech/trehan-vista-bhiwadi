"use client";

/* eslint-disable @next/next/no-img-element */

import {
  BadgeCheck,
  Banknote,
  Building2,
  Car,
  Check,
  ChevronDown,
  Dumbbell,
  Home,
  Landmark,
  Leaf,
  MapPin,
  ShieldCheck,
  Sofa,
  Sparkles,
  Trees,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { LeadForm } from "@/components/forms/LeadForm";
import { LeadModal } from "@/components/forms/LeadModal";
import { Container } from "@/components/ui/Container";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { PremiumButton, PremiumLink } from "@/components/ui/PremiumButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/faqs";
import { project } from "@/data/project";
import { trackEvent } from "@/lib/analytics";
import type { LeadFormValues } from "@/lib/validation";

type ModalState = {
  open: boolean;
  apartment: LeadFormValues["apartmentPreference"];
  enquiry: LeadFormValues["enquiryType"];
  cta: string;
};

const icons = [Home, Building2, Banknote, Sofa, Car];
const valueIcons = [BadgeCheck, Building2, Trees, Dumbbell, Sofa, Landmark];

export default function LandingPage() {
  const [modal, setModal] = useState<ModalState>({
    open: false,
    apartment: "Need Help Choosing",
    enquiry: "General Enquiry",
    cta: "Lead Form",
  });

  function openLead(
    enquiry: LeadFormValues["enquiryType"],
    cta: string,
    apartment: LeadFormValues["apartmentPreference"] = "Need Help Choosing",
  ) {
    setModal({ open: true, apartment, enquiry, cta });
  }

  return (
    <main id="top" className="bg-[#FFFDF8] pb-20 text-[#161512] md:pb-0">
      <AnnouncementBar onPrice={() => openLead("Latest Price List", "Announcement Price List")} />
      <Header onSiteVisit={() => openLead("Site Visit", "Header Site Visit")} />
      <HeroSection openLead={openLead} />
      <TrustStrip />
      <OverviewSection openLead={openLead} />
      <ConfigurationsSection openLead={openLead} />
      <ValueSection />
      <AmenitiesSection />
      <FurnishingSection openLead={openLead} />
      <FinanceSection openLead={openLead} />
      <GallerySection />
      <LocationSection openLead={openLead} />
      <SiteVisitSection openLead={openLead} />
      <PricingSection openLead={openLead} />
      <LeadSection />
      <FAQSection />
      <Footer />
      <FloatingWhatsApp />
      <MobileContactBar onEnquire={() => openLead("General Enquiry", "Mobile Enquire")} />
      <LeadModal
        open={modal.open}
        apartment={modal.apartment}
        enquiry={modal.enquiry}
        cta={modal.cta}
        onClose={() => setModal((value) => ({ ...value, open: false }))}
      />
    </main>
  );
}

function HeroSection({ openLead }: { openLead: LandingCta }) {
  const twoBhk = project.configurations[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#161512] text-white">
      <img
        src="/images/trehan-vista/hero.webp"
        alt="Trehan Vista residential entrance in Bhiwadi"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161512]/90 via-[#161512]/70 to-[#161512]/30" />
      <Container className="relative grid min-h-[calc(100vh-7.5rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#D7C29A]">
            Premium Residences in Sector 54, Bhiwadi
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] md:text-7xl">
            Premium 2, 3 and 4 BHK Apartments in Bhiwadi
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold text-[#F7F3EA]">
            Modern Family Living, Thoughtfully Reimagined
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">
            Discover thoughtfully planned 2, 3 and 4 BHK apartments at Trehan Vista,
            offering contemporary comforts, furnished-home options and excellent value on
            the Alwar-Bhiwadi Highway.
          </p>
          <div className="mt-7 inline-flex rounded-full border border-[#D7C29A]/60 bg-white/10 px-5 py-3 text-sm font-bold text-[#FFFDF8] backdrop-blur">
            2 BHK Apartments Starting from {twoBhk.displayPrice}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/82">
                <Check className="text-[#D7C29A]" size={18} /> {item}
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PremiumButton onClick={() => openLead("Site Visit", "Hero Site Visit")}>
              Book a Free Site Visit
            </PremiumButton>
            <PremiumButton
              variant="ghost"
              onClick={() => openLead("Latest Price List", "Hero Price List")}
            >
              Get Latest Price List
            </PremiumButton>
          </div>
          <p className="mt-4 text-xs text-white/60">Prices and availability are subject to confirmation.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="rounded-lg border border-white/20 bg-[#FFFDF8] p-5 text-[#161512] shadow-2xl sm:p-7"
        >
          <p className="font-serif text-3xl">Get Complete Project Details</p>
          <p className="mb-5 mt-2 text-sm leading-6 text-[#6D6962]">
            Request prices, plans, availability and site-visit assistance.
          </p>
          <LeadForm compact defaultEnquiry="General Enquiry" ctaClicked="Hero Form" source="Hero Form" />
        </motion.div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-[#DED7CB] bg-[#F7F3EA]">
      <Container className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5">
        {project.offers.map((item, index) => {
          const Icon = icons[index] ?? Sparkles;
          return (
            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-[#2B241E]">
              <Icon className="text-[#B18A4A]" size={18} /> {item}
            </div>
          );
        })}
      </Container>
    </section>
  );
}

function OverviewSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section id="overview" className="scroll-mt-28 py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Welcome to Trehan Vista"
            title="A Home Designed Around Everyday Comfort"
            copy="Trehan Vista brings together thoughtfully planned residences, open green spaces and modern lifestyle amenities in a well-connected Bhiwadi location. Designed for families at different stages of life, the project offers practical layouts, comfortable interiors and multiple apartment configurations."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.overviewFeatures.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-[#6D6962]">
                <Check className="mt-1 shrink-0 text-[#35684C]" size={16} /> {item}
              </div>
            ))}
          </div>
          <PremiumButton
            className="mt-8"
            onClick={() => openLead("Latest Price List", "Overview Homes")}
          >
            Explore Available Homes
          </PremiumButton>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#DED7CB] shadow-xl">
          <img
            src="/images/trehan-vista/overview.webp"
            alt="Trehan Vista layout plan and green areas"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 rounded bg-[#FFFDF8]/95 px-4 py-3 text-sm font-bold shadow">
            Trehan Vista, Sector 54, Bhiwadi
          </div>
        </div>
      </Container>
    </section>
  );
}

function ConfigurationsSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section id="homes" className="scroll-mt-28 bg-[#F7F3EA] py-20">
      <Container>
        <SectionHeading title="Find a Home That Fits Your Family" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {project.configurations.map((home) => (
            <motion.article
              key={home.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-lg border border-[#DED7CB] bg-[#FFFDF8] shadow-sm"
            >
              <div className="relative aspect-[5/3]">
                <img src={home.image} alt={home.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B18A4A]">{home.label}</p>
                <h3 className="mt-3 font-serif text-3xl">{home.title}</h3>
                <p className="mt-3 text-lg font-bold text-[#2B241E]">
                  {home.priceLabel ? `${home.priceLabel} ` : ""}
                  {home.displayPrice}
                </p>
                <ul className="mt-5 space-y-3 text-sm text-[#6D6962]">
                  {home.details.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-1 shrink-0 text-[#35684C]" size={15} /> {item}
                    </li>
                  ))}
                </ul>
                <PremiumButton
                  className="mt-6 w-full"
                  onClick={() => {
                    trackEvent("configuration_selected", { configuration: home.name });
                    openLead("Latest Price List", home.cta, home.preference);
                  }}
                >
                  {home.cta}
                </PremiumButton>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ValueSection() {
  const values = [
    ["Value-focused pricing", "Current starting prices are presented clearly for informed conversations."],
    ["Multiple apartment configurations", "Choose from practical 2, 3 and 4 BHK layouts for different family needs."],
    ["Open and green surroundings", "More than 80% open and green area supports a calmer everyday rhythm."],
    ["Lifestyle and recreation amenities", "Sports, fitness and community spaces are planned close to home."],
    ["Furnished-flat options", "Selected offerings can make the move-in journey simpler for families."],
    ["Payment and loan assistance", "Ask for current payment-plan details and eligibility-based loan assistance."],
  ];

  return (
    <section className="bg-[#161512] py-20 text-white">
      <Container>
        <SectionHeading inverse title="More Than a Home. A Better Everyday Experience." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map(([title, copy], index) => {
            const Icon = valueIcons[index] ?? Sparkles;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-lg border border-white/12 bg-white/[0.04] p-6"
              >
                <Icon className="text-[#D7C29A]" size={24} />
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{copy}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function AmenitiesSection() {
  const categoryIcons = [ShieldCheck, Dumbbell, Sparkles, Leaf];
  return (
    <section id="amenities" className="scroll-mt-28 py-20">
      <Container>
        <SectionHeading title="Everything Your Family Needs, Close to Home" />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {project.amenities.map((group, index) => {
            const Icon = categoryIcons[index] ?? Check;
            return (
              <article key={group.category} className="rounded-lg border border-[#DED7CB] bg-[#FFFDF8] p-6 shadow-sm">
                <Icon className="text-[#B18A4A]" size={24} />
                <h3 className="mt-5 font-serif text-2xl">{group.category}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#6D6962]">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-1 shrink-0 text-[#35684C]" size={14} /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function FurnishingSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section id="furnishing" className="scroll-mt-28 bg-[#F7F3EA] py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#DED7CB]">
          <img
            src="/images/trehan-vista/furnished-flat.webp"
            alt="Representative furnished flat visual for Trehan Vista"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Move-In Convenience"
            title="Furnished Homes Designed to Make Moving Easier"
            copy="Selected Trehan Vista offerings include furnished-home options with essential furniture and appliances, helping families move into a comfortable and functional home."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-[#6D6962]">
            {project.furnishingItems.map((item) => (
              <div key={item} className="flex gap-2">
                <Sofa className="mt-0.5 shrink-0 text-[#B18A4A]" size={15} /> {item}
              </div>
            ))}
          </div>
          <PremiumButton
            className="mt-8"
            onClick={() => openLead("Furnishing Details", "Furnishing Details")}
          >
            Request Furnishing Details
          </PremiumButton>
          <p className="mt-5 text-xs leading-6 text-[#6D6962]">{project.furnishingDisclaimer}</p>
        </div>
      </Container>
    </section>
  );
}

function FinanceSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="Flexible Options for Your Home-Buying Journey" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Panel
            icon={<Banknote />}
            title={project.paymentPlan.title}
            copy={project.paymentPlan.description}
            cta="Get Payment Plan"
            onClick={() => openLead("Payment Plan", "Payment Plan")}
          />
          <Panel
            icon={<Landmark />}
            title={project.loanAssistance.title}
            copy={project.loanAssistance.description}
            cta="Request Loan Assistance"
            onClick={() => openLead("Loan Assistance", "Loan Assistance")}
          />
        </div>
        <p className="mt-5 text-xs leading-6 text-[#6D6962]">{project.loanAssistance.disclaimer}</p>
      </Container>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <Container>
        <SectionHeading
          title="Lifestyle Gallery"
          copy="A mix of supplied project visuals and local representative placeholders for images that still need verified project photography."
        />
        <div className="mt-10">
          <ImageLightbox />
        </div>
      </Container>
    </section>
  );
}

function LocationSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section id="location" className="scroll-mt-28 py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            title="Conveniently Located in Sector 54, Bhiwadi"
            copy={project.location.fullAddress}
          />
          <div className="mt-8 space-y-3 text-sm text-[#6D6962]">
            {project.location.landmarks.map((item) => (
              <div key={item} className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[#B18A4A]" size={16} /> {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PremiumLink
              href={project.location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("map_clicked")}
            >
              Get Directions
            </PremiumLink>
            <PremiumButton
              variant="secondary"
              onClick={() => openLead("General Enquiry", "Location Enquiry")}
            >
              Ask About Location
            </PremiumButton>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#DED7CB] bg-[#F7F3EA]">
          <img
            src="/images/trehan-vista/location.webp"
            alt="Trehan Vista location and site layout"
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 grid place-items-center bg-[#161512]/20 p-6 text-center">
            <div className="rounded-lg bg-[#FFFDF8]/95 p-6 shadow-xl">
              <MapPin className="mx-auto mb-3 text-[#B18A4A]" />
              <p className="font-serif text-2xl">Google Maps Embed Placeholder</p>
              <p className="mt-2 text-sm text-[#6D6962]">
                Add the verified embed URL when available.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SiteVisitSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#161512] py-24 text-white">
      <img
        src="/images/trehan-vista/hero.webp"
        alt="Trehan Vista entrance for site visits"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[#161512]/65" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#D7C29A]">
            Cab facility available for site visits.
          </p>
          <h2 className="font-serif text-5xl">Experience Trehan Vista in Person</h2>
          <p className="mt-5 leading-8 text-white/76">
            Book a project visit and explore the available apartment configurations, amenities,
            furnishing options and current offers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PremiumButton onClick={() => openLead("Site Visit", "Site Visit Section")}>
              Book My Free Site Visit
            </PremiumButton>
            <PremiumLink
              href={`tel:${project.contact.phone}`}
              variant="ghost"
              onClick={() => trackEvent("phone_clicked", { placement: "site_visit" })}
            >
              Call {project.contact.displayPhone}
            </PremiumLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PricingSection({ openLead }: { openLead: LandingCta }) {
  return (
    <section className="bg-[#F7F3EA] py-20">
      <Container>
        <div className="rounded-lg border border-[#DED7CB] bg-[#FFFDF8] p-6 shadow-xl md:p-10">
          <SectionHeading title="Current Starting Prices" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {project.configurations.map((home) => (
              <div key={home.id} className="rounded-lg border border-[#DED7CB] p-5">
                <p className="text-sm font-semibold text-[#6D6962]">{home.name}</p>
                <p className="mt-2 font-serif text-3xl text-[#161512]">
                  {home.priceLabel ? `${home.priceLabel} ` : ""}
                  {home.displayPrice}
                </p>
              </div>
            ))}
          </div>
          <PremiumButton
            className="mt-8"
            onClick={() => openLead("Latest Price List", "Complete Cost Sheet")}
          >
            Get Complete Cost Sheet
          </PremiumButton>
          <p className="mt-6 text-xs leading-6 text-[#6D6962]">{project.pricing.detailedDisclaimer}</p>
        </div>
      </Container>
    </section>
  );
}

function LeadSection() {
  const points = [
    "Current price list",
    "Floor-plan information",
    "Furnishing details",
    "Payment-plan details",
    "Site-visit assistance",
  ];
  return (
    <section id="enquire" className="scroll-mt-28 py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            title="Take the Next Step Towards Your New Home"
            copy="Share your details to receive the latest price list, apartment availability, payment plan and site-visit assistance."
          />
          <div className="mt-8 grid gap-3">
            {points.map((item) => (
              <div key={item} className="flex gap-3 text-[#6D6962]">
                <Check className="mt-1 text-[#35684C]" size={17} /> {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[#DED7CB] bg-[#FFFDF8] p-5 shadow-xl sm:p-8">
          <LeadForm defaultEnquiry="Latest Price List" ctaClicked="Main Lead Form" source="Main Lead Section" />
        </div>
      </Container>
    </section>
  );
}

function FAQSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="faq" className="scroll-mt-28 bg-[#F7F3EA] py-20">
      <Container>
        <SectionHeading title="Frequently Asked Questions" />
        <div className="mt-10 divide-y divide-[#DED7CB] rounded-lg border border-[#DED7CB] bg-[#FFFDF8]">
          {faqs.map((faq, index) => {
            const open = active === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setActive(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B18A4A]"
                  aria-expanded={open}
                >
                  {faq.question}
                  <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={18} />
                </button>
                {open ? <p className="px-5 pb-5 text-sm leading-7 text-[#6D6962]">{faq.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Panel({
  icon,
  title,
  copy,
  cta,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <article className="rounded-lg border border-[#DED7CB] bg-[#FFFDF8] p-7 shadow-sm">
      <div className="mb-5 inline-flex rounded-full bg-[#F7F3EA] p-3 text-[#B18A4A]">{icon}</div>
      <h3 className="font-serif text-3xl">{title}</h3>
      <p className="mt-4 leading-7 text-[#6D6962]">{copy}</p>
      <PremiumButton className="mt-6" onClick={onClick}>
        {cta}
      </PremiumButton>
    </article>
  );
}

type LandingCta = (
  enquiry: LeadFormValues["enquiryType"],
  cta: string,
  apartment?: LeadFormValues["apartmentPreference"],
) => void;
