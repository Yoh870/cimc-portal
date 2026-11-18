"use client";

import { useState } from "react";
import { Tv, Volume2, Copy, Sparkles, AlertTriangle, Check, RefreshCw } from "lucide-react";

type PagingCategory = "doctor" | "emergency" | "patient" | "parking" | "general";

export default function PagingView() {
  const [pagingType, setPagingType] = useState<PagingCategory>("doctor");
  const [name, setName] = useState("Dr. Juan Dela Cruz");
  const [location, setLocation] = useState("Emergency Room (ER)");
  const [language, setLanguage] = useState<"en" | "tl">("en");
  const [generatedText, setGeneratedText] = useState("Attention please. Calling Dr. Juan Dela Cruz. Please proceed to Emergency Room (ER). Thank you.");
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const categories: { id: PagingCategory; label: string; icon: string }[] = [
    { id: "doctor", label: "Doctor Call", icon: "👨‍⚕️" },
    { id: "emergency", label: "Code Blue / Emergency", icon: "🚨" },
    { id: "patient", label: "Patient Page", icon: "🏥" },
    { id: "parking", label: "Parking Alert", icon: "🚗" },
    { id: "general", label: "General Announcement", icon: "📢" },
  ];

  const generateAnnouncement = (type: PagingCategory = pagingType, lang: "en" | "tl" = language) => {
    let text = "";
    if (lang === "en") {
      if (type === "emergency") {
        text = `ATTENTION ALL HOSPITAL STAFF. CODE BLUE EMERGENCY AT ${location}. ALL AVAILABLE EMERGENCY PERSONNEL PLEASE RESPOND IMMEDIATELY.`;
      } else if (type === "doctor") {
        text = `Attention please. Calling ${name}. Please proceed to ${location}. Thank you.`;
      } else if (type === "patient") {
        text = `Attention please. Calling patient ${name}. Please proceed to ${location}. Thank you.`;
      } else if (type === "parking") {
        text = `Attention vehicle owner of ${name}. Please move your vehicle immediately from ${location}. Thank you.`;
      } else {
        text = `Attention please. ${name}. Location: ${location}. Thank you.`;
      }
    } else {
      if (type === "emergency") {
        text = `PANSININ PO ANG LAHAT NG KAWANI. CODE BLUE EMERGENCY SA ${location}. MAGSITUNGO PO AGAD ANG MGA EMERGENCY PERSONNEL.`;
      } else if (type === "doctor") {
        text = `Pakiusap pong pakinggan. Tumatawag kay ${name}. Mangyari pong pumunta sa ${location}. Salamat po.`;
      } else if (type === "patient") {
        text = `Pakiusap pong pakinggan. Tumatawag sa pasyenteng si ${name}. Mangyari pong pumunta sa ${location}. Salamat po.`;
      } else {
        text = `Pakiusap pong pakinggan. ${name}. Lugar: ${location}. Salamat po.`;
      }
    }
    setGeneratedText(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = () => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(generatedText);
    utterance.lang = language === "en" ? "en-US" : "fil-PH";
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Tv size={14} />
            <span>PAGING WORK MODULE</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Hospital PA Announcement & Broadcast System</h2>
          <p className="text-sm text-zinc-400">Generate public address scripts and broadcast via Web Speech TTS or copy for PA system.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => { setLanguage("en"); generateAnnouncement(pagingType, "en"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === "en" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-zinc-400 hover:text-white"
            }`}
          >
            English
          </button>
          <button
            onClick={() => { setLanguage("tl"); generateAnnouncement(pagingType, "tl"); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              language === "tl" ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "text-zinc-400 hover:text-white"
            }`}
          >
            Filipino (Tagalog)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Generator Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-400" />
              <span>Select Announcement Category</span>
            </h3>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setPagingType(cat.id); generateAnnouncement(cat.id, language); }}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    pagingType === cat.id
                      ? "border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {pagingType === "emergency" && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 animate-pulse">
                <AlertTriangle size={20} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-300 font-semibold">Code Blue Emergency broadcasts override all hospital PA audio zones.</p>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  {pagingType === "doctor" ? "Doctor Name" : pagingType === "patient" ? "Patient Name" : pagingType === "parking" ? "Vehicle / Owner Name" : "Announcement Subject / Name"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Location / Department</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                onClick={() => generateAnnouncement(pagingType, language)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                <span>Generate PA Script</span>
              </button>
            </div>
          </div>
        </div>

        {/* Output & Broadcast Column */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Volume2 size={18} className="text-emerald-400" />
                <span>Generated PA Script Output</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {language === "en" ? "English" : "Filipino"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 font-mono text-sm text-zinc-200 leading-relaxed min-h-[140px] flex items-center shadow-inner">
              {generatedText}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Script"}</span>
              </button>

              {!isSpeaking ? (
                <button
                  onClick={speakText}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  <Volume2 size={16} />
                  <span>Broadcast (TTS)</span>
                </button>
              ) : (
                <button
                  onClick={stopSpeech}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all animate-pulse"
                >
                  <span>Stop Broadcast</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-500 text-center">
            MedPage Pro v2.0 Engine · City of Ilagan Medical Center PA System
          </div>
        </div>
      </div>
    </div>
  );
}
