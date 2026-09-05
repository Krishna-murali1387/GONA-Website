/** Farming landscape SVGs — solid fills; no shared paint-server IDs. */

type ClassProps = { className?: string };

const C = {
  accent: "#65A30D",
  leaf: "#84CC16",
  young: "#A3E635",
  foliage: "#3F6212",
  deep: "#365314",
  soil: "#8B5E3C",
  clay: "#A16207",
  earth: "#78350F",
  straw: "#EAB308",
  sky: "#E0F2FE",
  skyDeep: "#BAE6FD",
  ivory: "#FFFCF5",
  warm: "#FAF6EE",
  yellow: "#FFD400",
  charcoal: "#1C1917",
  white: "#FFFFFF",
} as const;

/** Single crop plant — stage 0 seedling … 3 mature */
export function CropPlant({
  x,
  y,
  stage = 2,
  scale = 1,
}: {
  x: number;
  y: number;
  stage?: number;
  scale?: number;
}) {
  const s = Math.max(0, Math.min(3, stage));
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* stem */}
      <path
        d={s === 0 ? "M0 0 V-18" : s === 1 ? "M0 0 V-48" : s === 2 ? "M0 0 V-90" : "M0 0 V-130"}
        fill="none"
        stroke={C.foliage}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {s === 0 && (
        <>
          <ellipse cx="-8" cy="-16" rx="10" ry="5" fill={C.young} stroke={C.deep} strokeWidth="1.5" transform="rotate(-35 -8 -16)" />
          <ellipse cx="8" cy="-16" rx="10" ry="5" fill={C.young} stroke={C.deep} strokeWidth="1.5" transform="rotate(35 8 -16)" />
        </>
      )}
      {s >= 1 && (
        <>
          <path d="M0 -28 C-28 -40 -34 -20 -8 -18" fill={C.leaf} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -28 C28 -40 34 -20 8 -18" fill={C.leaf} stroke={C.deep} strokeWidth="2" />
        </>
      )}
      {s >= 2 && (
        <>
          <path d="M0 -55 C-36 -72 -42 -42 -10 -40" fill={C.accent} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -55 C36 -72 42 -42 10 -40" fill={C.accent} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -78 C-24 -96 -28 -70 -6 -68" fill={C.leaf} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -78 C24 -96 28 -70 6 -68" fill={C.leaf} stroke={C.deep} strokeWidth="2" />
        </>
      )}
      {s >= 3 && (
        <>
          <ellipse cx="0" cy="-118" rx="18" ry="22" fill={C.straw} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -100 C-40 -120 -44 -80 -12 -78" fill={C.foliage} stroke={C.deep} strokeWidth="2" />
          <path d="M0 -100 C40 -120 44 -80 12 -78" fill={C.foliage} stroke={C.deep} strokeWidth="2" />
        </>
      )}
    </g>
  );
}

