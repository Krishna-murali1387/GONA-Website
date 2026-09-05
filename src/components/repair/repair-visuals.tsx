"use client";

/**
 * Repair visual primitives — dimensional AC, home environments, tool cues.
 * Primary human presence comes from /services/repair.webp (not cartoon SVG people).
 * Solid fills only; no shared paint-server IDs.
 */

import Image from "next/image";

import { repairTokens as T } from "@/components/repair/repair.content";
import { cn } from "@/lib/cn";

type ClassProps = { className?: string };

/** Substantial wall AC — physical product, not an outlined diagram */
export function DimensionalAc({
  state = "fault",
  className,
  large = false,
}: {
  state?: "fault" | "inspect" | "repair" | "fixed";
  className?: string;
  large?: boolean;
}) {
  const fault = state === "fault";
  const fixed = state === "fixed";
  const active = state === "repair" || state === "inspect";

  return (
    <div
      className={cn("relative", className)}
      style={{ width: large ? "100%" : undefined }}
      aria-hidden="true"
    >
      {/* Wall shadow */}
      <div
        className="absolute -inset-x-2 top-3 bottom-0 rounded-xl opacity-40 blur-md"
        style={{ background: "rgba(28,25,23,0.35)" }}
      />
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border-[3px]",
          large ? "aspect-[2.2/1] min-h-[140px] md:min-h-[200px]" : "aspect-[2.15/1]",
        )}
        style={{
          background: fixed || active ? "#F8FAFC" : "#FAFAF9",
          borderColor: T.charcoal,
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.85), 0 18px 36px rgba(28,25,23,0.18)",
        }}
      >
        {/* Top bevel */}
        <div
          className="absolute inset-x-0 top-0 h-[18%] border-b"
          style={{
            background: "linear-gradient(180deg,#FFFFFF 0%,#E7E5E4 100%)",
            borderColor: "rgba(28,25,23,0.15)",
          }}
        />
        {/* Display / intake */}
        <div
          className="absolute top-[22%] left-[6%] right-[18%] h-[38%] rounded-lg border"
          style={{
            background: fault
              ? "linear-gradient(180deg,#FED7AA 0%,#FDBA74 100%)"
              : fixed
                ? "linear-gradient(180deg,#E0F2FE 0%,#BAE6FD 100%)"
                : "linear-gradient(180deg,#FFEDD5 0%,#FED7AA 100%)",
            borderColor: T.charcoal,
            boxShadow: "inset 0 4px 10px rgba(28,25,23,0.12)",
          }}
        />
        {/* Louvers */}
        <div className="absolute right-[6%] bottom-[10%] left-[6%] flex flex-col gap-[5px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[3px] rounded-full"
              style={{
                background: fixed
                  ? T.cool
                  : fault
                    ? T.deep
                    : T.metal,
                opacity: fixed ? 0.95 : fault ? 0.55 : 0.75,
                transform: fixed ? `translateY(${i % 2}px)` : undefined,
              }}
            />
          ))}
        </div>
        {/* Status light */}
        <div
          className="absolute top-[28%] right-[7%] size-3 rounded-full border-2 md:size-3.5"
          style={{
            background: fault
              ? T.deep
              : fixed
                ? T.success
                : active
                  ? T.yellow
                  : T.accent,
            borderColor: T.charcoal,
            boxShadow: fault
              ? `0 0 12px ${T.deep}`
              : fixed
                ? `0 0 10px ${T.success}`
                : `0 0 10px ${T.accent}`,
          }}
        />
        {/* Service panel cue */}
        {(state === "inspect" || state === "repair") && (
          <div
            className="absolute top-[30%] left-[28%] h-[28%] w-[22%] rounded-md border-2"
            style={{
              background: T.soft,
              borderColor: T.charcoal,
              boxShadow: "inset 0 0 0 1px rgba(249,115,22,0.35)",
            }}
          />
        )}
        {fault && (
          <span
            className="absolute -top-7 left-2 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide text-white md:text-xs"
            style={{ background: T.deep }}
          >
            FAULT
          </span>
        )}
        {fixed && (
          <div
            className="pointer-events-none absolute inset-x-[8%] top-[48%] h-10 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(125,211,252,0.55), transparent 70%)",
            }}
          />
        )}
      </div>
    </div>
  );
}

