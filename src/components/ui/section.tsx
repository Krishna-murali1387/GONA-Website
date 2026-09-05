import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  surface?: "white" | "light" | "dark";
};

export function Section({
  children,
  className,
  id,
  surface = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        surface === "dark" && "surface-dark",
        surface === "light" && "surface-light",
        surface === "white" && "surface-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
