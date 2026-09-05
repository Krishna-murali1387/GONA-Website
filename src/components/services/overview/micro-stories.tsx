"use client";

import { motion } from "framer-motion";

import {
  AnimatedRoute,
  BaseCue,
  DestinationPulse,
  fadeTransition,
  SpinWheel,
  storyEase,
  StoryShell,
  Traveler,
} from "@/components/services/overview/micro-story-primitives";

export type MicroStoryProps = {
  active: boolean;
  reduce: boolean;
  mobileStatic: boolean;
};

const groceryRoute = "M 58 62 C 110 62, 150 38, 210 48";

export function GroceryMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const spin = active && !reduce && !mobileStatic;

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#ECFDF3"
    >
      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <rect x="8" y="36" width="40" height="34" rx="3" fill="#166534" />
        <rect x="14" y="44" width="12" height="14" rx="1.5" fill="#BBF7D0" />
        <rect x="30" y="44" width="12" height="14" rx="1.5" fill="#BBF7D0" />
        <path d="M8 36 L28 22 L48 36" stroke="#15803D" strokeWidth="2.5" fill="#22C55E" />
        <rect x="24" y="54" width="8" height="16" fill="#14532D" />
      </BaseCue>

      <AnimatedRoute
        d={groceryRoute}
        color="#16A34A"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />

      {/* Travel ~165 viewBox units ≈ 150–190px across card */}
      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={165}
      >
        <g transform="translate(48 40)">
          {spin ? (
            <motion.path
              d="M -14 18 H 2"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
          <ellipse cx="18" cy="22" rx="20" ry="5" fill="#166534" opacity="0.22" />
          <path
            d="M 2 16 L 28 16 L 34 10 H 22 L 16 16"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="5" r="5" fill="#1C1917" />
          <path d="M 10 10 L 10 16 L 18 16" stroke="#1C1917" strokeWidth="2.2" />
          <path d="M 10 12 H 17" stroke="#1C1917" strokeWidth="2" />
          <rect x="24" y="7" width="10" height="7" rx="1.5" fill="#15803D" />
          <SpinWheel cx={8} cy={22} r={6.5} color="#22C55E" spinning={spin} />
          <SpinWheel cx={30} cy={22} r={6.5} color="#22C55E" spinning={spin} />
        </g>
      </Traveler>

      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <path d="M 228 58 L 244 40 L 260 58 V 76 H 228 Z" fill="#166534" />
        <rect x="238" y="60" width="10" height="16" fill="#ECFDF3" />
      </BaseCue>
      <DestinationPulse
        cx={244}
        cy={34}
        color="#22C55E"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />
    </StoryShell>
  );
}

export function HealthcareMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const walk = active && !reduce && !mobileStatic;

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#EFF6FF"
    >
      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <rect x="10" y="32" width="32" height="38" rx="3" fill="#1D4ED8" />
        <path d="M 20 46 H 32 M 26 40 V 52" stroke="#BFDBFE" strokeWidth="3" />
        <rect x="20" y="54" width="12" height="16" fill="#1E3A8A" />
      </BaseCue>

      <AnimatedRoute
        d="M 54 66 C 110 66, 150 42, 208 52"
        color="#3B82F6"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />

      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={155}
      >
        <g transform="translate(50 34)">
          <circle cx="14" cy="8" r="6" fill="#1E3A8A" />
          <rect x="8" y="14" width="12" height="18" rx="2" fill="#3B82F6" />
          <motion.g
            animate={walk ? { rotate: [-20, 20, -20] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "8px 16px" }}
          >
            <path d="M 8 16 L 0 26" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={walk ? { rotate: [20, -20, 20] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "20px 16px" }}
          >
            <path d="M 20 16 L 28 26" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={walk ? { rotate: [16, -16, 16] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "11px 32px" }}
          >
            <path d="M 11 32 L 8 44" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={walk ? { rotate: [-16, 16, -16] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "17px 32px" }}
          >
            <path d="M 17 32 L 20 44" stroke="#1E3A8A" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <rect x="22" y="18" width="9" height="7" rx="1.5" fill="#93C5FD" />
        </g>
      </Traveler>

      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <path d="M 226 58 L 242 40 L 258 58 V 76 H 226 Z" fill="#1D4ED8" />
        <rect x="236" y="60" width="10" height="16" fill="#EFF6FF" />
      </BaseCue>
      <DestinationPulse
        cx={242}
        cy={34}
        color="#3B82F6"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />
    </StoryShell>
  );
}

