import { useCallback, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";

interface StoredImage {
  id: string;
  dataUrl: string;
  name: string;
  createdAt: number;
}

function readFiles(files: FileList | File[]): Promise<StoredImage[]> {
  const arr = Array.from(files);
  return Promise.all(
    arr.filter((f) => f.type.startsWith("image/")).map(
      (file) =>
        new Promise<StoredImage>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              id: crypto.randomUUID(),
              dataUrl: String(reader.result),
              name: file.name,
              createdAt: Date.now(),
            });
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    ),
  );
}

export default function ImageGallery() {
  const [images, setImages] = useLocalStorage<StoredImage[]>("gallery.images", []);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFiles = useCallback(async (files: FileList | File[]) => {
    const newImgs = await readFiles(files);
    setImages((prev) => [...newImgs, ...prev]);
  }, [setImages]);

  const onDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await onFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [onFiles]);

  const remove = (id: string) => setImages((prev) => prev.filter((i) => i.id !== id));

  return (
    <section className="container py-14">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Your Photos</h2>
          <p className="mt-2 text-muted-foreground max-w-prose">Add images below. Your photos are saved in your browser so you can come back later.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          >
            Add Photos
          </button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && onFiles(e.target.files)}
          />
        </div>
      </div>

      <div
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
        onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
        onDrop={onDrop}
        className={cn(
          "mt-6 rounded-xl border-2 border-dashed p-6 transition-colors",
          dragActive ? "border-[hsl(var(--ring))] bg-muted/30" : "border-border",
        )}
      >
        <p className="text-center text-sm text-muted-foreground">Drag and drop images here, or click "Add Photos"</p>
      </div>

      {images.length > 0 ? (
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <li key={img.id} className="group relative overflow-hidden rounded-xl border bg-card">
              <img src={img.dataUrl} alt={img.name} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => remove(img.id)}
                  className="rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-foreground shadow hover:bg-white"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-center text-sm text-muted-foreground">No photos yet. Add some to get started.</p>
      )}
    </section>
  );
}
