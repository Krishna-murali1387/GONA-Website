/** Vehicle SVG scenes — solid fills/strokes; unique geometry; no shared paint-server IDs. */

type SceneProps = { className?: string };

const C = {
  accent: "#6366F1",
  soft: "#E0E7FF",
  lavender: "#EEF2FF",
  deep: "#312E81",
  midnight: "#1E1B4B",
  navy: "#0F172A",
  cool: "#94A3B8",
  road: "#334155",
  asphalt: "#1E293B",
  yellow: "#FFD400",
  white: "#FFFFFF",
  mist: "#F8FAFC",
  skin: "#F5D0A9",
  box: "#C4B5FD",
  green: "#34D399",
} as const;

function Pin({
  x,
  y,
  scale = 1,
  active = false,
}: {
  x: number;
  y: number;
  scale?: number;
  active?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="18" rx="10" ry="4" fill={C.navy} opacity="0.25" />
      <path
        d="M0 -22 C-14 -22 -22 -10 -22 0 C-22 14 0 28 0 28 C0 28 22 14 22 0 C22 -10 14 -22 0 -22 Z"
        fill={active ? C.yellow : C.accent}
        stroke={C.navy}
        strokeWidth="2.5"
      />
      <circle cx="0" cy="-2" r="7" fill={C.white} />
      <circle cx="0" cy="-2" r="3.5" fill={active ? C.deep : C.accent} />
    </g>
  );
}

function PassengerCar({
  x,
  y,
  scale = 1,
  facing = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing}, ${scale})`}>
      <ellipse cx="0" cy="28" rx="48" ry="8" fill={C.navy} opacity="0.2" />
      <path
        d="M-52 8 H-38 L-28 -18 H18 L32 8 H52 V24 H-52 Z"
        fill={C.white}
        stroke={C.navy}
        strokeWidth="3"
      />
      <path d="M-24 -14 H14 L22 6 H-32 Z" fill={C.soft} stroke={C.navy} strokeWidth="2" />
      <rect x="-48" y="8" width="96" height="16" rx="4" fill={C.accent} />
      <circle cx="-28" cy="26" r="11" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
      <circle cx="28" cy="26" r="11" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
      <circle cx="-28" cy="26" r="4" fill={C.cool} />
      <circle cx="28" cy="26" r="4" fill={C.cool} />
    </g>
  );
}

function AutoRickshaw({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="30" rx="36" ry="7" fill={C.navy} opacity="0.18" />
      <path
        d="M-30 10 L-18 -20 H22 L32 10 H-30 Z"
        fill={C.yellow}
        stroke={C.navy}
        strokeWidth="2.5"
      />
      <path d="M-12 -16 H18 V6 H-16 Z" fill={C.soft} stroke={C.navy} strokeWidth="2" />
      <rect x="-32" y="10" width="64" height="14" rx="3" fill={C.accent} />
      <circle cx="-18" cy="28" r="9" fill={C.asphalt} stroke={C.navy} strokeWidth="2" />
      <circle cx="18" cy="28" r="9" fill={C.asphalt} stroke={C.navy} strokeWidth="2" />
    </g>
  );
}

function GoodsVan({
  x,
  y,
  scale = 1,
  facing = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing}, ${scale})`}>
      <ellipse cx="0" cy="32" rx="56" ry="8" fill={C.navy} opacity="0.2" />
      <rect x="-20" y="-22" width="72" height="42" rx="6" fill={C.soft} stroke={C.navy} strokeWidth="3" />
      <path
        d="M-54 4 H-20 V20 H-54 Z"
        fill={C.accent}
        stroke={C.navy}
        strokeWidth="3"
      />
      <path d="M-50 -6 H-24 V4 H-50 Z" fill={C.lavender} stroke={C.navy} strokeWidth="2" />
      <rect x="-8" y="-14" width="22" height="16" rx="3" fill={C.box} stroke={C.navy} strokeWidth="2" />
      <rect x="22" y="-12" width="18" height="14" rx="3" fill={C.deep} opacity="0.35" stroke={C.navy} strokeWidth="2" />
      <circle cx="-36" cy="28" r="11" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
      <circle cx="28" cy="28" r="11" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
    </g>
  );
}