export function RepairMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const walk = active && !reduce && !mobileStatic;

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#FFF7ED"
    >
      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <rect x="8" y="36" width="34" height="32" rx="3" fill="#C2410C" />
        <rect x="14" y="44" width="10" height="12" rx="1.5" fill="#FFEDD5" />
        <rect x="28" y="44" width="8" height="24" fill="#9A3412" />
      </BaseCue>

      <AnimatedRoute
        d="M 52 66 C 108 62, 148 44, 204 54"
        color="#F97316"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />

      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={150}
      >
        <g transform="translate(48 34)">
          <circle cx="14" cy="8" r="6" fill="#9A3412" />
          <rect x="8" y="14" width="12" height="16" rx="2" fill="#F97316" />
          <motion.rect
            x="22"
            y="18"
            width="11"
            height="8"
            rx="1.5"
            fill="#C2410C"
            animate={walk ? { y: [18, 16.5, 18] } : { y: 18 }}
            transition={
              walk
                ? { duration: 0.48, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
          />
          <motion.g
            animate={walk ? { rotate: [12, -12, 12] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "11px 30px" }}
          >
            <path d="M 11 30 L 8 44" stroke="#9A3412" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={walk ? { rotate: [-12, 12, -12] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "17px 30px" }}
          >
            <path d="M 17 30 L 20 44" stroke="#9A3412" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        </g>
      </Traveler>

      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <path d="M 224 58 L 240 40 L 256 58 V 76 H 224 Z" fill="#C2410C" />
        <rect x="234" y="60" width="10" height="16" fill="#FFF7ED" />
      </BaseCue>

      <motion.g
        initial={false}
        animate={{
          opacity: active || mobileStatic || reduce ? 1 : 0.45,
          rotate: active && !reduce && !mobileStatic ? [0, -28, 0] : 0,
        }}
        transition={
          reduce || mobileStatic
            ? { duration: 0.2 }
            : { duration: 0.5, delay: active ? 1.2 : 0, ease: storyEase }
        }
        style={{ transformOrigin: "262px 36px" }}
      >
        <path
          d="M 254 32 L 268 26 L 272 34 L 260 42 Z"
          fill="#F97316"
          stroke="#C2410C"
          strokeWidth="1.5"
        />
        <rect x="258" y="40" width="4" height="12" rx="1" fill="#9A3412" />
      </motion.g>
    </StoryShell>
  );
}

export function VehicleMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const drive = active && !reduce && !mobileStatic;

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#EEF2FF"
    >
      <AnimatedRoute
        d="M 20 70 H 250"
        color="#6366F1"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />
      <motion.g
        initial={false}
        animate={{ opacity: active || mobileStatic || reduce ? 0.4 : 0.25 }}
        transition={fadeTransition}
      >
        <path d="M 20 76 H 250" stroke="#A5B4FC" strokeWidth="8" strokeLinecap="round" />
      </motion.g>

      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={170}
      >
        <motion.g
          transform="translate(28 38)"
          animate={drive ? { y: [0, -1.5, 0, -1, 0] } : { y: 0 }}
          transition={
            drive
              ? { duration: 1.25, delay: 0.22, ease: "easeInOut" }
              : { duration: 0.15 }
          }
        >
          <path
            d="M 4 26 L 10 12 H 38 L 50 26 H 4 Z"
            fill="#6366F1"
            stroke="#4338CA"
            strokeWidth="1.5"
          />
          <path d="M 14 12 L 20 4 H 32 L 38 12" fill="#A5B4FC" />
          <rect x="16" y="14" width="10" height="8" rx="1" fill="#EEF2FF" />
          <rect x="30" y="14" width="8" height="8" rx="1" fill="#EEF2FF" />
          <SpinWheel cx={14} cy={28} r={6} color="#818CF8" spinning={drive} />
          <SpinWheel cx={40} cy={28} r={6} color="#818CF8" spinning={drive} />
        </motion.g>
      </Traveler>

      <DestinationPulse
        cx={248}
        cy={52}
        color="#6366F1"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />
      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <path d="M 238 66 L 248 52 L 258 66 Z" fill="#4338CA" />
      </BaseCue>
    </StoryShell>
  );
}

