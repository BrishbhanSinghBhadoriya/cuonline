"use client";
import { useEffect, useMemo, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  program: string;
  city: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  passed12th: boolean;
  message: string;
}

export default function Enquiry({ isOpen, onClose, defaultProgram = "" }: Props): React.ReactElement | null {
  const programOptions = useMemo(
    () => [
      "MBA",
      "MCA",
      "M.Sc Data Science",
      "BCA",
      "BBA",
      "MA English",
      "BA",
      "M.Com",
      "M.Sc Mathematics",
    ],
    []
  );

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => (currentYear - 16 - i).toString());

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    program: defaultProgram || "",
    city: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    passed12th: false,
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setData((d) => ({ ...d, program: defaultProgram || d.program }));
      setError("");
      setSuccess("");
    }
  }, [isOpen, defaultProgram]);

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setData((d) => ({ ...d, [field]: value }));
  };

  const validate = (): string | null => {
    if (!data.name.trim() || data.name.trim().length < 2) return "Enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ""))) return "Enter a valid 10-digit mobile";
    if (!data.city.trim()) return "Enter your city";
    if (!data.program.trim()) return "Select a program";
    if (!data.dobDay || !data.dobMonth || !data.dobYear) return "Select date of birth";
    if (!data.passed12th) return "Please confirm you have passed 12th standard";
    return null;
  };

  const submit = async (): Promise<void> => {
    setError("");
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          program: data.program.trim(),
          city: data.city.trim(),
          dob: `${data.dobDay}-${data.dobMonth}-${data.dobYear}`,
          passed12th: data.passed12th,
          message: data.message.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(typeof j.error === "string" ? j.error : "Failed to submit");
      }
      setSuccess("Enquiry submitted successfully");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="pt-10 pb-6 px-8 text-center bg-white relative">
            <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-red-600 transition-colors">
              <span className="text-xl">✕</span>
            </button>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Sign Up for a Free Career Counselling Session!
            </h2>
          </div>

          <div className="px-8 pb-8 space-y-4">
            {error && <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-2 text-sm text-center font-medium animate-shake">{error}</div>}
            {success && <div className="bg-green-50 border border-green-100 text-green-600 rounded-xl px-4 py-2 text-sm text-center font-medium">{success}</div>}

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={update("name")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all placeholder:text-gray-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={data.email}
                onChange={update("email")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all placeholder:text-gray-400"
              />

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-auto rounded-sm" />
                    <span className="text-gray-600 text-sm font-medium">+91</span>
                    <span className="text-gray-400 text-[10px]">▼</span>
                  </div>
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={data.phone}
                  onChange={update("phone")}
                  className="w-full border border-gray-300 rounded-lg pl-28 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all placeholder:text-gray-400"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Your City"
                value={data.city}
                onChange={update("city")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all placeholder:text-gray-400"
              />

              <div className="relative">
                <select
                  value={data.program}
                  onChange={update("program")}
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all text-gray-700 bg-white"
                >
                  <option value="">Select Program</option>
                  {programOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 text-[10px]">
                  ▼
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Date of birth?</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <select
                      value={data.dobDay}
                      onChange={update("dobDay")}
                      className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all text-gray-700 bg-white"
                    >
                      <option value="">DD</option>
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 text-[10px]">▼</div>
                  </div>
                  <div className="relative">
                    <select
                      value={data.dobMonth}
                      onChange={update("dobMonth")}
                      className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all text-gray-700 bg-white"
                    >
                      <option value="">MM</option>
                      {months.map((m, i) => <option key={m} value={(i + 1).toString().padStart(2, '0')}>{m}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 text-[10px]">▼</div>
                  </div>
                  <div className="relative">
                    <select
                      value={data.dobYear}
                      onChange={update("dobYear")}
                      className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all text-gray-700 bg-white"
                    >
                      <option value="">YYYY</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 text-[10px]">▼</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="confirm-12th"
                  checked={data.passed12th}
                  onChange={update("passed12th")}
                  className="mt-1 w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 transition-colors cursor-pointer"
                />
                <label htmlFor="confirm-12th" className="text-base md:text-lg text-gray-800 font-medium cursor-pointer leading-tight">
                  I Confirm I Have Passed 12th Standard/Diploma.
                </label>
              </div>

              <button
                disabled={submitting}
                onClick={submit}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-extrabold px-4 py-4 rounded-xl text-xl md:text-2xl shadow-lg hover:shadow-red-200 transition-all transform active:scale-[0.98]"
              >
                {submitting ? "Processing..." : "Register Now"}
              </button>

              <div className="text-center pt-6">
                <p className="text-xl md:text-2xl text-gray-800 font-medium">
                  Already Registered ? Click to <span className="text-red-600 font-bold cursor-pointer hover:underline" onClick={() => (window.location.href = "https://admission.cuonline.in/login")}>LOGIN</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
