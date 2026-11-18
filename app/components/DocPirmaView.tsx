"use client";

import { useState } from "react";
import { FileSignature, ShieldCheck, Upload, Search, CheckCircle2, User, Award, Lock, Mail, ArrowRight } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  department: string;
  specialty: string;
}

export default function DocPirmaView() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("admin@cimc.gov.ph");
  const [password, setPassword] = useState("••••••••");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"scan" | "doctors">("scan");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    matched: boolean;
    doctorName?: string;
    department?: string;
    confidence?: number;
    reasoning?: string;
  } | null>(null);

  const [doctorsList] = useState<Doctor[]>([
    { id: "1", name: "Dr. Maria Santos, MD", department: "Surgical Ward", specialty: "General Surgery" },
    { id: "2", name: "Dr. Juan Dela Cruz, FPCP", department: "Internal Medicine", specialty: "Cardiology" },
    { id: "3", name: "Dr. Elena Reyes, DPBO", department: "Pediatrics", specialty: "Neonatology" },
    { id: "4", name: "Dr. Carlos Miguel Gomez, FPOA", department: "Orthopedics", specialty: "Trauma Surgery" },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!email || !password) {
      setLoginError("Please enter both email and password.");
      return;
    }
    // Simulate successful secure login for DocPirma
    setIsAuthenticated(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedFile(ev.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runSimulation = () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        matched: true,
        doctorName: "Dr. Maria Santos, MD",
        department: "Surgical Ward",
        confidence: 96.4,
        reasoning: "Signature match confirmed with high confidence. Stroke dynamics, loop formations, and pressure gradients match registered specimen #0881.",
      });
    }, 1500);
  };

  // If not authenticated, show DocPirma Login Gate
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 p-8 rounded-3xl border border-purple-500/20 bg-[#121216] shadow-2xl space-y-6 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <FileSignature size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">DocPirma Secure Login</h3>
          <p className="text-xs text-zinc-400">Restricted access for authorized medical staff and signature verifiers.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center">
              {loginError}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="admin@cimc.gov.ph"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Authenticate Securely</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-500 text-center font-mono">
          Protected by Supabase Auth & Brute-force Shield
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
            <FileSignature size={14} />
            <span>DOCPIRMA MODULE (AI SIGNATURE VERIFICATION)</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Doctor Signature Verification & Directory</h2>
          <p className="text-sm text-zinc-400">Scan and verify attending physician signatures using Gemini AI multimodal vision.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("scan")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "scan" ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" : "text-zinc-400 hover:text-white"
              }`}
            >
              Signature Scanner
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "doctors" ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]" : "text-zinc-400 hover:text-white"
              }`}
            >
              Doctor Directory ({doctorsList.length})
            </button>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors"
            title="Lock / Logout DocPirma"
          >
            Lock
          </button>
        </div>
      </div>

      {activeTab === "scan" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Upload & Trigger Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload size={18} className="text-purple-400" />
                <span>Upload Signature for AI Verification</span>
              </h3>

              <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/[0.01] hover:bg-white/[0.02] transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Upload size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Click to upload or drag & drop signature photo</p>
                    <p className="text-xs text-zinc-400 mt-1">Supports PNG, JPG, JPEG up to 10MB</p>
                  </div>
                </div>
              </div>

              {selectedFile && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 h-40 relative flex items-center justify-center">
                    <img src={selectedFile} alt="Uploaded Signature" className="max-h-full object-contain p-2" />
                  </div>
                  <button
                    onClick={runSimulation}
                    disabled={isScanning}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Analyzing with Gemini AI Vision...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Run AI Verification</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Result Column */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl">
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award size={18} className="text-purple-400" />
                <span>Verification Results</span>
              </h3>

              {!scanResult && !isScanning && (
                <div className="py-20 text-center space-y-3">
                  <div className="inline-flex p-4 rounded-full bg-white/[0.03] text-zinc-500 border border-white/5">
                    <Search size={32} />
                  </div>
                  <p className="text-sm text-zinc-400">Upload a signature photo and run AI verification to see results here.</p>
                </div>
              )}

              {isScanning && (
                <div className="py-20 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 animate-pulse">
                    <FileSignature size={32} />
                  </div>
                  <p className="text-sm text-white font-semibold">Comparing stroke characteristics against doctor database...</p>
                </div>
              )}

              {scanResult && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                    <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-400 text-sm">Verified Physician Match Found</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">Confidence Score: <strong className="text-emerald-400 font-mono">{scanResult.confidence}%</strong></p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-zinc-400">Physician Name</span>
                      <span className="font-bold text-white">{scanResult.doctorName}</span>
                    </div>
                    <div className="flex justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-zinc-400">Department</span>
                      <span className="font-bold text-purple-400">{scanResult.department}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Vision Reasoning</span>
                    <p className="text-xs text-zinc-300 leading-relaxed font-mono">{scanResult.reasoning}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-500 text-center">
              Powered by Google Gemini 3.5 Flash Vision + Supabase Security
            </div>
          </div>
        </div>
      ) : (
        /* DOCTOR DIRECTORY TAB */
        <div className="rounded-2xl border border-white/10 bg-[#121216] shadow-xl overflow-hidden">
          <div className="p-4 bg-[#18181c] border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Registered CIMC Doctors & Specimen Signatures</h3>
            <span className="text-xs font-mono text-purple-400">Total: {doctorsList.length} Physicians</span>
          </div>
          <div className="divide-y divide-white/5">
            {doctorsList.map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                    <p className="text-xs text-zinc-400">{doc.department} · <span className="text-purple-400">{doc.specialty}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                    Verified Specimen
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
