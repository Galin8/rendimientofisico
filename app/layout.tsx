import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://rendimientofisico.com";
const ADSENSE_ID = "ca-pub-9649239009303767";
const GA4_ID = "G-XXXXXXXXXX";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rendimiento Físico — Nutrición y Entrenamiento Deportivo",
    template: "%s | Rendimiento Físico",
  },
  description:
    "Guías de nutrición deportiva, suplementación, CrossFit y pérdida de grasa basadas en evidencia. Mejora tu rendimiento y físico.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Rendimiento Físico",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rendimientofis",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rendimiento Físico",
  url: SITE_URL,
  description:
    "Nutrición deportiva, CrossFit, suplementación y pérdida de grasa.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics 4 — activar cuando tengas el Measurement ID real */}
        {/* <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              send_page_view: true,
            });
          `}
        </Script> */}
      </body>
    </html>
  );
}
