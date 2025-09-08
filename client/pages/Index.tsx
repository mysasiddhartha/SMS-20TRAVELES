import ImageGallery from "@/components/gallery/ImageGallery";

export default function Index() {
  const phone = "+1 (555) 555-5555";
  const tel = phone.replace(/[^+\d]/g, "");

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[hsl(var(--primary))]/10 via-fuchsia-200/30 to-indigo-200/30" />
        <div className="container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground shadow-sm">
                Simple site to share your photos
              </div>
              <h1 className="mt-4 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
                Showcase your pictures and make it easy to contact you
              </h1>
              <p className="mt-4 text-muted-foreground max-w-prose">
                Upload your favorite photos, organize them in a beautiful grid, and keep your phone number front and center so people can reach you instantly.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${tel}`}
                  className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                >
                  Call/Text {phone}
                </a>
                <a href="#gallery" className="inline-flex items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold hover:bg-muted">
                  Add Photos
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-card shadow">
                <div className="grid h-full w-full grid-cols-3 gap-1 p-1">
                  <div className="col-span-2 row-span-2 overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg"
                      alt="Gallery preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img src="/placeholder.svg" alt="Preview" className="h-full w-full object-cover" />
                  </div>
                  <div className="overflow-hidden rounded-lg">
                    <img src="/placeholder.svg" alt="Preview" className="h-full w-full object-cover" />
                  </div>
                </div>
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
