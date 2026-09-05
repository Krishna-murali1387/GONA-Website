import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

type GonaLogoProps = {
  className?: string;
  /** Show wordmark next to the mark */
  withWordmark?: boolean;
  /** Dark surfaces use white wordmark */
  onDark?: boolean;
  size?: number;
  priority?: boolean;
};

export function GonaLogo({
  className,
  withWordmark = true,
  onDark = false,
  size = 40,
  priority = false,
}: GonaLogoProps) {
  return (
    <Link
      href={siteConfig.routes.home}
      className={cn(
        "inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gona-yellow",
        className,
      )}
      aria-label={`${siteConfig.brand.name} home`}
    >
      <Image
        src={siteConfig.assets.logo}
        alt={siteConfig.assets.logoAlt}
        width={size}
        height={size}
        priority={priority}
        className="rounded-[22%] shadow-sm"
      />
      {withWordmark ? (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-[0.08em]",
            onDark ? "text-gona-white" : "text-gona-black",
          )}
        >
          {siteConfig.brand.wordmark}
        </span>
      ) : null}
    </Link>
  );
}
