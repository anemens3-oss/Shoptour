interface CarGraphicProps {
  className?: string;
}

export function CarHeroGraphic({ className = '' }: CarGraphicProps) {
  return (
    <div className={`relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-b from-[#181a20] via-[#121418] to-[#0c0d10] border border-neutral-800 p-6 flex flex-col justify-between shadow-2xl ${className}`}>
      {/* Precision Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} 
      />

      {/* Top Diagnostics Header Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs border-b border-neutral-800/80 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-orange-500 font-semibold tracking-wider">DIAGNOSTIC BAY 04</span>
          <span className="text-neutral-500">·</span>
          <span className="text-neutral-400">Hunter 3D Alignment & Optical Telemetry</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-neutral-400 text-[11px]">
          <span className="text-emerald-400">STATUS: READY</span>
          <span className="text-neutral-600">|</span>
          <span>CALIBRATION: 100%</span>
        </div>
      </div>

      {/* Center Automotive Schematic (Modern Coupe Silhouette with Mechanical Nodes) */}
      <div className="relative z-10 my-auto flex items-center justify-center py-4">
        <svg
          viewBox="0 0 800 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-[680px] h-auto drop-shadow-[0_10px_25px_rgba(249,115,22,0.15)]"
        >
          <defs>
            <linearGradient id="bodyGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fdba74" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gridFade" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Underbody Shadow & Laser Ground Line */}
          <ellipse cx="400" cy="300" rx="340" ry="18" fill="url(#gridFade)" />
          <line x1="80" y1="300" x2="720" y2="300" stroke="#333842" strokeWidth="2" strokeDasharray="6 6" />

          {/* Car Body Streamlined Silhouette */}
          <path
            d="M 120 270 
               C 120 270, 110 240, 140 220
               C 170 200, 240 190, 270 170
               C 310 145, 360 115, 430 115
               C 500 115, 590 135, 640 180
               C 670 205, 710 225, 715 250
               C 720 270, 710 275, 680 275
               L 630 275
               C 625 240, 590 215, 550 215
               C 510 215, 475 240, 470 275
               L 310 275
               C 305 240, 270 215, 230 215
               C 190 215, 155 240, 150 275
               Z"
            stroke="url(#bodyGlow)"
            strokeWidth="3.5"
            fill="#15171c"
            fillOpacity="0.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Roof & Greenhouse Window Contour */}
          <path
            d="M 285 175
               C 320 150, 365 125, 430 125
               C 490 125, 565 142, 605 180
               C 555 180, 460 180, 395 180
               Z"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="#1e222a"
            fillOpacity="0.7"
          />
          <line x1="440" y1="126" x2="430" y2="180" stroke="#475569" strokeWidth="2" />

          {/* Aerodynamic Shoulder Character Line */}
          <path
            d="M 140 222 C 220 215, 320 210, 450 210 C 580 210, 650 205, 710 240"
            stroke="#f97316"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Front Wheel Assembly */}
          <g transform="translate(230, 275)">
            <circle cx="0" cy="0" r="42" stroke="#475569" strokeWidth="3" fill="#0f1115" />
            <circle cx="0" cy="0" r="32" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="24" stroke="#64748b" strokeWidth="2" fill="#1b1e26" />
            <circle cx="0" cy="0" r="10" fill="#f97316" />
            {/* Brake Caliper */}
            <path d="M 16 -18 C 24 -10, 24 10, 16 18" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            {/* Rim Spokes */}
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-14" y1="-14" x2="14" y2="14" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-14" y1="14" x2="14" y2="-14" stroke="#94a3b8" strokeWidth="2" />
          </g>

          {/* Rear Wheel Assembly */}
          <g transform="translate(550, 275)">
            <circle cx="0" cy="0" r="42" stroke="#475569" strokeWidth="3" fill="#0f1115" />
            <circle cx="0" cy="0" r="32" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="24" stroke="#64748b" strokeWidth="2" fill="#1b1e26" />
            <circle cx="0" cy="0" r="10" fill="#f97316" />
            {/* Brake Caliper */}
            <path d="M -16 -18 C -24 -10, -24 10, -16 18" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
            {/* Rim Spokes */}
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="2" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-14" y1="-14" x2="14" y2="14" stroke="#94a3b8" strokeWidth="2" />
            <line x1="-14" y1="14" x2="14" y2="-14" stroke="#94a3b8" strokeWidth="2" />
          </g>

          {/* Front Headlight Lens Glow */}
          <path d="M 685 220 L 715 240 L 685 245 Z" fill="#38bdf8" fillOpacity="0.8" />
          <path d="M 715 240 L 770 248 L 770 270 L 710 265 Z" fill="#38bdf8" fillOpacity="0.12" />

          {/* Rear Taillight Glow */}
          <path d="M 130 226 L 140 220 L 142 235 Z" fill="#ef4444" />

          {/* Diagnostic Inspection Targets / Overlay Callouts */}
          <g transform="translate(230, 190)">
            <line x1="0" y1="0" x2="0" y2="-30" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="0" cy="-30" r="3.5" fill="#f97316" />
            <text x="8" y="-26" fill="#f97316" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">STEERING 0.00°</text>
          </g>

          <g transform="translate(430, 95)">
            <line x1="0" y1="0" x2="0" y2="-25" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="0" cy="-25" r="3.5" fill="#38bdf8" />
            <text x="8" y="-21" fill="#cbd5e1" fontSize="11" fontFamily="JetBrains Mono, monospace">BODY RIGIDITY: NOMINAL</text>
          </g>

          <g transform="translate(620, 170)">
            <line x1="0" y1="0" x2="40" y2="-35" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="40" cy="-35" r="3.5" fill="#f97316" />
            <text x="48" y="-31" fill="#f97316" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">ECU TELEMETRY OK</text>
          </g>
        </svg>
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-neutral-800/80 font-mono text-xs">
        <div>
          <span className="text-neutral-500 block text-[11px]">СХОД-РАЗВАЛ</span>
          <span className="text-neutral-200 font-semibold tabular-nums">0° 02' ± 0.01°</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[11px]">ДАВЛЕНИЕ МАСЛА</span>
          <span className="text-neutral-200 font-semibold tabular-nums">4.2 bar (Norm)</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[11px]">ТОЛЩИНА КОЛОДОК</span>
          <span className="text-orange-400 font-semibold tabular-nums">11.4 mm / 12 mm</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[11px]">ЭЛЕКТРОНИКА</span>
          <span className="text-emerald-400 font-semibold tabular-nums">0 ОШИБОК (DTC)</span>
        </div>
      </div>
    </div>
  );
}
