/**
 * Shared soft 2.5D Grocery illustration language.
 * Decorative only — keep aria-hidden on consumers.
 */

type SvgProps = {
  className?: string;
};

export function GonaTomato({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="gt-tomato" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="55%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </radialGradient>
      </defs>
      <ellipse cx="40" cy="68" rx="22" ry="5" fill="#111111" opacity="0.12" />
      <circle cx="40" cy="44" r="26" fill="url(#gt-tomato)" />
      <ellipse cx="30" cy="34" rx="10" ry="6" fill="#FFFFFF" opacity="0.22" />
      <path
        d="M40 18 C36 28 28 30 24 28 C30 34 36 34 40 30 C44 34 50 34 56 28 C52 30 44 28 40 18 Z"
        fill="#16A34A"
      />
      <path d="M40 18 V30" stroke="#166534" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GonaLeaf({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 72 88" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-leaf" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <ellipse cx="36" cy="80" rx="16" ry="4" fill="#111111" opacity="0.1" />
      <path
        d="M36 78 C18 62 10 40 18 22 C34 8 54 16 58 36 C62 56 48 72 36 78 Z"
        fill="url(#gt-leaf)"
      />
      <path
        d="M36 74 C34 52 38 34 48 22"
        stroke="#166534"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function GonaMilk({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-milk" x1="20%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="90" rx="18" ry="4" fill="#111111" opacity="0.1" />
      <path
        d="M18 28 H46 L50 84 H14 Z"
        fill="url(#gt-milk)"
        stroke="#BAE6FD"
        strokeWidth="1.5"
      />
      <path d="M22 18 H42 L46 28 H18 Z" fill="#7DD3FC" />
      <rect x="22" y="40" width="20" height="18" rx="4" fill="#38BDF8" opacity="0.35" />
      <rect x="24" y="44" width="16" height="4" rx="2" fill="#0EA5E9" opacity="0.55" />
    </svg>
  );
}

export function GonaBread({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 96 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-bread" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="56" rx="28" ry="5" fill="#111111" opacity="0.1" />
      <ellipse cx="48" cy="34" rx="36" ry="22" fill="url(#gt-bread)" />
      <ellipse cx="48" cy="30" rx="28" ry="12" fill="#FEF3C7" opacity="0.45" />
      <path
        d="M28 30 C34 24 40 24 44 30 M52 30 C56 24 62 24 68 30"
        stroke="#B45309"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function GonaOrange({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="gt-orange" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="55%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
      </defs>
      <ellipse cx="36" cy="64" rx="18" ry="4" fill="#111111" opacity="0.1" />
      <circle cx="36" cy="38" r="24" fill="url(#gt-orange)" />
      <ellipse cx="28" cy="30" rx="8" ry="5" fill="#FFFFFF" opacity="0.2" />
      <path d="M36 14 C34 20 30 22 26 20 C32 24 36 24 36 20 C36 24 40 24 46 20 C42 22 38 20 36 14 Z" fill="#16A34A" />
    </svg>
  );
}

export function GonaBag({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 110" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-bag" x1="20%" y1="10%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="55%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="102" rx="34" ry="6" fill="#111111" opacity="0.12" />
      <path d="M28 42 H92 L82 98 H38 Z" fill="url(#gt-bag)" />
      <path
        d="M38 42 C44 22 76 22 82 42"
        stroke="#FFD400"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="48" y="62" width="24" height="8" rx="3" fill="#FFD400" opacity="0.9" />
      <path d="M38 42 H82" stroke="#166534" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

export function GonaRicePack({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 72 96" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-rice" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="36" cy="90" rx="20" ry="4" fill="#111111" opacity="0.1" />
      <rect x="14" y="18" width="44" height="68" rx="10" fill="url(#gt-rice)" />
      <rect x="14" y="18" width="44" height="18" rx="10" fill="#B45309" opacity="0.85" />
      <circle cx="36" cy="52" r="12" fill="#FFFBEB" opacity="0.7" />
      <path d="M30 52 C32 48 40 48 42 52 C40 56 32 56 30 52 Z" fill="#F59E0B" />
    </svg>
  );
}

export function GonaSnack({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 70 96" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-snack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="90" rx="18" ry="4" fill="#111111" opacity="0.1" />
      <path
        d="M18 20 C18 12 52 12 52 20 L56 82 C56 88 14 88 14 82 Z"
        fill="url(#gt-snack)"
      />
      <path d="M20 34 H50" stroke="#FFF7ED" strokeWidth="6" opacity="0.55" />
      <circle cx="35" cy="54" r="10" fill="#FFD400" opacity="0.85" />
    </svg>
  );
}

export function GonaSpray({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-spray" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="90" rx="16" ry="4" fill="#111111" opacity="0.1" />
      <rect x="20" y="34" width="24" height="50" rx="8" fill="url(#gt-spray)" />
      <rect x="26" y="18" width="12" height="16" rx="3" fill="#A78BFA" />
      <rect x="28" y="12" width="8" height="8" rx="2" fill="#6D28D9" />
      <rect x="24" y="48" width="16" height="10" rx="3" fill="#FFFFFF" opacity="0.35" />
    </svg>
  );
}

export function GonaCareBottle({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 56 96" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gt-care" x1="20%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="90" rx="14" ry="4" fill="#111111" opacity="0.1" />
      <rect x="16" y="30" width="24" height="54" rx="10" fill="url(#gt-care)" />
      <rect x="20" y="18" width="16" height="14" rx="4" fill="#F472B6" />
      <rect x="22" y="12" width="12" height="8" rx="3" fill="#BE185D" />
      <ellipse cx="28" cy="52" rx="8" ry="10" fill="#FFFFFF" opacity="0.28" />
    </svg>
  );
}

export function CategoryObject({
  id,
  className,
}: {
  id: "produce" | "dairy" | "staples" | "snacks" | "household" | "personal";
  className?: string;
}) {
  switch (id) {
    case "produce":
      return <GonaTomato className={className} />;
    case "dairy":
      return <GonaMilk className={className} />;
    case "staples":
      return <GonaRicePack className={className} />;
    case "snacks":
      return <GonaSnack className={className} />;
    case "household":
      return <GonaSpray className={className} />;
    case "personal":
      return <GonaCareBottle className={className} />;
  }
}

export function ProductVisual({
  kind,
  className,
}: {
  kind: "produce" | "dairy" | "staple";
  className?: string;
}) {
  if (kind === "produce") {
    return (
      <div className={className}>
        <div className="relative flex h-full items-end justify-center overflow-hidden rounded-[1rem] bg-[linear-gradient(165deg,#ECFDF3,#FFF7ED)]">
          <GonaTomato className="mb-2 h-[72%] w-auto drop-shadow-[0_12px_20px_rgba(185,28,28,0.25)]" />
          <GonaLeaf className="absolute top-3 right-3 h-10 w-8 opacity-80" />
        </div>
      </div>
    );
  }
  if (kind === "dairy") {
    return (
      <div className={className}>
        <div className="relative flex h-full items-end justify-center overflow-hidden rounded-[1rem] bg-[linear-gradient(165deg,#F0F9FF,#ECFDF3)]">
          <GonaMilk className="mb-1 h-[78%] w-auto drop-shadow-[0_12px_20px_rgba(14,165,233,0.2)]" />
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className="relative flex h-full items-end justify-center overflow-hidden rounded-[1rem] bg-[linear-gradient(165deg,#FFFBEB,#ECFDF3)]">
        <GonaRicePack className="mb-1 h-[78%] w-auto drop-shadow-[0_12px_20px_rgba(180,83,9,0.2)]" />
      </div>
    </div>
  );
}