export function FashionMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#F5F3FF"
    >
      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <rect x="10" y="26" width="36" height="42" rx="3" fill="#6B21A8" />
        <path d="M 18 34 V 58 M 28 34 V 58 M 38 34 V 58" stroke="#E9D5FF" strokeWidth="2" />
        <path d="M 16 38 H 22 M 26 42 H 32 M 36 46 H 42" stroke="#C084FC" strokeWidth="2.5" />
      </BaseCue>

      <AnimatedRoute
        d="M 58 52 C 110 22, 160 72, 214 44"
        color="#A855F7"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />

      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={150}
      >
        <motion.g
          transform="translate(56 28)"
          animate={
            active && !reduce && !mobileStatic
              ? { rotate: [-5, 5, -2, 0] }
              : { rotate: 0 }
          }
          transition={
            active && !reduce && !mobileStatic
              ? { duration: 1.25, delay: 0.22, ease: storyEase }
              : { duration: 0.2 }
          }
          style={{ transformOrigin: "14px 24px" }}
        >
          <path
            d="M 4 10 H 24 L 28 40 H 0 Z"
            fill="#A855F7"
            stroke="#7E22CE"
            strokeWidth="1.5"
          />
          <path d="M 8 10 C 8 0, 20 0, 20 10" stroke="#7E22CE" strokeWidth="2" fill="none" />
          <path d="M 10 18 H 20" stroke="#E9D5FF" strokeWidth="1.5" />
        </motion.g>
      </Traveler>

      <BaseCue active={active} reduce={reduce} mobileStatic={mobileStatic}>
        <circle cx="246" cy="50" r="14" fill="#6B21A8" />
        <circle cx="246" cy="44" r="6" fill="#F5F3FF" />
        <path d="M 232 60 H 260" stroke="#E9D5FF" strokeWidth="2.5" />
      </BaseCue>
      <DestinationPulse
        cx={246}
        cy={28}
        color="#A855F7"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        delay={1.15}
      />
    </StoryShell>
  );
}

export function FarmingMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const walk = active && !reduce && !mobileStatic;
  const grow = true; // field always faintly present

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="#F7FEE7"
    >
      <AnimatedRoute
        d="M 40 66 C 100 66, 140 48, 188 56"
        color="#65A30D"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
      />

      <Traveler
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        fromX={0}
        toX={140}
      >
        <g transform="translate(32 34)">
          <circle cx="14" cy="8" r="6" fill="#3F6212" />
          <rect x="8" y="14" width="12" height="16" rx="2" fill="#65A30D" />
          <path d="M 4 20 H 10" stroke="#3F6212" strokeWidth="2.2" />
          <motion.g
            animate={walk ? { rotate: [14, -14, 14] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "11px 30px" }}
          >
            <path d="M 11 30 L 8 44" stroke="#3F6212" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
          <motion.g
            animate={walk ? { rotate: [-14, 14, -14] } : { rotate: 0 }}
            transition={
              walk
                ? { duration: 0.42, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.15 }
            }
            style={{ transformOrigin: "17px 30px" }}
          >
            <path d="M 17 30 L 20 44" stroke="#3F6212" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        </g>
      </Traveler>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.path
          key={i}
          d={`M ${198 + i * 10} 72 Q ${201 + i * 10} 44 ${204 + i * 10} 72`}
          stroke="#65A30D"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={false}
          animate={{
            opacity: grow ? (active || mobileStatic || reduce ? 1 : 0.45) : 0,
            pathLength: 1,
            y: active && !reduce && !mobileStatic ? [3, 0, 2, 0] : 0,
          }}
          transition={
            reduce || mobileStatic
              ? { duration: 0.25 }
              : {
                  opacity: { duration: 0.3, delay: active ? 0.65 + i * 0.05 : 0 },
                  y: {
                    duration: 1.2,
                    delay: active ? 0.8 : 0,
                    ease: "easeInOut",
                  },
                }
          }
        />
      ))}
      <DestinationPulse
        cx={228}
        cy={36}
        color="#65A30D"
        active={active}
        reduce={reduce}
        mobileStatic={mobileStatic}
        delay={1.2}
      />
    </StoryShell>
  );
}