/** Tool bag silhouette — secondary human/tool cue without cartoon body */
export function ToolBag({ className }: ClassProps) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      <ellipse cx="60" cy="82" rx="40" ry="6" fill={T.charcoal} opacity="0.15" />
      <path
        d="M18 38 H102 L96 78 H24 Z"
        fill={T.graphiteMid}
        stroke={T.charcoal}
        strokeWidth="3"
      />
      <path
        d="M36 38 V28 C36 18 48 12 60 12 C72 12 84 18 84 28 V38"
        fill="none"
        stroke={T.charcoal}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="48" y="48" width="24" height="10" rx="3" fill={T.accent} stroke={T.charcoal} strokeWidth="2" />
      <rect x="28" y="52" width="14" height="6" rx="2" fill={T.yellow} />
    </svg>
  );
}

/** Persistent home + AC + technician scene for transform / CTA */
export function HomeRepairScene({
  stage = 0,
  className,
  showQuote = true,
  approved = false,
  tone = "warm",
}: {
  stage?: number;
  className?: string;
  showQuote?: boolean;
  approved?: boolean;
  tone?: "warm" | "graphite" | "fixed";
}) {
  const fault = stage === 0;
  const inspect = stage === 1;
  const quote = stage === 2;
  const approval = stage === 3;
  const repair = stage === 4;
  const done = stage >= 5;

  const acState = done
    ? "fixed"
    : repair
      ? "repair"
      : inspect || quote || approval
        ? "inspect"
        : "fault";

  const onDark = tone === "graphite" || inspect || quote || approval;

  const objectPos = done
    ? "object-[76%_12%]"
    : repair
      ? "object-[74%_10%]"
      : inspect || quote || approval
        ? "object-[70%_16%]"
        : "object-[68%_18%]";

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden="true">
      <Image
        src="/services/repair.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 70vw"
        className={cn("object-cover", objectPos, repair && "scale-[1.06]")}
      />

      <div
        className="absolute inset-0"
        style={{
          background: onDark
            ? "linear-gradient(115deg, rgba(28,25,23,0.72) 0%, rgba(28,25,23,0.28) 48%, rgba(41,37,36,0.55) 100%)"
            : done
              ? "linear-gradient(115deg, rgba(250,248,245,0.2) 0%, transparent 42%, rgba(22,163,74,0.1) 100%)"
              : "linear-gradient(115deg, rgba(28,25,23,0.18) 0%, transparent 52%, rgba(249,115,22,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-[12%]"
        style={{
          background: "linear-gradient(90deg, rgba(28,25,23,0.45), transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[10%]"
        style={{
          background: "linear-gradient(270deg, rgba(28,25,23,0.4), transparent)",
        }}
      />

      <div className="absolute top-[10%] left-[3%] z-10 w-[38%] max-w-[320px] md:left-[4%] md:w-[34%]">
        <DimensionalAc state={acState} large />
        {fault && (
          <div
            className="mt-2 h-1.5 w-16 rounded-full"
            style={{ background: T.deep, boxShadow: `0 0 12px ${T.deep}` }}
          />
        )}
        {repair && (
          <div
            className="pointer-events-none absolute -inset-5 rounded-3xl opacity-55"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${T.accent}77, transparent 68%)`,
            }}
          />
        )}
      </div>

      {inspect && (
        <div className="absolute top-[38%] left-[36%] z-20 md:left-[34%]" aria-hidden="true">
          <svg viewBox="0 0 80 48" className="h-12 w-20 drop-shadow-lg md:h-14 md:w-24">
            <rect x="4" y="18" width="52" height="12" rx="3" fill={T.graphiteMid} stroke={T.charcoal} strokeWidth="2" />
            <rect x="48" y="10" width="26" height="28" rx="4" fill={T.accent} stroke={T.charcoal} strokeWidth="2" />
            <circle cx="61" cy="24" r="5" fill={T.yellow} />
          </svg>
          <div
            className="mt-1 h-16 w-16 rounded-full border-2 opacity-70 md:h-20 md:w-20"
            style={{
              borderColor: T.accent,
              boxShadow: `0 0 24px ${T.accent}66`,
            }}
          />
        </div>
      )}

      {repair && (
        <div className="absolute top-[42%] left-[34%] z-20 md:left-[32%]" aria-hidden="true">
          <svg viewBox="0 0 64 72" className="h-16 w-14 drop-shadow-xl md:h-20 md:w-16">
            <rect x="8" y="8" width="40" height="56" rx="4" fill={T.soft} stroke={T.charcoal} strokeWidth="2.5" />
            <rect x="14" y="16" width="28" height="18" rx="2" fill={T.accent} opacity="0.85" />
            <path d="M28 40 V62" stroke={T.graphiteMid} strokeWidth="6" strokeLinecap="round" />
            <rect x="20" y="58" width="16" height="8" rx="2" fill={T.yellow} stroke={T.charcoal} strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {approval && (
        <div
          className="absolute bottom-[18%] left-[38%] z-20 rounded-full border-2 px-3 py-1.5 text-[10px] font-bold tracking-wide md:text-xs"
          style={{
            background: T.warmWhite,
            borderColor: T.charcoal,
            color: T.charcoal,
          }}
          aria-hidden="true"
        >
          WAITING FOR APPROVAL
        </div>
      )}

      {showQuote && (quote || approval) && (
        <div
          className="absolute top-[12%] right-[4%] z-20 w-[38%] max-w-[260px] rounded-xl border-2 p-3 shadow-2xl md:p-4"
          style={{
            background: T.warmWhite,
            borderColor: T.charcoal,
          }}
        >
          <p
            className="text-[10px] font-bold tracking-[0.14em] uppercase md:text-xs"
            style={{ color: T.accent }}
          >
            Quotation
          </p>
          <p className="mt-2 text-xs font-semibold text-stone-800 md:text-sm">
            Inspection complete
          </p>
          <p className="mt-1 text-[11px] text-stone-600 md:text-xs">
            Repair quotation
          </p>
          <p className="mt-1 text-[11px] font-medium text-stone-700 md:text-xs">
            Your approval required
          </p>
          <div
            className="mt-3 rounded-full px-3 py-1.5 text-center text-[11px] font-bold md:text-xs"
            style={{
              background: approved || approval ? T.yellow : T.soft,
              color: T.charcoal,
              border: `2px solid ${T.charcoal}`,
            }}
          >
            {approved || approval ? "Approve Repair" : "Review quote"}
          </div>
          <p className="mt-2 text-[9px] text-stone-500">Example · not a live quote</p>
        </div>
      )}

      {done && (
        <div
          className="absolute top-[12%] right-[6%] z-20 flex items-center gap-2 rounded-full px-3 py-2 md:px-4"
          style={{ background: T.charcoal }}
        >
          <span
            className="flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: T.success }}
          >
            ✓
          </span>
          <span className="text-[10px] font-bold tracking-wide text-white md:text-xs">
            REPAIR COMPLETED
          </span>
        </div>
      )}

      {fault && (
        <div className="absolute bottom-[10%] left-[42%] z-10 w-16 md:w-24">
          <ToolBag className="h-auto w-full drop-shadow-lg" />
        </div>
      )}

      <div
        className="absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase md:bottom-4 md:left-4 md:text-xs"
        style={{
          background: "rgba(28,25,23,0.88)",
          color: done ? "#86EFAC" : T.accent,
        }}
      >
        {fault
          ? "ISSUE"
          : inspect
            ? "INSPECTION"
            : quote
              ? "QUOTATION"
              : approval
                ? "YOUR APPROVAL"
                : repair
                  ? "REPAIR"
                  : "COMPLETION"}
      </div>
    </div>
  );
}

/** Recognizable category symbols — solid, labeled via parent */
export function CategorySymbols({
  id,
  active = false,
}: {
  id: string;
  active?: boolean;
}) {
  const stroke = T.charcoal;
  const accent = active ? T.accent : T.graphiteMid;

  if (id === "ac") {
    return (
      <svg viewBox="0 0 140 90" className="h-full w-full" aria-hidden="true">
        <rect x="8" y="18" width="124" height="54" rx="8" fill="#FAFAF9" stroke={stroke} strokeWidth="3" />
        <rect x="18" y="28" width="88" height="22" rx="4" fill={active ? "#FED7AA" : "#E0F2FE"} stroke={stroke} strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M20 ${58 + i * 5} H118`} stroke={active ? T.deep : T.cool} strokeWidth="2.5" strokeLinecap="round" />
        ))}
        <circle cx="120" cy="32" r="5" fill={active ? T.deep : T.success} stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (id === "electrical") {
    return (
      <svg viewBox="0 0 100 110" className="h-full w-full" aria-hidden="true">
        <rect x="22" y="8" width="56" height="78" rx="8" fill="#FAF8F5" stroke={stroke} strokeWidth="3" />
        <rect x="34" y="24" width="14" height="22" rx="3" fill={accent} stroke={stroke} strokeWidth="2" />
        <rect x="52" y="24" width="14" height="22" rx="3" fill={accent} stroke={stroke} strokeWidth="2" />
        <circle cx="50" cy="64" r="8" fill={active ? T.yellow : T.soft} stroke={stroke} strokeWidth="2" />
        <path d="M50 86 V102" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "appliances") {
    return (
      <svg viewBox="0 0 90 120" className="h-full w-full" aria-hidden="true">
        <rect x="10" y="6" width="70" height="108" rx="8" fill="#F8FAFC" stroke={stroke} strokeWidth="3" />
        <rect x="28" y="14" width="34" height="8" rx="2" fill={T.graphiteMid} />
        <circle cx="45" cy="62" r="28" fill={active ? "#FFEDD5" : "#E7E5E4"} stroke={stroke} strokeWidth="3" />
        <circle cx="45" cy="62" r="12" fill={active ? T.accent : T.metal} stroke={stroke} strokeWidth="2" />
      </svg>
    );
  }

  if (id === "plumbing") {
    return (
      <svg viewBox="0 0 110 100" className="h-full w-full" aria-hidden="true">
        <path d="M28 48 H82 V68 H62 V88 H48 V68 H28 Z" fill="#F5F5F4" stroke={stroke} strokeWidth="3" />
        <path d="M55 18 V48" stroke={T.metal} strokeWidth="8" strokeLinecap="round" />
        <path d="M55 18 H82" stroke={T.metal} strokeWidth="8" strokeLinecap="round" />
        <circle cx="88" cy="18" r="12" fill={active ? T.cool : "#BAE6FD"} stroke={stroke} strokeWidth="2.5" />
        <path d="M88 30 V42" stroke={T.cool} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  // home maintenance — toolbox (not abstract house)
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" aria-hidden="true">
      <path d="M18 34 H102 L96 78 H24 Z" fill={accent} stroke={stroke} strokeWidth="3" />
      <path
        d="M38 34 V24 C38 16 48 12 60 12 C72 12 82 16 82 24 V34"
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="48" y="46" width="24" height="10" rx="2" fill={T.yellow} stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

/** Balanced Now / Schedule visual — modest door, large calendar */
export function TimingEnvironment({
  mode,
  className,
}: {
  mode: "now" | "schedule";
  className?: string;
}) {
  const now = mode === "now";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: now
          ? "linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 40%,#E7E5E4 100%)"
          : "linear-gradient(135deg,#FAF8F5 0%,#E7E5E4 100%)",
      }}
      aria-hidden="true"
    >
      {now ? (
        <>
          {/* Modest doorway */}
          <div
            className="absolute bottom-[10%] left-[10%] h-[58%] w-[18%] max-w-[100px] rounded-t-md border-[3px]"
            style={{ background: "#44403C", borderColor: T.charcoal }}
          >
            <div
              className="absolute top-1/2 right-2 size-2.5 -translate-y-1/2 rounded-full"
              style={{ background: T.accent }}
            />
          </div>
          <div className="absolute bottom-[12%] left-[36%] w-24 md:w-28">
            <ToolBag className="h-auto w-full drop-shadow-lg" />
          </div>
          <div
            className="absolute top-[14%] right-[12%] rounded-full px-4 py-2 text-xs font-bold tracking-wide text-white md:text-sm"
            style={{ background: T.accent }}
          >
            READY
          </div>
          <div className="absolute inset-y-[12%] right-0 w-[42%] opacity-90">
            <Image
              src="/services/repair.webp"
              alt=""
              fill
              sizes="40vw"
              className="object-cover"
              style={{ objectPosition: "82% 20%" }}
            />
            <div className="absolute inset-y-0 left-0 w-[40%] bg-[linear-gradient(90deg,#FFEDD5,transparent)]" />
          </div>
        </>
      ) : (
        <>
          {/* Subtle home context */}
          <div
            className="absolute bottom-[8%] left-[6%] h-[42%] w-[12%] max-w-[70px] rounded-t-md border-2 opacity-40"
            style={{ background: "#78716C", borderColor: T.charcoal }}
          />
          {/* Large calendar */}
          <div
            className="absolute top-1/2 left-1/2 w-[72%] max-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-[3px] p-4 shadow-lg md:p-5"
            style={{ background: T.warmWhite, borderColor: T.charcoal }}
          >
            <div
              className="mb-3 flex items-center justify-between rounded-md px-3 py-2"
              style={{ background: T.accent }}
            >
              <span className="text-xs font-bold text-white md:text-sm">Schedule</span>
              <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill={T.charcoal} />
                <circle cx="12" cy="12" r="7" fill={T.yellow} />
                <path d="M12 7 V12 L15 14" fill="none" stroke={T.charcoal} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="grid grid-cols-7 gap-1.5 md:gap-2">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm border"
                  style={{
                    background: i === 11 ? T.yellow : T.concrete,
                    borderColor: T.charcoal,
                    boxShadow: i === 11 ? `0 0 0 2px ${T.accent}` : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Compact verification handoff */
export function VerifyScene({ className }: ClassProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center gap-4 overflow-hidden p-6 md:gap-8 md:p-10", className)}
      style={{
        background: "linear-gradient(135deg,#FAF8F5 0%,#E7E5E4 100%)",
      }}
      aria-hidden="true"
    >
      <div
        className="w-[40%] max-w-[200px] rounded-xl border-[3px] p-4"
        style={{ background: T.warmWhite, borderColor: T.accent }}
      >
        <p className="text-xs font-bold text-stone-800">Start verified</p>
        <div
          className="mt-3 rounded-md px-3 py-2 text-center font-mono text-lg tracking-[0.35em]"
          style={{ background: T.soft, color: T.charcoal }}
        >
          ••••
        </div>
        <p className="mt-2 text-[10px] text-stone-500">Arrival / start</p>
      </div>
      <div
        className="hidden h-0.5 w-10 md:block"
        style={{ background: T.accent }}
      />
      <div
        className="w-[40%] max-w-[200px] rounded-xl border-[3px] p-4"
        style={{ background: T.warmWhite, borderColor: T.charcoal }}
      >
        <p className="text-xs font-bold text-stone-800">Completion</p>
        <div className="mt-3 flex justify-center">
          <span
            className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: T.success }}
          >
            ✓
          </span>
        </div>
        <p className="mt-2 text-[10px] text-stone-500">Verified</p>
      </div>
    </div>
  );
}

/** Compact history receipt artifact */
export function HistoryReceipt({ className }: ClassProps) {
  return (
    <div
      className={cn("relative overflow-hidden p-5 md:p-8", className)}
      style={{
        background: "linear-gradient(160deg,#FFF7ED 0%,#FAF8F5 100%)",
      }}
      aria-hidden="true"
    >
      <div
        className="mx-auto max-w-sm rounded-xl border-[3px] p-5"
        style={{ background: T.warmWhite, borderColor: T.charcoal }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-stone-900">AC service</p>
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
            style={{ background: T.yellow, color: T.charcoal }}
          >
            Completed
          </span>
        </div>
        <div className="mt-4 h-px bg-stone-200" />
        <p className="mt-3 text-xs text-stone-500">Date · abstract</p>
        <div className="mt-1 h-2 w-24 rounded-full bg-stone-200" />
        <p className="mt-4 text-xs font-medium text-stone-700">
          Inspection · Quote approved · Verified
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: T.success }}
          />
          <span className="text-[11px] font-semibold text-stone-600">
            Completion verified
          </span>
        </div>
      </div>
    </div>
  );
}
