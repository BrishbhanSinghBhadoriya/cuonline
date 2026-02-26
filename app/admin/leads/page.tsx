"use client";
import { useState, useEffect, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────
interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  state: string;
  message?: string;
  status: "new" | "contacted" | "enrolled" | "not_interested";
  source: string;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  enrolled: number;
  not_interested: number;
}

interface Pagination {
  page: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface APIResponse {
  leads: Lead[];
  stats: Stats;
  pagination: Pagination;
}

// ── Status config ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Lead["status"], { label: string; color: string; bg: string }> = {
  new:            { label: "New",            color: "text-blue-700",  bg: "bg-blue-100"  },
  contacted:      { label: "Contacted",      color: "text-yellow-700",bg: "bg-yellow-100"},
  enrolled:       { label: "Enrolled",       color: "text-green-700", bg: "bg-green-100" },
  not_interested: { label: "Not Interested", color: "text-red-700",   bg: "bg-red-100"   },
};

// ── Component ───────────────────────────────────────────────────────────
export default function AdminLeadsPage(): React.ReactElement {
  const [leads, setLeads]           = useState<Lead[]>([]);
  const [stats, setStats]           = useState<Stats | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading]       = useState<boolean>(true);
  const [error, setError]           = useState<string>("");

  // Filters
  const [search,  setSearch]  = useState<string>("");
  const [status,  setStatus]  = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [from,    setFrom]    = useState<string>("");
  const [to,      setTo]      = useState<string>("");
  const [page,    setPage]    = useState<number>(1);

  // Selected lead for detail view
  const [selected, setSelected] = useState<Lead | null>(null);

  // ── Fetch leads ─────────────────────────────────────────────────────
  const fetchLeads = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "15",
        ...(search  ? { search }  : {}),
        ...(status  ? { status }  : {}),
        ...(program ? { program } : {}),
        ...(from    ? { from }    : {}),
        ...(to      ? { to }      : {}),
      });

      const res = await fetch(`/api/leads?${params}`);
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data: APIResponse = await res.json();

      setLeads(data.leads);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      setError("Failed to load leads. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, status, program, from, to]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // ── Update status ────────────────────────────────────────────────────
  const updateStatus = async (id: string, newStatus: Lead["status"]): Promise<void> => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      // Update local state
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l)));
      if (selected?._id === id) setSelected((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch {
      alert("Failed to update status");
    }
  };

  // ── Delete lead ──────────────────────────────────────────────────────
  const deleteLead = async (id: string): Promise<void> => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      const res = await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch {
      alert("Failed to delete lead");
    }
  };

  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const handleSearch = (): void => { setPage(1); fetchLeads(); };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── Top bar ── */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-extrabold">CU</div>
          <div>
            <h1 className="font-extrabold text-lg leading-none">Leads Dashboard</h1>
            <p className="text-red-200 text-xs">CU Online — Admin Panel</p>
          </div>
        </div>
        <button
          onClick={fetchLeads}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold transition-all"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* ── Stats Cards ── */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Total Leads", value: stats.total, color: "border-gray-300", text: "text-gray-800" },
              { label: "🆕 New", value: stats.new, color: "border-blue-400", text: "text-blue-700" },
              { label: "📞 Contacted", value: stats.contacted, color: "border-yellow-400", text: "text-yellow-700" },
              { label: "✅ Enrolled", value: stats.enrolled, color: "border-green-400", text: "text-green-700" },
              { label: "❌ Not Interested", value: stats.not_interested, color: "border-red-400", text: "text-red-700" },
            ].map((s) => (
              <div key={s.label} className={`bg-white rounded-2xl p-4 border-l-4 ${s.color} shadow-sm text-center`}>
                <div className={`text-3xl font-extrabold ${s.text}`}>{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <input
              type="text"
              placeholder="🔍 Search name / email / phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="lg:col-span-2 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400"
            />
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400 text-gray-600"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="not_interested">Not Interested</option>
            </select>
            <input
              type="text"
              placeholder="Program filter"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400"
            />
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400 text-gray-600" />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-red-400 text-gray-600" />
          </div>
          <button
            onClick={handleSearch}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-xl text-sm transition-all"
          >
            Apply Filters
          </button>
        </div>

        {/* ── Table / Grid ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="text-4xl mb-2 animate-pulse">⏳</div>
              <p className="text-sm">Loading leads...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-500">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-sm">{error}</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-sm">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {["Name", "Contact", "Program", "State", "Status", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-bold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const sc = STATUS_CONFIG[lead.status];
                    return (
                      <tr
                        key={lead._id}
                        className={`border-b border-gray-50 hover:bg-red-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
                      >
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setSelected(lead)}
                            className="font-bold text-gray-900 hover:text-red-600 transition-colors text-left"
                          >
                            {lead.name}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-gray-600 text-xs">{lead.email}</div>
                          <div className="font-bold text-gray-800">+91 {lead.phone}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">
                            {lead.program}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{lead.state}</td>
                        <td className="px-4 py-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead._id, e.target.value as Lead["status"])}
                            className={`text-xs font-bold px-2 py-1 rounded-full border-0 cursor-pointer ${sc.bg} ${sc.color} focus:outline-none`}
                          >
                            <option value="new">🆕 New</option>
                            <option value="contacted">📞 Contacted</option>
                            <option value="enrolled">✅ Enrolled</option>
                            <option value="not_interested">❌ Not Interested</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelected(lead)}
                              className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold transition-all"
                            >
                              View
                            </button>
                            <button
                              onClick={() => deleteLead(lead._id)}
                              className="text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg text-xs font-bold transition-all"
                            >
                              Del
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Pagination ── */}
          {pagination && pagination.totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Page {pagination.page} of {pagination.totalPages} ({pagination.total} total leads)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={!pagination.hasPrev}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold disabled:opacity-40 hover:border-red-400 transition-all"
                >
                  ← Prev
                </button>
                <button
                  disabled={!pagination.hasNext}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold disabled:opacity-40 hover:border-red-400 transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Lead Detail Drawer ── */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-red-700 to-red-600 p-5 text-white flex items-center justify-between">
              <h2 className="font-extrabold text-lg">Lead Details</h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold hover:bg-white/30">×</button>
            </div>
            <div className="p-5 space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-extrabold text-2xl">
                  {selected.name[0]}
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 text-lg">{selected.name}</div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].color}`}>
                    {STATUS_CONFIG[selected.status].label}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                {[
                  ["📧 Email",   selected.email],
                  ["📞 Phone",   `+91 ${selected.phone}`],
                  ["🎓 Program", selected.program],
                  ["📍 State",   selected.state],
                  ["🌐 Source",  selected.source],
                  ["📅 Date",    formatDate(selected.createdAt)],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-gray-500 text-xs w-28 flex-shrink-0">{label}</span>
                    <span className="font-bold text-gray-800 text-xs">{value}</span>
                  </div>
                ))}
                {selected.message && (
                  <div>
                    <span className="text-gray-500 text-xs">💬 Message</span>
                    <p className="text-gray-700 text-xs mt-1 leading-relaxed">{selected.message}</p>
                  </div>
                )}
              </div>

              {/* Update status */}
              <div>
                <p className="text-xs font-bold text-gray-600 mb-2">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["new", "contacted", "enrolled", "not_interested"] as Lead["status"][]).map((s) => {
                    const sc = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected._id, s)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                          selected.status === s
                            ? `${sc.bg} ${sc.color} border-current`
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {sc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs text-center transition-all"
                >
                  📧 Send Email
                </a>
                <a
                  href={`tel:+91${selected.phone}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs text-center transition-all"
                >
                  📞 Call Now
                </a>
              </div>
              <button
                onClick={() => deleteLead(selected._id)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-xs transition-all border border-red-200"
              >
                🗑️ Delete This Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}