export function LocalMicroStory({
  active,
  reduce,
  mobileStatic,
}: MicroStoryProps) {
  const alive = active || mobileStatic || reduce;
  const seq = active && !reduce && !mobileStatic;

  return (
    <StoryShell
      active={active}
      reduce={reduce}
      mobileStatic={mobileStatic}
      softBg="rgba(15,159,148,0.18)"
      className="max-w-[19rem]"
    >
      <path d="M 16 72 H 264" stroke="#0F9F94" strokeWidth="1.5" opacity="0.45" />
      <path d="M 32 72 V 48 H 56 V 72" fill="#0B7A72" opacity="0.55" />
      <path d="M 64 72 V 42 L 78 34 L 92 42 V 72" fill="#0B7A72" opacity="0.5" />
      <rect x="130" y="44" width="30" height="22" rx="2" fill="#0B7A72" opacity="0.5" />
      <ellipse cx="200" cy="64" rx="24" ry="10" fill="#0B7A72" opacity="0.4" />

      <motion.path
        d="M 56 60 H 130 M 92 42 V 24 M 160 56 H 200"
        stroke="#5BC4BC"
        strokeWidth="1.75"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1, opacity: alive ? 0.85 : 0.35 }}
        transition={
          reduce || mobileStatic
            ? { duration: 0.2 }
            : { duration: 0.45, delay: seq ? 0.06 : 0, ease: storyEase }
        }
      />

      <motion.rect
        x="38"
        y="52"
        width="10"
        height="8"
        fill="#FFD400"
        initial={false}
        animate={{ opacity: alive ? 1 : 0.35 }}
        transition={{ duration: 0.25, delay: seq ? 0.25 : 0 }}
      />

      <motion.circle
        cx="92"
        cy="22"
        r="6"
        fill="#FFD400"
        initial={false}
        animate={{ opacity: alive ? 1 : 0.4, scale: alive ? 1 : 0.85 }}
        transition={{ duration: 0.3, delay: seq ? 0.45 : 0, ease: storyEase }}
        style={{ transformOrigin: "92px 22px" }}
      />
      {seq ? (
        <motion.circle
          cx="92"
          cy="22"
          r="6"
          stroke="#FFD400"
          strokeWidth="1.25"
          fill="none"
          initial={{ scale: 1, opacity: 0.65 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          style={{ transformOrigin: "92px 22px" }}
        />
      ) : null}

      <motion.circle
        cx="144"
        cy="52"
        r="7"
        fill="#0F9F94"
        initial={false}
        animate={{ opacity: alive ? 1 : 0.4 }}
        transition={{ duration: 0.25, delay: seq ? 0.7 : 0 }}
      />

      <motion.ellipse
        cx="200"
        cy="64"
        rx="20"
        ry="8"
        stroke="#FFD400"
        strokeWidth="1.75"
        fill="none"
        initial={false}
        animate={{ opacity: alive ? 0.95 : 0.35, scale: alive ? 1 : 0.9 }}
        transition={{ duration: 0.3, delay: seq ? 0.92 : 0, ease: storyEase }}
        style={{ transformOrigin: "200px 64px" }}
      />

      <motion.rect
        x="226"
        y="34"
        width="26"
        height="12"
        rx="2"
        fill="#FFD400"
        initial={false}
        animate={{ opacity: alive ? 0.95 : 0.35, y: alive ? 34 : 38 }}
        transition={{ duration: 0.3, delay: seq ? 1.12 : 0, ease: storyEase }}
      />

      <motion.path
        d="M 92 28 L 144 50 L 200 62 L 226 42"
        stroke="#FFD400"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: alive ? 1 : 0.4, opacity: alive ? 0.65 : 0.25 }}
        transition={
          reduce || mobileStatic
            ? { duration: 0.2 }
            : { duration: 0.45, delay: seq ? 1.22 : 0, ease: storyEase }
        }
      />
    </StoryShell>
  );
}
