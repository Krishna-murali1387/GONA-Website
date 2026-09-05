"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, type ComponentType } from "react";

import {
  IconBread,
  IconHomeCare,
  IconMilk,
  IconRice,
  IconSnack,
  IconTomato,
} from "@/components/grocery/grocery-bag-products";
import { groceryTokens } from "@/components/grocery/grocery.content";
import { siteConfig } from "@/config/site.config";

type IconComponent = ComponentType<{ className?: string }>;

type ProductSpec = {
  id: string;
  Icon: IconComponent;
  start: { x: number; y: number };
  mid: { x: number; y: number };
  rotate: [number, number];
  appear: [number, number];
  travel: [number, number];
  pack: [number, number];
  size: number;
  mobile: boolean;
  mobileStart: { x: number; y: number };
};

const PRODUCTS: ProductSpec[] = [
  {
    id: "tomato",
    Icon: IconTomato,
    start: { x: -260, y: -150 },
    mid: { x: -100, y: -80 },
    rotate: [-6, 4],
    appear: [0.1, 0.18],
    travel: [0.2, 0.55],
    pack: [0.52, 0.7],
    size: 58,
    mobile: true,
    mobileStart: { x: -78, y: -62 },
  },
  {
    id: "milk",
    Icon: IconMilk,
    start: { x: 250, y: -140 },
    mid: { x: 95, y: -75 },
    rotate: [5, -3],
    appear: [0.11, 0.19],
    travel: [0.24, 0.58],
    pack: [0.55, 0.73],
    size: 54,
    mobile: true,
    mobileStart: { x: 76, y: -56 },
  },
  {
    id: "rice",
    Icon: IconRice,
    start: { x: -280, y: 24 },
    mid: { x: -110, y: -8 },
    rotate: [-4, 6],
    appear: [0.12, 0.2],
    travel: [0.28, 0.62],
    pack: [0.58, 0.76],
    size: 56,
    mobile: true,
    mobileStart: { x: -84, y: 10 },
  },
  {
    id: "bread",
    Icon: IconBread,
    start: { x: 270, y: 34 },
    mid: { x: 105, y: -4 },
    rotate: [7, -5],
    appear: [0.13, 0.21],
    travel: [0.3, 0.64],
    pack: [0.6, 0.78],
    size: 62,
    mobile: true,
    mobileStart: { x: 82, y: 14 },
  },
  {
    id: "snack",
    Icon: IconSnack,
    start: { x: -230, y: 130 },
    mid: { x: -80, y: 36 },
    rotate: [-5, 3],
    appear: [0.14, 0.22],
    travel: [0.34, 0.68],
    pack: [0.64, 0.82],
    size: 52,
    mobile: true,
    mobileStart: { x: -44, y: 58 },
  },
  {
    id: "care",
    Icon: IconHomeCare,
    start: { x: 240, y: 140 },
    mid: { x: 85, y: 40 },
    rotate: [6, -4],
    appear: [0.15, 0.23],
    travel: [0.36, 0.7],
    pack: [0.66, 0.84],
    size: 54,
    mobile: false,
    mobileStart: { x: 46, y: 60 },
  },
];

const MOBILE_PRODUCTS = PRODUCTS.filter((p) => p.mobile);

/**
 * 04 — Selection → GONA bag
 * Premium product objects travel into a layered paper bag (illustrative).
 */
