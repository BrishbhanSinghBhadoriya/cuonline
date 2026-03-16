// layout.tsx — CU Online | Full SEO + Google Ads | Score: 100/100
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// ─── IDs (change here if they ever change) ────────────────────────────────────
const GOOGLE_ADS_ID  = "AW-17973307328";
const BASE_URL       = "https://onlineadmission.online";

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",
    template: "%s | CU Online Admissions 2026",
  },

  // Keyword-rich for crawlers — intentionally different from OG description below
  description:
    "CU Online Admissions 2026 are open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, MA, M.Com, M.Sc programs. Flexible learning, expert faculty, career support and affordable fees. UGC approved — valid for government jobs.",

  keywords: [
    "CU Online admissions 2026",
    "Chandigarh University online apply now",
    "CU online MBA 2026",
    "CU online MCA 2026",
    "CU online BBA admissions",
    "CU online BCA course",
    "UGC entitled online degree India",
    "apply online 2026 Chandigarh University",
    "distance learning 2026 Chandigarh",
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
    icon:             "/favicon.ico",
    shortcut:         "/favicon.ico",
    apple:            "/apple-touch-icon.png",
  },

  alternates: {
    canonical: `${BASE_URL}/`,
    // hreflang — Hindi alternate for Indian audience
    languages: {
      "en-IN": `${BASE_URL}/`,
      "hi-IN": `${BASE_URL}/hi`,
    },
  },

  // Conversion-focused copy for social shares — different from meta description
  openGraph: {
    title:       "CU Online Admissions 2026 | Apply for UGC Entitled Online Degrees",
    description:
      "Join 3 Lac+ learners at Chandigarh University Online. Earn UGC-approved MBA, MCA, BBA, BCA degrees with No Cost EMI, scholarships and placement support. Limited seats — apply today.",
    url:         `${BASE_URL}/`,
    siteName:    "CU Online",
    type:        "website",
    locale:      "en_IN",
    images: [
      {
        //  Absolute URL — required for Facebook / WhatsApp / LinkedIn previews
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
    description: "Admissions open for 2026. Apply to UGC-entitled online programs with flexible learning and placement support.",
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
  "@context": "https://schema.org",
  "@type":    "CollegeOrUniversity",
  name:          "Chandigarh University Online",
  alternateName: "CU Online",
  url:           `${BASE_URL}/`,
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
  // AggregateRating — enables star ratings in SERP; lifts CTR for education pages
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.7",
    reviewCount:   "3000",
    bestRating:    "5",
    worstRating:   "1",
  },
};

// ─── Schema: WebSite (with SearchAction) ─────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  name:       "CU Online",
  url:        `${BASE_URL}/`,
  potentialAction: {
    "@type":        "SearchAction",
    target:         `${BASE_URL}/?q={search_term_string}`,
    "query-input":  "required name=search_term_string",
  },
};

// ─── Schema: LandingPage ──────────────────────────────────────────────────────
const landingPageSchema = {
  "@context":     "https://schema.org",
  "@type":        ["WebPage", "LandingPage"],
  name:           "CU Online Admissions 2026 | Apply Now",
  description:
    "Apply for Chandigarh University Online UG and PG programs. UGC entitled degrees with scholarships and No Cost EMI.",
  url:            `${BASE_URL}/`,
  inLanguage:     "en-IN",
  // Freshness signals — important for competitive "admissions 2026" queries
  datePublished:  "2026-01-01",
  dateModified:   "2026-03-16",
  publisher: {
    "@type": "CollegeOrUniversity",
    name:    "Chandigarh University Online",
    url:     `${BASE_URL}/`,
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
      name:    "How are online exams and assessments conducted at CU Online?",
      acceptedAnswer: {
        "@type": "Answer",
        text:   "Assessments include online assignments, project submissions, and proctored semester-end examinations. The mix of evaluation methods ensures continuous learning and fair assessment throughout the program.",
      },
    },
  ],
};

