/** Fashion garment forms — solid fills; no shared paint-server IDs. */

type SceneProps = { className?: string; color?: string };

const C = {
  accent: "#A855F7",
  soft: "#F3E8FF",
  lavender: "#EDE4FF",
  plum: "#4C1D95",
  deep: "#2E1065",
  nearBlack: "#0F0A1A",
  ivory: "#FFFCFA",
  cream: "#F5E6D3",
  muted: "#A8A29E",
  yellow: "#FFD400",
} as const;

/**
 * Premium T-shirt product preview for Choose Variant.
 * Fill colour is driven by selectedColour (smooth CSS transition via parent).
 */
export function OutfitStudioArt({
  color = C.accent,
  className,
}: SceneProps) {
  return (
    <svg viewBox="0 0 420 560" className={className} aria-hidden="true">
      <rect width="420" height="560" fill={C.soft} />
      <ellipse cx="210" cy="500" rx="130" ry="20" fill={C.plum} opacity="0.1" />

      {/* Soft hang / shadow */}
      <ellipse cx="210" cy="118" rx="42" ry="8" fill={C.nearBlack} opacity="0.06" />

      {/* Sleeve left */}
      <path
        d="M118 150 C95 165 78 195 72 230 L108 248 C118 210 132 185 148 172 Z"
        fill={color}
        stroke={C.nearBlack}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "fill 280ms ease" }}
      />
      {/* Sleeve right */}
      <path
        d="M302 150 C325 165 342 195 348 230 L312 248 C302 210 288 185 272 172 Z"
        fill={color}
        stroke={C.nearBlack}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "fill 280ms ease" }}
      />

      {/* Body */}
      <path
        d="M148 172
           C158 128 178 108 210 108
           C242 108 262 128 272 172
           L286 420
           C286 445 268 458 210 458
           C152 458 134 445 134 420 Z"
        fill={color}
        stroke={C.nearBlack}
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ transition: "fill 280ms ease" }}
      />

      {/* Crew neck */}
      <path
        d="M178 112
           C188 138 232 138 242 112
           C230 108 220 106 210 106
           C200 106 190 108 178 112 Z"
        fill={C.soft}
        stroke={C.nearBlack}
        strokeWidth="2"
      />
      <path
        d="M186 118 C194 132 226 132 234 118"
        fill="none"
        stroke={C.nearBlack}
        strokeWidth="1.75"
        opacity="0.35"
      />

      {/* Subtle center seam + hem stitch */}
      <path
        d="M210 175 V430"
        fill="none"
        stroke={C.nearBlack}
        strokeWidth="1.25"
        opacity="0.12"
      />
      <path
        d="M148 438 C170 448 250 448 272 438"
        fill="none"
        stroke={C.nearBlack}
        strokeWidth="1.5"
        opacity="0.28"
        strokeDasharray="4 5"
      />

      {/* Small brand accent stitch */}
      <circle cx="210" cy="200" r="3" fill={C.yellow} opacity="0.9" />
    </svg>
  );
}

