import { groceryTrustItems } from "@/components/grocery/grocery.content";

/** Compact editorial trust strip — no cards, no giant icons. */
export function GroceryTrust() {
  return (
    <section className="border-y border-black/6 bg-white py-5 md:py-6">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-wrap md:items-center md:justify-between md:gap-4">
          {groceryTrustItems.map((item, index) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.8rem] tracking-[0.02em] text-[#666666] md:text-[0.85rem]"
            >
              {index > 0 ? (
                <span
                  className="hidden h-3 w-px bg-black/10 md:mr-2 md:inline-block"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className="size-1 shrink-0 rounded-full bg-[#22C55E]"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