function MiniTruck({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="4" cy="34" rx="62" ry="8" fill={C.navy} opacity="0.18" />
      <rect x="-10" y="-18" width="78" height="36" rx="5" fill={C.lavender} stroke={C.navy} strokeWidth="3" />
      <path d="M-58 2 H-10 V22 H-58 Z" fill={C.deep} stroke={C.navy} strokeWidth="3" />
      <path d="M-54 -8 H-18 V2 H-54 Z" fill={C.soft} stroke={C.navy} strokeWidth="2" />
      <rect x="4" y="-10" width="24" height="18" rx="3" fill={C.box} stroke={C.navy} strokeWidth="2" />
      <rect x="36" y="-8" width="20" height="16" rx="3" fill={C.accent} opacity="0.55" stroke={C.navy} strokeWidth="2" />
      <circle cx="-38" cy="28" r="12" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
      <circle cx="36" cy="28" r="12" fill={C.asphalt} stroke={C.navy} strokeWidth="2.5" />
    </g>
  );
}

function Building({
  x,
  y,
  w,
  h,
  shade = C.soft,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  shade?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="4" fill={shade} stroke={C.navy} strokeWidth="2" />
      <rect x={w * 0.2} y={h * 0.25} width={w * 0.22} height={h * 0.22} fill={C.lavender} stroke={C.navy} strokeWidth="1.5" />
      <rect x={w * 0.55} y={h * 0.25} width={w * 0.22} height={h * 0.22} fill={C.lavender} stroke={C.navy} strokeWidth="1.5" />
    </g>
  );
}

function Person({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-28" r="10" fill={C.skin} stroke={C.navy} strokeWidth="2" />
      <path
        d="M-12 -16 H12 V18 C12 24 6 28 0 28 C-6 28 -12 24 -12 18 Z"
        fill={C.accent}
        stroke={C.navy}
        strokeWidth="2"
      />
    </g>
  );
}

/** Immersive hero environment */
export function HeroMobilityWorld({
  progress = 0.35,
  className,
}: {
  progress?: number;
  className?: string;
}) {
  const p = Math.max(0, Math.min(1, progress));
  const carX = 180 + p * 220;

  return (
    <svg
      viewBox="0 0 1440 760"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="1440" height="760" fill={C.midnight} />
      <rect width="1440" height="420" fill={C.deep} opacity="0.55" />
      {/* Atmospheric bands */}
      <ellipse cx="720" cy="120" rx="520" ry="90" fill={C.accent} opacity="0.18" />
      <ellipse cx="1100" cy="200" rx="280" ry="70" fill={C.lavender} opacity="0.12" />

      {/* Distant town — right cluster keeps left clear for copy */}
      <Building x={860} y={230} w={78} h={130} shade="#4338CA" />
      <Building x={960} y={200} w={64} h={160} shade="#4F46E5" />
      <Building x={1050} y={250} w={72} h={110} shade="#3730A3" />
      <Building x={1160} y={220} w={88} h={140} shade="#4338CA" />
      <Building x={1280} y={190} w={70} h={170} shade="#4F46E5" />

      {/* Main road network */}
      <path
        d="M-40 540 C260 480 420 580 640 520 C860 450 980 580 1200 520 C1320 480 1400 540 1520 500"
        fill="none"
        stroke={C.asphalt}
        strokeWidth="84"
      />
      <path
        d="M-40 540 C260 480 420 580 640 520 C860 450 980 580 1200 520 C1320 480 1400 540 1520 500"
        fill="none"
        stroke={C.road}
        strokeWidth="66"
      />
      <path
        d="M-40 540 C260 480 420 580 640 520 C860 450 980 580 1200 520 C1320 480 1400 540 1520 500"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3.5"
        strokeDasharray="18 22"
        opacity={0.4 + p * 0.5}
      />

      {/* Secondary road */}
      <path
        d="M980 160 C960 280 1040 380 980 540"
        fill="none"
        stroke={C.asphalt}
        strokeWidth="40"
      />
      <path
        d="M980 160 C960 280 1040 380 980 540"
        fill="none"
        stroke={C.road}
        strokeWidth="28"
      />

      <Pin x={640} y={490} scale={1.25} active />
      <Pin x={1200} y={505} scale={1} />

      <PassengerCar x={carX + 120} y={525} scale={1.35} />
      <GoodsVan x={1080} y={490} scale={1.15} facing={-1} />
      <AutoRickshaw x={860} y={455} scale={1} />

      {/* Soft ground wash */}
      <ellipse cx="820" cy="720" rx="620" ry="44" fill={C.navy} opacity="0.4" />
    </svg>
  );
}

