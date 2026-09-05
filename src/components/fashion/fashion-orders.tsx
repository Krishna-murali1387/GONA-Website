import { fashionTokens } from "@/components/fashion/fashion.content";
import { OrdersPaperArt } from "@/components/fashion/fashion-visuals";

export function FashionOrders() {
  return (
    <section className="bg-[#FAF7F2] py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-10">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: fashionTokens.accent }}
          >
            After checkout
          </p>
          <h2 className="mt-3 font-display text-4xl text-[#0F0A1A] md:text-5xl">
            After the checkout.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-stone-600">
            Review Fashion orders and, where eligible, follow the available
            return flow through GONA.
          </p>
          <ul className="mt-8 space-y-3 text-sm tracking-[0.14em] text-[#2E1065] uppercase">
            <li>Your orders</li>
            <li>Order details</li>
            <li>Eligible returns</li>
          </ul>
        </div>
        <div className="overflow-hidden border border-[#E9D5FF] bg-[#FFFCFA]">
          <OrdersPaperArt className="h-auto w-full min-h-[16rem]" />
        </div>
      </div>
    </section>
  );
}
