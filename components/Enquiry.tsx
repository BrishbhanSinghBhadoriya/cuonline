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
   state: string;
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
 
   const stateOptions = useMemo(
     () => [
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
     ],
     []
   );
 
   const [data, setData] = useState<FormData>({
     name: "",
     email: "",
     phone: "",
     program: defaultProgram || "",
     state: "",
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
 
   const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
     setData((d) => ({ ...d, [field]: e.target.value }));
 
   const validate = (): string | null => {
     if (!data.name.trim() || data.name.trim().length < 2) return "Enter a valid name";
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "Enter a valid email";
     if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ""))) return "Enter a valid 10-digit mobile";
     if (!data.program.trim()) return "Select a program";
     if (!data.state.trim()) return "Select a state";
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
           state: data.state.trim(),
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
       }, 800);
     } catch (e) {
       setError(e instanceof Error ? e.message : "Submission failed");
     } finally {
       setSubmitting(false);
     }
   };
 
   if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 z-50">
       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
       <div className="absolute inset-0 flex items-center justify-center p-4">
         <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100">
           <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
             <div className="flex items-center gap-2">
               <span className="text-red-600 text-xl">🎓</span>
               <h3 className="text-gray-900 font-extrabold text-lg">Enquiry Form</h3>
             </div>
             <button onClick={onClose} className="text-gray-500 hover:text-red-600 font-bold">✕</button>
           </div>
 
           <div className="px-5 py-4 space-y-3">
             {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2 text-xs">{error}</div>}
             {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-3 py-2 text-xs">{success}</div>}
 
             <input
               type="text"
               placeholder="Full Name *"
               value={data.name}
               onChange={update("name")}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
             />
             <input
               type="email"
               placeholder="Email Address *"
               value={data.email}
               onChange={update("email")}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
             />
             <input
               type="tel"
               placeholder="Phone Number *"
               value={data.phone}
               onChange={update("phone")}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
             />
 
             <select
               value={data.program}
               onChange={update("program")}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400 text-gray-700"
             >
               <option value="">Select Program *</option>
               {programOptions.map((p) => (
                 <option key={p} value={p}>{p}</option>
               ))}
             </select>
 
             <select
               value={data.state}
               onChange={update("state")}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400 text-gray-700"
             >
               <option value="">Select State *</option>
               {stateOptions.map((s) => (
                 <option key={s} value={s}>{s}</option>
               ))}
             </select>
 
             <textarea
               placeholder="Message (optional)"
               value={data.message}
               onChange={update("message")}
               rows={3}
               className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
             />
 
             <button
               disabled={submitting}
               onClick={submit}
               className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-extrabold px-4 py-2 rounded-xl text-sm transition-all"
             >
               {submitting ? "Submitting..." : "Submit Enquiry"}
             </button>
             <p className="text-gray-400 text-xs text-center">🔒 Your data is 100% secure. No spam.</p>
           </div>
         </div>
       </div>
     </div>
   );
 }