/** Passenger vs Goods junction — dominant road world */
export function JunctionWorld({
  focus,
  className,
}: {
  focus: "passenger" | "goods" | "both";
  className?: string;
}) {
  const passOn = focus === "passenger" || focus === "both";
  const goodsOn = focus === "goods" || focus === "both";

  return (
    <svg viewBox="0 0 1280 560" className={className} aria-hidden="true">
      <rect width="1280" height="560" fill={C.mist} />
      <ellipse cx="640" cy="300" rx="560" ry="200" fill={C.lavender} opacity="0.45" />
      <ellipse cx="640" cy="520" rx="480" ry="36" fill={C.navy} opacity="0.08" />

      {/* Dominant junction roads */}
      <path d="M20 300 H1260" fill="none" stroke={C.asphalt} strokeWidth="108" />
      <path d="M20 300 H1260" fill="none" stroke={C.road} strokeWidth="86" />
      <path
        d="M20 300 H1260"
        fill="none"
        stroke={C.yellow}
        strokeWidth="4"
        strokeDasharray="18 20"
        opacity="0.35"
      />
      <path d="M640 40 V520" fill="none" stroke={C.asphalt} strokeWidth="88" />
      <path d="M640 40 V520" fill="none" stroke={C.road} strokeWidth="68" />

      {/* Passenger world */}
      <g opacity={passOn ? 1 : 0.34}>
        <path
          d="M70 300 C220 240 340 340 520 270"
          fill="none"
          stroke={C.yellow}
          strokeWidth="5"
          strokeDasharray="16 18"
          opacity={passOn ? 0.95 : 0.3}
        />
        <Building x={70} y={95} w={110} h={140} shade={C.lavender} />
        <Building x={200} y={125} w={84} h={110} shade={C.soft} />
        <Building x={300} y={155} w={64} h={80} shade="#FEF3C7" />
        <Person x={165} y={270} scale={1.35} />
        <Person x={200} y={278} scale={1.15} />
        <rect
          x={138}
          y={288}
          width={28}
          height={20}
          rx="4"
          fill={C.deep}
          stroke={C.navy}
          strokeWidth="2"
        />
        <PassengerCar x={340} y={285} scale={1.65} />
        <AutoRickshaw x={480} y={255} scale={1.25} />
        <Pin x={530} y={250} scale={1.15} active={passOn} />
        <text
          x="280"
          y="500"
          textAnchor="middle"
          fill={C.deep}
          fontSize="26"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          Passenger
        </text>
      </g>

      {/* Goods world */}
      <g opacity={goodsOn ? 1 : 0.34}>
        <path
          d="M1210 300 C1060 240 940 340 760 270"
          fill="none"
          stroke={C.yellow}
          strokeWidth="5"
          strokeDasharray="16 18"
          opacity={goodsOn ? 0.95 : 0.3}
        />
        <Building x={1020} y={90} w={120} h={150} shade={C.soft} />
        <Building x={1160} y={130} w={88} h={110} shade={C.lavender} />
        <MiniTruck x={920} y={275} scale={1.45} />
        <GoodsVan x={1100} y={250} scale={1.2} facing={-1} />
        <rect
          x={1040}
          y={290}
          width={28}
          height={22}
          rx="4"
          fill={C.box}
          stroke={C.navy}
          strokeWidth="2"
        />
        <rect
          x={1076}
          y={282}
          width={34}
          height={28}
          rx="4"
          fill={C.accent}
          opacity="0.75"
          stroke={C.navy}
          strokeWidth="2"
        />
        <rect
          x={1118}
          y={292}
          width={22}
          height={18}
          rx="3"
          fill={C.deep}
          opacity="0.45"
          stroke={C.navy}
          strokeWidth="2"
        />
        <Pin x={750} y={250} scale={1.15} active={goodsOn} />
        <text
          x="1000"
          y="500"
          textAnchor="middle"
          fill={C.deep}
          fontSize="26"
          fontWeight="700"
          fontFamily="system-ui,sans-serif"
        >
          Goods
        </text>
      </g>

      {/* Center junction marker */}
      <circle cx="640" cy="300" r="26" fill={C.yellow} stroke={C.navy} strokeWidth="4" />
      <circle cx="640" cy="300" r="10" fill={C.deep} />
      <circle cx="640" cy="300" r="42" fill="none" stroke={C.accent} strokeWidth="3" opacity="0.35" />
    </svg>
  );
}

