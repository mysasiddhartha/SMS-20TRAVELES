import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";
import { CAR_IMAGE_URLS } from "@/config/seed-images";

export default function CarsCarousel() {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, align: "start", containScroll: "trimSnaps" });
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);

    const start = () => {
      stop();
      timerRef.current = window.setInterval(() => {
        if (!paused) embla.scrollNext();
      }, 3000);
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

  const images = CAR_IMAGE_URLS;

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden rounded-xl border bg-card shadow h-[36vh] sm:h-[44vh] md:h-[54vh]" ref={viewportRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <button key={i} type="button" className="relative basis-full shrink-0 grow-0" onClick={() => embla?.scrollNext()} aria-label="Next">
              <img src={src} alt={`Car ${i + 1}`} className="h-full w-full object-contain bg-black/5" />
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <button key={i} onClick={() => embla?.scrollTo(i)} className={(i === selectedIndex ? "bg-white" : "bg-white/60") + " h-1.5 w-3 rounded-full"} aria-label={`Go to car ${i + 1}`} />
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 hidden sm:flex items-center">
        <button onClick={() => embla?.scrollPrev()} className="m-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold shadow hover:bg-white" aria-label="Previous">Prev</button>
      </div>
      <div className="absolute inset-y-0 right-0 hidden sm:flex items-center">
        <button onClick={() => embla?.scrollNext()} className="m-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold shadow hover:bg-white" aria-label="Next">Next</button>
      </div>
    </div>
  );
}