export function GroceryBag() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start 0.85", "end 0.35"],
  });

  /** Bag settles early and stays fully visible — never fades during pack. */
  const bagScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    reduce ? [1, 1, 1, 1] : [0.97, 1, 1.025, 1.015],
  );
  const bagOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    reduce ? [1, 1] : [0.94, 1],
  );
  const bagGlow = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    reduce ? [0.22, 0.22] : [0.14, 0.42],
  );
  const completeOpacity = useTransform(
    scrollYProgress,
    [0.78, 0.9],
    reduce ? [1, 1] : [0, 1],
  );
  const bridgeOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    reduce ? [0, 0] : [0, 1],
  );

  const mobileBagScale = useTransform(
    mobileProgress,
    [0.4, 0.85],
    reduce ? [1, 1] : [0.98, 1.02],
  );
  const mobileComplete = useTransform(
    mobileProgress,
    [0.7, 0.9],
    reduce ? [1, 1] : [0, 1],
  );

  return (
    <section
      ref={ref}
      data-grocery-chapter="bag"
      className="relative bg-[#FFFEF9]"
    >
      <div ref={mobileRef} className="px-5 py-16 lg:hidden">
        <p
          className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
          style={{ color: groceryTokens.leaf }}
        >
          04 / Bag
        </p>
        <h2 className="mt-3 font-display text-3xl text-gona-black">
          Picked.
          <span className="mt-1 block text-[#16A34A]">Packed into one run.</span>
        </h2>

        <div className="relative mx-auto mt-12 flex h-[24rem] max-w-sm items-center justify-center overflow-hidden">
          <motion.div
            style={{ scale: mobileBagScale }}
            className="relative shrink-0"
          >
            <GonaPaperBag
              progress={mobileProgress}
              reduce={!!reduce}
              products={MOBILE_PRODUCTS}
              mode="mobile"
            />
          </motion.div>
        </div>

        <motion.p
          className="mt-6 text-center text-[0.7rem] font-semibold tracking-[0.22em] text-gona-black uppercase"
          style={{ opacity: mobileComplete }}
        >
          One bag · One checkout · One GONA run
        </motion.p>
      </div>

      <div className="relative hidden lg:block">
        <div className="h-[200vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="relative mx-auto w-full max-w-[1280px] px-8 lg:px-14">
              <div className="absolute top-16 left-8 lg:left-14">
                <p
                  className="text-[0.7rem] font-semibold tracking-[0.26em] uppercase"
                  style={{ color: groceryTokens.leaf }}
                >
                  04 / Bag
                </p>
                <h2 className="mt-3 font-display text-4xl text-gona-black xl:text-5xl">
                  Picked.
                  <span className="mt-1 block text-[#16A34A]">
                    Packed into one run.
                  </span>
                </h2>
              </div>

              <div className="relative mx-auto flex h-[70vh] max-h-[36rem] items-center justify-center lg:justify-end lg:pr-8 xl:pr-16">
                <motion.div
                  style={{ scale: bagScale, opacity: bagOpacity }}
                  className="relative shrink-0"
                >
                  <motion.div
                    className="absolute -inset-14 rounded-full bg-[#22C55E]/18 blur-3xl"
                    style={{ opacity: bagGlow }}
                    aria-hidden="true"
                  />
                  <GonaPaperBag
                    progress={scrollYProgress}
                    reduce={!!reduce}
                    products={PRODUCTS}
                    mode="desktop"
                  />
                </motion.div>
              </div>

              <motion.div
                className="absolute right-8 bottom-16 text-right lg:right-14"
                style={{ opacity: completeOpacity }}
              >
                <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-gona-black uppercase">
                  One bag
                </p>
                <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.24em] text-gona-black uppercase">
                  One checkout
                </p>
                <p
                  className="mt-1 text-[0.7rem] font-semibold tracking-[0.24em] uppercase"
                  style={{ color: groceryTokens.leaf }}
                >
                  One GONA run
                </p>
              </motion.div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,#052E16)]"
              style={{ opacity: bridgeOpacity }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GonaPaperBag({
  progress,
  reduce,
  products,
  mode,
}: {
  progress: MotionValue<number>;
  reduce: boolean;
  products: ProductSpec[];
  mode: "desktop" | "mobile";
}) {
  /**
   * Explicit width + height required: all bag layers are absolute.
   * Without a height, the relative wrapper collapses to 0 and the bag vanishes.
   * Desktop 340×420px · Mobile 256×320px
   */
  const shell =
    mode === "desktop"
      ? "relative h-[26.25rem] w-[21.25rem] shrink-0"
      : "relative h-[20rem] w-[16rem] shrink-0";

  return (
    <div className={shell} aria-hidden="true">
      <div className="absolute -top-4 left-1/2 z-[25] flex w-[68%] -translate-x-1/2 justify-between px-2">
        <span className="h-11 w-2 rounded-full bg-[#D6D3C8] shadow-sm" />
        <span className="h-11 w-2 rounded-full bg-[#D6D3C8] shadow-sm" />
      </div>

      {/* z1 BACK / dark inner opening */}
      <div className="absolute inset-0 z-[1] overflow-hidden rounded-b-[1.35rem] rounded-t-[0.45rem] border border-[#C9C3B4] bg-[linear-gradient(180deg,#D4CDBB_0%,#C4BCA8_40%,#B7AE99_100%)] shadow-[0_32px_60px_rgba(20,83,45,0.14)]">
        <div className="absolute inset-x-3 top-3 h-12 rounded-sm bg-[#2F2A22]/28" />
        {reduce ? <PeekingProducts /> : null}
      </div>

      {/* z5 PRODUCTS between back and front */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-visible">
        {products.map((product, index) => (
          <FlyingProduct
            key={product.id}
            product={product}
            index={index}
            progress={progress}
            reduce={reduce}
            mode={mode}
          />
        ))}
      </div>

      {/* z15 FRONT face — products pack behind this */}
      <div className="absolute inset-x-0 top-[14%] bottom-0 z-[15] overflow-hidden rounded-b-[1.35rem] border border-[#D6D3C8] border-t-[#E8E2D4] bg-[linear-gradient(165deg,#F8F5EC_0%,#EFE8D8_55%,#E7DFCE_100%)]">
        <div className="absolute inset-x-0 top-0 h-3 bg-[#E4DCC8]" />
        <div className="flex flex-col items-center px-6 pt-10 pb-9">
          <Image
            src={siteConfig.assets.logo}
            alt=""
            width={mode === "desktop" ? 44 : 36}
            height={mode === "desktop" ? 44 : 36}
            className="rounded-[22%]"
          />
          <p
            className={`mt-3 font-display tracking-[0.18em] text-gona-black uppercase ${
              mode === "desktop" ? "text-xl" : "text-lg"
            }`}
          >
            GONA
          </p>
          <div
            className="mt-3 h-0.5 w-12 rounded-full"
            style={{ backgroundColor: groceryTokens.yellow }}
          />
          <p className="mt-5 text-[0.7rem] font-semibold tracking-[0.2em] text-[#666666] uppercase">
            Grocery bag
          </p>
        </div>
        <div className="pointer-events-none absolute inset-y-4 left-0 w-3.5 bg-black/[0.035]" />
        <div className="pointer-events-none absolute inset-y-4 right-0 w-3.5 bg-black/[0.035]" />
      </div>

      {/* z20 rim */}
      <div className="absolute inset-x-[5%] top-[12.5%] z-[20] h-2.5 rounded-full bg-[#EDE7D8] shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function PeekingProducts() {
  return (
    <div className="absolute inset-x-4 top-3 flex justify-center gap-1 opacity-80">
      <span className="h-5 w-5 overflow-hidden">
        <IconTomato className="h-full w-full translate-y-1" />
      </span>
      <span className="h-6 w-5 overflow-hidden">
        <IconMilk className="h-full w-full translate-y-2" />
      </span>
      <span className="h-5 w-6 overflow-hidden">
        <IconBread className="h-full w-full translate-y-1.5" />
      </span>
    </div>
  );
}

function FlyingProduct({
  product,
  index,
  progress,
  reduce,
  mode,
}: {
  product: ProductSpec;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
  mode: "desktop" | "mobile";
}) {
  const Icon = product.Icon;
  const start = mode === "mobile" ? product.mobileStart : product.start;
  const mid =
    mode === "mobile"
      ? { x: start.x * 0.35, y: start.y * 0.25 - 8 }
      : product.mid;
  const end = { x: 0, y: mode === "mobile" ? 36 : 48 };

  const appear: [number, number] =
    mode === "mobile" ? [0.1, 0.22] : product.appear;
  const travel: [number, number] =
    mode === "mobile"
      ? [0.22 + index * 0.08, 0.58 + index * 0.06]
      : product.travel;
  const pack: [number, number] =
    mode === "mobile"
      ? [travel[1] - 0.08, Math.min(0.95, travel[1] + 0.12)]
      : product.pack;

  const midT = (travel[0] + travel[1]) / 2;

  const x = useTransform(
    progress,
    [travel[0], midT, travel[1]],
    reduce ? [0, 0, 0] : [start.x, mid.x, end.x],
  );
  const y = useTransform(
    progress,
    [travel[0], midT, travel[1]],
    reduce ? [18, 18, 18] : [start.y, mid.y, end.y],
  );
  const rotate = useTransform(
    progress,
    [travel[0], travel[1]],
    reduce ? [0, 0] : product.rotate,
  );
  const scale = useTransform(
    progress,
    [appear[0], appear[1], travel[0], pack[0], pack[1]],
    reduce ? [0.55, 0.55, 0.55, 0.55, 0.45] : [0.82, 1, 1, 0.72, 0.45],
  );
  const opacity = useTransform(
    progress,
    [appear[0], appear[1], pack[0], pack[1]],
    reduce ? [0, 0, 0, 0] : [0, 1, 1, 0],
  );

  if (reduce) return null;

  return (
    <motion.div
      className="absolute top-[16%] left-1/2"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
        width: product.size,
        height: product.size,
        marginLeft: -product.size / 2,
        marginTop: -product.size / 2,
      }}
    >
      <div className="h-full w-full drop-shadow-[0_8px_16px_rgba(15,23,42,0.14)]">
        <Icon className="h-full w-full" />
      </div>
    </motion.div>
  );
}
