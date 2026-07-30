import LandingPage from "@/components/LandingPage";
import { faqs } from "@/data/faqs";
import { project } from "@/data/project";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ApartmentComplex",
      name: project.name,
      description: project.tagline,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${project.location.sector}, ${project.location.road}, ${project.location.landmark}`,
        addressLocality: project.location.city,
        addressRegion: project.location.state,
        postalCode: project.location.postalCode,
        addressCountry: "IN",
      },
      telephone: project.contact.displayPhone,
      email: project.contact.email,
      image: "/images/trehan-vista/hero.webp",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: project.name,
      email: project.contact.email,
      telephone: project.contact.displayPhone,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.NEXT_PUBLIC_SITE_URL || "https://trehanvistagroup.com",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingPage />
    </>
  );
}
