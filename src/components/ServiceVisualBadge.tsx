import { ServiceCategory } from '../types';

interface ServiceVisualProps {
  category: ServiceCategory;
  className?: string;
}

export function ServiceVisualBadge({ category, className = '' }: ServiceVisualProps) {
  // Return tailored SVG icons / technical illustrations per category
  switch (category) {
    case 'diagnostics':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="10" width="48" height="34" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <path d="M14 26 L22 26 L26 18 L32 36 L36 24 L40 28 L50 28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="32" cy="52" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M24 52 L16 52 M40 52 L48 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'maintenance':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]" viewBox="0 0 64 64" fill="none">
            {/* Oil canister and dipstick */}
            <path d="M18 20 L26 12 L38 12 L38 20 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="18" y="20" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" />
            <path d="M46 26 L52 26 C54 26 56 28 56 30 L56 42 C56 44 54 46 52 46 L46 46" stroke="#94a3b8" strokeWidth="2" />
            <path d="M32 30 C32 30 26 38 26 41 C26 44.3 28.7 47 32 47 C35.3 47 38 44.3 38 41 C38 38 32 30 32 30 Z" fill="#f97316" fillOpacity="0.8" />
          </svg>
        </div>
      );

    case 'chassis':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-neutral-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]" viewBox="0 0 64 64" fill="none">
            {/* Ventilated Brake Disc & Caliper */}
            <circle cx="30" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="30" cy="32" r="12" stroke="#64748b" strokeWidth="2" />
            <circle cx="30" cy="32" r="4" fill="#f97316" />
            {/* Perforated rotor holes */}
            <circle cx="22" cy="24" r="1.5" fill="#94a3b8" />
            <circle cx="38" cy="24" r="1.5" fill="#94a3b8" />
            <circle cx="22" cy="40" r="1.5" fill="#94a3b8" />
            <circle cx="38" cy="40" r="1.5" fill="#94a3b8" />
            {/* Caliper in Orange */}
            <path d="M38 14 C48 18 52 26 52 32 C52 38 48 46 38 50 L42 42 C44 38 44 34 42 26 Z" fill="#ea580c" stroke="#f97316" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'tires':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]" viewBox="0 0 64 64" fill="none">
            {/* Tire with deep tread marks and alloy rim */}
            <circle cx="32" cy="32" r="24" stroke="#475569" strokeWidth="5" />
            <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="#15171d" />
            <circle cx="32" cy="32" r="6" fill="#f97316" />
            {/* Rim spokes */}
            <line x1="32" y1="16" x2="32" y2="26" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="32" y1="38" x2="32" y2="48" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="16" y1="32" x2="26" y2="32" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="38" y1="32" x2="48" y2="32" stroke="#94a3b8" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case 'climate':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.3)]" viewBox="0 0 64 64" fill="none">
            {/* Climate crystal + fan blades */}
            <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="32" cy="32" r="6" fill="#38bdf8" />
            <path d="M32 10 L32 26 M32 38 L32 54 M10 32 L26 32 M38 32 L54 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 18 L26 26 M38 38 L46 46 M18 46 L26 38 M38 26 L46 18" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'detailing':
    default:
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1a1d24] to-[#101216] border border-neutral-800 p-4 flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:12px_12px]" />
          <svg className="w-16 h-16 text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]" viewBox="0 0 64 64" fill="none">
            {/* Sparkle star / gloss shield */}
            <path d="M32 10 L36 24 L50 28 L36 32 L32 46 L28 32 L14 28 L28 24 Z" fill="#f97316" fillOpacity="0.85" stroke="#fdba74" strokeWidth="1.5" />
            <circle cx="48" cy="18" r="3" fill="#38bdf8" />
            <circle cx="16" cy="44" r="2" fill="#38bdf8" />
          </svg>
        </div>
      );
  }
}
