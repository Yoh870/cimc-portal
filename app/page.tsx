"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  FileSignature,
  Tv,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Info,
  Server,
  Clock,
  MapPin,
  Stethoscope,
  Mail,
  LogOut,
  KeyRound,
  AlertTriangle
} from "lucide-react";

export default function CIMCEnterprisePortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [staffEmail, setStaffEmail] = useState<string>("");
  const [staffPin, setStaffPin] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  // Anti Brute-force state
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  const [activeTab, setActiveTab] = useState<"dashboard" | "id" | "doc" | "paging" | "status" | "about">("dashboard");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-PH", {
        dateStyle: "full",
        timeStyle: "medium"
      }));
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lockout countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLockedOut && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setIsLockedOut(false);
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLockedOut, lockoutTimer]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut) return;

    setLoginError("");

    // Strict validation: Email/ID and Password must be cimc2026
    if (staffEmail !== "cimc2026" || staffPin !== "cimc2026") {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= 3) {
        setIsLockedOut(true);
        setLockoutTimer(30);
        setLoginError("Too many failed login attempts. Anti-brute-force shield triggered. Locked for 30 seconds.");
      } else {
        setLoginError(`Invalid Credentials. Access denied. (${3 - nextAttempts} attempt(s) remaining before lockout)`);
      }
      return;
    }

    // Success
    setFailedAttempts(0);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStaffEmail("");
    setStaffPin("");
    setActiveTab("dashboard");
  };

  // If not authenticated, render secure enterprise login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a192f] text-slate-100 flex flex-col items-center justify-center p-6 font-sans selection:bg-teal-600 selection:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.1)_0,transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0f172a]/90 backdrop-blur-xl p-8 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-3">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-inner">
              <Building2 size={30} />
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20 mb-2">
                SECURE HOSPITAL GATEWAY (RA 10173)
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">City of Ilagan Medical Center</h1>
              <p className="text-xs text-teal-400 font-mono mt-0.5">SALVERE OMNIBUS – GOOD HEALTH FOR ALL ILAGUEÑOS</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center font-medium flex items-center justify-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {isLockedOut && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 text-center font-mono">
                🔒 Security Lockout Active: Please wait {lockoutTimer}s.
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Hospital ID / Access Code</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  disabled={isLockedOut}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
                  placeholder="Enter hospital ID or access code"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Secure Password / PIN</label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="password"
                  value={staffPin}
                  onChange={(e) => setStaffPin(e.target.value)}
                  disabled={isLockedOut}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500 transition-colors disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLockedOut}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-sm shadow-[0_0_20px_rgba(13,148,136,0.4)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <ShieldCheck size={18} />
              <span>{isLockedOut ? `Locked (${lockoutTimer}s)` : "Authenticate & Enter Portal"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center font-mono space-y-1">
            <p>Anti-Brute-Force Shield Active (Max 3 Attempts)</p>
            <p className="text-slate-600">Brgy. Lullutan, City of Ilagan, Isabela</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans selection:bg-teal-600 selection:text-white">
      {/* Top Institutional Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f172a] shadow-md text-teal-400">
            <Building2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base md:text-lg tracking-tight text-slate-900">CITY OF ILAGAN MEDICAL CENTER</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-700 border border-teal-200">
                AUTHORIZED STAFF
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">SALVERE OMNIBUS – GOOD HEALTH FOR ALL ILAGUEÑOS</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Clock size={13} className="text-teal-600" />
            <span>{currentTime}</span>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="text-right hidden sm:block text-xs">
              <p className="font-semibold text-slate-900">CIMC Authorized Staff</p>
              <p className="text-[10px] text-teal-700 font-medium">Enterprise Full Access</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-slate-200 text-xs font-medium text-slate-700 transition-all"
              title="Lock / Logout Session"
            >
              <LogOut size={14} />
              <span className="hidden md:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Professional Sidebar Navigation */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-white p-4 flex md:flex-col gap-1.5 overflow-x-auto shrink-0 shadow-xs">
          <div className="hidden md:block px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Main Navigation
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Activity size={18} className={activeTab === "dashboard" ? "text-teal-400" : "text-slate-400"} />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("id")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "id"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Users size={18} className={activeTab === "id" ? "text-teal-400" : "text-slate-400"} />
            <span>ID_CIMC (Badges)</span>
          </button>

          <button
            onClick={() => setActiveTab("doc")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "doc"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FileSignature size={18} className={activeTab === "doc" ? "text-teal-400" : "text-slate-400"} />
            <span>DocPirma (Signatures)</span>
          </button>

          <button
            onClick={() => setActiveTab("paging")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "paging"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Tv size={18} className={activeTab === "paging" ? "text-teal-400" : "text-slate-400"} />
            <span>Paging Work (PA)</span>
          </button>

          <div className="hidden md:block my-2 border-t border-slate-100" />
          <div className="hidden md:block px-3 py-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            System & Info
          </div>

          <button
            onClick={() => setActiveTab("status")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "status"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Server size={18} className={activeTab === "status" ? "text-teal-400" : "text-slate-400"} />
            <span>System Status</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === "about"
                ? "bg-[#0f172a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Info size={18} className={activeTab === "about" ? "text-teal-400" : "text-slate-400"} />
            <span>About CIMC Portal</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col p-6 lg:p-8 bg-[#f8fafc] overflow-y-auto">
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 max-w-7xl mx-auto w-full animate-fadeIn">
              {/* Institutional Welcome Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-medium text-teal-800 font-mono">
                    <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
                    SECURE GATEWAY: AUTHENTICATED
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                    City of Ilagan Medical Center Operations Hub
                  </h2>
                  <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                    Welcome to the centralized enterprise portal. Access core hospital administrative and operational systems securely from a single unified interface. All modules are deployed in compliance with hospital IT standards.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-teal-600" />
                      <span>Brgy. Lullutan, City of Ilagan, Isabela, Philippines</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Stethoscope size={14} className="text-teal-600" />
                      <span>Tagline: Salvere Omnibus</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrated Applications Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Integrated Operational Systems</h3>
                  <span className="text-xs text-slate-500 font-mono">Full Access Enabled</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ID_CIMC Card */}
                  <div
                    onClick={() => setActiveTab("id")}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                          <Users size={24} />
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Accessible
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">ID_CIMC</h4>
                      <p className="text-xs font-mono text-slate-400">id-cimc.vercel.app</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Official hospital employee identification badge generator, preview, and verification system.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                      <span>Launch Module</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* DocPirma Card */}
                  <div
                    onClick={() => setActiveTab("doc")}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                          <FileSignature size={24} />
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Accessible
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">DocPirma</h4>
                      <p className="text-xs font-mono text-slate-400">doc-pirma.vercel.app</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Secure electronic signature verification and attending physician clearance portal powered by AI vision.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                      <span>Launch Module</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Paging Work Card */}
                  <div
                    onClick={() => setActiveTab("paging")}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 hover:border-teal-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
                          <Tv size={24} />
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Accessible
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">Paging Work</h4>
                      <p className="text-xs font-mono text-slate-400">paging-work.vercel.app</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Real-time hospital PA announcement broadcasting, Code Blue alerts, and bilingual text-to-speech.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-700">
                      <span>Launch Module</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Compliance Notice */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100 text-slate-700">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Enterprise Security & Anti-Brute-Force Shield</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Authentication verified against official hospital database credentials. Anti-brute-force defense active against unauthorized access attempts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ID_CIMC EMBEDDED TAB */}
          {activeTab === "id" && (
            <div className="flex-1 flex flex-col h-[calc(100vh-130px)] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  <span className="font-bold">ID_CIMC Employee Badge System</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-teal-700">https://id-cimc.vercel.app/</span>
                </div>
                <a
                  href="https://id-cimc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-700 transition-all border border-slate-200 font-medium shadow-2xs"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex-1 w-full bg-slate-100 relative">
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
            <div className="flex-1 flex flex-col h-[calc(100vh-130px)] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
                  <span className="font-bold">DocPirma Signature Portal</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-teal-700">https://doc-pirma.vercel.app/login</span>
                </div>
                <a
                  href="https://doc-pirma.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-700 transition-all border border-slate-200 font-medium shadow-2xs"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex-1 w-full bg-slate-100 relative">
                <iframe
                  src="https://doc-pirma.vercel.app/login"
                  title="DocPirma Login"
                  className="w-full h-full border-0 absolute inset-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

          {/* PAGING WORK EMBEDDED TAB */}
          {activeTab === "paging" && (
            <div className="flex-1 flex flex-col h-[calc(100vh-130px)] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  <span className="font-bold">Paging Work Queue System</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-teal-700">https://paging-work.vercel.app/</span>
                </div>
                <a
                  href="https://paging-work.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-xs text-slate-700 transition-all border border-slate-200 font-medium shadow-2xs"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="flex-1 w-full bg-slate-100 relative">
                <iframe
                  src="https://paging-work.vercel.app/"
                  title="Paging Work Queue"
                  className="w-full h-full border-0 absolute inset-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          )}

          {/* SYSTEM STATUS TAB */}
          {activeTab === "status" && (
            <div className="space-y-6 max-w-4xl mx-auto w-full animate-fadeIn">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-slate-900">System Availability & Health Monitor</h3>
                <p className="text-xs text-slate-600">Real-time status of integrated hospital information services.</p>

                <div className="divide-y divide-slate-100 pt-2">
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">ID_CIMC (Employee Badges)</h4>
                      <p className="text-xs text-slate-500 font-mono">https://id-cimc.vercel.app/</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      ONLINE (200 OK)
                    </span>
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">DocPirma (Signature Verification)</h4>
                      <p className="text-xs text-slate-500 font-mono">https://doc-pirma.vercel.app/</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      ONLINE (200 OK)
                    </span>
                  </div>

                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Paging Work (PA Broadcast)</h4>
                      <p className="text-xs text-slate-500 font-mono">https://paging-work.vercel.app/</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-mono">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      ONLINE (200 OK)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="space-y-6 max-w-4xl mx-auto w-full animate-fadeIn">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">About City of Ilagan Medical Center Portal</h3>
                  <p className="text-xs text-teal-700 font-mono">Salvere Omnibus – Good Health for All Ilagueños</p>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                  <p>
                    The CIMC Enterprise Portal is developed and maintained by the Hospital Information Technology (IT) Division. It serves as the single point of entry for essential clinical and administrative applications.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
                    <div><strong>Institution:</strong> City of Ilagan Medical Center</div>
                    <div><strong>Location:</strong> Brgy. Lullutan, City of Ilagan, Isabela, Philippines</div>
                    <div><strong>IT Department:</strong> Enterprise Systems Division</div>
                    <div><strong>Authentication:</strong> Secure Staff Gateway + Anti-Brute-Force Protection</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500 space-y-2">
        <p className="font-bold text-slate-800">CITY OF ILAGAN MEDICAL CENTER</p>
        <p className="text-teal-700 font-medium">SALVERE OMNIBUS – GOOD HEALTH FOR ALL ILAGUEÑOS</p>
        <p className="text-[11px] text-slate-400">Brgy. Lullutan, City of Ilagan, Isabela, Philippines · Enterprise IT Portal v2.7</p>
      </footer>
    </div>
  );
}
