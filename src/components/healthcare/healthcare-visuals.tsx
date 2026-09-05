/** Healthcare SVG scenes V2 — solid fills only; large human-forward compositions. */

type SceneProps = {
  className?: string;
};

/** Recurring cast for journey continuity */
const C = {
  stroke: "#1E3A5F",
  blue: "#3B82F6",
  soft: "#DBEAFE",
  mist: "#EFF6FF",
  navy: "#1E40AF",
  skinDoctor: "#FDE68A",
  skinPatient: "#FED7AA",
  skinChild: "#FDE68A",
  yellow: "#FFD400",
  white: "#FFFFFF",
  warm: "#FB923C",
} as const;

function Ground({ cx = 300, cy = 430, rx = 200 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="22" fill={C.stroke} opacity="0.12" />;
}

function DoctorFigure({
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
      <ellipse cx="0" cy="148" rx="42" ry="10" fill={C.stroke} opacity="0.12" />
      {/* Hair */}
      <ellipse cx="0" cy="-8" rx="36" ry="28" fill="#1E3A5F" />
      <circle cx="0" cy="2" r="32" fill={C.skinDoctor} stroke={C.stroke} strokeWidth="3.5" />
      {/* Soft face cues */}
      <circle cx="-10" cy="0" r="3" fill={C.stroke} />
      <circle cx="10" cy="0" r="3" fill={C.stroke} />
      <path d="M-6 12 Q0 18 6 12" fill="none" stroke={C.stroke} strokeWidth="2.5" strokeLinecap="round" />
      {/* Neck */}
      <rect x="-10" y="30" width="20" height="14" fill={C.skinDoctor} />
      {/* Coat body */}
      <path
        d="M-44 48 C-36 28 -20 34 -12 42 L12 42 C20 34 36 28 44 48 V150 C44 158 36 162 28 162 H-28 C-36 162 -44 158 -44 150 Z"
        fill={C.white}
        stroke={C.stroke}
        strokeWidth="3.5"
      />
      {/* Shoulders / arms */}
      <path d="M-44 62 C-58 70 -62 95 -58 118" fill="none" stroke={C.white} strokeWidth="16" strokeLinecap="round" />
      <path d="M-44 62 C-58 70 -62 95 -58 118" fill="none" stroke={C.stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M44 62 C58 70 62 95 58 118" fill="none" stroke={C.white} strokeWidth="16" strokeLinecap="round" />
      <path d="M44 62 C58 70 62 95 58 118" fill="none" stroke={C.stroke} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="-18" y="62" width="36" height="46" rx="7" fill={C.blue} />
      <path d="M-12 42 H12" stroke={C.stroke} strokeWidth="4" strokeLinecap="round" />
      <circle cx="0" cy="42" r="5" fill={C.yellow} />
    </g>
  );
}

function PatientFigure({
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
      <ellipse cx="0" cy="142" rx="38" ry="9" fill={C.stroke} opacity="0.12" />
      <ellipse cx="-4" cy="-6" rx="30" ry="22" fill="#7C2D12" opacity="0.85" />
      <circle cx="0" cy="2" r="28" fill={C.skinPatient} stroke={C.stroke} strokeWidth="3.5" />
      <circle cx="-9" cy="0" r="2.8" fill={C.stroke} />
      <circle cx="9" cy="0" r="2.8" fill={C.stroke} />
      <path d="M-5 11 Q0 16 5 11" fill="none" stroke={C.stroke} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="-8" y="28" width="16" height="12" fill={C.skinPatient} />
      <path
        d="M-40 44 C-30 26 -14 32 -8 40 H8 C14 32 30 26 40 44 V145 C40 152 32 156 24 156 H-24 C-32 156 -40 152 -40 145 Z"
        fill={C.navy}
        stroke={C.stroke}
        strokeWidth="3.5"
      />
      <path d="M-40 58 C-52 68 -54 95 -50 115" fill="none" stroke={C.navy} strokeWidth="14" strokeLinecap="round" />
      <path d="M-40 58 C-52 68 -54 95 -50 115" fill="none" stroke={C.stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M40 58 C52 68 54 95 50 115" fill="none" stroke={C.navy} strokeWidth="14" strokeLinecap="round" />
      <path d="M40 58 C52 68 54 95 50 115" fill="none" stroke={C.stroke} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function ChildFigure({
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
      <ellipse cx="0" cy="108" rx="28" ry="7" fill={C.stroke} opacity="0.12" />
      <ellipse cx="0" cy="-4" rx="22" ry="16" fill="#1E3A5F" />
      <circle cx="0" cy="4" r="20" fill={C.skinChild} stroke={C.stroke} strokeWidth="3" />
      <circle cx="-7" cy="3" r="2.2" fill={C.stroke} />
      <circle cx="7" cy="3" r="2.2" fill={C.stroke} />
      <path d="M-4 12 Q0 16 4 12" fill="none" stroke={C.stroke} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M-28 34 C-20 18 -8 22 -4 28 H4 C8 22 20 18 28 34 V105 C28 110 22 114 16 114 H-16 C-22 114 -28 110 -28 105 Z"
        fill="#60A5FA"
        stroke={C.stroke}
        strokeWidth="3"
      />
    </g>
  );
}

function ClinicBlock({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="150" height="190" rx="12" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
      <rect x="22" y="28" width="40" height="40" rx="5" fill={C.soft} stroke={C.blue} strokeWidth="2.5" />
      <rect x="88" y="28" width="40" height="40" rx="5" fill={C.soft} stroke={C.blue} strokeWidth="2.5" />
      <rect x="22" y="88" width="40" height="40" rx="5" fill={C.soft} stroke={C.blue} strokeWidth="2.5" />
      <rect x="88" y="88" width="40" height="40" rx="5" fill={C.soft} stroke={C.blue} strokeWidth="2.5" />
      <rect x="55" y="140" width="40" height="50" rx="5" fill={C.blue} />
      <path d="M40 0 H110 L75 -32 Z" fill={C.stroke} />
      <rect x="63" y="-18" width="24" height="8" rx="2" fill={C.yellow} />
    </g>
  );
}

export function CareHeroScene({ className }: SceneProps) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="640" height="520" fill={C.mist} rx="28" />
      <circle cx="330" cy="250" r="200" fill={C.soft} />
      <Ground cx={300} cy={470} rx={230} />

      <ClinicBlock x={430} y={160} />

      {/* Large human cluster — occupies most of scene */}
      <DoctorFigure x={290} y={175} scale={1.15} />
      <PatientFigure x={155} y={205} scale={1.1} />
      <ChildFigure x={95} y={265} scale={1.05} />

      {/* Soft care connection */}
      <path
        d="M330 280 C390 255 430 245 470 250"
        fill="none"
        stroke={C.blue}
        strokeWidth="5"
        strokeDasharray="10 12"
        strokeLinecap="round"
      />
      <circle cx={400} cy={258} r="9" fill={C.yellow} stroke={C.stroke} strokeWidth="2.5" />
    </svg>
  );
}

/** Substantial mini-scenes for Care Access destinations */
export function AccessScene({
  kind,
  active,
}: {
  kind: "local" | "hospital" | "vet";
  active?: boolean;
}) {
  const dim = active ? 1 : 0.72;

  if (kind === "local") {
    return (
      <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden="true" style={{ opacity: dim }}>
        <rect width="280" height="160" rx="16" fill={active ? C.mist : "#F8FAFC"} />
        <ellipse cx="140" cy="145" rx="90" ry="10" fill={C.stroke} opacity="0.1" />
        <rect x="175" y="35" width="70" height="90" rx="8" fill={C.white} stroke={C.stroke} strokeWidth="2.5" />
        <rect x="190" y="50" width="18" height="18" rx="3" fill={C.soft} stroke={C.blue} strokeWidth="1.5" />
        <rect x="218" y="50" width="18" height="18" rx="3" fill={C.soft} stroke={C.blue} strokeWidth="1.5" />
        <rect x="200" y="90" width="20" height="35" rx="3" fill={C.blue} />
        <DoctorFigure x={95} y={55} scale={0.72} />
        <PatientFigure x={45} y={68} scale={0.68} />
      </svg>
    );
  }

  if (kind === "hospital") {
    return (
      <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden="true" style={{ opacity: dim }}>
        <rect width="280" height="160" rx="16" fill={active ? C.mist : "#F8FAFC"} />
        <ellipse cx="140" cy="145" rx="90" ry="10" fill={C.stroke} opacity="0.1" />
        <rect x="40" y="30" width="95" height="110" rx="8" fill={C.white} stroke={C.stroke} strokeWidth="2.5" />
        <path d="M87 45 V85 M67 65 H107" stroke={C.blue} strokeWidth="5" strokeLinecap="round" />
        <rect x="55" y="95" width="20" height="20" rx="3" fill={C.soft} />
        <rect x="100" y="95" width="20" height="20" rx="3" fill={C.soft} />
        <rect x="75" y="115" width="25" height="25" rx="3" fill={C.blue} />
        <DoctorFigure x={200} y={55} scale={0.7} />
        <circle cx="200" cy="20" r="14" fill={C.yellow} stroke={C.stroke} strokeWidth="2" />
        <text x="200" y="25" textAnchor="middle" fill={C.stroke} fontSize="10" fontWeight="700" fontFamily="system-ui,sans-serif">
          MD
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden="true" style={{ opacity: dim }}>
      <rect width="280" height="160" rx="16" fill={active ? "#FFF7ED" : "#FFFBF5"} />
      <ellipse cx="140" cy="145" rx="90" ry="10" fill={C.stroke} opacity="0.1" />
      <path d="M190 55 L235 25 L280 55 V120 H190 Z" fill={C.white} stroke={C.stroke} strokeWidth="2.5" />
      <path d="M190 55 L235 25 L280 55" fill="none" stroke={C.warm} strokeWidth="4" />
      <rect x="220" y="70" width="22" height="50" rx="3" fill={C.blue} />
      <DoctorFigure x={80} y={50} scale={0.65} />
      <ellipse cx="145" cy="115" rx="32" ry="20" fill={C.warm} stroke={C.stroke} strokeWidth="2.5" />
      <circle cx="125" cy="95" r="14" fill={C.skinPatient} stroke={C.stroke} strokeWidth="2" />
      <circle cx="120" cy="92" r="2.5" fill={C.stroke} />
    </svg>
  );
}

export function JourneyStageArt({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 520 380"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="520" height="380" rx="22" fill={C.mist} />
      <circle cx="260" cy="180" r="145" fill={C.soft} opacity="0.85" />
      <Ground cx={250} cy={350} rx={180} />

      {stage === 0 && (
        <g>
          {/* Find Local Care — people dominate */}
          <ClinicBlock x={330} y={95} />
          <DoctorFigure x={250} y={130} scale={1.05} />
          <PatientFigure x={120} y={155} scale={1.05} />
          <path
            d="M155 200 C190 175 215 165 230 160"
            fill="none"
            stroke={C.blue}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}

      {stage === 1 && (
        <g>
          {/* Book appointment — people + substantial calendar */}
          <PatientFigure x={95} y={150} scale={1} />
          <DoctorFigure x={200} y={125} scale={1} />
          <g transform="translate(290 70)">
            <rect width="190" height="230" rx="18" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
            <rect width="190" height="52" rx="18" fill={C.blue} />
            <rect y="36" width="190" height="20" fill={C.blue} />
            <text
              x="95"
              y="34"
              textAnchor="middle"
              fill={C.white}
              fontSize="18"
              fontWeight="700"
              fontFamily="system-ui,sans-serif"
            >
              Appointment
            </text>
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const selected = row === 1 && col === 2;
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={22 + col * 40}
                    y={70 + row * 38}
                    width="30"
                    height="28"
                    rx="6"
                    fill={selected ? C.yellow : C.soft}
                    stroke={C.stroke}
                    strokeWidth="2"
                  />
                );
              }),
            )}
          </g>
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* Consultation — strongest human moment */}
          <DoctorFigure x={160} y={120} scale={1.15} />
          <PatientFigure x={320} y={145} scale={1.1} />
          {/* Clinical note */}
          <g transform="translate(55 95)">
            <rect width="70" height="95" rx="10" fill={C.white} stroke={C.stroke} strokeWidth="3" />
            <rect x="12" y="18" width="46" height="8" rx="3" fill="#94A3B8" />
            <rect x="12" y="36" width="36" height="8" rx="3" fill="#CBD5E1" />
            <rect x="12" y="54" width="46" height="8" rx="3" fill="#CBD5E1" />
            <rect x="12" y="72" width="28" height="10" rx="3" fill={C.blue} />
          </g>
          <path
            d="M195 185 C240 170 280 170 300 180"
            fill="none"
            stroke={C.blue}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}

      {stage === 3 && (
        <g>
          {/* Referral — continuity toward specialist */}
          <DoctorFigure x={90} y={130} scale={0.95} />
          <PatientFigure x={190} y={155} scale={0.9} />
          {/* Substantial referral document */}
          <g transform="translate(270 110)">
            <rect width="100" height="120" rx="12" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
            <rect x="16" y="22" width="68" height="10" rx="3" fill="#94A3B8" />
            <rect x="16" y="44" width="52" height="10" rx="3" fill={C.blue} />
            <rect x="16" y="66" width="60" height="10" rx="3" fill="#CBD5E1" />
            <rect x="16" y="88" width="40" height="12" rx="3" fill={C.yellow} />
          </g>
          <path
            d="M370 170 H455"
            fill="none"
            stroke={C.blue}
            strokeWidth="6"
            strokeLinecap="round"
          />
          <polygon points="455,158 478,170 455,182" fill={C.blue} />
          <rect x="470" y="95" width="40" height="90" rx="6" fill={C.white} stroke={C.stroke} strokeWidth="2.5" opacity="0.85" />
          <path d="M490 110 V145 M475 127 H505" stroke={C.blue} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
        </g>
      )}

      {stage === 4 && (
        <g>
          {/* Hospital & Specialist */}
          <g transform="translate(40 70)">
            <rect width="170" height="220" rx="12" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
            <path d="M85 35 V95 M55 65 H115" stroke={C.blue} strokeWidth="7" strokeLinecap="round" />
            <rect x="30" y="115" width="35" height="35" rx="4" fill={C.soft} stroke={C.blue} strokeWidth="2" />
            <rect x="105" y="115" width="35" height="35" rx="4" fill={C.soft} stroke={C.blue} strokeWidth="2" />
            <rect x="30" y="165" width="35" height="35" rx="4" fill={C.soft} stroke={C.blue} strokeWidth="2" />
            <rect x="105" y="165" width="35" height="35" rx="4" fill={C.soft} stroke={C.blue} strokeWidth="2" />
            <rect x="65" y="185" width="40" height="35" rx="4" fill={C.blue} />
          </g>
          <DoctorFigure x={320} y={125} scale={1.05} />
          <PatientFigure x={420} y={155} scale={0.95} />
          <path
            d="M210 180 C250 160 280 150 300 145"
            fill="none"
            stroke={C.blue}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="320" cy="70" r="18" fill={C.yellow} stroke={C.stroke} strokeWidth="2.5" />
          <text
            x="320"
            y="76"
            textAnchor="middle"
            fill={C.stroke}
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui,sans-serif"
          >
            MD
          </text>
        </g>
      )}

      {stage === 5 && (
        <g>
          {/* Records Stay Connected */}
          <PatientFigure x={95} y={140} scale={1} />
          <ChildFigure x={165} y={195} scale={0.95} />
          <g transform="translate(230 55)">
            <rect width="250" height="270" rx="18" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
            <rect width="250" height="52" rx="18" fill={C.stroke} />
            <rect y="36" width="250" height="20" fill={C.stroke} />
            <text
              x="125"
              y="34"
              textAnchor="middle"
              fill={C.white}
              fontSize="18"
              fontWeight="700"
              fontFamily="system-ui,sans-serif"
            >
              Health records
            </text>
            {[
              { y: 85, label: "Appointments", c: C.blue },
              { y: 135, label: "Prescriptions", c: "#60A5FA" },
              { y: 185, label: "Referrals", c: C.yellow },
              { y: 235, label: "Medical History", c: "#93C5FD" },
            ].map((row) => (
              <g key={row.label}>
                <circle cx="36" cy={row.y} r="10" fill={row.c} stroke={C.stroke} strokeWidth="2" />
                <rect
                  x="56"
                  y={row.y - 14}
                  width="170"
                  height="28"
                  rx="8"
                  fill={C.mist}
                  stroke={C.stroke}
                  strokeWidth="2"
                />
                <text
                  x="141"
                  y={row.y + 5}
                  textAnchor="middle"
                  fill={C.stroke}
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="system-ui,sans-serif"
                >
                  {row.label}
                </text>
              </g>
            ))}
          </g>
          <path
            d="M130 200 C170 175 200 160 230 145"
            fill="none"
            stroke={C.blue}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

export function ReferralFlowArt({ progress }: { progress: number }) {
  const p = Math.max(0, Math.min(1, progress));
  const docX = 130 + p * 155;

  return (
    <svg viewBox="0 0 560 240" className="h-full w-full" aria-hidden="true">
      <rect width="560" height="240" rx="20" fill={C.mist} />
      <ellipse cx="280" cy="215" rx="180" ry="14" fill={C.stroke} opacity="0.1" />

      <DoctorFigure x={85} y={85} scale={0.85} />
      <text
        x="85"
        y="225"
        textAnchor="middle"
        fill={C.stroke}
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        Local doctor
      </text>

      <path d="M140 105 H410" fill="none" stroke="#93C5FD" strokeWidth="7" strokeLinecap="round" />
      <path
        d="M140 105 H410"
        fill="none"
        stroke={C.blue}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="270"
        strokeDashoffset={270 * (1 - p)}
      />

      <g transform={`translate(${docX} 70)`}>
        <rect width="64" height="72" rx="10" fill={C.white} stroke={C.stroke} strokeWidth="3" />
        <rect x="12" y="16" width="40" height="8" rx="2" fill="#94A3B8" />
        <rect x="12" y="32" width="32" height="8" rx="2" fill={C.blue} />
        <rect x="12" y="48" width="36" height="8" rx="2" fill="#CBD5E1" />
      </g>

      <g transform="translate(420 45)">
        <rect
          width="100"
          height="130"
          rx="10"
          fill={p > 0.7 ? C.white : "#F8FAFC"}
          stroke={C.stroke}
          strokeWidth="3.5"
        />
        <path
          d="M50 28 V78 M28 53 H72"
          stroke={p > 0.7 ? C.blue : "#94A3B8"}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {p > 0.85 && (
          <circle cx="50" cy="-8" r="14" fill={C.yellow} stroke={C.stroke} strokeWidth="2" />
        )}
      </g>
      <text
        x="470"
        y="225"
        textAnchor="middle"
        fill={C.stroke}
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        Hospital / Specialist
      </text>
    </svg>
  );
}

export function FamilyCareArt({ active }: { active: "you" | "parent" | "child" }) {
  const glow = (id: string) => (active === id ? 1 : 0.42);
  const recordStrength = active === "you" ? 1 : active === "parent" ? 0.92 : 0.88;

  return (
    <svg viewBox="0 0 560 400" className="h-full w-full" aria-hidden="true">
      <rect width="560" height="400" rx="22" fill={C.mist} />
      <circle cx="280" cy="175" r="58" fill={C.white} stroke={C.blue} strokeWidth="5" />
      <text
        x="280"
        y="168"
        textAnchor="middle"
        fill={C.stroke}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        Health
      </text>
      <text
        x="280"
        y="190"
        textAnchor="middle"
        fill={C.blue}
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
      >
        History
      </text>

      {/* You — patient character */}
      <g opacity={glow("you")}>
        <PatientFigure x={120} y={95} scale={0.95} />
        <path d="M150 130 C190 140 220 155 245 170" fill="none" stroke={C.blue} strokeWidth="4" />
      </g>

      {/* Parent */}
      <g opacity={glow("parent")}>
        <g transform="translate(430 95) scale(0.95)">
          <ellipse cx="0" cy="142" rx="38" ry="9" fill={C.stroke} opacity="0.12" />
          <ellipse cx="2" cy="-6" rx="30" ry="22" fill="#44403C" />
          <circle cx="0" cy="2" r="28" fill="#E7C6A0" stroke={C.stroke} strokeWidth="3.5" />
          <circle cx="-9" cy="0" r="2.8" fill={C.stroke} />
          <circle cx="9" cy="0" r="2.8" fill={C.stroke} />
          <path d="M-5 11 Q0 16 5 11" fill="none" stroke={C.stroke} strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M-40 44 C-30 26 -14 32 -8 40 H8 C14 32 30 26 40 44 V145 C40 152 32 156 24 156 H-24 C-32 156 -40 152 -40 145 Z"
            fill="#1E3A5F"
            stroke={C.stroke}
            strokeWidth="3.5"
          />
        </g>
        <path d="M410 130 C370 140 340 155 315 170" fill="none" stroke={C.blue} strokeWidth="4" />
      </g>

      {/* Child */}
      <g opacity={glow("child")}>
        <ChildFigure x={280} y={310} scale={1.05} />
        <path d="M280 285 V233" fill="none" stroke={C.blue} strokeWidth="4" />
      </g>

      {/* Record timeline — stronger when family selected */}
      <g opacity={recordStrength}>
        {[
          { x: 30, y: 250, t: "Appointments" },
          { x: 30, y: 300, t: "Prescriptions" },
          { x: 390, y: 250, t: "Referrals" },
          { x: 390, y: 300, t: "History" },
        ].map((chip) => (
          <g key={chip.t}>
            <rect
              x={chip.x}
              y={chip.y}
              width="140"
              height="36"
              rx="18"
              fill={C.white}
              stroke={C.stroke}
              strokeWidth="2.5"
            />
            <text
              x={chip.x + 70}
              y={chip.y + 23}
              textAnchor="middle"
              fill={C.stroke}
              fontSize="13"
              fontWeight="600"
              fontFamily="system-ui,sans-serif"
            >
              {chip.t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function VeterinaryScene({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 560 380" className={className} aria-hidden="true">
      <rect width="560" height="380" rx="22" fill="#FFF7ED" />
      <ellipse cx="280" cy="340" rx="180" ry="20" fill="#9A3412" opacity="0.12" />

      {/* Home — larger */}
      <path d="M360 130 L450 70 L540 130 V280 H360 Z" fill={C.white} stroke={C.stroke} strokeWidth="3.5" />
      <path d="M360 130 L450 70 L540 130" fill="none" stroke={C.warm} strokeWidth="6" />
      <rect x="430" y="165" width="40" height="115" rx="5" fill={C.blue} />

      {/* Veterinarian — larger human */}
      <DoctorFigure x={160} y={120} scale={1.05} />

      {/* Animal — clearer */}
      <ellipse cx={275} cy={255} rx="52" ry="34" fill={C.warm} stroke={C.stroke} strokeWidth="3.5" />
      <circle cx={240} cy={220} r="24" fill={C.skinPatient} stroke={C.stroke} strokeWidth="3" />
      <circle cx={232} cy={214} r="3.5" fill={C.stroke} />
      <path d="M225 205 L214 188" stroke={C.stroke} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M250 202 L262 186" stroke={C.stroke} strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx={310} cy={248} rx="10" ry="7" fill={C.stroke} opacity="0.25" />
    </svg>
  );
}

export function CtaCareScene({ className }: SceneProps) {
  return (
    <svg viewBox="0 0 560 340" className={className} aria-hidden="true">
      <rect width="560" height="340" rx="22" fill={C.soft} />
      <circle cx="280" cy="165" r="110" fill={C.mist} />
      <Ground cx={280} cy={300} rx={160} />
      <DoctorFigure x={180} y={120} scale={0.95} />
      <PatientFigure x={280} y={140} scale={0.9} />
      <ChildFigure x={360} y={165} scale={0.85} />
      <path
        d="M210 160 C240 145 260 145 280 155"
        fill="none"
        stroke={C.blue}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M305 165 C325 150 340 145 355 150"
        fill="none"
        stroke={C.blue}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="280" cy="70" r="12" fill={C.yellow} stroke={C.stroke} strokeWidth="2.5" />
    </svg>
  );
}
