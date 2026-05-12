import type { Hospital } from "@/lib/mockData";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function BedChip({ label, count, total, type = "general" }: { label: string; count: number; total?: number; type?: "general" | "icu" | "ot" }) {
  let tone: "success" | "warning" | "emergency" = "success";
  if (count === 0) tone = "emergency";
  else if (type === "icu" && count <= 3) tone = "warning";

  const styles = {
    success: "bg-success-soft text-success border-success/20",
    warning: "bg-warning-soft text-warning border-warning/20",
    emergency: "bg-emergency-soft text-emergency border-emergency/20",
  }[tone];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}>
      <span className="font-mono">{label}: {count === 0 ? "Full" : `${count} free`}</span>
    </span>
  );
}

export function HospitalTypeBadge({ type }: { type: "Government" | "Private" }) {
  const styles =
    type === "Government"
      ? "bg-primary-soft text-primary"
      : "bg-accent text-accent-foreground border border-border";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles}`}>
      {type}
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-success text-xs font-medium">
      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
      Verified
    </span>
  );
}

export function StarRating({ rating, reviews, size = "sm" }: { rating: number; reviews?: number; size?: "sm" | "md" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${size === "md" ? "text-sm" : "text-xs"}`}>
      <span className="text-warning">★</span>
      <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-muted-foreground">({reviews})</span>}
    </span>
  );
}

export function LiveDot({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-success">
      <span className="live-dot" />
      {label}
    </span>
  );
}

export function UpdatedAgo({ minutes }: { minutes: number }) {
  const stale = minutes >= 15;
  return (
    <span className={`text-xs ${stale ? "text-warning" : "text-text-muted"}`}>
      Updated {minutes} min ago
    </span>
  );
}

export function HospitalCard({ hospital, index, onBook }: { hospital: Hospital; index?: number; onBook?: () => void }) {
  return (
    <div className="group relative bg-card border border-border rounded-lg p-5 hover:shadow-lift transition-all border-l-4 border-l-primary">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {index !== undefined && <span className="font-mono text-xs text-text-muted">#{index + 1}</span>}
          <h3 className="font-semibold text-[15px] text-foreground">{hospital.name}</h3>
          <HospitalTypeBadge type={hospital.type} />
          {hospital.verified && <VerifiedBadge />}
        </div>
        <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-mono text-muted-foreground">
          {hospital.distanceKm} km
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-2">{hospital.address}</p>

      {hospital.specialties.length > 0 && (
        <p className="text-xs text-text-muted mb-3 truncate">
          <span className="text-muted-foreground">Specialties:</span> {hospital.specialties.slice(0, 4).join(" · ")}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <BedChip label="General" count={hospital.beds.general} type="general" />
        <BedChip label="ICU" count={hospital.beds.icu} type="icu" />
        {hospital.beds.ot && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success-soft text-success border border-success/20 px-2.5 py-1 text-xs font-medium">
            <CheckCircle2 className="h-3 w-3" /> OT open
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <StarRating rating={hospital.rating} reviews={hospital.reviews} />
          <UpdatedAgo minutes={hospital.updatedMinAgo} />
        </div>
        <button
          onClick={onBook}
          className="inline-flex items-center gap-1 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-dark transition"
        >
          View & Book
        </button>
      </div>
    </div>
  );
}
