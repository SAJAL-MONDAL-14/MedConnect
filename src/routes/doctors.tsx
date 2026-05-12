import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { doctors, hospitals } from "@/lib/mockData";
import { Search, Star, Clock, Stethoscope, Filter } from "lucide-react";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Find Doctors — MedConnect" },
      { name: "description", content: "Browse verified doctors by specialty and book instantly." },
    ],
  }),
  component: DoctorsPage,
});

const SPECIALTIES = ["All", "Cardiologist", "Neurologist", "Pediatrician", "Orthopedic"];

function DoctorsPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string>("All");

  const list = useMemo(() => {
    return doctors.filter((d) => {
      const matchQ =
        !q.trim() ||
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.specialty.toLowerCase().includes(q.toLowerCase());
      const matchS = spec === "All" || d.specialty === spec;
      return matchQ && matchS;
    });
  }, [q, spec]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar active="doctors" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-soft via-background to-background border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-card border border-border text-muted-foreground mb-3">
            <Stethoscope className="h-3.5 w-3.5 text-primary" />
            {doctors.length} verified doctors available today
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Find the right doctor
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Search across specialties, see next available slots, and book in seconds.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or specialty"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card text-sm font-medium hover:border-primary hover:text-primary transition">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
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
      </section>

      {/* Results */}
      <section className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{list.length}</span> doctors found
          </p>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No doctors match your search.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((d) => {
              const hospital = hospitals.find((h) => h.id === d.hospitalId);
              return (
                <div
                  key={d.id}
                  className="group bg-card border border-border rounded-2xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0 ${
                        d.avatarColor === "primary"
                          ? "bg-primary"
                          : d.avatarColor === "success"
                          ? "bg-success"
                          : d.avatarColor === "warning"
                          ? "bg-warning"
                          : "bg-emergency"
                      }`}
                    >
                      {d.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{d.name}</h3>
                      <p className="text-sm text-primary">{d.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {d.experience} yrs experience
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{d.rating}</span>
                    </div>
                    <div className="font-semibold text-foreground">₹{d.fee}</div>
                  </div>

                  {hospital && (
                    <p className="mt-3 text-xs text-muted-foreground truncate">
                      at <span className="text-foreground">{hospital.name}</span>
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
                    <Clock className="h-3.5 w-3.5" />
                    Next: {d.nextSlot}
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
