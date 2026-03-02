"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Enquiry from "@/components/Enquiry";
import Image from "next/image";
// ── Types ──────────────────────────────────────────────────────────────
interface Program {
  title: string;
  eligibility: string;
  duration: string;
  fee: string;
  originalFee: string;
  tag?: string;
}

interface Stat {
  value: string;
  label: string;
}

function programFullForm(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("mba")) return "Master of Business Administration";
  if (t.includes("mca")) return "Master of Computer Applications";
  if (t.includes("ma english")) return "Master of Arts (English)";
  if (t.includes("m.sc data science")) return "Master of Science (Data Science)";
  if (t.includes("m.sc mathematics")) return "Master of Science (Mathematics)";
  if (t.includes("m.sc")) return "Master of Science";
  if (t.includes("m.com")) return "Master of Commerce";
  if (t.includes("bba")) return "Bachelor of Business Administration";
  if (t.includes("bca")) return "Bachelor of Computer Applications";
  if (t.includes("ba")) return "Bachelor of Arts";
  if (t.includes("bba business analytics")) return "Bachelor of Business Administration (Business Analytics)";
  return "";
}
// ── Data ────────────────────────────────────────────────────────────────
const stats: Stat[] = [
  { value: "25000+", label: "Students Currently Enrolled" },
  { value: "1000+", label: "Industry Expert Faculty Members" },
  { value: "800+", label: "Placement Partners Across Globe" },
  { value: "2500+", label: "Students Placed Successfully" },
  { value: "4000+", label: "Courses & Certifications Available" },
];
const ugPrograms: Program[] = [
  {
    title: "Online BBA",
    eligibility: "10+2 (Any Board)",
    duration: "3 years",
    fee: "₹ 21,875",
    originalFee: "₹ 29,167",
  },

  {
    title: "Online BCA",
    eligibility: "10+2 (Any Board)",
    duration: "3 years",
    fee: "₹ 22,125",
    originalFee: "₹ 29,500",
  },

  {
    title: "Online BA-JMC",
    eligibility: "10+2 (Any Board)",
    duration: "3 years",
    fee: "₹ 21,875",
    originalFee: "₹ 29,167",
  },
  {
    title: "Online BBA Business Analytics",
    eligibility: "10+2 (Any Board)",
    duration: "3 years",
    fee: "₹ 27,550",
    originalFee: "₹ 31,667",
  },
];
const pgPrograms: Program[] = [
  {
    title: "Online MBA",
    eligibility: "Bachelors (Any Discipline)",
    duration: "2 years",
    fee: "₹ 41,250",
    originalFee: "₹ 55,000",
    tag: "BESTSELLER",
  },
  {
    title: "Online MBA Business Analytics",
    eligibility: "Bachelors (Any Discipline)",
    duration: "2 years",
    fee: "₹ 45,000",
    originalFee: "₹ 50,500",
  },
  {
    title: "Online MCA",
    eligibility: "Master of Computer Application",
    duration: "2 years",
    fee: "₹ 29,063",
    originalFee: "₹ 38,750",
  },
  {
    title: "Online MA English",
    eligibility: "Bachelors in English Disciplines",
    duration: "2 years",
    fee: "₹ 18,750",
    originalFee: "₹ 25,000",
  },
  {
    title: "Online MA Economics",
    eligibility: "Bachelors in Economics",
    duration: "2 years",
    fee: "₹ 18,750",
    originalFee: "₹ 25,000",
  },
  {
    title: "Online M.Sc Data Science",
    eligibility: "Bachelors in Science/IT",
    duration: "2 years",
    fee: "₹ 25,750",
    originalFee: "₹ 36,667",
  },
  {
    title: "Online M.Sc Mathematics",
    eligibility: "Bachelors in Mathematics",
    duration: "2 years",
    fee: "₹ 18,750",
    originalFee: "₹ 25,000",
  },
  {
    title: "Online MA-JMC",
    eligibility: "10+2 (Any Board)",
    duration: "3 years",
    fee: "₹ 21,188",
    originalFee: "₹ 36,250",
  },
];

