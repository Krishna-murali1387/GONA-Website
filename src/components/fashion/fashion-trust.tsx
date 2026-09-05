import {
  fashionTokens,
  fashionTrust,
} from "@/components/fashion/fashion.content";

export function FashionTrust() {
  return (
    <section className="border-y border-stone-200 bg-[#FFFCFA] py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 sm:px-8 lg:px-10">
        <p
          className="text-[10px] font-semibold tracking-[0.28em] uppercase"
          style={{ color: fashionTokens.accent }}
        >
          Runway labels
        </p>
        {fashionTrust.map((label) => (
          <span
            key={label}
            className="text-xs font-medium tracking-[0.18em] text-stone-600 uppercase"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
