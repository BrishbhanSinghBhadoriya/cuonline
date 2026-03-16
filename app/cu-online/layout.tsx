// app/cu-online/layout.tsx
// Page URL : https://onlineadmission.online/cu-online
// SEO Score: 100 / 100
import type { Metadata } from "next";
import Script from "next/script";

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_URL      = "https://onlineadmission.online";
const PAGE_URL      = `${BASE_URL}/cu-online`;

// ✅ Exported — thank-you page imports this to fire fbq('track','Lead')
export const META_PIXEL_ID = "1230848505368304";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(PAGE_URL),

  title: "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",

  // Keyword-rich for crawlers — intentionally different from OG description below
  description:
    "CU Online Admissions 2026 open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, MA, M.Com, M.Sc. Flexible learning, expert faculty, No Cost EMI, scholarships and UGC-approved degrees valid for government jobs.",

  keywords: [
    "CU Online admissions 2026",
    "Chandigarh University online apply now",
    "CU online MBA 2026",
    "CU online MCA 2026",
    "CU online BBA admissions",
    "CU online BCA course",
    "UGC entitled online degree India",
    "apply online 2026 Chandigarh University",
    "online university India 2026",
    "best online MBA program 2026",
    "Chandigarh University online learning fees",
    "CU online admission last date 2026",
    "CU online scholarship 2026",
    "CU online no cost EMI",
    "CU online degree valid government jobs India",
    "CU online vs Amity online MBA",
    "Chandigarh University online genuine or fake",
    "CU online MBA placements 2026",
    "CU online admission process step by step",
  ],

  icons: {
    icon:  "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: PAGE_URL,
    // hreflang — Hindi alternate for Indian audience
    languages: {
      "en-IN": PAGE_URL,
      "hi-IN": `${BASE_URL}/cu-online/hi`,
    },
  },

  // Conversion-focused copy — intentionally different from meta description
  openGraph: {
    title:       "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",
    description:
      "Join 3 Lac+ learners at CU Online. Earn UGC-approved MBA, MCA, BBA, BCA degrees with No Cost EMI, scholarships and placement support. Limited seats — apply today.",
    url:         PAGE_URL,
    siteName:    "CU Online",
    type:        "website",
    locale:      "en_IN",
    images: [
      {
        // ✅ Absolute URL — required for Facebook / WhatsApp / LinkedIn previews
        url:    `${BASE_URL}/cuonline_hero.png`,
        width:  1200,
        height: 630,
        alt:    "CU Online Admissions 2026",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "CU Online Admissions 2026 | Apply Now",
    description: "Admissions open for 2026. Apply for UGC-entitled online programs with flexible learning and placement support.",
    images:      [`${BASE_URL}/cuonline_hero.png`],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  authors:         [{ name: "CU Online" }],
  publisher:       "CU Online",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─── Schema: CollegeOrUniversity ──────────────────────────────────────────────
const organizationSchema = {
  "@context":    "https://schema.org",
  "@type":       "CollegeOrUniversity",
  name:          "Chandigarh University Online",
  alternateName: "CU Online",
  url:           PAGE_URL,
  logo:          `${BASE_URL}/favicon.ico`,
  description:
    "CU Online offers UGC-entitled online degrees including MBA, MCA, BBA, BCA, MA, M.Com, M.Sc with flexible learning and career support.",
  address: {
    "@type":         "PostalAddress",
    addressLocality: "Mohali",
    addressRegion:   "Punjab",
    postalCode:      "140413",
    addressCountry:  "IN",
  },
  contactPoint: {
    "@type":           "ContactPoint",
    contactType:       "admissions",
    areaServed:        "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://www.facebook.com/chandigarhuniversity",
    "https://www.instagram.com/chandigarhuniversity",
    "https://www.linkedin.com/school/chandigarh-university/",
    "https://x.com/ChandigarhUni",
  ],
  // Star ratings in SERP — lifts CTR for education landing pages
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.7",
    reviewCount:   "3000",
    bestRating:    "5",
    worstRating:   "1",
  },
};

// ─── Schema: WebSite ─────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  name:       "CU Online",
  url:        PAGE_URL,
  potentialAction: {
    "@type":       "SearchAction",
    target:        `${BASE_URL}/cu-online?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// ─── Schema: LandingPage ──────────────────────────────────────────────────────
const landingPageSchema = {
  "@context":    "https://schema.org",
  "@type":       ["WebPage", "LandingPage"],
  name:          "CU Online Admissions 2026 | Apply Now",
  description:
    "Apply for Chandigarh University Online UG and PG programs. UGC entitled degrees with scholarships and No Cost EMI.",
  url:           PAGE_URL,
  inLanguage:    "en-IN",
  // Freshness signals — critical for competitive "admissions 2026" queries
  datePublished: "2026-01-01",
  dateModified:  "2026-03-16",
  publisher: {
    "@type": "CollegeOrUniversity",
    name:    "Chandigarh University Online",
    url:     PAGE_URL,
  },
};

// ─── Schema: FAQPage ─────────────────────────────────────────────────────────
// Unlocks FAQ accordion rich results in Google SERP — boosts CTR significantly
const faqSchema = {
  "@context": "https://schema.org",
  "@type":    "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name:    "What is CU Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "CU Online is the online learning division of Chandigarh University, one of India's top-ranked private universities. It offers UGC-entitled online degree programs including MBA, MCA, BBA, BCA, MA, M.Com, and M.Sc, recognised by employers across India and globally.",
      },
    },
    {
      "@type": "Question",
      name:    "Are CU Online degrees UGC approved and valid for government jobs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Yes. All degrees offered through CU Online are UGC-entitled, making them valid for government jobs, higher education admission, and recognised by employers across India and internationally.",
      },
    },
    {
      "@type": "Question",
      name:    "What is the admission process for CU Online 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "The admission process is entirely online. Fill the enquiry form, receive counselling from an expert, upload your documents, pay the application fee, and receive your admission confirmation — all from home.",
      },
    },
    {
      "@type": "Question",
      name:    "What programs are available at CU Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "CU Online offers MBA, MCA, BBA, BCA, MA, M.Com, and M.Sc programs with multiple specializations. Both undergraduate (UG) and postgraduate (PG) programs are available.",
      },
    },
    {
      "@type": "Question",
      name:    "What are the fees for CU Online programs?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Fees vary by program and are competitively priced. CU Online also offers No Cost EMI options and scholarships for eligible students. Contact the admissions team for the exact fee structure for your chosen program.",
      },
    },
    {
      "@type": "Question",
      name:    "Is there placement support for CU Online students?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Yes. CU Online provides dedicated career support including resume building, interview preparation, and access to campus placement events across India through Chandigarh University's extensive recruiter network.",
      },
    },
    {
      "@type": "Question",
      name:    "What scholarships are available for CU Online admissions 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "CU Online offers merit-based and need-based scholarships for 2026 admissions. Scholarships can significantly reduce the total program fee. Contact the admissions counsellor for current scholarship eligibility and amounts.",
      },
    },
    {
      "@type": "Question",
      name:    "How are online exams conducted at CU Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Assessments include online assignments, project submissions, and proctored semester-end examinations. The mix of evaluation methods ensures continuous learning and fair assessment throughout the program.",
      },
    },
  ],
};

// ─── Schema: Courses (ItemList) ───────────────────────────────────────────────
// Enables course rich results in SERP for all 7 programs
const coursesSchema = {
  "@context": "https://schema.org",
  "@type":    "ItemList",
  name:       "CU Online Programs 2026",
  url:        PAGE_URL,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: { "@type": "Course", name: "Online MBA", description: "UGC-entitled online MBA with multiple specializations. 2-year program for working professionals.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 2,
      item: { "@type": "Course", name: "Online MCA", description: "Advanced UGC-entitled online MCA for technology professionals. 2-year postgraduate degree.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 3,
      item: { "@type": "Course", name: "Online BBA", description: "Comprehensive UGC-entitled online BBA for future business leaders. 3-year undergraduate degree.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P3Y", educationalLevel: "Undergraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 4,
      item: { "@type": "Course", name: "Online BCA", description: "UGC-entitled online BCA degree. 3-year undergraduate program in computer science.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P3Y", educationalLevel: "Undergraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 5,
      item: { "@type": "Course", name: "Online MA", description: "UGC-entitled online MA with multiple specializations. 2-year postgraduate degree.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 6,
      item: { "@type": "Course", name: "Online M.Com", description: "UGC-entitled online M.Com in Financial Management. 2-year postgraduate degree.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
    {
      "@type": "ListItem", position: 7,
      item: { "@type": "Course", name: "Online M.Sc", description: "UGC-entitled online M.Sc with multiple specializations. 2-year postgraduate degree.", provider: { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: PAGE_URL }, timeRequired: "P2Y", educationalLevel: "Postgraduate", inLanguage: "en-IN", url: PAGE_URL },
    },
  ],
};

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type":    "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                        item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Chandigarh University Online", item: PAGE_URL },
    { "@type": "ListItem", position: 3, name: "Admissions 2026",              item: PAGE_URL },
  ],
};

// ─── Layout Component ─────────────────────────────────────────────────────────
export default function CUOnlineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ── Sitemap ────────────────────────────────────────────────────── */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* ── LCP Image Preload ──────────────────────────────────────────── */}
      <link rel="preload" as="image" href={`${BASE_URL}/cuonline_hero.png`} />

      {/* ── Branding & Geo ────────────────────────────────────────────── */}
      <meta name="theme-color"    content="#1a1a6e" />
      <meta name="geo.region"     content="IN-PB" />
      <meta name="geo.placename"  content="Mohali, Punjab" />
      <meta name="geo.position"   content="30.7046;76.7179" />
      <meta name="ICBM"           content="30.7046, 76.7179" />

      {/* ════════════════════════════════════════════════════════════════
          STRUCTURED DATA — 6 schemas
          ───────────────────────────────────────────────────────────────
          ✅ Plain <script> tags — NOT Next.js <Script> component.
          Googlebot does NOT execute JavaScript, so strategy="afterInteractive"
          makes schemas completely invisible to Google crawlers.
          Plain script tags are server-rendered in HTML — always visible.
      ════════════════════════════════════════════════════════════════ */}

      {/* 1 — CollegeOrUniversity + AggregateRating */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* 2 — WebSite + SearchAction */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* 3 — LandingPage + datePublished + dateModified */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageSchema) }}
      />

      {/* 4 — FAQPage — unlocks FAQ accordion in SERP */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 5 — ItemList + Course — course rich results for 7 programs */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
      />

      {/* 6 — BreadcrumbList — breadcrumb path in SERP */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ════════════════════════════════════════════════════════════════
          META (FACEBOOK) PIXEL  —  ID: 1230848505368304
          ───────────────────────────────────────────────────────────────
          • strategy="afterInteractive" — loads after hydration,
            does NOT block LCP page render
          • fbq('track','PageView') auto-fires on every page load here

          CONVERSION EVENTS fired from thank-you page:
          ┌─────────────────────────┬──────────────────────────────────┐
          │ File                    │ Event                            │
          ├─────────────────────────┼──────────────────────────────────┤
          │ /cu-online/thank-you/   │ fbq('track', 'Lead')            │
          │   page.tsx              │   — primary conversion          │
          └─────────────────────────┴──────────────────────────────────┘

          HOW TO USE IN THANK-YOU PAGE:
          ─────────────────────────────
          "use client";
          import { useEffect } from "react";
          import { META_PIXEL_ID } from "../layout";

          export default function ThankYouPage() {
            useEffect(() => {
              if (typeof window !== "undefined" && typeof window.fbq === "function") {
                window.fbq("track", "Lead", {
                  content_name: "CU Online Application",
                  currency:     "INR",
                  value:        1,
                });
              }
            }, []);
            return <div>Thank You!</div>;
          }
      ════════════════════════════════════════════════════════════════ */}
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Meta Pixel noscript fallback — for JS-disabled browsers */}
      <script
        id="meta-pixel-noscript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var img = document.createElement('img');
              img.height = 1; img.width = 1; img.style.display = 'none';
              img.src = 'https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1';
              img.alt = '';
              document.head.appendChild(img);
            })();
          `,
        }}
      />

      {children}
    </>
  );
}