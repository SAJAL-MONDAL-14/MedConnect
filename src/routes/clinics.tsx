import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { clinicDoctors } from "@/lib/mockData";
import { Search, Star, Clock, MapPin, Building, Filter } from "lucide-react";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "Individual Doctor Clinics — MedConnect" },
      { name: "description", content: "Find independent doctors running their own clinics. Book appointments directly." },
    ],
  }),
  component: ClinicsPage,
});

const SPECIALTIES = ["All", "Dermatologist", "Gynecologist", "Dentist", "Pediatrician", "Physiotherapist", "ENT Specialist"];

function ClinicsPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("All");

  const list = useMemo(() => {
    return clinicDoctors.filter((d) => {
      const matchQ =
        !q.trim() ||
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.specialty.toLowerCase().includes(q.toLowerCase()) ||
        d.clinicName.toLowerCase().includes(q.toLowerCase());
      const matchS = spec === "All" || d.specialty === spec;
      return matchQ && matchS;
    });
  }, [q, spec]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar active="clinics" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 py-14 text-white">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 mb-4">
            <Building className="h-3.5 w-3.5" />
            {clinicDoctors.length} verified independent clinics
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Individual doctor clinics
          </h1>
          <p className="mt-3 text-white/80 max-w-xl">
            Personal care from independent specialists running their own practice.
            Book directly — no hospital queues.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by doctor, specialty or clinic name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-foreground border border-white/30 outline-none text-sm shadow-lg"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 backdrop-blur border border-white/20 text-sm font-medium text-white hover:bg-white/25 transition">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>
      </section>

      {/* Specialty pills */}
      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => setSpec(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                spec === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <section className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{list.length}</span> clinics found
          </p>
          <Link to="/clinic/login" className="text-xs text-primary hover:underline font-medium">
            Are you a clinic doctor? Login →
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No clinics match your search.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((d) => {
              const bg =
                d.avatarColor === "primary" ? "bg-primary"
                : d.avatarColor === "success" ? "bg-success"
                : d.avatarColor === "warning" ? "bg-warning" : "bg-emergency";
              return (
                <div key={d.id} className="group bg-card border border-border rounded-2xl p-5 hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition">
                  <div className="flex items-start gap-4">
                    <div className={`h-14 w-14 rounded-full ${bg} text-white flex items-center justify-center text-lg font-bold shrink-0`}>
                      {d.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{d.name}</h3>
                      <p className="text-sm text-primary">{d.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{d.experience} yrs experience</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{d.rating}</span>
                      <span className="text-xs text-muted-foreground">({d.reviews})</span>
                    </div>
                    <div className="font-semibold">₹{d.fee}</div>
                  </div>

                  <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                      <Building className="h-3.5 w-3.5 text-primary" /> {d.clinicName}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {d.address}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
                    <Clock className="h-3.5 w-3.5" /> Next: {d.nextSlot}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to="/doctors/$id"
                      params={{ id: d.id }}
                      className="flex-1 text-center px-3 py-2 rounded-lg border border-border text-sm font-medium hover:border-primary hover:text-primary transition"
                    >
                      View profile
                    </Link>
                    <Link
                      to="/booking"
                      className="flex-1 text-center px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
