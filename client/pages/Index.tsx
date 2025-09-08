import ImageGallery from "@/components/gallery/ImageGallery";
import { SITE, telHref } from "@/config/site";

export default function Index() {
  const phone = SITE.phone;
  const tel = telHref(phone);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--primary))]/10 via-fuchsia-200/30 to-indigo-200/30" />
        <div className="container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow-sm">
                Reliable travel partner
              </div>
              <h1 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                {SITE.name}: Tours, cabs and trips made easy
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose">
                Book outstation rides, airport transfers, and custom tours with comfort vehicles and friendly drivers. Add trip photos below to share your journeys.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={tel}
                  className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                >
                  Call/Text {phone}
                </a>
                <a href="#gallery" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">
                  Add Trip Photos
                </a>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Airport transfers</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Outstation round trips</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Local city tours</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />24/7 support</li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full">
                {/* Scrolling carousel of featured images */}
                <FeaturedCarousel />
              </div>
              <div className="absolute -bottom-4 -left-4 -z-10 h-28 w-28 rounded-xl bg-gradient-to-br from-fuchsia-400 to-indigo-400 opacity-30 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <div id="gallery">
        <ImageGallery />
      </div>
    </div>
  );
}
