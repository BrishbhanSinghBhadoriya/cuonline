import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlinecu.in"),
  title: {
    default: "CU Online Admissions 2026 | Study UGC Entitled Online Degrees",
    template: "%s | CU Online Admissions 2026",
  },
  description:
    "CU Online Admissions 2026 are open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, MA, M.Com, M.Sc programs. Flexible learning, expert faculty, career support and affordable fees.",
  keywords: [
    "CU Online",
    "Admissions 2026",
    "Online MBA 2026",
    "Online MCA 2026",
    "Online BBA Admissions",
    "Online BCA Course",
    "UGC entitled online degree India",
    "Apply online 2026 Chandigarh University",
    "Distance learning 2026 Chandigarh",
    "Online university India 2026",
    "Best Online MBA program 2026",
    "Chandigarh University Online Learning",
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
          id="course-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Course",
                  "position": 1,
                  "name": "Online MBA",
                  "description": "UGC entitled online MBA program with flexible learning.",
                  "provider": {
                    "@type": "CollegeOrUniversity",
                    "name": "Chandigarh University Online",
                    "sameAs": "https://www.onlinecu.in"
                  }
                },
                {
                  "@type": "Course",
                  "position": 2,
                  "name": "Online MCA",
                  "description": "Advanced online MCA program for technology professionals.",
                  "provider": {
                    "@type": "CollegeOrUniversity",
                    "name": "Chandigarh University Online",
                    "sameAs": "https://www.onlinecu.in"
                  }
                },
                {
                  "@type": "Course",
                  "position": 3,
                  "name": "Online BBA",
                  "description": "Comprehensive online BBA program for future business leaders.",
                  "provider": {
                    "@type": "CollegeOrUniversity",
                    "name": "Chandigarh University Online",
                    "sameAs": "https://www.onlinecu.in"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}

        {/* ✅ CU Online Google Ads Scripts - AW-XXXXXXXXX replace karo */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17973307328"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17973307328');
          `}
        </Script>

      </body>
    </html>
  );
}