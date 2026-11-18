"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  FileSignature,
  Tv,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";

export default function CIMCPortal() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "id" | "doc" | "paging">("dashboard");

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
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
            <span>ID_CIMC · DocPirma · Paging Work Connected</span>
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
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#0c0c10] p-4 flex md:flex-col gap-2 overflow-x-auto shrink-0">
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
            <span>ID_CIMC</span>
          </button>

          <button
            onClick={() => setActiveTab("doc")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "doc"
                ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <FileSignature size={18} />
            <span>DocPirma</span>
          </button>

          <button
            onClick={() => setActiveTab("paging")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "paging"
                ? "bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Tv size={18} />
            <span>Paging Work</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col p-4 lg:p-6 bg-[#09090b]">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">City of Ilagan Medical Center Portal</h2>
                <p className="text-sm text-zinc-400 mt-1">System Integration Hub by Yoh Gangan (IT Staff). Access all three core hospital systems directly inside this unified portal container without opening new tabs.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div onClick={() => setActiveTab("id")} className="group cursor-pointer rounded-2xl border border-white/15 bg-gradient-to-br from-blue-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-blue-500/50 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/25">
                      <Users size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">ID_CIMC</h3>
                  <p className="text-xs font-mono text-blue-400 mt-0.5">https://id-cimc.vercel.app/</p>
                  <p className="text-sm text-zinc-400 mt-2">Hospital employee identification generator and badge verification system.</p>
                </div>

                <div onClick={() => setActiveTab("doc")} className="group cursor-pointer rounded-2xl border border-white/15 bg-gradient-to-br from-purple-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-purple-500/50 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/25">
                      <FileSignature size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">DocPirma</h3>
                  <p className="text-xs font-mono text-purple-400 mt-0.5">https://doc-pirma.vercel.app/login</p>
                  <p className="text-sm text-zinc-400 mt-2">Secure electronic document signing and medical clearance portal.</p>
                </div>

                <div onClick={() => setActiveTab("paging")} className="group cursor-pointer rounded-2xl border border-white/15 bg-gradient-to-br from-emerald-950/40 via-white/[0.02] to-white/[0.02] p-6 hover:border-emerald-500/50 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      <Tv size={24} />
                    </div>
                    <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">Paging Work</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">https://paging-work.vercel.app/</p>
                  <p className="text-sm text-zinc-400 mt-2">Real-time patient queue broadcasting and counter display system.</p>
                </div>
              </div>

              {/* Integration Status Box */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Active Production Systems Embedded</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">All applications are fully integrated into the CIMC portal interface container.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setActiveTab("id")} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all">
                    Launch ID_CIMC
                  </button>
                  <button onClick={() => setActiveTab("doc")} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all">
                    Launch DocPirma
                  </button>
                  <button onClick={() => setActiveTab("paging")} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all">
                    Launch Paging
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ID_CIMC EMBEDDED TAB */}
          {activeTab === "id" && (
            <div className="flex-1 flex flex-col h-[calc(100vh-120px)] rounded-2xl border border-white/10 bg-[#121216] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>ID_CIMC Portal</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-blue-400">https://id-cimc.vercel.app/</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://id-cimc.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-all border border-white/10"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full bg-white relative">
                <iframe
                  src="https://id-cimc.vercel.app/"
                  title="ID_CIMC Portal"
                  className="w-full h-full border-0 absolute inset-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

          {/* DOCPIRMA EMBEDDED TAB */}
          {activeTab === "doc" && (
            <div className="flex-1 flex flex-col h-[calc(100vh-120px)] rounded-2xl border border-white/10 bg-[#121216] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-500 animate-pulse" />
                  <span>DocPirma Login Hub</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-purple-400">https://doc-pirma.vercel.app/login?redirectedFrom=%2F</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://doc-pirma.vercel.app/login?redirectedFrom=%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-all border border-white/10"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full bg-white relative">
                <iframe
                  src="https://doc-pirma.vercel.app/login?redirectedFrom=%2F"
                  title="DocPirma Login"
                  className="w-full h-full border-0 absolute inset-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

          {/* PAGING WORK EMBEDDED TAB */}
          {activeTab === "paging" && (
            <div className="flex-1 flex flex-col h-[calc(100vh-120px)] rounded-2xl border border-white/10 bg-[#121216] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Paging Work Queue System</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-emerald-400">https://paging-work.vercel.app/</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://paging-work.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-all border border-white/10"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full bg-white relative">
                <iframe
                  src="https://paging-work.vercel.app/"
                  title="Paging Work Queue"
                  className="w-full h-full border-0 absolute inset-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
