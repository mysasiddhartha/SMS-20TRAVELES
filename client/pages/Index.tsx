import ImageGallery from "@/components/gallery/ImageGallery";
import FeaturedCarousel from "@/components/gallery/FeaturedCarousel";
import CarsCarousel from "@/components/cars/CarsCarousel";
import { SITE, telHref } from "@/config/site";
import { useEffect } from "react";
import { SEED_IMAGE_URLS } from "@/config/seed-images";

export default function Index() {
  const phone = SITE.phone;
  const tel = telHref(phone);

  useEffect(() => {
    try {
      const key = "gallery.images";
      const raw = localStorage.getItem(key);
      const current: any[] = raw ? JSON.parse(raw) : [];
      const existingUrls = new Set(current.map((i: any) => i.dataUrl));
      const toAdd = SEED_IMAGE_URLS.filter((u) => !existingUrls.has(u)).map((url) => ({
        id: crypto.randomUUID(),
        dataUrl: url,
        name: url.split("/").pop() || "image",
        createdAt: Date.now(),
        featured: true,
      }));
      if (toAdd.length) localStorage.setItem(key, JSON.stringify([...toAdd, ...current]));
    } catch {}
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--primary))]/15 via-rose-200/40 to-amber-200/40" />
        <div className="container py-10 md:py-14">
          <div className="relative">
            <div className="w-full">
              <div className="aspect-[16/9] sm:aspect-[21/9] w-full">
                <FeaturedCarousel />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-4 -z-10 h-28 w-28 rounded-xl bg-gradient-to-br from-fuchsia-400 to-indigo-400 opacity-30 blur-2xl" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12 items-start">
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
                <a href="#cars" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">
                  View Cars
                </a>
              </div>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Airport transfers</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Outstation round trips</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />Local city tours</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />24/7 support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="cars" className="container py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Cars</h2>
            <p className="mt-2 text-muted-foreground max-w-prose">Browse car images. Use Next/Prev or tap the banner to move.</p>
          </div>
        </div>
        <div className="mt-6">
          {/* @ts-expect-error default export */}
          <CarsCarousel />
        </div>
      </section>

      <div id="gallery">
        <ImageGallery />
      </div>
    </div>
  );
}
