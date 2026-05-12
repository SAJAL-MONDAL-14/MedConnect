import type { Hospital } from "@/lib/mockData";
import { MapPin, Plus, Minus, Navigation } from "lucide-react";

export function MapPanel({ hospitals, selectedId }: { hospitals: Hospital[]; selectedId?: string }) {
  return (
    <div className="relative h-full min-h-[400px] map-bg rounded-lg border border-border overflow-hidden">
      {/* Faux roads */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,30 Q40,35 60,28 T100,32" stroke="oklch(0.85 0.01 200)" strokeWidth="0.6" fill="none" />
        <path d="M20,0 Q22,40 35,55 T50,100" stroke="oklch(0.85 0.01 200)" strokeWidth="0.6" fill="none" />
        <path d="M0,70 Q35,65 55,75 T100,72" stroke="oklch(0.85 0.01 200)" strokeWidth="0.6" fill="none" />
        <path d="M70,0 Q72,30 80,55 T85,100" stroke="oklch(0.85 0.01 200)" strokeWidth="0.6" fill="none" />
      </svg>

      {/* User location */}
      <div className="absolute" style={{ left: "48%", top: "52%" }}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
          <div className="absolute -inset-2 rounded-full bg-primary/10 animate-ping" />
        </div>
      </div>

      {/* Hospital pins */}
      {hospitals.map((h, i) => {
        const active = selectedId === h.id;
        return (
          <div key={h.id} className="absolute group" style={{ left: `${h.pin.x}%`, top: `${h.pin.y}%` }}>
            <div className="relative -translate-x-1/2 -translate-y-full cursor-pointer">
              <div className={`flex items-center justify-center rounded-full font-bold text-white transition-all ${
                active ? "h-9 w-9 bg-primary-dark ring-4 ring-primary/30 text-sm" : "h-7 w-7 bg-primary text-xs hover:scale-110"
              }`}>
                {i + 1}
              </div>
              <div className={`absolute left-1/2 -translate-x-1/2 mt-1 ${active ? "" : "opacity-0 group-hover:opacity-100"} transition pointer-events-none`}>
                <div className="bg-card shadow-elevated rounded-md px-2.5 py-1.5 text-xs whitespace-nowrap border border-border">
                  <div className="font-semibold">{h.name}</div>
                  <div className="text-success font-mono text-[10px]">ICU: {h.beds.icu === 0 ? "Full" : `${h.beds.icu} free`}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute right-3 top-3 flex flex-col gap-1 bg-card rounded-md shadow-card border border-border">
        <button className="p-2 hover:bg-muted rounded-t-md"><Plus className="h-4 w-4" /></button>
        <div className="border-t border-border" />
        <button className="p-2 hover:bg-muted rounded-b-md"><Minus className="h-4 w-4" /></button>
      </div>
      <button className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-2 text-xs font-medium shadow-card border border-border hover:bg-muted">
        <Navigation className="h-3.5 w-3.5" /> My location
      </button>
      <div className="absolute left-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-card/90 backdrop-blur px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground border border-border">
        <MapPin className="h-3 w-3" /> Map preview
      </div>
    </div>
  );
}
