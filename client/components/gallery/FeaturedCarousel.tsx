import { useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface StoredImage {
  id: string;
  dataUrl: string;
  name: string;
  createdAt: number;
  featured?: boolean;
}

export default function FeaturedCarousel() {
  const [allImages] = useLocalStorage<StoredImage[]>("gallery.images", []);
  const images = useMemo(() => (allImages || []).filter((i) => !!i.featured), [allImages]);

  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (!paused) {
          if (embla.canScrollNext()) embla.scrollNext();
          else embla.scrollTo(0);
        }
      }, 3500);
    };
    const stop = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    start();
    return stop;
  }, [embla, paused]);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-card shadow flex items-center justify-center text-sm text-muted-foreground">
        Mark some photos as “Featured” to see them scroll here.
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden rounded-2xl border bg-card shadow aspect-[4/3]" ref={viewportRef}>
        <div className="flex h-full">
          {images.map((img) => (
            <div key={img.id} className="relative min-w-full">
              <img src={img.dataUrl} alt={img.name} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          className="m-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold shadow hover:bg-white"
        >
          Prev
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          onClick={() => embla?.scrollNext()}
          className="m-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold shadow hover:bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
