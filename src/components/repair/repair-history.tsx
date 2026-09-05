import {
  repairHistoryItems,
  repairTokens,
} from "@/components/repair/repair.content";
import { HistoryReceipt } from "@/components/repair/repair-visuals";

export function RepairHistory() {
  return (
    <section
      id="repair-history"
      className="relative overflow-hidden bg-[#FFF7ED] py-24"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <h2 className="font-display text-3xl leading-tight text-[#1C1917] md:text-4xl lg:text-[3rem]">
              Your repair,
              <span className="mt-1 block" style={{ color: repairTokens.deep }}>
                remembered.
              </span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-stone-700 md:text-lg">
              Past repair jobs can stay available in GONA — examples shown for
              illustration only.
            </p>
            <ul className="mt-6 space-y-2">
              {repairHistoryItems.map((item) => (
                <li
                  key={item.type}
                  className="flex items-baseline justify-between gap-3 border-b border-stone-300/60 py-2 text-sm"
                >
                  <span className="font-medium text-stone-900">{item.type}</span>
                  <span className="text-stone-500">{item.state}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-h-[220px] overflow-hidden md:min-h-[280px]">
            <HistoryReceipt className="h-full min-h-[220px] w-full md:min-h-[280px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
