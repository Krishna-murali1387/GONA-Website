import { groceryTrustItems } from "@/components/grocery/grocery.content";
import { Container } from "@/components/ui/container";

const ICONS = [
  // availability check
  <path
    key="a"
    d="M8 12.5 11 15.5 16.5 9"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  />,
  // location
  <path
    key="b"
    d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
    stroke="currentColor"
    strokeWidth="1.8"
    fill="none"
  />,
  // lock
  <>
    <rect
      key="c1"
      x="6.5"
      y="11"
      width="11"
      height="8.5"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
    />
    <path
      key="c2"
      d="M9 11V8.5a3 3 0 0 1 6 0V11"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
    />
  </>,
  // delivery
  <path
    key="d"
    d="M3 15h11V8H3v7Zm11 0h3.5L20 12h-6v3Zm-8 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
    stroke="currentColor"
    strokeWidth="1.6"
    fill="none"
    strokeLinejoin="round"
  />,
];

export function GroceryTrust() {
  return (
    <section className="border-y border-black/5 bg-gona-white py-9 md:py-11">
      <Container>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {groceryTrustItems.map((item, index) => (
            <li key={item.title} className="flex items-center gap-3">
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ECFDF3] text-[#16A34A] shadow-[0_8px_18px_rgba(34,197,94,0.08)] ring-1 ring-[#22C55E]/15"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="size-4">
                  {ICONS[index]}
                </svg>
              </span>
              <p className="font-display text-[0.95rem] leading-snug text-gona-black">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