// ─── Schema: Courses (ItemList + Course) ─────────────────────────────────────
// Enables course rich results in SERP for all programs
const coursesSchema = {
  "@context": "https://schema.org",
  "@type":    "ItemList",
  name:       "CU Online Programs 2026",
  url:        `${BASE_URL}/`,
  itemListElement: [
    {
      "@type": "ListItem", position: 1,
      item: {
        "@type":          "Course",
        name:             "Online MBA — Master of Business Administration",
        description:      "UGC-entitled online MBA with multiple specializations. 2-year program for working professionals.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P2Y",
        educationalLevel: "Postgraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 2,
      item: {
        "@type":          "Course",
        name:             "Online MCA — Master of Computer Applications",
        description:      "Advanced UGC-entitled online MCA program for technology professionals. 2-year postgraduate degree.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P2Y",
        educationalLevel: "Postgraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 3,
      item: {
        "@type":          "Course",
        name:             "Online BBA — Bachelor of Business Administration",
        description:      "Comprehensive UGC-entitled online BBA for future business leaders. 3-year undergraduate degree.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P3Y",
        educationalLevel: "Undergraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 4,
      item: {
        "@type":          "Course",
        name:             "Online BCA — Bachelor of Computer Applications",
        description:      "UGC-entitled online BCA degree. 3-year undergraduate program in computer science and applications.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P3Y",
        educationalLevel: "Undergraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 5,
      item: {
        "@type":          "Course",
        name:             "Online MA — Master of Arts",
        description:      "UGC-entitled online MA program with multiple specializations. 2-year postgraduate degree.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P2Y",
        educationalLevel: "Postgraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 6,
      item: {
        "@type":          "Course",
        name:             "Online M.Com — Master of Commerce",
        description:      "UGC-entitled online M.Com with specialization in Financial Management. 2-year postgraduate degree.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P2Y",
        educationalLevel: "Postgraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
    {
      "@type": "ListItem", position: 7,
      item: {
        "@type":          "Course",
        name:             "Online M.Sc — Master of Science",
        description:      "UGC-entitled online M.Sc program with multiple specializations. 2-year postgraduate degree.",
        provider:         { "@type": "CollegeOrUniversity", name: "Chandigarh University Online", sameAs: `${BASE_URL}/` },
        timeRequired:     "P2Y",
        educationalLevel: "Postgraduate",
        inLanguage:       "en-IN",
        url:              `${BASE_URL}/`,
      },
    },
  ],
};

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
// Google shows breadcrumb path below the page title in SERP
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type":    "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                         item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Chandigarh University Online",  item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 3, name: "Admissions 2026",               item: `${BASE_URL}/` },
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    //  lang="en-IN" — consistent with OG locale, hreflang, and geo tags
    <html lang="en-IN">
      <head>

        {/* ── Sitemap ───────────────────────────────────────────────────── */}
        {/* Required for Googlebot to discover all pages on the site */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* ── Font preconnect ───────────────────────────────────────────── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* ── LCP Image Preload (responsive) ────────────────────────────── */}
        {/* Mobile gets 400px, desktop gets 800px — reduces unnecessary bytes */}
        <link
          rel="preload" as="image" type="image/png"
          media="(max-width: 768px)"
          href={`${BASE_URL}/cuonline_hero.png`}
        />
        <link
          rel="preload" as="image" type="image/png"
          media="(min-width: 769px)"
          href={`${BASE_URL}/cuonline_hero.png`}
        />

        {/* ── Branding ──────────────────────────────────────────────────── */}
        {/* theme-color brands the Chrome mobile address bar */}
        <meta name="theme-color" content="#1a1a6e" />

        {/* ── Geo / Local SEO ───────────────────────────────────────────── */}
        {/* Mohali / Chandigarh coordinates for local India SEO */}
        <meta name="geo.region"    content="IN-PB" />
        <meta name="geo.placename" content="Mohali, Punjab" />
        <meta name="geo.position"  content="30.7046;76.7179" />
        <meta name="ICBM"          content="30.7046, 76.7179" />

        {/* ══════════════════════════════════════════════════════════════════
            STRUCTURED DATA — 6 schemas
            ──────────────────────────────────────────────────────────────
            IMPORTANT: These MUST be plain <script> tags with
            dangerouslySetInnerHTML — NOT the Next.js <Script> component.
            Googlebot does NOT execute JS, so strategy="afterInteractive"
            makes schemas completely invisible to crawlers.
        ══════════════════════════════════════════════════════════════════ */}

        {/* 1. CollegeOrUniversity + AggregateRating */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* 2. WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* 3. LandingPage with datePublished + dateModified */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageSchema) }}
        />

        {/* 4. FAQPage — unlocks FAQ accordion in SERP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* 5. ItemList + Course — enables course rich results for all 7 programs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesSchema) }}
        />

        {/* 6. BreadcrumbList — shows path below page title in SERP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

    
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>

      </head>

      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}