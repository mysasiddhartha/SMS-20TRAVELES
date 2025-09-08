import { Car, Bus, Bike } from "lucide-react";

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-md bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400 shadow"
      style={{ width: size, height: size }}
      aria-label="SMS TRAVELS logo"
    >
      <div className="relative text-white">
        <Car size={size * 0.5} className="absolute -left-2 -top-1 opacity-90" />
        <Bus size={size * 0.6} className="opacity-95" />
        <Bike
          size={size * 0.45}
          className="absolute -right-2 -bottom-1 opacity-80"
        />
      </div>
    </div>
  );
}