/** Mapless discovery — substantial proximity field */
export function DiscoveryRadar({
  activeId,
  className,
}: {
  activeId?: string | null;
  className?: string;
}) {
  const cx = 540;
  const cy = 300;

  return (
    <svg viewBox="0 0 1080 600" className={className} aria-hidden="true">
      <rect width="1080" height="600" fill={C.lavender} />
      <ellipse cx={cx} cy={cy} rx="340" ry="260" fill={C.accent} opacity="0.08" />
      <ellipse cx={cx} cy="520" rx="300" ry="40" fill={C.navy} opacity="0.12" />

      {[120, 200, 280, 360].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill={i === 0 ? "rgba(99,102,241,0.10)" : "none"}
          stroke={C.accent}
          strokeWidth={i === 0 ? 3.5 : 2.5}
          opacity={0.22 + i * 0.08}
        />
      ))}

      <path d={`M${cx} ${cy} L560 120`} fill="none" stroke={C.road} strokeWidth="10" opacity="0.22" />
      <path d={`M${cx} ${cy} L780 200`} fill="none" stroke={C.road} strokeWidth="10" opacity="0.22" />
      <path d={`M${cx} ${cy} L250 250`} fill="none" stroke={C.road} strokeWidth="10" opacity="0.22" />
      <path d={`M${cx} ${cy} L820 380`} fill="none" stroke={C.road} strokeWidth="10" opacity="0.22" />
      <path d={`M${cx} ${cy} L300 400`} fill="none" stroke={C.road} strokeWidth="8" opacity="0.18" />

      <circle cx={cx} cy={cy} r="54" fill={C.accent} opacity="0.2" />
      <circle cx={cx} cy={cy} r="40" fill={C.deep} stroke={C.yellow} strokeWidth="5" />
      <text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill={C.white}
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        YOU
      </text>

      {(
        [
          { id: "car", x: 560, y: 120 },
          { id: "auto", x: 780, y: 200 },
          { id: "mini", x: 250, y: 250 },
          { id: "load", x: 820, y: 380 },
        ] as const
      ).map(({ id, x, y }) => {
        const on = activeId === id;
        return (
          <g key={id} opacity={activeId && !on ? 0.38 : 1}>
            {on && (
              <path
                d={`M${cx} ${cy} L${x} ${y}`}
                fill="none"
                stroke={C.yellow}
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}
            <g
              transform={
                on
                  ? `translate(${x} ${y}) scale(1.14) translate(${-x} ${-y})`
                  : undefined
              }
            >
              {id === "car" && <PassengerCar x={x} y={y} scale={1.25} />}
              {id === "auto" && <AutoRickshaw x={x} y={y} scale={1.3} />}
              {id === "mini" && <GoodsVan x={x} y={y} scale={1.15} />}
              {id === "load" && <MiniTruck x={x} y={y} scale={1.2} />}
            </g>
          </g>
        );
      })}

      {/* Depth variety — secondary passenger silhouette */}
      <g opacity={activeId ? 0.45 : 0.85}>
        <PassengerCar x={300} y={400} scale={0.95} facing={-1} />
      </g>
    </svg>
  );
}

