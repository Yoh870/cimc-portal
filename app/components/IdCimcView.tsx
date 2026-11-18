"use client";

import { useState } from "react";
import { Users, Printer, RefreshCw, Sparkles, Building2, Shield } from "lucide-react";

export default function IdCimcView() {
  const [name, setName] = useState("YOH GANGAN, RN");
  const [department, setDepartment] = useState("NURSING SERVICES");
  const [idNumber, setIdNumber] = useState("CIMC-2026-0887");
  const [photo, setPhoto] = useState<string | null>(null);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhoto(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const randomizeId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setIdNumber(`CIMC-2026-${randomNum}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Users size={14} />
            <span>ID_CIMC MODULE</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Employee Identification & Badge Generator</h2>
          <p className="text-sm text-zinc-400">Generate, customize, and print official CIMC staff badges with barcode verification.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            <Printer size={14} />
            <span>Print Badge</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={16} className="text-blue-400" />
              <span>Badge Information</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Employee Full Name & Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. DR. MARIA SANTOS"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Department / Division</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181c] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="NURSING SERVICES">NURSING SERVICES</option>
                  <option value="MEDICAL & SURGICAL">MEDICAL & SURGICAL</option>
                  <option value="EMERGENCY DEPARTMENT">EMERGENCY DEPARTMENT</option>
                  <option value="IT & SYSTEMS DEPT">IT & SYSTEMS DEPT</option>
                  <option value="DIAGNOSTIC & LABORATORY">DIAGNOSTIC & LABORATORY</option>
                  <option value="ADMINISTRATION & HR">ADMINISTRATION & HR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Employee ID Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    onClick={randomizeId}
                    className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
                    title="Generate Random ID"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Employee Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <button
                onClick={() => setActiveSide("front")}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSide === "front" ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setActiveSide("back")}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSide === "back" ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                Back View
              </button>
            </div>
          </div>
        </div>

        {/* Badge Preview Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-[#0c0c10] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)] pointer-events-none" />

          {/* Badge Card Wrapper */}
          <div className="w-[300px] h-[440px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative text-black flex flex-col border border-zinc-200">
            {activeSide === "front" ? (
              /* FRONT SIDE */
              <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Blue Left Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-14 bg-[#163f96] flex items-center justify-center z-10">
                  <div className="transform -rotate-90 text-[#4fa9cc] font-black text-3xl tracking-widest uppercase font-mono whitespace-nowrap">
                    CIMC
                  </div>
                </div>

                <div className="ml-14 flex-1 flex flex-col p-4 relative">
                  {/* Blobs / Design accents */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#4fa9cc]/30 pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center gap-2 z-10 pt-1">
                    <Building2 size={24} className="text-[#163f96]" />
                    <div>
                      <h4 className="font-extrabold text-[11px] leading-tight text-zinc-900 uppercase">City of Ilagan Medical Center</h4>
                      <p className="text-[9px] font-mono text-[#163f96]">OFFICIAL HOSPITAL ID</p>
                    </div>
                  </div>

                  {/* Photo Frame */}
                  <div className="w-28 h-28 mx-auto mt-4 rounded-xl border-2 border-[#163f96] overflow-hidden bg-zinc-100 shadow-md relative z-10 flex items-center justify-center">
                    {photo ? (
                      <img src={photo} alt="Employee" className="w-full h-full object-cover" />
                    ) : (
                      <Users size={40} className="text-zinc-400" />
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="text-center mt-3 z-10 space-y-1">
                    <h3 className="font-bold text-sm text-zinc-900 tracking-tight uppercase line-clamp-2">{name}</h3>
                    <div className="h-1 bg-[#fdc800] w-full my-1 rounded" />
                    <p className="text-xs font-bold text-[#163f96] uppercase tracking-wider">{department}</p>
                  </div>

                  {/* Barcode & Footer */}
                  <div className="mt-auto pt-2 flex flex-col items-center z-10">
                    <div className="w-36 h-8 bg-zinc-200 flex items-center justify-center rounded font-mono text-[9px] text-zinc-600 tracking-tighter">
                      ||| | |||| || | || |||
                    </div>
                    <div className="w-full bg-[#163f96] text-white py-1.5 px-3 flex items-center justify-between text-[10px] font-mono mt-2 rounded-lg">
                      <span>ID NO:</span>
                      <span className="font-bold">{idNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* BACK SIDE */
              <div className="flex-1 flex flex-col p-5 bg-zinc-50 relative justify-between">
                <div className="absolute top-0 left-0 right-0 h-6 bg-[#163f96]" />

                <div className="mt-8 space-y-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Shield size={36} className="text-[#163f96]" />
                  </div>
                  <h4 className="font-bold text-xs text-zinc-900">CITY OF ILAGAN MEDICAL CENTER</h4>
                  <p className="text-[10px] text-zinc-600 px-2 leading-relaxed">
                    This card is official property of CIMC. If found, please return to the Human Resources or IT Department immediately.
                  </p>
                </div>

                <div className="space-y-3 bg-white p-3 rounded-xl border border-zinc-200 text-left text-[10px] font-mono text-zinc-700 shadow-sm">
                  <div><strong className="text-zinc-900">Emergency Contact:</strong> (078) 323-0001</div>
                  <div><strong className="text-zinc-900">Issued Date:</strong> November 2026</div>
                  <div><strong className="text-zinc-900">Access Level:</strong> Level 4 (All Clinical Areas)</div>
                </div>

                <div className="text-center pt-2">
                  <div className="text-[9px] text-zinc-400 font-mono">AUTHORIZED SIGNATURE</div>
                  <div className="w-36 h-8 border-b border-zinc-400 mx-auto mt-1 flex items-end justify-center pb-1 font-serif italic text-xs text-zinc-700">
                    Mario J. Gangan
                  </div>
                  <p className="text-[8px] text-zinc-400 mt-2">CIMC Enterprise Unified System</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-zinc-400 font-mono">
            Preview Mode · Click Front/Back to toggle views
          </div>
        </div>
      </div>
    </div>
  );
}
