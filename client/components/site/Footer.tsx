import { SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t bg-white/50 dark:bg-background/60">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p className="opacity-80">Happy travels — call us for bookings and share your trip photos.</p>
      </div>
    </footer>
  );
}