export function FieldRows({
  stage = 2,
  className,
  labels = false,
}: {
  stage?: number;
  className?: string;
  labels?: boolean;
}) {
  const xs = [80, 170, 260, 350, 440, 530, 620];
  return (
    <svg viewBox="0 0 720 280" className={className} aria-hidden="true">
      <rect width="720" height="280" fill="transparent" />
      <path d="M0 90 Q180 70 360 88 T720 78 V140 H0 Z" fill={C.leaf} opacity="0.35" />
      <path d="M0 130 L720 118 V280 H0 Z" fill={C.soil} opacity="0.92" />
      <path d="M0 155 L720 145 V280 H0 Z" fill={C.earth} opacity="0.4" />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${30 + i * 18} 280 Q360 ${175 - i * 6} ${690 - i * 18} 280`}
          fill="none"
          stroke={C.clay}
          strokeWidth="2"
          opacity="0.3"
        />
      ))}
      {xs.map((x, i) => (
        <CropPlant
          key={x}
          x={x}
          y={210 - (i % 3) * 5}
          stage={stage}
          scale={0.95 + (i % 2) * 0.12}
        />
      ))}
      {labels && stage >= 1 && (
        <g>
          <rect
            x="28"
            y="24"
            width="120"
            height="28"
            rx="6"
            fill={C.ivory}
            stroke={C.deep}
            strokeWidth="2"
          />
          <text
            x="40"
            y="43"
            fill={C.deep}
            fontSize="11"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            CROP GUIDANCE
          </text>
        </g>
      )}
      {labels && stage >= 2 && (
        <g>
          <rect
            x="520"
            y="28"
            width="150"
            height="28"
            rx="6"
            fill={C.ivory}
            stroke={C.deep}
            strokeWidth="2"
          />
          <text
            x="534"
            y="47"
            fill={C.deep}
            fontSize="11"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            FARMER ASSISTANCE
          </text>
        </g>
      )}
    </svg>
  );
}

/** Large central crop for journey */
export function JourneyCrop({
  stage,
  className,
}: {
  stage: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 480 520" className={className} aria-hidden="true">
      <rect width="480" height="520" fill={C.warm} />
      <ellipse cx="360" cy="80" rx="60" ry="24" fill={C.straw} opacity="0.3" />
      <path d="M0 360 H480 V520 H0 Z" fill={C.soil} />
      <path d="M0 390 H480 V520 H0 Z" fill={C.earth} opacity="0.4" />
      <CropPlant x={240} y={360} stage={stage} scale={2.2} />
      {/* small companions */}
      <CropPlant x={110} y={380} stage={Math.max(0, stage - 1)} scale={1.1} />
      <CropPlant x={370} y={375} stage={Math.max(0, stage - 1)} scale={1.15} />
    </svg>
  );
}

export function UndergroundScene({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 900 720" className={className} aria-hidden="true">
      {/* Above ground */}
      <rect width="900" height="220" fill={C.sky} />
      <ellipse cx="700" cy="55" rx="90" ry="34" fill={C.straw} opacity="0.32" />
      <path d="M0 145 H900 V220 H0 Z" fill={C.leaf} opacity="0.55" />
      <path d="M0 175 H900 V220 H0 Z" fill={C.accent} opacity="0.35" />
      <CropPlant x={160} y={205} stage={3} scale={1.2} />
      <CropPlant x={300} y={208} stage={3} scale={1.1} />
      <CropPlant x={450} y={200} stage={3} scale={1.25} />
      <CropPlant x={600} y={208} stage={2} scale={1.1} />
      <CropPlant x={740} y={204} stage={3} scale={1.15} />

      {/* Ground line */}
      <rect y="212" width="900" height="14" fill={C.charcoal} opacity="0.18" />
      <path d="M0 220 H900" stroke={C.charcoal} strokeWidth="3.5" />
      <text
        x="24"
        y="214"
        fill={C.charcoal}
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        GROUND
      </text>

      {/* Root zone — richer soil wash + organic texture */}
      <rect y="220" width="900" height="220" fill="#C4A484" />
      <rect y="220" width="900" height="220" fill={C.soil} opacity="0.22" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <ellipse
          key={`grain-${i}`}
          cx={70 + i * 110}
          cy={260 + (i % 3) * 40}
          rx={3 + (i % 2)}
          ry={2}
          fill={C.earth}
          opacity="0.22"
        />
      ))}
      {/* Primary root system — irregular organic paths */}
      <g transform="translate(450 228)">
        <path
          d="M0 0 C2 28 -4 55 0 95"
          stroke={C.earth}
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0 35 C-55 55 -95 95 -120 145 C-132 168 -118 190 -98 205"
          stroke={C.earth}
          strokeWidth="6.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 35 C58 52 98 92 118 140 C130 165 122 188 95 208"
          stroke={C.earth}
          strokeWidth="6.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 65 C-28 95 -18 150 -42 195"
          stroke={C.soil}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 65 C32 98 22 148 48 198"
          stroke={C.soil}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M-38 95 C-72 130 -62 170 -88 205"
          stroke={C.clay}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M42 95 C78 128 70 172 102 208"
          stroke={C.clay}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M0 95 C-8 140 6 175 0 212"
          stroke={C.earth}
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* fine root tips */}
        <path
          d="M-98 205 C-110 215 -108 220 -115 228"
          stroke={C.clay}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M95 208 C108 218 112 224 118 232"
          stroke={C.clay}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
      {/* Secondary lighter roots under nearby crops */}
      <g opacity="0.55">
        <path
          d="M300 228 C295 270 280 310 265 350"
          stroke={C.earth}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M600 228 C608 275 620 315 640 355"
          stroke={C.earth}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <text
        x="40"
        y="305"
        fill={C.earth}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        ROOTS
      </text>

      {/* Topsoil layer */}
      <rect y="440" width="900" height="95" fill={C.soil} />
      <path
        d="M0 455 Q225 448 450 460 T900 450"
        fill="none"
        stroke={C.clay}
        strokeWidth="2.5"
        opacity="0.35"
      />
      {[40, 160, 280, 400, 520, 640, 760].map((x, i) => (
        <circle
          key={`top-${i}`}
          cx={x}
          cy={480 + (i % 2) * 12}
          r={2.2}
          fill={C.earth}
          opacity="0.35"
        />
      ))}
      <text
        x="40"
        y="495"
        fill={C.ivory}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        TOPSOIL
      </text>
      <rect
        x="620"
        y="468"
        width="150"
        height="34"
        rx="8"
        fill={C.ivory}
        stroke={C.deep}
        strokeWidth="2"
      />
      <text
        x="640"
        y="490"
        fill={C.deep}
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        SOIL SUPPORT
      </text>

      {/* Deeper soil */}
      <rect y="535" width="900" height="185" fill={C.earth} />
      <rect y="535" width="900" height="185" fill="#5C2E0A" opacity="0.35" />
      <path
        d="M0 570 Q220 548 420 575 T900 555"
        fill="none"
        stroke={C.clay}
        strokeWidth="3"
        opacity="0.45"
      />
      <path
        d="M0 630 Q300 608 600 640 T900 620"
        fill="none"
        stroke={C.clay}
        strokeWidth="3"
        opacity="0.35"
      />
      <path
        d="M0 680 Q250 665 500 690 T900 670"
        fill="none"
        stroke="#5C2E0A"
        strokeWidth="2.5"
        opacity="0.5"
      />
      <text
        x="40"
        y="630"
        fill={C.straw}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        DEEPER SOIL
      </text>
    </svg>
  );
}

export function SupplyShedArt({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 800 360" className={className} aria-hidden="true">
      <rect width="800" height="360" fill={C.sky} />
      <path d="M0 200 H800 V360 H0 Z" fill={C.soil} />
      <path d="M0 160 Q200 140 400 155 T800 145 V210 H0 Z" fill={C.leaf} opacity="0.45" />
      {/* shed */}
      <path d="M80 220 L200 140 L320 220" fill={C.clay} stroke={C.charcoal} strokeWidth="3" />
      <rect x="100" y="220" width="200" height="110" fill={C.warm} stroke={C.charcoal} strokeWidth="3" />
      <rect x="170" y="250" width="60" height="80" fill={C.earth} stroke={C.charcoal} strokeWidth="2" />
      {/* sacks / packages */}
      <rect x="360" y="250" width="70" height="70" rx="8" fill={C.accent} stroke={C.charcoal} strokeWidth="2.5" />
      <text x="372" y="290" fill={C.ivory} fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        SEED
      </text>
      <rect x="450" y="240" width="80" height="80" rx="8" fill={C.foliage} stroke={C.charcoal} strokeWidth="2.5" />
      <text x="458" y="285" fill={C.ivory} fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        CARE
      </text>
      <rect x="550" y="255" width="90" height="65" rx="8" fill={C.straw} stroke={C.charcoal} strokeWidth="2.5" />
      <ellipse cx="700" cy="300" rx="40" ry="28" fill={C.soil} stroke={C.charcoal} strokeWidth="2.5" />
      <CropPlant x={720} y={240} stage={2} scale={0.9} />
    </svg>
  );
}

export function LocalLandscapeArt({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 1100 420" className={className} aria-hidden="true">
      <rect width="1100" height="420" fill={C.sky} />
      <ellipse cx="880" cy="70" rx="90" ry="32" fill={C.straw} opacity="0.4" />
      {/* distant fields */}
      <path d="M0 160 Q275 120 550 150 T1100 130 V240 H0 Z" fill={C.leaf} opacity="0.55" />
      <path d="M0 220 Q300 190 600 215 T1100 200 V320 H0 Z" fill={C.accent} opacity="0.5" />
      {/* soil foreground */}
      <path d="M0 300 H1100 V420 H0 Z" fill={C.soil} />
      {/* soft path — secondary */}
      <path
        d="M40 380 Q280 340 520 360 T1060 350"
        fill="none"
        stroke={C.clay}
        strokeWidth="18"
        opacity="0.45"
      />
      {/* village-edge structure — subtle */}
      <rect x="120" y="240" width="70" height="50" fill={C.warm} stroke={C.charcoal} strokeWidth="2" />
      <path d="M110 240 L155 205 L200 240" fill={C.clay} stroke={C.charcoal} strokeWidth="2" />
      {/* crops */}
      {[280, 360, 440, 520, 600, 680, 760].map((x, i) => (
        <CropPlant key={x} x={x} y={310} stage={2 + (i % 2)} scale={0.95} />
      ))}
      {/* GONA pin */}
      <g transform="translate(900 250)">
        <ellipse cx="0" cy="28" rx="12" ry="5" fill={C.charcoal} opacity="0.2" />
        <path
          d="M0 -28 C-12 -28 -20 -16 -20 -6 C-20 8 0 22 0 22 C0 22 20 8 20 -6 C20 -16 12 -28 0 -28 Z"
          fill={C.yellow}
          stroke={C.charcoal}
          strokeWidth="2"
        />
        <circle cx="0" cy="-8" r="6" fill={C.white} />
      </g>
    </svg>
  );
}

export function SupportConstellationArt({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 900 300" className={className} aria-hidden="true">
      <rect width="900" height="300" fill={C.warm} />
      <path d="M0 190 H900 V300 H0 Z" fill={C.soil} />
      <path d="M0 210 H900 V300 H0 Z" fill={C.earth} opacity="0.35" />
      <CropPlant x={450} y={200} stage={3} scale={1.55} />
      {[
        { x: 90, y: 70, t: "GUIDANCE" },
        { x: 680, y: 60, t: "FARMER SUPPORT" },
        { x: 80, y: 230, t: "AGRICULTURAL INPUTS" },
        { x: 660, y: 235, t: "SOIL SUPPORT" },
      ].map((m) => (
        <g key={m.t}>
          <rect
            x={m.x}
            y={m.y}
            width={m.t.length * 8.2 + 24}
            height="28"
            rx="6"
            fill={C.ivory}
            stroke={C.deep}
            strokeWidth="2"
          />
          <text
            x={m.x + 12}
            y={m.y + 19}
            fill={C.deep}
            fontSize="11"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            {m.t}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function FinalFieldArt({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 1200 480" className={className} aria-hidden="true">
      <rect width="1200" height="480" fill="#0C1A0A" />
      <rect width="1200" height="200" fill="#1A2E12" />
      <ellipse cx="900" cy="90" rx="120" ry="40" fill={C.straw} opacity="0.25" />
      <path d="M0 180 Q300 140 600 170 T1200 150 V280 H0 Z" fill={C.foliage} />
      <path d="M0 250 Q400 220 800 255 T1200 240 V480 H0 Z" fill={C.deep} />
      <path d="M0 340 H1200 V480 H0 Z" fill={C.earth} opacity="0.85" />
      {[200, 320, 440, 560, 680, 800, 920].map((x, i) => (
        <CropPlant key={x} x={x} y={320} stage={3} scale={1.1 + (i % 3) * 0.08} />
      ))}
      <circle cx="80" cy="400" r="6" fill={C.yellow} />
    </svg>
  );
}
