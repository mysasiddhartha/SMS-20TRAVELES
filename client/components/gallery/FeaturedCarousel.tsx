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

const DEFAULT_IMAGES: StoredImage[] = [
  {
    id: "att-1",
    dataUrl: "https://cdn.builder.io/api/v1/image/assets%2F8ee80c2176264463ba10e7ae7fa5e693%2Fe28306c5520444ba9e6aab69183d6d84?format=webp&width=800",
    name: "SMS Travels Poster 1",
    createdAt: 0,
    featured: true,
  },
  {
    id: "att-2",
    dataUrl: "https://cdn.builder.io/api/v1/image/assets%2F8ee80c2176264463ba10e7ae7fa5e693%2F18b5f7f446274470a24ad696a65f902c?format=webp&width=800",
    name: "SMS Travels Poster 2",
    createdAt: 0,
    featured: true,
  },
  {
    id: "att-3",
    dataUrl: "https://cdn.builder.io/api/v1/image/assets%2F8ee80c2176264463ba10e7ae7fa5e693%2Ff57ab17ae367460595acde0e133821e9?format=webp&width=800",
    name: "Office Photo 1",
    createdAt: 0,
    featured: true,
  },
  {
    id: "att-4",
    dataUrl: "https://cdn.builder.io/api/v1/image/assets%2F8ee80c2176264463ba10e7ae7fa5e693%2F82e44ce945f74525b2ed3abae4500b81?format=webp&width=800",
    name: "Office Photo 2",
    createdAt: 0,
    featured: true,
  },
];

export default function FeaturedCarousel() {
  const [allImages] = useLocalStorage<StoredImage[]>("gallery.images", []);
  const images = useMemo(() => {
    const list = (allImages || []);
    if (list.length === 0) return DEFAULT_IMAGES;
    const featured = list.filter((i) => !!i.featured);
    return featured.length > 0 ? featured : list;
  }, [allImages]);

  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start", containScroll: "trimSnaps" });
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    setSlideCount(embla.scrollSnapList().length);
    embla.on("select", onSelect);

    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (!paused) {
          if (embla.canScrollNext()) embla.scrollNext();
          else embla.scrollTo(0);
        }
      }, 2800);
    };
    const stop = () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    start();
    return () => {
      stop();
      embla.off("select", onSelect);
    };
  }, [embla, paused]);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-card shadow flex items-center justify-center text-sm text-muted-foreground">
        Upload photos below. Click on the image or dots to scroll. Mark any as “Featured” to highlight.
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden rounded-2xl border bg-card shadow h-[42vh] sm:h-[50vh] md:h-[60vh]" ref={viewportRef}>
        <div className="flex h-full">
          {images.map((img) => (
            <button
              key={img.id}
              className="relative basis-full shrink-0 grow-0"
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Next slide"
            >
              <img src={img.dataUrl} alt={img.name} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            className={(i === selectedIndex ? "bg-white" : "bg-white/60") + " h-1.5 w-3 rounded-full transition-colors"}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 hidden sm:flex items-center">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          className="m-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold shadow hover:bg-white"
        >
          Prev
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 hidden sm:flex items-center">
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
