import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300","400","500","600","700","800","900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlinecu.in"),
  title: "CU Online Admissions 2026 | Study UGC Entitled Online Degrees",
  description:
    "CU Online Admissions 2026 are open. Apply for UGC-entitled online MBA, MCA, BBA, BCA, MA, M.Com, M.Sc programs. Flexible learning, expert faculty, career support and affordable fees.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>

        {/* ✅ Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1230848505368304');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ✅ SEO & Schema Scripts */}
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
                "https://x.com/"
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
              itemListElement: [
                {
                  "@type": "Course",
                  position: 1,
                  name: "Online MBA",
                  description:
                    "UGC entitled online MBA program with flexible learning.",
                  provider: {
                    "@type": "CollegeOrUniversity",
                    name: "Chandigarh University Online",
                    sameAs: "https://www.onlinecu.in",
                  },
                },
                {
                  "@type": "Course",
                  position: 2,
                  name: "Online MCA",
                  description:
                    "Advanced online MCA program for technology professionals.",
                  provider: {
                    "@type": "CollegeOrUniversity",
                    name: "Chandigarh University Online",
                    sameAs: "https://www.onlinecu.in",
                  },
                },
                {
                  "@type": "Course",
                  position: 3,
                  name: "Online BBA",
                  description:
                    "Comprehensive online BBA program for future business leaders.",
                  provider: {
                    "@type": "CollegeOrUniversity",
                    name: "Chandigarh University Online",
                    sameAs: "https://www.onlinecu.in",
                  },
                },
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}