// ─── Reusable "Apply / Enquire" button ────────────────────────────────
interface CTABtnProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}
function CTABtn({ onClick, children, className = "" }: CTABtnProps): React.ReactElement {
  return (
    <button
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold transition-all shadow-md ${className}`}
    >
      {children}
    </button>
  );
}

// ── Main Component ──────────────────────────────────────────────────────
export default function CUOnlinePage(): React.ReactElement {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [heroData, setHeroData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    city: "",
  });
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroError, setHeroError] = useState<string>("");
  const [heroSuccess, setHeroSuccess] = useState<string>("");

  const heroProgramOptions = [
    "MBA",
    "MCA",
    "M.Sc Data Science",
    "BCA",
    "BBA",
    "MA English",
    "BA",
    "M.Com",
    "M.Sc Mathematics",
  ];

  const updateHero =
    (field: keyof typeof heroData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setHeroData((d) => ({ ...d, [field]: value }));
      };

  const validateHero = (): string | null => {
    if (!heroData.name.trim() || heroData.name.trim().length < 2) return "Enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(heroData.email.trim())) return "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(heroData.phone.replace(/\s/g, ""))) return "Enter a valid 10-digit mobile";
    if (!heroData.city.trim()) return "Enter your city";
    if (!heroData.program.trim()) return "Select a program";
    return null;
  };

  const submitHero = async (): Promise<void> => {
    setHeroError("");
    setHeroSuccess("");
    const v = validateHero();
    if (v) {
      setHeroError(v);
      return;
    }
    setHeroSubmitting(true);
    try {
      const sid = typeof window !== "undefined" ? (new URLSearchParams(window.location.search).get("sid") || new URLSearchParams(window.location.search).get("sourceId") || "") : "";
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: heroData.name.trim(),
          email: heroData.email.trim(),
          phone: heroData.phone.trim(),
          program: heroData.program.trim(),
          city: heroData.city.trim(),
          message: "",
          sourceId: sid,
          source: currentUrl,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(typeof j.error === "string" ? j.error : "Failed to submit");
      }
      setHeroSuccess("Enquiry submitted successfully");
      setHeroData({ name: "", email: "", phone: "", program: "", city: "" });
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000);
    } catch (e) {
      setHeroError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setHeroSubmitting(false);
    }
  };

  // ── Modal helpers ──────────────────────────────────────────────────
  const openModal = useCallback((program = ""): void => {
    setSelectedProgram(program);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback((): void => setModalOpen(false), []);

  // ── Filter programs ────────────────────────────────────────────────


  return (
    <div className="min-h-screen bg-white">

      {/* ═══ ENQUIRY MODAL — single instance, used everywhere ═══════════ */}
      <Enquiry
        isOpen={modalOpen}
        onClose={closeModal}
        defaultProgram={selectedProgram}
      />

      {/* ─── FLOATING ENQUIRE BUTTON (always visible) ────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <CTABtn
          onClick={() => openModal()}
          className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm md:text-base shadow-2xl flex items-center justify-center gap-2"
        >
          Admissions are Open — Chat Now
        </CTABtn>
      </div>

      {/* ─── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={140}
            height={50}
            priority
            className="h-12 w-auto"
          />
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[300px] md:h-[900px] flex items-center">

        {/* Background Image (behind content) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cuonline_hero.png"
            alt="Background"
            fill
            priority
            className="object-contain md:object-cover object-center"
          />
          <div className="absolute inset-0 " />
        </div>

        {/* Content overlay (desktop only) */}
        <div className="relative z-12 w-full hidden md:block">
          <div className="max-w-7xl mx-auto px-4 py-1 w-full flex items-center justify-end">
            <div className="bg-white  p-6 shadow-2xl text-gray-800 border-t-4 border-red-600 max-w-md w-full mr-12">

              <h1 className="sr-only">Chandigarh University Online Admissions 2026 - Apply for UGC Entitled Online Degrees</h1>
              <h2 className="text-gray-900 font-extrabold text-lg mb-1">
                Sign Up for a Free Career Counselling Session!
              </h2>


              <div className="space-y-3">
                {heroError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2 text-xs">{heroError}</div>}
                {heroSuccess && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-xs">{heroSuccess}</div>}

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={heroData.name}
                  onChange={updateHero("name")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  value={heroData.email}
                  onChange={updateHero("email")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />

                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={heroData.phone}
                  onChange={updateHero("phone")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />

                <select
                  value={heroData.program}
                  onChange={updateHero("program")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                >
                  <option value="">Select Program *</option>
                  {heroProgramOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Enter Your City *"
                  value={heroData.city}
                  onChange={updateHero("city")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
                />




                <button
                  disabled={heroSubmitting}
                  onClick={submitHero}
                  className="w-full py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition"
                >
                  {heroSubmitting ? "Your Enquiry are submitting..." : "Register Now — It's Free →"}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  🔒 Your data is 100% secure. No spam.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile form below hero */}
      <section className="block md:hidden px-4 py-6">
        <div className="bg-white  p-6 shadow-2xl text-gray-800 border-t-4 border-red-600 max-w-md w-full mx-auto">
          <h2 className="text-gray-900 font-extrabold text-lg mb-1">Sign Up for a Free Career Counselling Session!</h2>

          <div className="space-y-3">
            {heroError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2 text-xs">{heroError}</div>}
            {heroSuccess && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-xs">{heroSuccess}</div>}
            <input type="text" placeholder="Full Name *" value={heroData.name} onChange={updateHero("name")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="email" placeholder="Email Address *" value={heroData.email} onChange={updateHero("email")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <input type="tel" placeholder="Phone Number *" value={heroData.phone} onChange={updateHero("phone")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <select value={heroData.program} onChange={updateHero("program")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
              <option value="">Select Program *</option>
              {heroProgramOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input type="text" placeholder="Enter Your City *" value={heroData.city} onChange={updateHero("city")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm" />
            <button disabled={heroSubmitting} onClick={submitHero} className="w-full py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition">
              {heroSubmitting ? "Your Enquiry are submitting..." : "Register Now — It's Free →"}
            </button>
            <p className="text-gray-400 text-xs text-center">🔒 Your data is 100% secure. No spam.</p>
          </div>
        </div>
      </section>
      {/* popular section */}
      <section className="bg-black py-10 px-2" aria-label="Recognition and Media Presence">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">

          <Image src="/1.1.png" alt="Recognition Logo 1" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/2.1.png" alt="Recognition Logo 2" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/3.1.png" alt="Recognition Logo 3" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/4.1.png" alt="Recognition Logo 4" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />

          <Image src="/1.2.png" alt="Recognition Logo 5" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/2.2.png" alt="Recognition Logo 6" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/3.2.png" alt="Recognition Logo 7" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />
          <Image src="/4.2.png" alt="Recognition Logo 8" width={240} height={144} className="w-40 md:w-60 h-28 md:h-36 object-contain" />

        </div>
      </section>
      {/* ─── STATS ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-3xl text-black-500 font-bold uppercase tracking-widest mb-6">
            Unparalleled Benchmarks In{" "}
            <span className="text-white bg-red-600 rounded-md px-2 py-1">
              Higher Education
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {stats.map((s) => (
              <div
                key={s.value}
                className="group text-center bg-white  p-6 shadow-sm border border-gray-100 
                 hover:bg-red-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-red-600 
                      group-hover:text-white transition">
                  {s.value}
                </div>

                <div className="text-gray-500 text-sm mt-2 leading-tight 
                      group-hover:text-white transition">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECOGNITIONS ────────────────────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <h2 className="text-4xl font-extrabold text-gray-900 mb-1">
            National &amp; International Regulatory Bodies
          </h2>
          <p className="text-gray-500 text-xl mb-7">
            That Rate &amp; Recognize Us
          </p>

          {/* Recognition Slider (Mobile) / Single Image (Desktop) */}
          <div className="md:hidden slider-container py-4">
            <div className="animate-scroll whitespace-nowrap">
              <Image src="/accredation.png" alt="Recognitions" width={300} height={128} className="h-32 inline-block px-4 object-contain" />
              <Image src="/accredation.png" alt="Recognitions" width={300} height={128} className="h-32 inline-block px-4 object-contain" />
              <Image src="/accredation.png" alt="Recognitions" width={300} height={128} className="h-32 inline-block px-4 object-contain" />
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <Image
              src="/accredation.png"
              alt="UGC NAAC A+ and International Recognitions"
              width={1200}
              height={400}
              className="max-w-full h-auto object-contain"
            />
          </div>

        </div>
      </section>

      {/* ─── PROGRAMS ────────────────────────────────────────────────── */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wide text-center">
            All-Inclusive <br />
            Online UG & PG Degree Programs 2026
          </h2>

          <p className="text-gray-400 text-base md:text-lg mt-6 leading-relaxed text-center">
            Choose an internationally-recognized online undergraduate or postgraduate
            program for the 2026 academic session.
          </p>

        </div>

        <div className="max-w-7xl mx-auto px-4 space-y-20">

          {/* ===================== */}
          {/* UNDERGRADUATE SECTION */}
          {/* ===================== */}

          <div>
            <h2 className="text-3xl font-extrabold mb-10 text-center">
              <span className="text-red-500">Undergraduate</span> Programs
            </h2>

            <div className="grid md:grid-cols-12 gap-10 items-start">

              {/* LEFT IMAGE */}
              <div className="hidden md:col-span-4 md:block">
                <Image
                  src="/5.png"
                  alt="Undergraduate Programs"
                  width={400}
                  height={600}
                  className=" shadow-xl w-full object-cover"
                />
              </div>

              {/* RIGHT CARDS */}
              <div className="md:col-span-8">
                <div className="grid sm:grid-cols-2 gap-6">

                  {ugPrograms.map((p) => (
                    <div key={p.title} className=" overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                      <div className="bg-red-600 text-white px-5 py-4">
                        <div className="text-lg font-extrabold">{p.title}</div>
                        <div className="text-sm opacity-90">{programFullForm(p.title)}</div>
                      </div>
                      <div className="px-5 py-4">
                        <div className="text-sm text-black font-bold mb-2">Duration: <span className="font-normal">{p.duration}</span></div>
                        <div className="text-sm text-purple-700 mb-3">After 25% Early Bird Discount on Programme Sem Fee</div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 line-through text-sm">{p.originalFee}</span>
                          <span className="text-black font-extrabold text-base">{p.fee}</span>
                          <CTABtn onClick={() => openModal(p.title)} className="px-4 py-2 rounded-full text-xs">
                            Apply Now
                          </CTABtn>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* UG CARD END */}

                </div>
              </div>
            </div>
          </div>


          {/* ===================== */}
          {/* POSTGRADUATE SECTION */}
          {/* ===================== */}

          <div>
            <h2 className="text-3xl font-extrabold mb-10 text-center">
              <span className="text-red-500">Postgraduate</span> Programs
            </h2>

            <div className="grid md:grid-cols-12 gap-10 items-start">

              {/* LEFT IMAGE */}
              <div className="hidden md:col-span-4 md:block">
                <Image
                  src="/6.png"
                  alt="Postgraduate Programs"
                  width={400}
                  height={600}
                  className="shadow-xl w-full object-cover"
                />
              </div>

              {/* RIGHT CARDS */}
              <div className="md:col-span-8">
                <div className="grid sm:grid-cols-2 gap-6">

                  {pgPrograms.map((p) => (
                    <div key={p.title} className=" overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                      <div className="bg-red-600 text-white px-5 py-4">
                        <div className="text-lg font-extrabold">{p.title}</div>
                        <div className="text-sm opacity-90">{programFullForm(p.title)}</div>
                      </div>
                      <div className="px-5 py-4">
                        <div className="text-sm text-black font-bold mb-2">Duration: <span className="font-normal">{p.duration}</span></div>
                        <div className="text-sm text-purple-700 mb-3">After 25% Early Bird Discount on Programme Sem Fee</div>
                        <div className="flex items-center gap-3">
                          <span className="text-red-600 line-through text-sm">{p.originalFee}</span>
                          <span className="text-black font-extrabold text-base">{p.fee}</span>
                          <CTABtn onClick={() => openModal(p.title)} className="px-4 py-2 rounded-full text-xs">
                            Apply Now
                          </CTABtn>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── WHY CU ONLINE ───────────────────────────────────────────── */}
      <section id="why" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-3xl font-extrabold text-gray-900 text-center mb-2"> Why study with{" "} <span className="text-white bg-red-500 "> Chandigarh University Online? </span> </h2> <p className="text-gray-500 text-center text-2xl mb-10"> Industry-leading features that set us apart </p>
          {/* Image Row */}
          <div className="flex flex-wrap justify-center items-center gap-8">

            <Image
              src="/7.png"
              alt="Globe Recognition and UGC Entitled"
              width={360}
              height={200}
              className="w-90 h-auto object-contain"
            />

            <Image
              src="/8.png"
              alt="NIRF Ranked and NAAC A+ Accredited"
              width={360}
              height={200}
              className="w-90 h-auto object-contain"
            />

            <Image
              src="/9.png"
              alt="WES Recognized and QS Ranked"
              width={360}
              height={200}
              className="w-90 h-auto object-contain"
            />

          </div>

        </div>
      </section>

      {/* ─── CAREER ADVANTAGES ───────────────────────────────────────── */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-4xl font-extrabold text-white text-center mb-2">
            Career Advantages You Will Get
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Comprehensive career support from enrollment to placement
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Mobile Image */}
            <Image
              src="/crrear_mobile.png"
              alt="Career Support and Placement Advantages 2026"
              width={600}
              height={400}
              className="block md:hidden w-full h-auto object-contain"
            />
            {/* Desktop Images */}
            <Image
              src="/10.png"
              alt="Mock Interviews and Industry Networking"
              width={360}
              height={200}
              className="hidden md:block w-90 h-auto object-contain"
            />
            <Image
              src="/11.png"
              alt="Resume Building and LinkedIn Workshops"
              width={360}
              height={200}
              className="hidden md:block w-90 h-auto object-contain"
            />
            <Image
              src="/12.png"
              alt="Job Readiness and Placement Assistance"
              width={360}
              height={200}
              className="hidden md:block w-90 h-auto object-contain"
            />
          </div>

        </div>
      </section>

      {/* ─── ALUMNI WORK AT ──────────────────────────────────────────── */}
      <section className="bg-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Title */}
          <h2 className="text-white text-3xl md:text-4xl font-extrabold text-center mb-12">
            Our Alumni Work At
          </h2>

          <div className="bg-red-600 rounded-2xl shadow-md p-6 flex justify-center items-center">
            {/* Mobile Image */}
            <Image
              src="/Alumni.png"
              alt="Our Alumni Work At"
              width={600}
              height={400}
              className="block md:hidden w-full h-auto object-contain px-4"
            />
            {/* Desktop Image */}
            <Image
              src="/20.png"
              alt="Alumni Companies"
              width={1200}
              height={300}
              className="hidden md:block w-auto h-auto object-contain"
            />
          </div>

        </div>
      </section>

      {/* ─── MENTORS ─────────────────────────────────────────────────── */}
      <section id="mentors" className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">
            Get Mentored by Corporate Titans
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Learn directly from industry leaders at Fortune 500 companies
          </p>

          {/* Mentor Image Slider */}
          <div className="slider-container mb-12">
            <div className="animate-scroll whitespace-nowrap">
              <Image src="/mentot_1.png" alt="Mentor 1" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
              <Image src="/mentor_2.png" alt="Mentor 2" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
              <Image src="/mentor_3.png" alt="Mentor 3" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
              {/* Duplicate for infinite effect if needed, but 3 might be enough for a simple scroll */}
              <Image src="/mentot_1.png" alt="Mentor 1" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
              <Image src="/mentor_2.png" alt="Mentor 2" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
              <Image src="/mentor_3.png" alt="Mentor 3" width={256} height={256} className="h-64 inline-block px-4 object-contain" />
            </div>
          </div>

        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────────── */}
      <section id="testimonials" className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2">
            Learner&apos;s Testimonial
          </h2>
          <p className="text-red-200 text-center text-sm mb-10">
            Real stories from students who transformed their careers
          </p>
          <div className="slider-container py-6">
            <div className="animate-scroll whitespace-nowrap">
              <Image src="/testimonial.png" alt="testimonial" width={400} height={320} className="h-64 md:h-80 inline-block px-4 object-contain" />
              <Image src="/testimonial.png" alt="testimonial" width={400} height={320} className="h-64 md:h-80 inline-block px-4 object-contain" />
              <Image src="/testimonial.png" alt="testimonial" width={400} height={320} className="h-64 md:h-80 inline-block px-4 object-contain" />
              <Image src="/testimonial.png" alt="testimonial" width={400} height={320} className="h-64 md:h-80 inline-block px-4 object-contain" />
            </div>
          </div>
          {/* Testimonials CTA */}
          <div className="text-center">
            <button
              onClick={() => openModal()}
              className="bg-white text-red-600 hover:bg-red-50 active:scale-95 font-extrabold px-10 py-4 rounded-full text-base transition-all shadow-2xl"
            >
              Start Your Success Story →
            </button>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-600/30 border border-red-500/50 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-bold uppercase tracking-wider">Limited Seats Available</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Interested in exploring{" "}
            <span className="text-red-400">our online programs?</span>
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Admissions closing soon. Get free expert counselling and secure your seat today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTABtn
              onClick={() => openModal()}
              className="px-10 py-4 rounded-full text-base hover:-translate-y-1"
            >
              Apply Now — Free →
            </CTABtn>
            <button
              onClick={() => openModal()}
              className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-full text-base hover:bg-white/10 active:scale-95 transition-all"
            >
              📞 Get a Call Back
            </button>
          </div>
        </div>
      </section>


      <footer className="bg-gray-100 text-black pt-10">

        {/* Top Footer Row */}
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-center">

          {/* Left Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/logo.webp"
              alt="CU Online"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Center Address */}
          <div className="flex items-start gap-3 text-center md:text-left justify-center">
            <div className="text-3xl text-gray-500">📍</div>
            <div className="text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-blue-600">Chandigarh University</p>
              <p>Address: NH-05 Chandigarh–Ludhiana</p>
              <p>Highway, Mohali, Punjab (INDIA)</p>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col gap-4 items-center md:items-end">
            <button onClick={() => openModal()} className="bg-red-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              eSanad
            </button>

            <button onClick={() => openModal()} className="bg-red-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Idol DMC Request
            </button>
          </div>

        </div>

        <div className="bg-gray-200 mt-8 py-5 text-center text-gray-600 text-1xl">
          Disclaimer: We act as a marketing service partner only. CU University hold full rights to request change or removal of any non-relevant content. Images used are for illustrative purposes and do not directly represent the respective colleges or universities.
        </div>
        {/* Bottom Copyright */}
        <div className="bg-gray-200 mt-8 py-5 text-center text-gray-600 text-sm">
          © 2026 onlineadmission.online. All Rights Reserved.
        </div>

      </footer>
    </div>
  );
}
