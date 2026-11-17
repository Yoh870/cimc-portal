"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  FileSignature,
  Tv,
  ShieldCheck,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Activity,
  ArrowUpRight,
  Printer,
  Bell
} from "lucide-react";

export default function CIMCPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "id" | "doc" | "paging">("dashboard");

  // State for ID System
  const [employeeSearch] = useState("");
  const employees = [
    { id: "CIMC-2024-001", name: "Dr. Maria Santos", role: "Chief Medical Officer", dept: "Cardiology", status: "Active" },
    { id: "CIMC-2024-002", name: "Yoh Gangan", role: "IT Systems Engineer", dept: "Information Technology", status: "Active" },
    { id: "CIMC-2024-003", name: "Nurse Juan Dela Cruz", role: "Head Nurse", dept: "Emergency Room", status: "On Duty" },
    { id: "CIMC-2024-004", name: "Dr. Robert Reyes", role: "Pediatrician", dept: "Pediatrics", status: "Active" },
  ];

  // State for DocPirma
  const [documents] = useState([
    { id: "DOC-8901", title: "Hospital Equipment Procurement Sign-off", author: "Yoh Gangan", status: "Pending Signature", date: "2026-11-17" },
    { id: "DOC-8902", title: "Monthly IT Security Compliance Report", author: "Yoh Gangan", status: "Signed", date: "2026-11-15" },
    { id: "DOC-8903", title: "Patient Data Privacy Clearance Form", author: "Dr. Maria Santos", status: "Pending Signature", date: "2026-11-16" },
  ]);

  // State for Paging Work
  const [queueList] = useState([
    { number: "A-014", patient: "Juan Tamad", counter: "Counter 3 - Cashier", status: "Serving" },
    { number: "A-015", patient: "Ana Cruz", counter: "Counter 1 - Billing", status: "Waiting" },
    { number: "B-008", patient: "Pedro Penduko", counter: "Triage - ER", status: "Called" },
  ]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Building2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Cauayan Medical Center</h1>
            <p className="text-xs text-muted-foreground text-blue-400 font-mono">CIMC ENTERPRISE INTEGRATED PORTFOLIO</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>IT Systems: All Operational</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="h-9 w-9 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-sm">
              YG
            </div>
            <div className="hidden md:block text-left text-xs">
              <p className="font-semibold text-white">Yoh Gangan</p>
              <p className="text-muted-foreground text-[10px]">IT Department</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#0c0c10] p-4 flex md:flex-col gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Activity size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("id")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "id"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Users size={18} />
            <span>ID_CIMC (Staff & ID)</span>
          </button>

          <button
            onClick={() => setActiveTab("doc")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "doc"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <FileSignature size={18} />
            <span>DocPirma (Signatures)</span>
          </button>

          <button
            onClick={() => setActiveTab("paging")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "paging"
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Tv size={18} />
            <span>Paging Work (Queue)</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Hospital Portal Dashboard</h2>
                <p className="text-sm text-zinc-400 mt-1">Welcome back, Yoh. Here is the operational overview of integrated CIMC systems.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Registered IDs</span>
                    <Users size={18} className="text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">248</p>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active hospital personnel
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Pending DocPirma</span>
                    <FileSignature size={18} className="text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">12</p>
                  <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                    <Clock size={12} /> Awaiting digital signature
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Active Queues</span>
                    <Tv size={18} className="text-emerald-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">45</p>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <Activity size={12} /> Live paging active
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">System Status</span>
                    <ShieldCheck size={18} className="text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">100%</p>
                  <p className="text-xs text-blue-400 mt-1">Secure SSL Enabled</p>
                </div>
              </div>

              {/* Quick Launch Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => setActiveTab("id")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Users size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">ID_CIMC Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Verify hospital staff identification, print badge templates, and manage database records.</p>
                </div>

                <div onClick={() => setActiveTab("doc")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <FileSignature size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">DocPirma Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Secure e-signature workflow for medical clearances, administrative memos, and approvals.</p>
                </div>

                <div onClick={() => setActiveTab("paging")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-emerald-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Tv size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">Paging Work Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Real-time hospital queue display, patient status broadcasting, and counter assignments.</p>
                </div>
              </div>
            </div>
          )}

          {/* ID_CIMC TAB */}
          {activeTab === "id" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">ID_CIMC Personnel Directory</h2>
                  <p className="text-sm text-zinc-400 mt-1">Manage and verify Cauayan Medical Center employee identification cards.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Plus size={16} /> Register New Staff
                </button>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by ID number, name, or department..."
                  value={employeeSearch}
                  readOnly
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Employee List Table */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400 bg-white/[0.01]">
                      <th className="p-4">ID Number</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono text-blue-400">{emp.id}</td>
                        <td className="p-4 font-medium text-white">{emp.name}</td>
                        <td className="p-4 text-zinc-300">{emp.role}</td>
                        <td className="p-4 text-zinc-400">{emp.dept}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            {emp.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors" title="Print ID Badge">
                            <Printer size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DOCPIRMA TAB */}
          {activeTab === "doc" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">DocPirma Digital Signature Hub</h2>
                  <p className="text-sm text-zinc-400 mt-1">Review, sign, and track secure hospital administrative documents and medical clearances.</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                  <Plus size={16} /> Upload New Document
                </button>
              </div>

              {/* Document List */}
              <div className="grid grid-cols-1 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <FileSignature size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-purple-400">{doc.id}</span>
                          <span className="text-xs text-zinc-500">• {doc.date}</span>
                        </div>
                        <h3 className="font-semibold text-white mt-1">{doc.title}</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Author: {doc.author}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        doc.status === "Signed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {doc.status}
                      </span>
                      {doc.status === "Pending Signature" && (
                        <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">
                          Sign Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGING WORK TAB */}
          {activeTab === "paging" && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Paging Work & Queue System</h2>
                <p className="text-sm text-zinc-400 mt-1">Real-time hospital queue broadcasting and department counter management.</p>
              </div>

              {/* Live Queue Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {queueList.map((q, idx) => (
                  <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-5 font-mono text-8xl font-bold">
                      {q.number}
                    </div>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{q.counter}</span>
                    <p className="text-5xl font-extrabold font-mono text-white mt-3 tracking-tight">{q.number}</p>
                    <p className="text-sm font-medium text-zinc-300 mt-2">{q.patient}</p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Status</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        {q.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Broadcast Announcement Bar */}
              <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-6 backdrop-blur-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Emergency Broadcast Announcement</h3>
                    <p className="text-xs text-zinc-300 mt-0.5">Broadcast custom audio/visual notices to all department waiting room screens.</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] whitespace-nowrap">
                  Broadcast Notice
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
