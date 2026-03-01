import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

// ── Types ──────────────────────────────────────────────────────────────
interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  program: string;
  state?: string;
  city: string;
  message?: string;
}

// ── Validation ─────────────────────────────────────────────────────────
function validatePayload(data: EnquiryPayload): string | null {
  if (!data.name?.trim() || data.name.trim().length < 2)
    return "Valid name is required (min 2 characters)";
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Valid email address is required";
  if (!data.phone?.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, "")))
    return "Valid 10-digit Indian mobile number is required";
  if (!data.program?.trim())
    return "Program selection is required";
  if (!data.city?.trim())
    return "City selection is required";
  return null;
}

// ── Email Templates ─────────────────────────────────────────────────────
function adminEmailHTML(data: EnquiryPayload, leadId: string): string {
  return `
  <!DOCTYPE html><html><head><meta charset="utf-8"></head>
  <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
    <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px;color:white;">
        <h1 style="margin:0;font-size:22px;">🎓 New Lead — CU Online</h1>
        <p style="margin:6px 0 0;opacity:.85;font-size:13px;">Lead ID: ${leadId}</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${[
      ["👤 Name", data.name],
      ["📧 Email", data.email],
      ["📞 Phone", `+91 ${data.phone}`],
      ["🎓 Program", data.program],
      ["📍 City", data.city],

      ["💬 Message", data.message || "—"],
      ["🕐 Time (IST)", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
    ].map(([label, value]) => `
            <tr style="border-bottom:1px solid #f0f0f0;">
              <td style="padding:10px 8px;font-weight:bold;color:#666;font-size:13px;width:38%;">${label}</td>
              <td style="padding:10px 8px;color:#222;font-size:14px;">${value}</td>
            </tr>`).join("")}
        </table>
        <div style="margin-top:20px;padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid #dc2626;">
          <p style="margin:0;color:#dc2626;font-size:13px;font-weight:bold;">
            ⚡ Contact this lead within 24 hours for best conversion rate.
          </p>
        </div>
        <div style="margin-top:14px;text-align:center;">
          <a href="${(process.env.NEXT_PUBLIC_APP_URL || "")}/admin/leads"
             style="background:#dc2626;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:13px;">
            View All Leads in Dashboard →
          </a>
        </div>
      </div>
      <div style="background:#f9fafb;padding:14px;text-align:center;color:#aaa;font-size:11px;">
        CU Online Lead Management © ${new Date().getFullYear()}
      </div>
    </div>
  </body></html>`;
}

function studentEmailHTML(data: EnquiryPayload): string {
  return `
  <!DOCTYPE html><html><head><meta charset="utf-8"></head>
  <body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
    <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px;color:white;text-align:center;">
        <div style="font-size:48px;margin-bottom:10px;">🎓</div>
        <h1 style="margin:0;font-size:22px;">Thank You, ${data.name}!</h1>
        <p style="margin:6px 0 0;opacity:.85;font-size:14px;">Enquiry received successfully.</p>
      </div>
      <div style="padding:28px;">
        <div style="background:#f0fdf4;border:2px solid #22c55e;border-radius:12px;padding:18px;margin-bottom:22px;text-align:center;">
          <p style="margin:0;color:#16a34a;font-size:15px;font-weight:bold;">
            ✅ Our counsellor will call you within 24 hours on +91 ${data.phone}
          </p>
        </div>
        <div style="background:#fef2f2;border-radius:12px;padding:18px;margin-bottom:22px;">
          <p style="margin:0 0 10px;font-weight:bold;color:#dc2626;font-size:14px;">📋 Your Enquiry Details:</p>
          <table style="width:100%;">
            <tr><td style="color:#666;font-size:13px;padding:3px 0">Program:</td><td style="font-weight:bold;font-size:13px;">${data.program}</td></tr>
            <tr><td style="color:#666;font-size:13px;padding:3px 0">City:</td><td style="font-weight:bold;font-size:13px;">${data.city}</td></tr>
            <tr><td style="color:#666;font-size:13px;padding:3px 0">Email:</td><td style="font-weight:bold;font-size:13px;">${data.email}</td></tr>
          </table>
        </div>
        ${["🎓 UGC Entitled Degrees", "📚 Harvard & KPMG Curriculum", "💰 25% Scholarship Available", "💼 500+ Placement Partners"].map(
    (item) => `<div style="background:#f9fafb;border-radius:8px;padding:10px 14px;margin-bottom:8px;color:#444;font-size:13px;">${item}</div>`
  ).join("")}
      </div>
      <div style="background:#dc2626;padding:16px;text-align:center;">
        <p style="margin:0;color:white;font-size:13px;">
          Helpline: <strong>1800-000-1670</strong> | <strong>online@cumail.in</strong>
        </p>
      </div>
    </div>
  </body></html>`;
}

// ── POST Handler ────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: EnquiryPayload = await request.json();

    const validationError = validatePayload(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const data: EnquiryPayload = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim().replace(/\s/g, ""),
      program: body.program.trim(),
      state: body.state?.trim() || "",
      city: body.city.trim(),
      message: body.message?.trim() || "",
    };

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    let leadId = "";
    let dbSaved = false;
    try {
      await connectDB();

      // DIAGNOSTIC: Log the schema of the model to see if it still expects dob/passed12th
      // const schemaPaths = Object.keys(Enquiry.schema.paths);
      // console.log("[API Log]: Enquiry Schema Paths:", schemaPaths);

      const enquiry = await Enquiry.create({
        ...data,
        status: "new",
        source: "website",
        ipAddress,
      });

      leadId = (enquiry._id as unknown as string).toString();
      dbSaved = true;
    } catch (dbErr) {
      console.error("[Enquiry DB Save Error]:", dbErr);
      return NextResponse.json({
        error: "Failed to save enquiry to database.",
        details: dbErr instanceof Error ? dbErr.message : String(dbErr)
      }, { status: 500 });
    }

    const enableEmails = process.env.SEND_EMAILS === "true";
    if (enableEmails) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASS,
          },
        });
        await Promise.all([
          transporter.sendMail({
            from: `"CU Online Leads" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🎓 New Lead: ${data.name} — ${data.program}`,
            html: adminEmailHTML(data, leadId),
          }),
          transporter.sendMail({
            from: `"CU Online Admissions" <${process.env.EMAIL_USER}>`,
            to: data.email,
            subject: `✅ Enquiry Confirmed — ${data.program} | CU Online`,
            html: studentEmailHTML(data),
          }),
        ]);
      } catch (emailErr) {
        console.error("⚠️ Email failed (lead already saved to DB):", emailErr);
      }
    }

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully!", leadId },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Enquiry API Error]:", error);
    if (error && typeof error === "object" && "name" in error) {
      if ((error as { name: string }).name === "ValidationError") {
        return NextResponse.json({ error: "Invalid data provided" }, { status: 400 });
      }
    }
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
