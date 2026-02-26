import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry, { IEnquiry } from "@/models/Enquiry";

// ── GET all leads with filters ─────────────────────────────────────────
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // ── Query params ──
    const page    = parseInt(searchParams.get("page")    || "1");
    const limit   = parseInt(searchParams.get("limit")   || "20");
    const status  = searchParams.get("status")  || "";
    const program = searchParams.get("program") || "";
    const search  = searchParams.get("search")  || "";
    const from    = searchParams.get("from")    || "";   // date YYYY-MM-DD
    const to      = searchParams.get("to")      || "";

    // ── Build filter ──
    const filter: Record<string, unknown> = {};

    if (status)  filter.status  = status;
    if (program) filter.program = { $regex: program, $options: "i" };
    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }
    if (from || to) {
      filter.createdAt = {
        ...(from ? { $gte: new Date(from) } : {}),
        ...(to   ? { $lte: new Date(to + "T23:59:59") } : {}),
      };
    }

    // ── Execute queries ──
    const [leads, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    // ── Stats ──
    const [stats] = await Enquiry.aggregate([
      {
        $group: {
          _id: null,
          total:          { $sum: 1 },
          new:            { $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] } },
          contacted:      { $sum: { $cond: [{ $eq: ["$status", "contacted"] }, 1, 0] } },
          enrolled:       { $sum: { $cond: [{ $eq: ["$status", "enrolled"] }, 1, 0] } },
          not_interested: { $sum: { $cond: [{ $eq: ["$status", "not_interested"] }, 1, 0] } },
        },
      },
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      stats: stats || { total: 0, new: 0, contacted: 0, enrolled: 0, not_interested: 0 },
    });
  } catch (error) {
    console.error("[Leads GET Error]:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// ── PATCH — update lead status ─────────────────────────────────────────
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { id, status }: { id: string; status: IEnquiry["status"] } = await request.json();

    const validStatuses: IEnquiry["status"][] = ["new", "contacted", "enrolled", "not_interested"];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
    }

    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    console.error("[Leads PATCH Error]:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// ── DELETE — remove a lead ─────────────────────────────────────────────
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { id }: { id: string } = await request.json();

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    console.error("[Leads DELETE Error]:", error);
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}