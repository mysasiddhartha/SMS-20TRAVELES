import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { SITE, telHref } from "@/config/site";
import Logo from "./Logo";

export default function Header({ className }: { className?: string }) {
  const phone = SITE.phone;
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background/70",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="sr-only">{SITE.name}</span>
          {/* @ts-expect-error - ts can't infer default export type here */}
          <Logo />
          <span className="font-extrabold tracking-tight text-xl">
            {SITE.name}
          </span>
        </Link>
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href={telHref(phone)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {phone}
          </a>
          <a
            href={telHref(phone)}
            className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          >
            Call Now
          </a>
        </div>
      </div>
    </header>
  );
}
