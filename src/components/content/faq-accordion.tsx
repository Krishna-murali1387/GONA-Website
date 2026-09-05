"use client";

import { useId, useState } from "react";

import type { FaqCategory } from "@/config/faq.content";
import { cn } from "@/lib/cn";

type Props = {
  categories: FaqCategory[];
};

export function FaqAccordion({ categories }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(
    categories[0] ? `${categories[0].id}-0` : null,
  );
  const baseId = useId();

  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category.id} aria-labelledby={`${baseId}-${category.id}`}>
          <h2
            id={`${baseId}-${category.id}`}
            className="font-display text-2xl text-gona-black md:text-3xl"
          >
            {category.title}
          </h2>
          <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
            {category.items.map((item, index) => {
              const key = `${category.id}-${index}`;
              const open = openKey === key;
              const panelId = `${baseId}-panel-${key}`;
              const buttonId = `${baseId}-button-${key}`;

              return (
                <li key={key}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(open ? null : key)}
                      className="flex w-full items-start justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow"
                    >
                      <span className="font-display text-base text-gona-black md:text-lg">
                        {item.question}
                      </span>
                      <span
                        className={cn(
                          "mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                          open
                            ? "border-gona-black bg-gona-yellow text-gona-black"
                            : "border-black/15 text-gona-black",
                        )}
                        aria-hidden="true"
                      >
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-4"
                  >
                    <p className="max-w-3xl text-sm leading-relaxed text-gona-gray md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** @deprecated Use FaqAccordion */
export function FaqAccordionPlaceholder() {
  return null;
}