/** Now / Schedule road */
export function TimingRoad({
  mode,
  className,
}: {
  mode: "now" | "schedule";
  className?: string;
}) {
  const carX = mode === "now" ? 280 : 720;
  return (
    <svg viewBox="0 0 1100 280" className={className} aria-hidden="true">
      <rect width="1100" height="280" fill={C.mist} />
      <path d="M40 160 H1060" fill="none" stroke={C.asphalt} strokeWidth="64" />
      <path d="M40 160 H1060" fill="none" stroke={C.road} strokeWidth="48" />
      <path
        d="M40 160 H1060"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3"
        strokeDasharray="16 18"
        opacity={mode === "now" ? 0.85 : 0.35}
      />

      {/* NOW */}
      <g opacity={mode === "now" ? 1 : 0.45}>
        <circle cx="200" cy="160" r="28" fill={mode === "now" ? C.yellow : C.soft} stroke={C.navy} strokeWidth="3" />
        <text x="200" y="166" textAnchor="middle" fill={C.deep} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
          NOW
        </text>
        <Pin x={200} y={95} scale={0.75} active={mode === "now"} />
      </g>

      {/* SCHEDULE */}
      <g opacity={mode === "schedule" ? 1 : 0.45}>
        <rect
          x="820"
          y="40"
          width="100"
          height="88"
          rx="12"
          fill={C.white}
          stroke={mode === "schedule" ? C.accent : C.cool}
          strokeWidth="3"
        />
        <rect x="820" y="40" width="100" height="24" rx="12" fill={C.accent} />
        <rect x="820" y="52" width="100" height="12" fill={C.accent} />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={836 + c * 26}
              y={74 + r * 16}
              width="18"
              height="12"
              rx="2"
              fill={r === 1 && c === 1 && mode === "schedule" ? C.yellow : C.lavender}
              stroke={C.navy}
              strokeWidth="1"
            />
          )),
        )}
        <circle cx="870" cy="160" r="22" fill={mode === "schedule" ? C.yellow : C.soft} stroke={C.navy} strokeWidth="3" />
      </g>

      <PassengerCar x={carX} y={155} scale={1} />
    </svg>
  );
}