export function ShoeSilhouette({
  color = C.accent,
  className,
}: SceneProps) {
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true">
      <path
        d="M18 62 C40 40 70 36 100 42 C120 46 138 54 145 68 L148 78 H24 C18 78 14 72 18 62 Z"
        fill={color}
        stroke={C.nearBlack}
        strokeWidth="2.5"
      />
      <path d="M28 78 H145" stroke={C.nearBlack} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BagSilhouette({
  color = C.accent,
  className,
}: SceneProps) {
  return (
    <svg viewBox="0 0 140 150" className={className} aria-hidden="true">
      <path
        d="M35 55 H105 V125 C105 135 95 142 85 142 H55 C45 142 35 135 35 125 Z"
        fill={color}
        stroke={C.nearBlack}
        strokeWidth="2.5"
      />
      <path
        d="M50 55 C50 35 90 35 90 55"
        fill="none"
        stroke={C.nearBlack}
        strokeWidth="3"
      />
    </svg>
  );
}

export function TagRibbonArt({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 720 120" className={className} aria-hidden="true">
      <path
        d="M20 60 H620 L680 30 V90 L620 60"
        fill={C.lavender}
        stroke={C.nearBlack}
        strokeWidth="2.5"
      />
      <circle cx="55" cy="60" r="10" fill={C.ivory} stroke={C.nearBlack} strokeWidth="2" />
      <circle cx="55" cy="60" r="3.5" fill={C.accent} />
      <text
        x="100"
        y="68"
        fill={C.deep}
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui,sans-serif"
        letterSpacing="2"
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

export function OrdersPaperArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 340" className={className} aria-hidden="true">
      <rect width="520" height="340" fill="#FAF7F2" />
      {/* Order sheet */}
      <rect x="48" y="48" width="200" height="250" rx="10" fill={C.ivory} stroke={C.nearBlack} strokeWidth="2.5" />
      <rect x="70" y="78" width="120" height="12" rx="3" fill={C.muted} />
      <rect x="70" y="108" width="156" height="8" rx="3" fill={C.lavender} />
      <rect x="70" y="128" width="140" height="8" rx="3" fill={C.lavender} />
      <rect x="70" y="160" width="90" height="20" rx="6" fill={C.accent} opacity="0.85" />
      <text x="85" y="174" fill={C.ivory} fontSize="11" fontWeight="700" fontFamily="system-ui,sans-serif">
        YOUR ORDERS
      </text>

      {/* Tag */}
      <g transform="translate(280 70)">
        <path d="M0 20 H120 L150 50 L120 80 H0 Z" fill={C.soft} stroke={C.nearBlack} strokeWidth="2.5" />
        <circle cx="18" cy="50" r="7" fill={C.ivory} stroke={C.nearBlack} strokeWidth="2" />
        <text x="40" y="56" fill={C.deep} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
          ELIGIBLE
        </text>
      </g>

      {/* Folded garment */}
      <rect x="290" y="180" width="160" height="100" rx="8" fill={C.accent} opacity="0.75" stroke={C.nearBlack} strokeWidth="2.5" />
      <path d="M290 210 H450" stroke={C.nearBlack} strokeWidth="2" opacity="0.35" />
      <text x="310" y="250" fill={C.ivory} fontSize="12" fontWeight="700" fontFamily="system-ui,sans-serif">
        ORDER DETAILS
      </text>
    </svg>
  );
}

export function DeliveryMomentArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 280" className={className} aria-hidden="true">
      <rect width="720" height="280" fill={C.lavender} />
      {/* Storefront */}
      <rect x="40" y="60" width="160" height="160" rx="8" fill={C.ivory} stroke={C.nearBlack} strokeWidth="2.5" />
      <rect x="60" y="90" width="120" height="90" fill={C.soft} stroke={C.nearBlack} strokeWidth="2" />
      <path d="M100 120 H140 V160 H100 Z" fill={C.accent} opacity="0.7" />
      {/* Bag */}
      <g transform="translate(300 100)">
        <path d="M20 30 H100 V110 H20 Z" fill={C.nearBlack} stroke={C.nearBlack} strokeWidth="2" />
        <path d="M40 30 C40 10 80 10 80 30" fill="none" stroke={C.yellow} strokeWidth="4" />
        <text x="36" y="75" fill={C.yellow} fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
          GONA
        </text>
      </g>
      {/* Home */}
      <path
        d="M520 120 L580 70 L640 120 V200 H520 Z"
        fill={C.ivory}
        stroke={C.nearBlack}
        strokeWidth="2.5"
      />
      <rect x="555" y="145" width="40" height="55" fill={C.accent} opacity="0.65" stroke={C.nearBlack} strokeWidth="2" />
      {/* Arrow path */}
      <path
        d="M210 140 H290 M420 140 H500"
        fill="none"
        stroke={C.plum}
        strokeWidth="3"
        strokeDasharray="8 10"
        opacity="0.5"
      />
    </svg>
  );
}
