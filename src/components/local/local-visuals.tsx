/** Living Mandal visual environments — solid fills; no shared paint-server IDs. */

type ClassProps = { className?: string };

const C = {
  accent: "#0F9F94",
  deep: "#0B7A72",
  soft: "#5BC4BC",
  cream: "#F5EDE0",
  building: "#E8DCC8",
  buildingDeep: "#C4B49A",
  terracotta: "#C4734A",
  earth: "#8B6914",
  road: "#9CA3AF",
  roadDark: "#6B7280",
  park: "#6B9F5A",
  field: "#A8C97A",
  sky: "#D6EEEB",
  skyWarm: "#F0E6D4",
  evening: "#2A3544",
  dusk: "#3D4A5C",
  yellow: "#FFD400",
  white: "#FFFFFF",
  charcoal: "#1C1917",
  danger: "#DC2626",
} as const;

function Building({
  x,
  y,
  w,
  h,
  shade = C.building,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  shade?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="3" fill={shade} stroke={C.charcoal} strokeWidth="2" />
      <rect
        x={w * 0.18}
        y={h * 0.22}
        width={w * 0.22}
        height={h * 0.22}
        fill={C.sky}
        stroke={C.charcoal}
        strokeWidth="1.5"
      />
      <rect
        x={w * 0.55}
        y={h * 0.22}
        width={w * 0.22}
        height={h * 0.22}
        fill={C.sky}
        stroke={C.charcoal}
        strokeWidth="1.5"
      />
    </g>
  );
}

