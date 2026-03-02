"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ── Window Extension ───────────────────────────────────────────────────
declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export default function ThankYouPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // ✅ Meta Pixel — Lead Event
        if (typeof window.fbq === "function") {
            window.fbq("track", "LeadNew");
        }

        // ✅ Google Ads — Conversion Event
        let attempts = 0;

        const fireConversion = () => {
            if (typeof window.gtag === "function") {
                window.gtag("event", "conversion", {
                    send_to: "AW-17973307328/5ZjRCKLOiIEcEMDPq_pC",
                });
            } else if (attempts < 20) {
                attempts++;
                setTimeout(fireConversion, 100);
            } else if (window.dataLayer) {
                window.dataLayer.push({
                    event: "conversion",
                    send_to: "AW-17973307328/5ZjRCKLOiIEcEMDPq_pC",
                });
            } else {
                window.dataLayer = [];
                window.dataLayer.push({
                    event: "conversion",
                    send_to: "AW-17973307328/5ZjRCKLOiIEcEMDPq_pC",
                });
            }
        };

        fireConversion();
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-[family-name:var(--font-poppins)]">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <div className="bg-red-600 h-4 w-full" />

                <div className="p-8 md:p-12 text-center text-gray-900">
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Thank You!
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
                        Your enquiry has been received successfully.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-10 border border-gray-100">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            Our expert academic counselor will contact you within{" "}
                            <span className="text-red-600 font-bold">24 hours</span> to assist
                            you with your career goals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-red-200"
                        >
                            Return Home
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100">
                        <p className="text-gray-500 font-medium">
                            Need immediate help? Call us at
                            <br />
                            <span className="text-gray-900 font-bold text-lg">1800-000-1670</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}