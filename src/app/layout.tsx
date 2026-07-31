import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { project } from "@/data/project";
import { GOOGLE_ADS_LEAD_CONVERSION_ID } from "@/lib/analytics";
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
const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XWSRNWQE4J";
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
      <body className={`${heading.variable} ${body.variable}`}>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': '${GOOGLE_ADS_LEAD_CONVERSION_ID}',
                'event_callback': callback
              });
              return false;
            }
            window.gtag_report_conversion = gtag_report_conversion;
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
