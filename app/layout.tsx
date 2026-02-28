import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",
    template: "%s | CU Online Admissions 2026",
  },
  description:
    "CU Online Admissions 2026 are open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, MA, M.Com, M.Sc programs. Flexible learning, expert faculty, career support and affordable fees.",
  keywords: [
    "CU Online",
    "Admissions 2026",
    "Online MBA 2026",
    "Online MCA 2026",
    "Online BBA",
    "Online BCA",
    "UGC entitled online degree",
    "Apply online 2026",
    "Distance learning 2026",
    "Online university India",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",
    description:
      "Enroll in CU Online Admissions 2026 for MBA, MCA, BBA, BCA, MA, M.Com, M.Sc. Learn from industry experts with career support and flexible schedules.",
    url: "/",
    siteName: "CU Online",
    type: "website",
    images: [
      {
        url: "/cuonline_hero.png",
        width: 1200,
        height: 630,
        alt: "CU Online Admissions 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CU Online Admissions 2026 | Apply Now",
    description:
      "Admissions open for 2026. Apply to UGC-entitled online programs with flexible learning and placement support.",
    images: ["/cuonline_hero.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollegeOrUniversity",
              name: "CU Online",
              url: "/",
              logo: "/favicon.ico",
              sameAs: [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.linkedin.com/",
                "https://x.com/",
              ],
              description:
                "CU Online Admissions 2026 for UGC-entitled online degrees in MBA, MCA, BBA, BCA, MA, M.Com, M.Sc.",
            }),
          }}
        />
        <Script
          id="site-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "CU Online",
              url: "/",
              potentialAction: {
                "@type": "SearchAction",
                target: "/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are CU Online Admissions 2026 open?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes. CU Online Admissions 2026 are open for MBA, MCA, BBA, BCA, MA, M.Com, and M.Sc programs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are CU Online degrees UGC entitled?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. CU Online offers UGC-entitled online degree programs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do I apply for admission in 2026?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Fill the enquiry form on the website and our counsellor will contact you within 24 hours to guide you through the application process.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
