import type { ServicePageContent } from "@/config/services.content";

type Props = {
  visual: ServicePageContent["visual"];
  className?: string;
};

/** Abstract replaceable service visuals — not fabricated logos or screenshots. */
export function ServiceAbstractVisual({ visual, className }: Props) {
  return (
    <div
      className={
        className ??
        "relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-black/5 bg-[#111111] md:aspect-[16/11]"
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 440" className="h-full w-full">
        <rect width="640" height="440" fill="#141414" />
        <path
          d="M40 340 C160 300 240 260 320 220 C400 180 500 140 600 100"
          fill="none"
          stroke="#FFD400"
          strokeWidth="3"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        {visual === "grocery" ? <GroceryArt /> : null}
        {visual === "healthcare" ? <HealthcareArt /> : null}
        {visual === "repair" ? <RepairArt /> : null}
        {visual === "vehicle" ? <VehicleArt /> : null}
        {visual === "fashion" ? <FashionArt /> : null}
        {visual === "farming" ? <FarmingArt /> : null}
      </svg>
    </div>
  );
}

function GroceryArt() {
  return (
    <g>
      <ellipse cx="220" cy="280" rx="70" ry="28" fill="#1F1A10" />
      <path d="M170 250 H270 L255 200 H185 Z" fill="#FFD400" opacity="0.85" />
      <circle cx="200" cy="185" r="14" fill="#2A3A1C" />
      <circle cx="230" cy="178" r="12" fill="#3A2818" />
      <circle cx="245" cy="195" r="10" fill="#FF7A1A" opacity="0.7" />
      <rect x="380" y="160" width="90" height="110" rx="10" fill="#222" />
      <rect x="395" y="175" width="25" height="30" rx="3" fill="#FFD40055" />
      <rect x="430" y="175" width="25" height="30" rx="3" fill="#FFD40033" />
    </g>
  );
}

function HealthcareArt() {
  return (
    <g>
      <rect x="180" y="140" width="120" height="160" rx="14" fill="#1E2228" />
      <path
        d="M225 180 V260 M185 220 H265"
        stroke="#FF7A1A"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="400" cy="200" r="48" fill="none" stroke="#FFD400" strokeWidth="3" />
      <circle cx="400" cy="200" r="18" fill="#FFD400" opacity="0.35" />
      <path
        d="M460 280 C500 240 540 260 560 220"
        fill="none"
        stroke="#FFD400"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
    </g>
  );
}

function RepairArt() {
  return (
    <g>
      <path
        d="M200 280 L280 140 L310 160 L230 300 Z"
        fill="none"
        stroke="#FFD400"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="300" cy="150" r="18" fill="none" stroke="#FFD400" strokeWidth="4" />
      <rect x="380" y="180" width="100" height="70" rx="8" fill="#222" />
      <path
        d="M400 215 H460 M430 195 V235"
        stroke="#FFD400"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="160" cy="320" r="8" fill="#FFD400" />
    </g>
  );
}

function VehicleArt() {
  return (
    <g>
      <path
        d="M140 260 H420 L460 220 H500 V280 H140 Z"
        fill="#222"
        stroke="#FFD400"
        strokeWidth="2"
      />
      <circle cx="220" cy="300" r="28" fill="#111" stroke="#FFD400" strokeWidth="3" />
      <circle cx="400" cy="300" r="28" fill="#111" stroke="#FFD400" strokeWidth="3" />
      <path
        d="M80 180 C180 160 280 200 380 170 C460 150 520 140 580 120"
        fill="none"
        stroke="#FFD400"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeDasharray="8 10"
      />
    </g>
  );
}

function FashionArt() {
  return (
    <g>
      <path
        d="M260 120 L300 160 L340 120 L360 150 V300 H240 V150 Z"
        fill="none"
        stroke="#FFD400"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="300" cy="100" r="22" fill="none" stroke="#FFD400" strokeWidth="3" />
      <path
        d="M420 180 H520 V300 H420 Z"
        fill="#1A1A1A"
        stroke="#FFD40055"
        strokeWidth="2"
      />
      <circle cx="180" cy="280" r="10" fill="#FFD400" opacity="0.7" />
      <circle cx="480" cy="140" r="6" fill="#FFD400" />
    </g>
  );
}

function FarmingArt() {
  return (
    <g>
      <ellipse cx="400" cy="300" rx="160" ry="50" fill="#1A2418" />
      <path
        d="M280 300 C300 240 320 200 340 160"
        fill="none"
        stroke="#FFD400"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="340" cy="150" r="16" fill="#2A3A1C" stroke="#FFD400" strokeWidth="2" />
      <rect x="160" y="220" width="90" height="50" rx="8" fill="#222" />
      <circle cx="180" cy="280" r="16" fill="#111" stroke="#FFD400" strokeWidth="2" />
      <circle cx="230" cy="280" r="16" fill="#111" stroke="#FFD400" strokeWidth="2" />
      <path
        d="M80 340 H560"
        stroke="#FFD400"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </g>
  );
}
