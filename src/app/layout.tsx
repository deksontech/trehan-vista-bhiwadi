import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { project } from "@/data/project";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trehanvistagroup.com";
const title = `${project.name} Bhiwadi | 2 & 3 BHK Flats from ${project.pricing.displayStartingPrice}`;
const description = `Explore 2, 3 and 4 BHK apartments at ${project.name} in Sector 54, Bhiwadi. 2 BHK homes start from ${project.configurations[0].displayPriceLower} and 3 BHK homes from ${project.configurations[1].displayPriceLower}. Request prices, floor plans and a site visit.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: project.name,
    type: "website",
    images: [
      {
        url: "/images/trehan-vista/hero.webp",
        width: 1200,
        height: 900,
        alt: "Trehan Vista residential entrance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/trehan-vista/hero.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#161512",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
