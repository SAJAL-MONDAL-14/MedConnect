import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HospitalCard, StarRating, LiveDot } from "@/components/HospitalCard";
import { MapPanel } from "@/components/MapPanel";
import { hospitals, doctors } from "@/lib/mockData";
import { Search, MapPin, ChevronRight, Siren, Sparkles, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedConnect — Find hospitals. Book instantly. Save lives." },
      { name: "description", content: "Real-time bed availability and one-tap appointment booking across 48+ hospitals in India." },
      { property: "og:title", content: "MedConnect — Find hospitals. Book instantly." },
      { property: "og:description", content: "See who has beds right now. No more calling around." },
    ],
  }),
  component: Home,
});

const filterPills = [
  { label: "Near me" },
  { label: "Has ICU beds" },
  { label: "Government" },
  { label: "Open now" },
  { label: "Rating 4+" },
];

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Near me"]);

  const toggleFilter = (label: string) =>
    setActiveFilters((f) => (f.includes(label) ? f.filter((x) => x !== label) : [...f, label]));

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate({ to: "/search", search: { q, filters: activeFilters.join(",") } as never });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar active="hospitals" />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-[1fr_360px] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur border border-white/20 px-3 py-1 text-xs font-medium text-white">
              <span className="live-dot" /> Real-time bed availability
            </span>
            <h1 className="mt-5 text-[40px] leading-[1.1] font-bold text-white tracking-tight">
              Find hospitals &amp; book<br />instantly
            </h1>
            <p className="mt-3 text-base text-white/70 max-w-md">
              See who has beds right now. No more calling around.
            </p>

            <form onSubmit={submit} className="mt-7 max-w-[600px] bg-card rounded-xl shadow-elevated p-2 flex items-center gap-2">
              <div className="flex items-center gap-2 pl-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search hospitals, doctors, specialties..."
                className="flex-1 bg-transparent text-sm py-2 outline-none placeholder:text-text-muted"
              />
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary-dark transition">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {filterPills.map((p) => {
                const on = activeFilters.includes(p.label);
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => toggleFilter(p.label)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                      on ? "bg-card text-primary border-card" : "bg-white/10 text-white border-white/20 hover:bg-white/15"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hidden lg:block relative">
            <div className="relative mx-auto w-[280px] aspect-[9/19] rounded-[40px] bg-foreground p-3 shadow-elevated rotate-3">
              <div className="h-full w-full rounded-[30px] bg-background overflow-hidden flex flex-col">
                <div className="h-6 bg-card flex items-center justify-center">
                  <div className="h-1 w-12 rounded-full bg-border" />
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-hidden">
                  <div className="rounded-lg bg-primary text-primary-foreground p-3">
                    <div className="text-[10px] opacity-80 uppercase tracking-wider">Nearest ICU</div>
                    <div className="text-sm font-semibold">North Bengal MC</div>
                    <div className="text-[10px] mt-1 font-mono">3 ICU beds · 8 min</div>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg bg-card border border-border p-2.5">
                      <div className="h-2 w-20 bg-muted rounded mb-1.5" />
                      <div className="h-2 w-32 bg-muted/50 rounded" />
                      <div className="mt-2 flex gap-1">
                        <div className="h-3 w-12 bg-success-soft rounded-full" />
                        <div className="h-3 w-10 bg-warning-soft rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-card shadow-elevated border border-border p-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="live-dot" />
                <span className="font-semibold text-foreground">12 free</span>
                <span className="text-muted-foreground">general beds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-3 divide-x divide-border">
          {[
            { value: "48", label: "Hospitals" },
            { value: "320+", label: "Doctors" },
            { value: "24/7", label: "SOS Ready" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MAP + HOSPITALS */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Hospitals near you</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <LiveDot /> Live availability · Siliguri, WB
            </p>
          </div>
          <Link to="/search" className="hidden sm:inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid lg:grid-cols-[1fr_440px] gap-6">
          <div className="space-y-4">
            {hospitals.slice(0, 3).map((h, i) => (
              <HospitalCard key={h.id} hospital={h} index={i} />
            ))}
          </div>
          <div className="lg:sticky lg:top-20 lg:h-[600px]">
            <MapPanel hospitals={hospitals} selectedId={hospitals[0].id} />
          </div>
        </div>
      </section>

      {/* SOS STRIP */}
      <section className="px-6">
        <div className="max-w-[1200px] mx-auto rounded-xl bg-emergency text-emergency-foreground p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lift">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full bg-emergency-dark flex items-center justify-center shrink-0">
              <Siren className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Emergency? One tap SOS</h3>
              <p className="text-sm text-white/80">Finds nearest ICU beds instantly · Auto-alerts your contacts</p>
            </div>
          </div>
          <Link to="/sos" className="inline-flex items-center gap-2 rounded-full bg-card text-emergency px-5 py-2.5 text-sm font-bold hover:bg-card/95 transition shadow-md">
            Hold SOS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary mt-16 border-y border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-14">
          <h2 className="text-2xl font-semibold text-center text-foreground">How it works</h2>
          <p className="text-sm text-muted-foreground text-center mt-1">Three steps. Under 60 seconds.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { n: 1, icon: MapPin, title: "Allow location", desc: "We use your GPS to find the closest hospitals — no signup required to browse." },
              { n: 2, icon: Sparkles, title: "See live availability", desc: "Real bed counts updated by hospital staff. Filter by specialty, type, rating." },
              { n: 3, icon: ShieldCheck, title: "Book instantly", desc: "Pick a slot, confirm. WhatsApp confirmation in seconds. Pay at the clinic." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl bg-card border border-border p-6 text-center hover:shadow-lift transition">
                <div className="mx-auto h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {s.n}
                </div>
                <s.icon className="mx-auto mt-4 h-6 w-6 text-primary" strokeWidth={1.5} />
                <h3 className="mt-3 font-semibold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Featured doctors</h2>
            <p className="text-sm text-muted-foreground mt-1">Top-rated · Available today</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 snap-x">
          {doctors.map((d) => (
            <div key={d.id} className="snap-start shrink-0 w-[280px] rounded-xl bg-card border border-border p-5 hover:shadow-lift transition">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold text-${d.avatarColor}-foreground bg-${d.avatarColor}`}>
                  {d.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.specialty}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <StarRating rating={d.rating} />
                <span className="font-mono text-sm font-semibold text-foreground">₹{d.fee}</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs rounded-md bg-success-soft text-success px-2.5 py-1.5">
                <Clock className="h-3.5 w-3.5" /> {d.nextSlot}
              </div>
              <Link to="/booking" className="mt-3 block text-center rounded-md bg-primary text-primary-foreground py-2 text-xs font-semibold hover:bg-primary-dark transition">
                Book consultation
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background mt-8">
        <div className="max-w-[1200px] mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="text-xl font-bold">
              <span>Med</span>
              <span className="text-primary">Connect</span>
            </div>
            <p className="mt-3 text-background/60 text-xs">Find hospitals. Book instantly. Save lives.</p>
            <div className="mt-4 flex gap-2">
              <span className="text-xs px-3 py-1.5 rounded border border-background/20 text-background/70">App Store</span>
              <span className="text-xs px-3 py-1.5 rounded border border-background/20 text-background/70">Google Play</span>
            </div>
          </div>
          {[
            { title: "Patients", links: ["Find hospitals", "Book a doctor", "Lab tests", "SOS Emergency"] },
            { title: "Hospitals", links: ["Partner with us", "Staff portal", "Pricing", "Documentation"] },
            { title: "Company", links: ["About", "Privacy", "Terms", "Contact"] },
          ].map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold mb-3">{c.title}</h4>
              <ul className="space-y-2 text-background/60">
                {c.links.map((l) => <li key={l} className="hover:text-background cursor-pointer">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/10">
          <div className="max-w-[1200px] mx-auto px-6 py-4 text-xs text-background/50 flex justify-between">
            <span>© 2025 MedConnect Health Pvt Ltd</span>
            <span>Made with care in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
