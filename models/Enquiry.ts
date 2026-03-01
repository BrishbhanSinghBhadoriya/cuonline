import mongoose, { Schema, Document, Model } from "mongoose";

// ── Interface ───────────────────────────────────────────────────────────
export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  program: string;
  state?: string;
  city: string;
  message?: string;
  status: "new" | "contacted" | "enrolled" | "not_interested";
  source: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ── Schema ──────────────────────────────────────────────────────────────
const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    program: {
      type: String,
      required: [true, "Program is required"],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "enrolled", "not_interested"],
      default: "new",
    },
    source: {
      type: String,
      default: "website",
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true, // auto createdAt & updatedAt
  }
);

// ── Indexes for faster queries ──────────────────────────────────────────
EnquirySchema.index({ email: 1 });
EnquirySchema.index({ phone: 1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ program: 1 });
EnquirySchema.index({ createdAt: -1 });

// ── Model (avoid re-compile on hot-reload) ──────────────────────────────
// In development, we force a refresh by deleting from mongoose.models
if (process.env.NODE_ENV === "development") {
  delete (mongoose.models as any).Enquiry;
}

const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;