/** Inspection bay — vehicle as hero object */
export function InspectionBayArt({
  view,
  className,
}: {
  view: "front" | "back" | "interior";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 960 520" className={className} aria-hidden="true">
      <rect width="960" height="520" fill={C.mist} />
      {/* Soft bay frame */}
      <rect
        x="70"
        y="70"
        width="820"
        height="380"
        rx="28"
        fill={C.lavender}
        opacity="0.55"
        stroke={C.soft}
        strokeWidth="3"
      />
      <rect
        x="110"
        y="100"
        width="740"
        height="300"
        rx="18"
        fill="none"
        stroke={C.accent}
        strokeWidth="2"
        opacity="0.28"
        strokeDasharray="12 14"
      />

      {/* Platform */}
      <ellipse cx="480" cy="400" rx="320" ry="42" fill={C.navy} opacity="0.1" />
      <ellipse cx="480" cy="390" rx="290" ry="34" fill={C.soft} />
      <path
        d="M160 360 H800"
        fill="none"
        stroke={C.accent}
        strokeWidth="3"
        strokeDasharray="12 14"
        opacity="0.45"
      />

      {/* Approval cues */}
      {[
        { x: 170, label: "Provider" },
        { x: 480, label: "Vehicle" },
        { x: 790, label: "Photos" },
      ].map((m) => (
        <g key={m.label} transform={`translate(${m.x} 88)`}>
          <circle r="18" fill={C.green} stroke={C.navy} strokeWidth="2.5" />
          <path
            d="M-6 0 L-2 5 L8 -6"
            fill="none"
            stroke={C.navy}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            y="42"
            textAnchor="middle"
            fill={C.deep}
            fontSize="13"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            {m.label}
          </text>
        </g>
      ))}

      {view === "interior" ? (
        <g transform="translate(480 280)">
          <rect
            x="-160"
            y="-90"
            width="320"
            height="160"
            rx="20"
            fill={C.deep}
            stroke={C.navy}
            strokeWidth="3.5"
          />
          <rect
            x="-130"
            y="-60"
            width="115"
            height="65"
            rx="10"
            fill={C.soft}
            stroke={C.navy}
            strokeWidth="2.5"
          />
          <rect
            x="15"
            y="-60"
            width="115"
            height="65"
            rx="10"
            fill={C.lavender}
            stroke={C.navy}
            strokeWidth="2.5"
          />
          <circle cx="-70" cy="30" r="14" fill={C.skin} stroke={C.navy} strokeWidth="2.5" />
          <text
            y="120"
            textAnchor="middle"
            fill={C.cool}
            fontSize="15"
            fontFamily="system-ui,sans-serif"
          >
            Interior view
          </text>
        </g>
      ) : (
        <g>
          <PassengerCar
            x={480}
            y={300}
            scale={2.15}
            facing={view === "back" ? -1 : 1}
          />
          <text
            x="480"
            y="460"
            textAnchor="middle"
            fill={C.cool}
            fontSize="15"
            fontFamily="system-ui,sans-serif"
          >
            {view === "front" ? "Front view" : "Back view"}
          </text>
        </g>
      )}
    </svg>
  );
}

