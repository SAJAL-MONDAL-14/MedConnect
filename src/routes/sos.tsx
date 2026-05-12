import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Siren, MapPin, CheckCircle2, Navigation, Phone, MessageCircle, X } from "lucide-react";

export const Route = createFileRoute("/sos")({
  head: () => ({ meta: [{ title: "SOS — Emergency · MedConnect" }] }),
  component: SOSPage,
});

type State = "locating" | "results" | "confirmed";

const sosHospitals = [
  {
    id: "nbmc", name: "North Bengal Medical College", address: "Hill Cart Road, Siliguri",
    eta: 8, etaTone: "success", icu: 3, general: 12, recommended: true,
  },
  {
    id: "citymed", name: "CityMed Multispeciality", address: "Sevoke More, Siliguri",
    eta: 14, etaTone: "warning", icu: 4, general: 18, recommended: false,
  },
  {
    id: "siliguri-dh", name: "Siliguri District Hospital", address: "Sevoke Road, Siliguri",
    eta: 19, etaTone: "muted", icu: 0, general: 5, recommended: false,
  },
];

function SOSPage() {
  const [state, setState] = useState<State>("locating");

  useEffect(() => {
    const t = setTimeout(() => setState("results"), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: state === "confirmed" ? "var(--gradient-success)" : "var(--gradient-emergency)" }}>
      <Link to="/" className="absolute top-4 right-4 text-white/60 hover:text-white text-xs inline-flex items-center gap-1 z-50">
        <X className="h-4 w-4" /> Exit
      </Link>

      {state === "locating" && <LocatingState />}
      {state === "results" && <ResultsState onReserve={() => setState("confirmed")} />}
      {state === "confirmed" && <ConfirmedState />}
    </div>
  );
}

function LocatingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white px-6">
      <div className="text-[10px] uppercase tracking-[0.2em] text-emergency-foreground/70 mb-12">Emergency mode active</div>
      <div className="relative h-32 w-32 sos-pulse rounded-full bg-emergency flex items-center justify-center">
        <Siren className="h-12 w-12 relative z-10" strokeWidth={2} />
      </div>
      <div className="mt-12 text-lg">Detecting your location...</div>
      <div className="mt-3 inline-flex items-center gap-2 text-sm text-success">
        <span className="live-dot" /> GPS signal found
      </div>
    </div>
  );
}

function ResultsState({ onReserve }: { onReserve: () => void }) {
  return (
    <div className="min-h-screen text-white">
      {/* Top bar */}
      <div className="bg-emergency-dark/80 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-emergency-foreground/70">Emergency mode</div>
            <div className="text-base font-bold">SOS — Finding ICU beds</div>
          </div>
          <div className="relative h-10 w-10 sos-pulse rounded-full bg-emergency flex items-center justify-center">
            <Siren className="h-5 w-5 relative z-10" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-5 pb-3 flex items-center gap-2 text-xs text-white/70">
          <span className="live-dot" />
          <span>GPS located · Siliguri WB · Ranked by drive time, not distance</span>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto px-5 py-6 space-y-3">
        {sosHospitals.map((h) => {
          const recommended = h.recommended;
          const dimmed = h.icu === 0;
          return (
            <div
              key={h.id}
              className={`rounded-2xl p-5 border-2 transition ${
                recommended
                  ? "bg-emergency-dark/60 border-success shadow-[0_0_0_4px_oklch(0.58_0.13_162/0.12)]"
                  : dimmed
                  ? "bg-emergency-dark/30 border-white/10 opacity-60"
                  : "bg-emergency-dark/40 border-white/15"
              }`}
            >
              {recommended && (
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-success mb-2">
                  Recommended · Fastest
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-base">{h.name}</h3>
                  <p className="text-xs text-white/60 mt-0.5">{h.address}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-mono font-semibold ${
                      h.icu === 0 ? "bg-emergency/30 text-emergency-foreground" : "bg-success/20 text-success"
                    }`}>
                      ICU: {h.icu === 0 ? "Full" : `${h.icu} free`}
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-mono">Gen: {h.general}</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">24hr ER</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-3xl font-bold ${
                    h.etaTone === "success" ? "text-success" : h.etaTone === "warning" ? "text-warning" : "text-white/40"
                  }`}>
                    {h.eta} min
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">ETA</div>
                </div>
              </div>
              <button
                onClick={recommended ? onReserve : undefined}
                disabled={dimmed}
                className={`mt-4 w-full rounded-lg py-2.5 text-sm font-bold transition ${
                  recommended
                    ? "bg-success text-success-foreground hover:opacity-90"
                    : dimmed
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "border border-white/30 text-white hover:bg-white/5"
                }`}
              >
                {dimmed ? "ICU full — see other options" : recommended ? "Reserve ICU bed now" : "Select this hospital"}
              </button>
            </div>
          );
        })}

        <div className="text-center pt-6">
          <Link to="/" className="text-xs text-white/40 hover:text-white/70">
            Cancel emergency · requires 3 taps
          </Link>
        </div>
      </div>
    </div>
  );
}

function ConfirmedState() {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-2xl mx-auto px-5 py-12 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-success/20 border-4 border-success flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Bed reserved</h1>
        <p className="mt-2 text-white/70">North Bengal Medical College · ICU Room 3</p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-success/15 border border-success/30 px-3 py-1.5 text-sm text-success">
          <span className="live-dot" /> ER team alerted · ETA 8 min
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-success/15 border border-success/30 p-4 text-left">
            <CheckCircle2 className="h-5 w-5 text-success mb-2" />
            <div className="font-semibold">ER Alerted</div>
            <div className="text-xs text-white/60 mt-0.5">Dr. on standby</div>
          </div>
          <div className="rounded-xl bg-success/15 border border-success/30 p-4 text-left">
            <CheckCircle2 className="h-5 w-5 text-success mb-2" />
            <div className="font-semibold">Bed Held</div>
            <div className="text-xs text-white/60 mt-0.5">For next 30 min</div>
          </div>
          <button className="rounded-xl bg-white/10 border border-white/20 p-4 text-left hover:bg-white/15 transition">
            <Phone className="h-5 w-5 text-white mb-2" />
            <div className="font-semibold">Call Hospital</div>
            <div className="text-xs text-white/60 mt-0.5 font-mono">+91 353 256 5100</div>
          </button>
          <button className="rounded-xl bg-white/10 border border-white/20 p-4 text-left hover:bg-white/15 transition">
            <Navigation className="h-5 w-5 text-white mb-2" />
            <div className="font-semibold">Navigate</div>
            <div className="text-xs text-white/60 mt-0.5">Open Google Maps</div>
          </button>
        </div>

        <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="inline-flex items-center gap-2 text-xs text-white/70 mb-3">
            <MessageCircle className="h-4 w-4 text-success" /> Contacts notified via WhatsApp
          </div>
          <div className="flex flex-wrap gap-2">
            {["Sanjana (Wife)", "Anil (Father)", "Dr. Mehta"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <Link to="/" className="mt-8 inline-block text-xs text-white/40 hover:text-white/70">
          Return to home
        </Link>
      </div>
    </div>
  );
}
