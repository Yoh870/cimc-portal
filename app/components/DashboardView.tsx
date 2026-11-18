"use client";

import { Users, FileSignature, Tv, ShieldCheck, ArrowUpRight, Zap, Award, Stethoscope } from "lucide-react";

interface DashboardViewProps {
  setActiveTab: (tab: "dashboard" | "id" | "doc" | "paging") => void;
}

export default function DashboardView({ setActiveTab }: DashboardViewProps) {
  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/60 via-zinc-900/80 to-purple-950/40 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono text-blue-400">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              CIMC ENTERPRISE INTEGRATED SYSTEM v2.5
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              City of Ilagan Medical Center
            </h1>
            <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
              Unified hospital operations platform. Seamlessly manage employee identification badges, verify doctor signatures, and broadcast real-time public address announcements from a single integrated workspace.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveTab("id")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
            >
              <Users size={16} />
              <span>Create Employee ID</span>
            </button>
            <button
              onClick={() => setActiveTab("doc")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-semibold text-sm transition-all border border-purple-500/30"
            >
              <FileSignature size={16} />
              <span>Verify Signature</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ID_CIMC Card */}
        <div
          onClick={() => setActiveTab("id")}
          className="group cursor-pointer rounded-2xl border border-white/10 bg-[#121216]/80 p-6 hover:border-blue-500/50 hover:bg-[#16161c] transition-all shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
              <span>Active Module</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">ID_CIMC</h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">Employee ID & Badge Generator</p>
          <p className="text-sm text-zinc-300 mt-3">
            Design, preview, and print official hospital ID badges with custom photos, departments, and secure barcodes.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Features: Front/Back layout</span>
            <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">Launch ID Generator →</span>
          </div>
        </div>

        {/* DocPirma Card */}
        <div
          onClick={() => setActiveTab("doc")}
          className="group cursor-pointer rounded-2xl border border-white/10 bg-[#121216]/80 p-6 hover:border-purple-500/50 hover:bg-[#16161c] transition-all shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FileSignature size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
              <span>AI Powered</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">DocPirma</h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">Doctor Signature Verification</p>
          <p className="text-sm text-zinc-300 mt-3">
            AI-powered multimodal vision signature scanner to verify attending physicians and medical clearance documents.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Features: Gemini AI Vision</span>
            <span className="text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">Launch DocPirma →</span>
          </div>
        </div>

        {/* Paging Work Card */}
        <div
          onClick={() => setActiveTab("paging")}
          className="group cursor-pointer rounded-2xl border border-white/10 bg-[#121216]/80 p-6 hover:border-emerald-500/50 hover:bg-[#16161c] transition-all shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Tv size={24} />
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <span>Bilingual TTS</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Paging Work</h3>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">Hospital PA Announcement System</p>
          <p className="text-sm text-zinc-300 mt-3">
            Broadcast emergency Code Blue alerts, doctor pages, and patient announcements in English or Filipino with TTS.
          </p>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>Features: 14 Paging Categories</span>
            <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">Launch Paging →</span>
          </div>
        </div>
      </div>

      {/* System Status & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Integrated Architecture Benefits</h4>
              <p className="text-xs text-zinc-400">Why this unified system outperforms separate web apps</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
                <Zap size={14} />
                <span>Single Authentication</span>
              </div>
              <p className="text-xs text-zinc-400">No need to log in separately across multiple Vercel deployments. One unified session.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                <Award size={14} />
                <span>Shared Database & State</span>
              </div>
              <p className="text-xs text-zinc-400">Employee records, doctor directories, and paging logs are synchronized instantly.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Stethoscope size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">System Health</h4>
                <p className="text-xs text-emerald-400 font-mono">All modules operational</p>
              </div>
            </div>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-zinc-400 py-1 border-b border-white/5">
                <span>ID Generator Service</span>
                <span className="text-emerald-400 font-mono">ONLINE</span>
              </div>
              <div className="flex justify-between text-zinc-400 py-1 border-b border-white/5">
                <span>DocPirma Gemini AI</span>
                <span className="text-emerald-400 font-mono">ONLINE</span>
              </div>
              <div className="flex justify-between text-zinc-400 py-1">
                <span>Paging TTS Engine</span>
                <span className="text-emerald-400 font-mono">ONLINE</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-zinc-500 text-center">
            City of Ilagan Medical Center IT Department © 2026
          </div>
        </div>
      </div>
    </div>
  );
}