/** Signature cinematic journey */
export function JourneyRoadScene({
  progress,
  className,
}: {
  progress: number;
  className?: string;
}) {
  const p = Math.max(0, Math.min(1, progress));
  const nodes = [
    { x: 80, label: "Location" },
    { x: 260, label: "Vehicle" },
    { x: 440, label: "Booking" },
    { x: 620, label: "Pickup" },
    { x: 800, label: "Verify" },
    { x: 980, label: "Journey" },
  ];
  const carX = 80 + p * 900;
  const activeIdx = Math.min(nodes.length - 1, Math.floor(p * nodes.length));

  return (
    <svg viewBox="0 0 1100 360" className={className} aria-hidden="true">
      <rect width="1100" height="360" fill={C.midnight} />
      <ellipse cx="550" cy="80" rx="400" ry="50" fill={C.accent} opacity="0.15" />

      <path d="M20 200 H1080" fill="none" stroke={C.asphalt} strokeWidth="70" />
      <path d="M20 200 H1080" fill="none" stroke={C.road} strokeWidth="54" />
      <path
        d="M20 200 H1080"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3"
        strokeDasharray="14 16"
        opacity={0.25 + p * 0.55}
      />

      {/* Progress illumination */}
      <path
        d={`M20 200 H${20 + p * 1060}`}
        fill="none"
        stroke={C.accent}
        strokeWidth="6"
        opacity="0.85"
      />

      {nodes.map((n, i) => {
        const on = i <= activeIdx;
        return (
          <g key={n.label} transform={`translate(${n.x} 200)`}>
            <circle
              r={on ? 16 : 12}
              fill={on ? C.yellow : C.deep}
              stroke={C.white}
              strokeWidth="2.5"
            />
            <text
              y="-36"
              textAnchor="middle"
              fill={on ? C.white : C.cool}
              fontSize="13"
              fontWeight="700"
              fontFamily="system-ui,sans-serif"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Verify checkpoint */}
      {activeIdx >= 4 && (
        <g transform="translate(800 95)">
          <rect x="-54" y="-28" width="108" height="40" rx="10" fill={C.deep} stroke={C.yellow} strokeWidth="2.5" />
          <text x="-30" y="-2" fill={C.yellow} fontSize="16" fontFamily="system-ui,sans-serif">
            ••••
          </text>
        </g>
      )}

      <PassengerCar x={carX} y={195} scale={0.95} />
      <Pin x={1080} y={160} scale={0.8} active={p > 0.85} />
    </svg>
  );
}

export function PassengerStoryArt({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 1000 460" className={className} aria-hidden="true">
      <rect width="1000" height="460" fill="#FFF7ED" />
      <ellipse cx="500" cy="420" rx="420" ry="32" fill={C.navy} opacity="0.08" />
      <Building x={50} y={90} w={120} h={160} shade={C.lavender} />
      <Building x={190} y={120} w={95} h={130} shade={C.soft} />
      <Building x={300} y={150} w={70} h={100} shade="#FEF3C7" />
      <path d="M30 330 H970" fill="none" stroke={C.asphalt} strokeWidth="78" />
      <path d="M30 330 H970" fill="none" stroke={C.road} strokeWidth="58" />
      <path
        d="M30 330 H970"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3.5"
        strokeDasharray="16 18"
        opacity="0.55"
      />
      <Person x={300} y={280} scale={1.45} />
      <Person x={340} y={290} scale={1.2} />
      <rect
        x={318}
        y={300}
        width={30}
        height={22}
        rx="4"
        fill={C.deep}
        stroke={C.navy}
        strokeWidth="2"
      />
      <PassengerCar x={540} y={310} scale={1.75} />
      <AutoRickshaw x={720} y={285} scale={1.2} />
      <Pin x={880} y={280} scale={1.2} active />
      <Building x={900} y={110} w={80} h={140} shade="#FEF3C7" />
    </svg>
  );
}

export function GoodsStoryArt({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 1000 460" className={className} aria-hidden="true">
      <rect width="1000" height="460" fill={C.lavender} />
      <ellipse cx="500" cy="420" rx="420" ry="32" fill={C.navy} opacity="0.1" />
      <Building x={50} y={70} w={130} h={180} shade={C.soft} />
      <Building x={200} y={110} w={90} h={140} shade={C.white} />
      <rect
        x={80}
        y={230}
        width={36}
        height={28}
        rx="4"
        fill={C.box}
        stroke={C.navy}
        strokeWidth="2.5"
      />
      <rect
        x={124}
        y={218}
        width={42}
        height={36}
        rx="4"
        fill={C.accent}
        opacity="0.7"
        stroke={C.navy}
        strokeWidth="2.5"
      />
      <rect
        x={174}
        y={236}
        width={28}
        height={22}
        rx="3"
        fill={C.deep}
        opacity="0.45"
        stroke={C.navy}
        strokeWidth="2"
      />
      <path d="M30 330 H970" fill="none" stroke={C.asphalt} strokeWidth="78" />
      <path d="M30 330 H970" fill="none" stroke={C.road} strokeWidth="58" />
      <path
        d="M30 330 H970"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3.5"
        strokeDasharray="16 18"
        opacity="0.55"
      />
      <MiniTruck x={480} y={300} scale={1.7} />
      <GoodsVan x={720} y={290} scale={1.25} facing={-1} />
      <Pin x={880} y={270} scale={1.2} active />
      <Building x={900} y={100} w={85} h={150} shade={C.white} />
    </svg>
  );
}

export function FinalRoadCtaArt({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 1200 420" className={className} aria-hidden="true">
      <rect width="1200" height="420" fill={C.navy} />
      <ellipse cx="600" cy="100" rx="360" ry="60" fill={C.accent} opacity="0.2" />
      {/* Perspective road */}
      <path
        d="M120 400 L520 140 H680 L1080 400 Z"
        fill={C.asphalt}
        stroke={C.road}
        strokeWidth="3"
      />
      <path
        d="M600 140 V400"
        fill="none"
        stroke={C.yellow}
        strokeWidth="4"
        strokeDasharray="16 20"
        opacity="0.7"
      />
      <PassengerCar x={430} y={320} scale={1.1} />
      <GoodsVan x={760} y={310} scale={0.95} facing={-1} />
      <Pin x={600} y={120} scale={1.2} active />
    </svg>
  );
}
