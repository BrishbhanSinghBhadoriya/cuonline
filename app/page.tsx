"use client";
import { useState, useCallback } from "react";
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

interface Feature {
  icon: string;
  title: string;
}

interface CareerAdvantage {
  icon: string;
  title: string;
  desc: string;
}

interface Mentor {
  name: string;
  role: string;
  company: string;
  quote: string;
  initial: string;
}

interface Testimonial {
  name: string;
  rating: number;
  review: string;
  initial: string;
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
  { value: "1000+",  label: "Industry Expert Faculty Members" },
  { value: "800+",   label: "Placement Partners Across Globe" },
  { value: "2500+",  label: "Students Placed Successfully" },
  { value: "4000+",  label: "Courses & Certifications Available" },
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

const features: Feature[] = [
  { icon: "🎓", title: "UGC Entitled Programs" },
  { icon: "📚", title: "Courses Empowered By Harvard & KPMG" },
  { icon: "👨‍🏫", title: "Experienced & Globally Recognized Faculty" },
  { icon: "💰", title: "Affordable Fee With No Cost EMI Options" },
  { icon: "📹", title: "Regular Live Interactive Sessions with Industry Experts" },
  { icon: "💻", title: "Advanced Learning Management System (LMS)" },
];

const careerAdvantages: CareerAdvantage[] = [
  { icon: "💼", title: "500+ Hiring Partners",                 desc: "Industry-leading companies actively recruit from our talent pool every semester." },
  { icon: "🎯", title: "Career Success Coach",                 desc: "Dedicated personal coaches guide you through interview preparation and career strategy." },
  { icon: "📄", title: "Resume Writing & LinkedIn Masterclass",desc: "Professional sessions to craft standout resumes and optimize your LinkedIn profile." },
  { icon: "🤝", title: "Mock Interviews & Internship Support", desc: "Real-world interview simulations with expert feedback and exclusive internship opportunities." },
  { icon: "🏢", title: "Placement Assistance & Job Readiness", desc: "End-to-end placement support from application to offer letter with bootcamps." },
  { icon: "🌐", title: "Industry Networking & Alumni Benefits", desc: "Access to our 25000+ alumni network, exclusive networking events and industry meetups." },
];

const mentors: Mentor[] = [
  { name: "Aparna Dhingra", role: "Senior Director", company: "Google",
    quote: "Teaching at CU Online has been a rewarding experience. The students are highly motivated and the platform provides excellent tools for interactive learning.", initial: "A" },
  { name: "Arvind Mehra",   role: "VP Engineering",  company: "Amazon",
    quote: "The curriculum is world-class and continuously updated with industry trends. Online education at CU can truly match and exceed traditional classroom quality.", initial: "A" },
];

const testimonials: Testimonial[] = [
  { name: "Rony",         rating: 5, review: "Completing my MBA from CU Online was one of the best decisions I've made. The flexibility allowed me to balance work and study seamlessly. The faculty is exceptional.", initial: "R" },
  { name: "Vineet Daniel",rating: 5, review: "With CU Online, I got access to world-class content empowered by Harvard and KPMG. The live sessions with industry experts helped me transition into a better career role.", initial: "V" },
  { name: "Divya",        rating: 5, review: "As a working professional, CU Online gave me the perfect platform to upskill. The LMS is intuitive, faculty is highly experienced and career advantages are truly unmatched.", initial: "D" },
];

const companies: string[]     = ["Google","Amazon","Flipkart","HCL","Direct!","Dell","Cognizant","VMware","Hitachi","Zenith","Sapient","Reliance","Emerson","TCS","Infosys","Panasonic"];
const recognitions: string[]  = ["Harvard","Forbes","NIRF","NAAC A+","QS","WES"];
const programTabs: string[]   = ["All","MBA","MCA","M.Sc","BCA","BBA","MA","BA","M.Com"];
const heroPills: { label: string; program: string }[] = [
  { label: "MBA",   program: "MBA" },
  { label: "MCA",   program: "MCA" },
  { label: "M.Sc",  program: "M.Sc Data Science" },
  { label: "BBA",   program: "BBA" },
  { label: "BCA",   program: "BCA" },
  { label: "BA",    program: "BA" },
  { label: "M.Com", program: "M.Com" },
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
  const [activeTab,      setActiveTab]      = useState<string>("All");
  const [modalOpen,      setModalOpen]      = useState<boolean>(false);
  const [selectedProgram,setSelectedProgram]= useState<string>("");
  const [heroData, setHeroData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    state: "",
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

  const heroStateOptions = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const updateHero =
    (field: keyof typeof heroData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setHeroData((d) => ({ ...d, [field]: e.target.value }));

  const validateHero = (): string | null => {
    if (!heroData.name.trim() || heroData.name.trim().length < 2) return "Enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(heroData.email.trim())) return "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(heroData.phone.replace(/\s/g, ""))) return "Enter a valid 10-digit mobile";
    if (!heroData.program.trim()) return "Select a program";
    if (!heroData.state.trim()) return "Select a state";
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
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: heroData.name.trim(),
          email: heroData.email.trim(),
          phone: heroData.phone.trim(),
          program: heroData.program.trim(),
          state: heroData.state.trim(),
          message: "",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(typeof j.error === "string" ? j.error : "Failed to submit");
      }
      setHeroSuccess("Enquiry submitted successfully");
      setHeroData({ name: "", email: "", phone: "", program: "", state: "" });
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
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Gill Sans', Calibri, sans-serif" }}>

      {/* ═══ ENQUIRY MODAL — single instance, used everywhere ═══════════ */}
      <Enquiry
        isOpen={modalOpen}
        onClose={closeModal}
        defaultProgram={selectedProgram}
      />

      {/* ─── FLOATING ENQUIRE BUTTON (always visible) ────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <CTABtn
          onClick={() => openModal()}
          className="px-5 py-3 rounded-full text-sm shadow-2xl animate-bounce-slow flex items-center gap-2"
        >
          <span className="text-lg">💬</span> Enquire Now
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
      
      <h3 className="text-gray-900 font-extrabold text-lg mb-1">
        Free Career Counselling
      </h3>
      <p className="text-gray-500 text-xs mb-5">
        Fill details below — our experts will call you within 24 hrs.
      </p>

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

            <select
              value={heroData.state}
              onChange={updateHero("state")}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm"
            >
              <option value="">Select State *</option>
              {heroStateOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
        </select>

            <button
              disabled={heroSubmitting}
              onClick={submitHero}
              className="w-full py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition"
            >
              {heroSubmitting ? "Submitting..." : "Register Now — It&apos;s Free →"}
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
    <h3 className="text-gray-900 font-extrabold text-lg mb-1">Free Career Counselling</h3>
    <p className="text-gray-500 text-xs mb-5">Fill details below — our experts will call you within 24 hrs.</p>
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
      <select value={heroData.state} onChange={updateHero("state")} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm">
        <option value="">Select State *</option>
        {heroStateOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button disabled={heroSubmitting} onClick={submitHero} className="w-full py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition">
        {heroSubmitting ? "Submitting..." : "Register Now — It&apos;s Free →"}
      </button>
      <p className="text-gray-400 text-xs text-center">🔒 Your data is 100% secure. No spam.</p>
    </div>
  </div>
</section>

<div className="bg-black py-10 px-4">
  <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">

    <img
      src="/1.1.png"
      alt="img1"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/2.1.png"
      alt="img2"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/3.1.png"
      alt="img3"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/4.1.png"
      alt="img4"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/1.2.png"
      alt="img1"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/2.2.png"
      alt="img2"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/3.2.png"
      alt="img3"
      className="w-60 h-36 object-contain"
    />

    <img
      src="/4.2.png"
      alt="img4"
      className="w-60 h-36 object-contain"
    />
  </div>
</div>
      {/* ─── STATS ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-4xl text-gray-500 font-bold uppercase tracking-widest mb-6">
  Unparalleled Benchmarks In{" "}
  <span className="text-white bg-red-600 px-2 py-1">
    Higher Education
  </span>
</p>
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

    {/* Single Image */}
    <div className="flex justify-center">
      <img
        src="/accredation.png"   
        alt="Recognitions"
        className="max-w-full h-auto object-contain"
      />
    </div>

  </div>
</section>

      {/* ─── PROGRAMS ────────────────────────────────────────────────── */}
     <section className="py-16 bg-black text-white">
  <div className="max-w-7xl mx-auto px-4 space-y-20">

    {/* ===================== */}
    {/* UNDERGRADUATE SECTION */}
    {/* ===================== */}

    <div>
      <h2 className="text-3xl font-extrabold mb-10 text-center">
        <span className="text-red-500">Undergraduate</span> Programs
      </h2>

      <div className="grid lg:grid-cols-12 gap-10 items-start">

        {/* LEFT IMAGE */}
        <div className="lg:col-span-4">
          <img
            src="/5.png"
            alt="Undergraduate Programs"
            className=" shadow-xl w-full object-cover"
          />
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-8">
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

      <div className="grid lg:grid-cols-12 gap-10 items-start">

        {/* LEFT IMAGE */}
        <div className="lg:col-span-4">
          <img
            src="/6.png"
            alt="Postgraduate Programs"
            className="shadow-xl w-full object-cover"
          />
        </div>

        {/* RIGHT CARDS */}
        <div className="lg:col-span-8">
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

      <img
        src="/7.png"
        alt="feature1"
        className="w-90 h-auto object-contain"
      />

      <img
        src="/8.png"
        alt="feature2"
        className="w-90 h-auto object-contain"
      />

      <img
        src="/9.png"
        alt="feature3"
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

      <img
        src="/10.png"
        alt="feature1"
        className="w-90 h-auto object-contain"
      />

      <img
        src="/11.png"
        alt="feature2"
        className="w-90 h-auto object-contain"
      />

      <img
        src="/12.png"
        alt="feature3"
        className="w-90 h-auto object-contain"
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

    {/* Single Image Card */}
    <div className="bg-red-600 rounded-2xl shadow-md p-6 flex justify-center items-center">
      <img
        src="/20.png"   
        alt="Alumni Companies"
        className="w-auto h-auto object-contain"
      />
    </div>

  </div>
</section>

      {/* ─── MENTORS ─────────────────────────────────────────────────── */}
      <section id="mentors" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-2">
            Get Mentored by Corporate Titans
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Learn directly from industry leaders at Fortune 500 companies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-red-200 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                    {m.initial}
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900">{m.name}</div>
                    <div className="text-red-600 text-sm font-bold">{m.role}</div>
                    <div className="text-gray-500 text-xs">{m.company}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-4">
                  &ldquo;{m.quote}&rdquo;
                </p>
                <button
                  onClick={() => openModal()}
                  className="text-sm font-bold text-red-600 hover:underline"
                >
                  Learn from {m.name.split(" ")[0]} →
                </button>
              </div>
            ))}
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
          <div className="bg-red-600 rounded-2xl shadow-md p-6 flex justify-center items-center">
      <img
        src="/testimonial.png"   
        alt="testimonial"
        className="w-auto h-auto object-contain"
      />
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
      <img
        src="/logo.webp"   
        alt="CU Online"
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


  {/* Bottom Copyright */}
  <div className="bg-gray-200 mt-8 py-5 text-center text-gray-600 text-sm">
    © 2025 Chandigarh University Online. All Rights Reserved.
  </div>

</footer>
    </div>
  );
}
