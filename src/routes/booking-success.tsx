import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2, MapPin, Phone, Bell } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/booking-success")({
  head: () => ({ meta: [{ title: "Booking confirmed — MedConnect" }] }),
  component: BookingSuccess,
});

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-6 w-11 rounded-full transition ${on ? "bg-success" : "bg-muted"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function BookingSuccess() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="bg-success-soft border-b border-success/30">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-success" />
          <div>
            <div className="font-semibold text-success">Booking confirmed!</div>
            <div className="text-xs text-success/80">WhatsApp confirmation sent · <span className="font-mono font-semibold">#MED-8824</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 rounded-full bg-success-soft flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.8} />
          </div>
          <h1 className="mt-4 text-2xl font-semibold">You're all set</h1>
          <p className="text-sm text-muted-foreground mt-1">See you on Friday — arrive 15 minutes early.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="rounded-xl bg-card border border-border overflow-hidden shadow-card">
            <div className="bg-primary text-primary-foreground px-6 py-5">
              <div className="text-xs uppercase tracking-wider opacity-80 font-mono">Booking #MED-8824</div>
              <div className="mt-1 text-lg font-bold">Dr. Rajesh Sharma</div>
              <div className="text-xs opacity-80">Cardiologist · North Bengal Medical College</div>
            </div>
            <div className="divide-y divide-border">
              {[
                { label: "Date", value: "Friday, 2 May 2025" },
                { label: "Time", value: "10:00 AM" },
                { label: "Fee", value: "₹500 at clinic" },
                { label: "Room", value: "OPD Block, Room 4" },
                { label: "Patient note", value: "Chest pain for 2 days", muted: true },
              ].map((row) => (
                <div key={row.label} className="flex justify-between px-6 py-3.5 text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={row.muted ? "text-muted-foreground italic" : "font-medium font-mono"}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 bg-secondary border-t border-border">
              <a className="rounded-lg bg-primary-soft p-4 text-center hover:shadow-card transition cursor-pointer">
                <MapPin className="mx-auto h-6 w-6 text-primary mb-1" strokeWidth={1.5} />
                <div className="text-sm font-semibold text-primary">Navigate</div>
                <div className="text-[10px] text-muted-foreground">Open Google Maps</div>
              </a>
              <a className="rounded-lg bg-success-soft p-4 text-center hover:shadow-card transition cursor-pointer">
                <Phone className="mx-auto h-6 w-6 text-success mb-1" strokeWidth={1.5} />
                <div className="text-sm font-semibold text-success">Call hospital</div>
                <div className="text-[10px] text-muted-foreground font-mono">+91 353 256 5000</div>
              </a>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl bg-card border border-border p-5">
              <h3 className="font-semibold inline-flex items-center gap-2 mb-3"><Bell className="h-4 w-4" /> Remind me</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>1 hour before</span>
                  <Toggle initial />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>1 day before</span>
                  <Toggle />
                </div>
              </div>
            </div>
            <Link to="/profile" className="block text-center rounded-md border border-border bg-card py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition">
              View all bookings
            </Link>
            <button className="block w-full text-center text-xs text-text-muted hover:text-emergency">
              Cancel booking
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
