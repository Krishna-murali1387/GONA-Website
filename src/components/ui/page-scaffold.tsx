import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type PageScaffoldProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Temporary route scaffold for W1.
 * Replaced by full page compositions in later phases.
 */
export function PageScaffold({
  title,
  description,
  children,
  className,
}: PageScaffoldProps) {
  return (
    <div className={cn("flex flex-1 flex-col", className)}>
      <Container className="py-16 pt-28 md:py-24 md:pt-32">
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-gona-gray uppercase">
          GONA
        </p>
        <h1 className="max-w-3xl text-4xl md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg text-gona-gray">{description}</p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </div>
  );
}