/** Cinematic Mandal environment — layered for scroll depth */
export function MandalWorld({
  className,
  dusk = false,
  pulses = false,
  focus = "wide",
}: ClassProps & {
  dusk?: boolean;
  pulses?: boolean;
  focus?: "wide" | "street" | "ground" | "pullout";
}) {
  const sky = dusk ? C.dusk : C.sky;
  const ground = dusk ? "#3A4A3A" : C.field;

  return (
    <svg
      viewBox="0 0 1440 900"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="1440" height="900" fill={sky} />
      {!dusk && (
        <ellipse cx="1180" cy="120" rx="140" ry="48" fill={C.yellow} opacity="0.28" />
      )}
      {dusk && (
        <ellipse cx="200" cy="100" rx="80" ry="28" fill={C.yellow} opacity="0.2" />
      )}

      {/* Distant agricultural belt */}
      <path
        d="M0 280 Q360 230 720 270 T1440 250 V420 H0 Z"
        fill={ground}
        opacity={dusk ? 0.45 : 0.7}
      />
      <path
        d="M0 360 Q400 320 800 350 T1440 330 V520 H0 Z"
        fill={C.park}
        opacity={dusk ? 0.4 : 0.55}
      />

      {/* Midground town cluster */}
      <Building x={180} y={380} w={70} h={90} shade={C.buildingDeep} />
      <Building x={270} y={360} w={80} h={110} shade={C.building} />
      <Building x={370} y={390} w={64} h={80} shade={C.terracotta} />
      <Building x={980} y={370} w={88} h={100} shade={C.building} />
      <Building x={1090} y={350} w={74} h={120} shade={C.buildingDeep} />
      <Building x={1180} y={385} w={70} h={85} shade={C.terracotta} />

      {/* Shops along road */}
      <Building x={520} y={430} w={90} h={70} shade={C.cream} />
      <Building x={630} y={425} w={100} h={75} shade={C.building} />
      <Building x={750} y={435} w={85} h={65} shade={C.cream} />

      {/* Central road */}
      <path
        d="M-40 560 C280 500 520 580 720 540 C940 490 1180 560 1480 520"
        fill="none"
        stroke={C.roadDark}
        strokeWidth="92"
      />
      <path
        d="M-40 560 C280 500 520 580 720 540 C940 490 1180 560 1480 520"
        fill="none"
        stroke={C.road}
        strokeWidth="72"
      />
      <path
        d="M-40 560 C280 500 520 580 720 540 C940 490 1180 560 1480 520"
        fill="none"
        stroke={C.yellow}
        strokeWidth="3"
        strokeDasharray="22 28"
        opacity="0.55"
      />

      {/* Community / sports ground */}
      <ellipse
        cx="720"
        cy={focus === "ground" ? 620 : 680}
        rx={focus === "ground" ? 320 : 220}
        ry={focus === "ground" ? 140 : 90}
        fill={dusk ? "#2F4A3A" : "#5A8F4E"}
        stroke={C.charcoal}
        strokeWidth="3"
        opacity="0.9"
      />
      <ellipse
        cx="720"
        cy={focus === "ground" ? 620 : 680}
        rx={focus === "ground" ? 280 : 190}
        ry={focus === "ground" ? 115 : 72}
        fill="none"
        stroke={C.white}
        strokeWidth="2"
        opacity="0.35"
      />

      {/* Foreground earth */}
      <path d="M0 760 H1440 V900 H0 Z" fill={dusk ? "#1F2A24" : "#C4B49A"} />
      <path d="M0 820 H1440 V900 H0 Z" fill={dusk ? "#151C18" : C.earth} opacity="0.45" />

      {pulses && (
        <>
          <circle cx="300" cy="470" r="10" fill={C.accent} opacity="0.85" />
          <circle cx="720" cy="650" r="12" fill={C.yellow} opacity="0.9" />
          <circle cx="1080" cy="460" r="9" fill={C.accent} opacity="0.8" />
          <circle cx="580" cy="520" r="8" fill={C.soft} opacity="0.85" />
        </>
      )}

      {focus === "pullout" && (
        <>
          {[
            { x: 260, t: "Announcements" },
            { x: 440, t: "Events" },
            { x: 620, t: "Tournaments" },
            { x: 820, t: "Offers" },
            { x: 1020, t: "Businesses" },
          ].map((p) => (
            <g key={p.t} transform={`translate(${p.x} 480)`}>
              <circle r="7" fill={C.yellow} stroke={C.charcoal} strokeWidth="2" />
              <text
                y="-16"
                textAnchor="middle"
                fill={dusk ? C.white : C.charcoal}
                fontSize="13"
                fontWeight="700"
                fontFamily="system-ui,sans-serif"
              >
                {p.t}
              </text>
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

/** Billboard / street surface for events & banners */
export function CommunityBillboard({
  className,
  mode = "event",
}: ClassProps & { mode?: "event" | "banner" | "announce" | "important" }) {
  const title =
    mode === "banner"
      ? "Festival Offer"
      : mode === "announce"
        ? "Road update"
        : mode === "important"
          ? "Community notice"
          : "Community celebration";
  const sub =
    mode === "banner"
      ? "Local business"
      : mode === "announce"
        ? "Nandyala Road · East Tadipatri"
        : mode === "important"
          ? "Public information"
          : "This weekend";
  const badge =
    mode === "banner"
      ? "SPONSORED LOCAL"
      : mode === "announce"
        ? "LOCAL UPDATE"
        : mode === "important"
          ? "PUBLIC INFORMATION"
          : "LOCAL EVENT";

  return (
    <svg viewBox="0 0 720 420" className={className} aria-hidden="true">
      <rect width="720" height="420" fill={C.skyWarm} />
      <path d="M0 300 H720 V420 H0 Z" fill={C.road} />
      <path d="M0 320 H720" stroke={C.yellow} strokeWidth="3" strokeDasharray="16 18" opacity="0.5" />
      <Building x={40} y={160} w={90} h={120} />
      <Building x={560} y={150} w={100} h={130} shade={C.terracotta} />
      {/* Billboard frame */}
      <rect x="160" y="70" width="400" height="230" rx="8" fill={C.charcoal} />
      <rect x="172" y="82" width="376" height="206" rx="4" fill={C.cream} />
      <rect x="188" y="98" width="120" height="26" rx="6" fill={C.accent} />
      <text
        x="200"
        y="116"
        fill={C.white}
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        {badge}
      </text>
      <text
        x="188"
        y="170"
        fill={C.charcoal}
        fontSize="28"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        {title}
      </text>
      <text
        x="188"
        y="205"
        fill={C.deep}
        fontSize="16"
        fontFamily="system-ui,sans-serif"
      >
        {sub}
      </text>
      <rect x="340" y="300" width="24" height="80" fill={C.roadDark} />
      <rect x="356" y="300" width="24" height="80" fill={C.roadDark} />
    </svg>
  );
}

/** Tournament ground expanding environment */
export function TournamentGroundArt({
  className,
  expanded = false,
}: ClassProps & { expanded?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 700"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="1200" height="700" fill="#1A2E28" />
      <ellipse cx="980" cy="90" rx="100" ry="36" fill={C.yellow} opacity="0.18" />
      <path d="M0 160 H1200 V700 H0 Z" fill="#2C4A3C" />
      <ellipse
        cx="600"
        cy={expanded ? 380 : 420}
        rx={expanded ? 480 : 340}
        ry={expanded ? 200 : 150}
        fill="#4F8A5A"
        stroke={C.charcoal}
        strokeWidth="4"
      />
      <ellipse
        cx="600"
        cy={expanded ? 380 : 420}
        rx={expanded ? 420 : 290}
        ry={expanded ? 165 : 120}
        fill="none"
        stroke={C.white}
        strokeWidth="2.5"
        opacity="0.4"
      />
      <path
        d="M600 215 V545"
        fill="none"
        stroke={C.white}
        strokeWidth="2"
        opacity="0.35"
      />
      <circle
        cx="600"
        cy={expanded ? 380 : 420}
        r={expanded ? 48 : 36}
        fill="none"
        stroke={C.white}
        strokeWidth="2"
        opacity="0.4"
      />
      {/* Simple stands */}
      <path d="M40 280 L220 340 V520 L40 480 Z" fill="#243830" stroke={C.charcoal} strokeWidth="2" />
      <path d="M1160 280 L980 340 V520 L1160 480 Z" fill="#243830" stroke={C.charcoal} strokeWidth="2" />
    </svg>
  );
}

/** Live scoreboard panel */
export function LiveScoreArt({
  className,
  homeName,
  homeScore,
  homeOvers,
  awayName,
  awayScore,
}: {
  className?: string;
  homeName: string;
  homeScore: string;
  homeOvers: string;
  awayName: string;
  awayScore: string;
}) {
  return (
    <svg viewBox="0 0 520 280" className={className} aria-hidden="true">
      <rect width="520" height="280" rx="16" fill="#0F172A" stroke={C.accent} strokeWidth="3" />
      <rect x="20" y="18" width="70" height="26" rx="6" fill={C.danger} />
      <text x="34" y="36" fill={C.white} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        LIVE
      </text>
      <text x="20" y="80" fill={C.soft} fontSize="14" fontFamily="system-ui,sans-serif">
        {homeName}
      </text>
      <text x="20" y="118" fill={C.white} fontSize="36" fontWeight="700" fontFamily="system-ui,sans-serif">
        {homeScore}
      </text>
      <text x="20" y="148" fill={C.yellow} fontSize="14" fontFamily="system-ui,sans-serif">
        {homeOvers}
      </text>
      <path d="M20 170 H500" stroke={C.deep} strokeWidth="2" opacity="0.5" />
      <text x="20" y="210" fill={C.soft} fontSize="14" fontFamily="system-ui,sans-serif">
        {awayName}
      </text>
      <text x="20" y="248" fill={C.white} fontSize="24" fontWeight="700" fontFamily="system-ui,sans-serif">
        {awayScore}
      </text>
    </svg>
  );
}

export function ChampionMark({
  className,
  hall = false,
}: ClassProps & { hall?: boolean }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true">
      <ellipse cx="100" cy="200" rx="50" ry="10" fill={C.charcoal} opacity="0.25" />
      <path
        d="M60 40 H140 V90 C140 130 120 150 100 160 C80 150 60 130 60 90 Z"
        fill={hall ? C.yellow : C.accent}
        stroke={C.charcoal}
        strokeWidth="3"
      />
      <rect x="88" y="160" width="24" height="28" fill={C.buildingDeep} stroke={C.charcoal} strokeWidth="2" />
      <rect x="70" y="186" width="60" height="12" rx="3" fill={C.cream} stroke={C.charcoal} strokeWidth="2" />
      <circle cx="100" cy="85" r="18" fill={hall ? C.deep : C.cream} stroke={C.charcoal} strokeWidth="2" />
    </svg>
  );
}

export function BusinessStreetArt({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 900 480" className={className} aria-hidden="true">
      <rect width="900" height="480" fill={C.skyWarm} />
      <path d="M0 320 H900 V480 H0 Z" fill={C.road} />
      <path d="M0 340 H900" stroke={C.yellow} strokeWidth="3" strokeDasharray="14 16" opacity="0.45" />
      <Building x={60} y={140} w={120} h={160} shade={C.cream} />
      <Building x={220} y={120} w={140} h={180} shade={C.building} />
      <Building x={400} y={150} w={110} h={150} shade={C.terracotta} />
      <Building x={560} y={130} w={150} h={170} shade={C.buildingDeep} />
      <Building x={740} y={155} w={100} h={145} shade={C.cream} />
      {/* Shop awnings */}
      <path d="M220 200 H360" stroke={C.accent} strokeWidth="10" strokeLinecap="round" />
      <path d="M560 210 H710" stroke={C.yellow} strokeWidth="10" strokeLinecap="round" />
      <rect x="250" y="250" width="90" height="28" rx="6" fill={C.accent} />
      <text x="262" y="269" fill={C.white} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        LOCAL OFFER
      </text>
      <rect x="590" y="255" width="110" height="28" rx="6" fill={C.charcoal} />
      <text x="602" y="274" fill={C.yellow} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        SPONSORED
      </text>
    </svg>
  );
}
