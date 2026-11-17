"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  FileSignature,
  Tv,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Activity,
  ArrowUpRight,
  QrCode,
  PenTool,
  Volume2
} from "lucide-react";

export default function CIMCPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "id" | "doc" | "paging">("dashboard");

  // ID_CIMC State & Data
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    name: string;
    role: string;
    dept: string;
    status: string;
    email: string;
    contact: string;
  } | null>(null);
  const employees = [
    { id: "CIMC-2024-001", name: "Dr. Maria Santos", role: "Chief Medical Officer", dept: "Cardiology", status: "Active", email: "m.santos@ilaganmed.org", contact: "+63 917 123 4567" },
    { id: "CIMC-2024-002", name: "Yoh Gangan", role: "IT Systems Engineer", dept: "Information Technology", status: "Active", email: "yoh.gangan@ilaganmed.org", contact: "+63 918 987 6543" },
    { id: "CIMC-2024-003", name: "Nurse Juan Dela Cruz", role: "Head Nurse", dept: "Emergency Room", status: "On Duty", email: "j.delacruz@ilaganmed.org", contact: "+63 915 555 0192" },
    { id: "CIMC-2024-004", name: "Dr. Robert Reyes", role: "Pediatrician", dept: "Pediatrics", status: "Active", email: "r.reyes@ilaganmed.org", contact: "+63 922 333 4455" },
  ];

  // DocPirma State & Data
  const [documents, setDocuments] = useState([
    { id: "DOC-8901", title: "Hospital Equipment Procurement Sign-off", author: "Yoh Gangan", status: "Pending Signature", date: "2026-11-17" },
    { id: "DOC-8902", title: "Monthly IT Security Compliance Report", author: "Yoh Gangan", status: "Signed", date: "2026-11-15" },
    { id: "DOC-8903", title: "Patient Data Privacy Clearance Form", author: "Dr. Maria Santos", status: "Pending Signature", date: "2026-11-16" },
  ]);
  const [signingDoc, setSigningDoc] = useState<{
    id: string;
    title: string;
    author: string;
    status: string;
    date: string;
  } | null>(null);
  const [signatureName, setSignatureName] = useState("");

  const handleSignDocument = (id: string) => {
    if (!signatureName.trim()) return;
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: "Signed" } : d));
    setSigningDoc(null);
    setSignatureName("");
  };

  // Paging Work State & Data
  const [queueList, setQueueList] = useState([
    { number: "A-014", patient: "Juan Tamad", counter: "Counter 3 - Cashier", status: "Serving" },
    { number: "A-015", patient: "Ana Cruz", counter: "Counter 1 - Billing", status: "Waiting" },
    { number: "B-008", patient: "Pedro Penduko", counter: "Triage - ER", status: "Called" },
  ]);
  const [newPatient, setNewPatient] = useState("");
  const [newCounter, setNewCounter] = useState("Counter 1 - Billing");

  const addQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.trim()) return;
    const prefix = Math.random() > 0.5 ? "A" : "B";
    const num = `${prefix}-${Math.floor(10 + Math.random() * 89)}`;
    setQueueList([{ number: num, patient: newPatient, counter: newCounter, status: "Waiting" }, ...queueList]);
    setNewPatient("");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Building2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">City of Ilagan Medical Center</h1>
            <p className="text-xs text-muted-foreground text-blue-400 font-mono">CIMC ENTERPRISE INTEGRATED PORTAL (IT DEPT)</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems: ID_CIMC · DocPirma · Paging Work Live</span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="h-9 w-9 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-sm">
              YG
            </div>
            <div className="hidden md:block text-left text-xs">
              <p className="font-semibold text-white">Yoh Gangan</p>
              <p className="text-muted-foreground text-[10px]">IT Staff & Engineer</p>
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
            <span>ID_CIMC (Staff & IDs)</span>
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
            <span>DocPirma (E-Signatures)</span>
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
            <span>Paging Work (Queues)</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-10">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">City of Ilagan Medical Center Portal</h2>
                <p className="text-sm text-zinc-400 mt-1">System Integration Hub developed by Yoh Gangan (IT Staff). All hospital modules are running in a single SPA view.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">ID_CIMC Records</span>
                    <Users size={18} className="text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">{employees.length}</p>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active staff credentials
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">DocPirma Docs</span>
                    <FileSignature size={18} className="text-purple-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">{documents.length}</p>
                  <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {documents.filter(d => d.status === "Pending Signature").length} pending signature
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Paging Queues</span>
                    <Tv size={18} className="text-emerald-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">{queueList.length}</p>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <Activity size={12} /> Live counters active
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">System Integration</span>
                    <ShieldCheck size={18} className="text-blue-400" />
                  </div>
                  <p className="text-3xl font-bold mt-4">Unified</p>
                  <p className="text-xs text-blue-400 mt-1">Single-Page Architecture</p>
                </div>
              </div>

              {/* Quick Launch Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div onClick={() => setActiveTab("id")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-blue-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/25">
                      <Users size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">ID_CIMC Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Generate and inspect hospital ID badges with QR verification codes instantly.</p>
                </div>

                <div onClick={() => setActiveTab("doc")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-purple-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/25">
                      <FileSignature size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">DocPirma Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Sign hospital forms and administrative clearances directly inside this portal view.</p>
                </div>

                <div onClick={() => setActiveTab("paging")} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-emerald-500/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <Tv size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">Paging Work Module</h3>
                  <p className="text-sm text-zinc-400 mt-1">Broadcast patient numbers to billing, cashier, and triage waiting room displays.</p>
                </div>
              </div>
            </div>
          )}

          {/* ID_CIMC TAB */}
          {activeTab === "id" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">ID_CIMC Staff Directory & Badge Preview</h2>
                  <p className="text-sm text-zinc-400 mt-1">Click any personnel to preview their digital hospital ID badge with QR authentication.</p>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search by ID number, name, or department..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Employee List */}
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400 bg-white/[0.01]">
                        <th className="p-4">ID Number</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Role</th>
                        <th className="p-4 text-right">Badge</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {employees.filter(e => e.name.toLowerCase().includes(employeeSearch.toLowerCase()) || e.id.toLowerCase().includes(employeeSearch.toLowerCase())).map((emp) => (
                        <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
                          <td className="p-4 font-mono text-blue-400">{emp.id}</td>
                          <td className="p-4 font-medium text-white">{emp.name}</td>
                          <td className="p-4 text-zinc-300">{emp.role}</td>
                          <td className="p-4 text-right">
                            <button className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all">
                              View ID
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ID Badge Preview Card */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/40 via-white/[0.02] to-white/[0.02] p-6 flex flex-col items-center justify-center text-center">
                  {selectedEmployee ? (
                    <div className="w-full max-w-[280px] rounded-2xl border border-blue-500/30 bg-zinc-950 p-5 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                        <span className="text-[10px] font-mono text-blue-400">CITY OF ILAGAN MED</span>
                        <Building2 size={16} className="text-blue-400" />
                      </div>
                      <div className="h-20 w-20 mx-auto rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl mb-3">
                        {selectedEmployee.name.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <h3 className="font-bold text-white text-base">{selectedEmployee.name}</h3>
                      <p className="text-xs text-blue-400 font-medium">{selectedEmployee.role}</p>
                      <p className="text-[11px] text-zinc-400 mt-1">{selectedEmployee.dept}</p>

                      <div className="mt-5 p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                        <QrCode size={36} className="text-white" />
                        <div className="text-left">
                          <p className="text-[10px] font-mono text-zinc-400">VERIFIED ID</p>
                          <p className="text-xs font-mono text-blue-400">{selectedEmployee.id}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-zinc-500">
                      <Users size={40} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm">Click any staff member from the table to preview their ID card.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DOCPIRMA TAB */}
          {activeTab === "doc" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">DocPirma Digital Signature Hub</h2>
                  <p className="text-sm text-zinc-400 mt-1">Sign hospital clearances and administrative documents securely inside this view.</p>
                </div>
              </div>

              {/* Document List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/25">
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
                          <button
                            onClick={() => setSigningDoc(doc)}
                            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                          >
                            Sign Document
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Signing Pad Modal / Panel */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-purple-950/40 via-white/[0.02] to-white/[0.02] p-6">
                  <h3 className="font-bold text-base mb-3 flex items-center gap-2">
                    <PenTool size={18} className="text-purple-400" />
                    <span>DocPirma E-Sign Pad</span>
                  </h3>
                  {signingDoc ? (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                        <p className="text-xs text-zinc-400">Selected Document:</p>
                        <p className="text-sm font-semibold text-white mt-0.5">{signingDoc.title}</p>
                        <p className="text-xs font-mono text-purple-400 mt-1">{signingDoc.id}</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1.5">Type Full Name as E-Signature</label>
                        <input
                          type="text"
                          placeholder="e.g. Yoh Gangan, IT"
                          value={signatureName}
                          onChange={(e) => setSignatureName(e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="h-28 rounded-xl border border-dashed border-white/20 bg-white/[0.01] flex items-center justify-center text-zinc-500 font-mono text-sm">
                        {signatureName ? <span className="font-serif italic text-xl text-purple-300">{signatureName}</span> : "Digital Signature Preview"}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSignDocument(signingDoc.id)}
                          className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs py-2.5 rounded-xl transition-all"
                        >
                          Confirm & Sign
                        </button>
                        <button
                          onClick={() => setSigningDoc(null)}
                          className="px-4 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs py-2.5 rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-zinc-500">
                      <FileSignature size={40} className="mx-auto mb-3 opacity-40" />
                      <p className="text-sm">Select a pending document from the left to sign it.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PAGING WORK TAB */}
          {activeTab === "paging" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Paging Work & Queue System</h2>
                  <p className="text-sm text-zinc-400 mt-1">Manage live patient queues and call numbers to hospital counters.</p>
                </div>
              </div>

              {/* Add Queue Form */}
              <form onSubmit={addQueue} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col sm:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Patient Full Name..."
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  className="flex-1 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
                <select
                  value={newCounter}
                  onChange={(e) => setNewCounter(e.target.value)}
                  className="w-full sm:w-60 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-zinc-300"
                >
                  <option value="Counter 1 - Billing">Counter 1 - Billing</option>
                  <option value="Counter 2 - Pharmacy">Counter 2 - Pharmacy</option>
                  <option value="Counter 3 - Cashier">Counter 3 - Cashier</option>
                  <option value="Triage - ER">Triage - ER</option>
                </select>
                <button type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] whitespace-nowrap">
                  Add to Queue
                </button>
              </form>

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
                    <Volume2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Audio Paging Simulator</h3>
                    <p className="text-xs text-zinc-300 mt-0.5">Broadcast voice queue notifications to all waiting room monitors.</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Paging broadcast simulated successfully across all department monitors!")}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] whitespace-nowrap"
                >
                  Test Audio Paging
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
