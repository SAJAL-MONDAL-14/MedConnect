import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HospitalCard, StarRating } from "@/components/HospitalCard";
import { MapPanel } from "@/components/MapPanel";
import { hospitals, doctors } from "@/lib/mockData";
import { Search, X, SlidersHorizontal, List, Map as MapIcon, Clock, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: (s.q as string) ?? "",
    filters: (s.filters as string) ?? "",
  }),
  head: () => ({
    meta: [
      { title: "Search hospitals & doctors — MedConnect" },
      { name: "description", content: "Find hospitals and doctors near you with real-time bed availability." },
    ],
  }),
  component: SearchPage,
});

const SORTS = ["Distance", "Rating", "Bed availability", "Drive time"] as const;
type Sort = typeof SORTS[number];

function SearchPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState(search.q);
  const [chips, setChips] = useState<string[]>(
    search.filters
      ? search.filters.split(",").filter(Boolean)
      : ["Specialty: Cardiology", "Distance: 5km", "Has beds", "Rating 4+"],
  );
  const [view, setView] = useState<"list" | "map">("list");
  const [sort, setSort] = useState<Sort>("Distance");
  const [sortOpen, setSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedId, setSelectedId] = useState(hospitals[0].id);

  const results = useMemo(() => {
    let list = [...hospitals];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.specialties.some((s) => s.toLowerCase().includes(q)),
      );
    }
    if (chips.includes("Has beds")) list = list.filter((h) => h.beds.general + h.beds.icu > 0);
    if (chips.includes("Rating 4+")) list = list.filter((h) => h.rating >= 4);
    switch (sort) {
      case "Rating": list.sort((a, b) => b.rating - a.rating); break;
      case "Bed availability": list.sort((a, b) => b.beds.general + b.beds.icu - (a.beds.general + a.beds.icu)); break;
      case "Drive time": list.sort((a, b) => a.driveMin - b.driveMin); break;
      default: list.sort((a, b) => a.distanceKm - b.distanceKm);
    }
    return list;
  }, [query, chips, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar active="hospitals" />

      {/* Search bar */}
      <section className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-2xl flex items-center gap-2 bg-input rounded-md border border-border px-3 py-2 focus-within:border-primary transition">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hospitals, doctors, specialty..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-text-muted hover:text-foreground"><X className="h-4 w-4" /></button>
              )}
            </div>
            <button
              onClick={() => setShowFilters((s) => !s)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition ${
                showFilters ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:border-primary"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
          {chips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {chips.map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-xs font-medium">
                  {f}
                  <button onClick={() => setChips((c) => c.filter((x) => x !== f))} className="hover:text-primary-dark">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button onClick={() => setChips([])} className="text-xs text-muted-foreground hover:text-foreground underline">Clear all</button>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-6 grid lg:grid-cols-[1fr_500px] gap-6">
        {/* LEFT */}
        <div>
          {showFilters && <FilterPanel chips={chips} setChips={setChips} />}

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length} results</span>
              {query ? <> for "<span className="text-foreground">{query}</span>"</> : " near Siliguri, WB"}
            </p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  Sort: <span className="text-foreground font-medium">{sort}</span> <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 rounded-md bg-card border border-border shadow-elevated z-20 py-1">
                    {SORTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSort(s); setSortOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 text-sm hover:bg-secondary ${
                          sort === s ? "text-primary font-medium" : "text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="inline-flex rounded-md border border-border bg-card overflow-hidden text-xs">
                <button
                  onClick={() => setView("list")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition ${
                    view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <List className="h-3.5 w-3.5" /> List
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition ${
                    view === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <MapIcon className="h-3.5 w-3.5" /> Map
                </button>
              </div>
            </div>
          </div>

          {view === "list" ? (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="rounded-xl bg-card border border-dashed border-border p-10 text-center">
                  <div className="text-sm font-semibold">No hospitals match your filters</div>
                  <p className="text-xs text-muted-foreground mt-1">Try removing chips or changing your search.</p>
                  <button onClick={() => { setQuery(""); setChips([]); }} className="mt-4 rounded-md bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold">
                    Clear search
                  </button>
                </div>
              ) : (
                results.map((h, i) => (
                  <Link
                    key={h.id}
                    to="/hospital/$id"
                    params={{ id: h.id }}
                    onMouseEnter={() => setSelectedId(h.id)}
                    className="block"
                  >
                    <HospitalCard hospital={h} index={i} />
                  </Link>
                ))
              )}

              {results[0] && (
                <div className="rounded-lg bg-card border border-border p-5 hover:shadow-lift transition">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {doctors[0].initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[15px]">{doctors[0].name}</h3>
                        <span className="text-[10px] uppercase tracking-wider rounded bg-accent text-accent-foreground px-1.5 py-0.5 font-semibold">Doctor</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{doctors[0].specialty} · {doctors[0].experience} yrs · North Bengal MC</p>
                      <div className="flex items-center gap-3 mt-2">
                        <StarRating rating={doctors[0].rating} reviews={142} />
                        <span className="text-xs text-success inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {doctors[0].nextSlot}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-semibold">₹{doctors[0].fee}</div>
                      <Link to="/booking" className="mt-2 inline-block rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary-dark">
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="lg:hidden h-[calc(100vh-260px)] rounded-xl overflow-hidden">
              <MapPanel hospitals={results} selectedId={selectedId} />
            </div>
          )}
        </div>

        {/* RIGHT — sticky map (desktop) */}
        <aside className="hidden lg:block sticky top-[160px] h-[calc(100vh-180px)]">
          <MapPanel hospitals={results} selectedId={selectedId} />
        </aside>
      </div>
    </div>
  );
}

function FilterPanel({ chips, setChips }: { chips: string[]; setChips: (c: string[]) => void }) {
  const SPECS = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology"];
  const [distance, setDistance] = useState(5);
  const toggleChip = (label: string) =>
    chips.includes(label) ? setChips(chips.filter((c) => c !== label)) : setChips([...chips, label]);

  return (
    <div className="rounded-xl bg-card border border-border p-5 mb-4 space-y-5">
      <div>
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Specialty</h3>
        <div className="flex flex-wrap gap-2">
          {SPECS.map((s) => {
            const tag = `Specialty: ${s}`;
            const on = chips.includes(tag);
            return (
              <button
                key={s}
                onClick={() => toggleChip(tag)}
                className={`rounded-full px-3 py-1 text-xs border transition ${
                  on ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Distance</h3>
          <span className="text-xs font-mono">{distance} km</span>
        </div>
        <input
          type="range" min={1} max={20} value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {["Has beds", "Rating 4+", "Government", "Private", "Open now"].map((t) => {
          const on = chips.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggleChip(t)}
              className={`rounded-full px-3 py-1 text-xs border transition ${
                on ? "bg-success text-success-foreground border-success" : "bg-card border-border hover:border-success"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
