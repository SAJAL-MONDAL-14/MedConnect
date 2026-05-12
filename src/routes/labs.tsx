import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { labs, labTests } from "@/lib/mockData";
import { Beaker, MapPin, Star, Home, Building2, Search, Plus, Minus, Check, X, Clock, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/labs")({
  head: () => ({ meta: [{ title: "Lab tests & home collection — MedConnect" }] }),
  component: LabsPage,
});

const categories = ["All tests", "Blood", "Urine", "Scan", "Culture"] as const;

function LabsPage() {
  const [selectedLab, setSelectedLab] = useState(labs[0].id);
  const [cat, setCat] = useState<(typeof categories)[number]>("All tests");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"home" | "walkin">("home");
  const [booked, setBooked] = useState(false);

  const lab = labs.find((l) => l.id === selectedLab) ?? labs[0];

  const tests = useMemo(() => {
    return labTests.filter((t) => {
      if (cat !== "All tests" && t.category !== cat) return false;
      if (q && !t.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  const cartItems = labTests.filter((t) => cart[t.id]);
  const total = cartItems.reduce((sum, t) => sum + t.price * cart[t.id], 0);
  const discount = cartItems.length >= 2 ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) => setCart((c) => {
    const n = (c[id] ?? 0) - 1;
    const next = { ...c };
    if (n <= 0) delete next[id];
    else next[id] = n;
    return next;
  });

  return (
    <div className="min-h-screen bg-background pb-32">
      <Navbar active="labs" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-success to-success-dark text-success-foreground">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80 mb-3">
            <Beaker className="h-4 w-4" /> {lab.certified}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{lab.name}</h1>
          <p className="mt-2 text-sm opacity-90 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {lab.address} · <Star className="h-3.5 w-3.5 fill-current" /> {lab.rating} · Home collection available
          </p>

          <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-xl">
            <div className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-4 py-3">
              <div className="text-2xl font-bold">{lab.testsCount}+</div>
              <div className="text-xs opacity-80">Tests available</div>
            </div>
            <div className="rounded-xl bg-white/15 backdrop-blur border border-white/20 px-4 py-3">
              <div className="text-2xl font-bold">Free</div>
              <div className="text-xs opacity-80">Home collection</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-8 grid lg:grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR — Labs */}
        <aside className="space-y-4">
          <div className="rounded-xl bg-card border border-border p-4">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Choose lab</h3>
            <div className="space-y-2">
              {labs.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLab(l.id)}
                  className={`w-full text-left rounded-lg p-3 border transition ${
                    selectedLab === l.id ? "bg-primary-soft border-primary text-primary" : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <div className="text-sm font-semibold">{l.name}</div>
                  <div className="text-[11px] mt-0.5 opacity-70 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" /> {l.rating} · {l.address.split(",")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-4">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Why MedConnect Labs</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" /> NABL accredited only</li>
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" /> Reports in 24 hrs</li>
              <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" /> 10% off on 2+ tests</li>
            </ul>
          </div>
        </aside>

        {/* MAIN */}
        <main>
          {/* Search + categories */}
          <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-2 mb-4 focus-within:border-primary">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tests, panels…" className="flex-1 bg-transparent text-sm py-2 outline-none" />
            {q && <button onClick={() => setQ("")} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition ${
                  cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Tests list */}
          <h2 className="text-sm font-semibold text-foreground mb-3">{tests.length} tests available</h2>
          <div className="space-y-3">
            {tests.map((t) => {
              const qty = cart[t.id] ?? 0;
              return (
                <div key={t.id} className="rounded-xl bg-card border border-border p-4 hover:border-primary/40 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{t.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t.sample} · Report in {t.reportHrs} hrs · {t.fasting}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.homeCollection && <span className="inline-flex items-center gap-1 rounded-full bg-success-soft text-success px-2 py-0.5 text-[10px] font-medium"><Home className="h-3 w-3" /> Home collection</span>}
                        {t.walkIn && <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft text-primary px-2 py-0.5 text-[10px] font-medium"><Building2 className="h-3 w-3" /> Walk-in</span>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-lg font-semibold text-success">₹{t.price}</div>
                      {qty === 0 ? (
                        <button onClick={() => add(t.id)} className="mt-2 inline-flex items-center gap-1 rounded-md bg-success text-success-foreground px-3 py-1.5 text-xs font-semibold hover:bg-success-dark transition">
                          <Plus className="h-3.5 w-3.5" /> Add to cart
                        </button>
                      ) : (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-md border border-border bg-card">
                          <button onClick={() => remove(t.id)} className="h-7 w-7 inline-flex items-center justify-center hover:bg-secondary rounded-l-md"><Minus className="h-3 w-3" /></button>
                          <span className="px-2 text-xs font-semibold tabular-nums">{qty}</span>
                          <button onClick={() => add(t.id)} className="h-7 w-7 inline-flex items-center justify-center hover:bg-secondary rounded-r-md"><Plus className="h-3 w-3" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* STICKY CART */}
      {cartItems.length > 0 && !booked && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-card border-t border-border shadow-elevated">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-success-soft text-success flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Cart · {cartItems.length} test{cartItems.length > 1 ? "s" : ""}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[260px]">{cartItems.map((c) => c.name.split(" ")[0]).join(" + ")}</div>
                </div>
              </div>

              <div className="inline-flex rounded-lg bg-secondary p-1 text-xs">
                <button onClick={() => setMode("home")} className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "home" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                  <Home className="h-3.5 w-3.5 inline mr-1" /> Home collection
                </button>
                <button onClick={() => setMode("walkin")} className={`px-3 py-1.5 rounded-md font-medium transition ${mode === "walkin" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
                  <Building2 className="h-3.5 w-3.5 inline mr-1" /> Walk-in
                </button>
              </div>

              <div className="text-right">
                <div className="text-xs text-muted-foreground">{discount > 0 && <span className="text-success mr-1">−₹{discount}</span>}Total</div>
                <div className="font-mono text-xl font-bold text-success">₹{finalTotal}</div>
              </div>

              <button
                onClick={() => setBooked(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-success text-success-foreground px-5 py-3 text-sm font-semibold hover:bg-success-dark transition"
              >
                {mode === "home" ? "Schedule pickup" : "Book slot"}
                <Clock className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION OVERLAY */}
      {booked && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-elevated p-7 text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-success text-success-foreground flex items-center justify-center mb-4">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold">Booking confirmed</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "home" ? "Phlebotomist will arrive at your address in the selected slot." : "Walk in any time within your slot — no waiting."}
            </p>
            <div className="mt-5 rounded-xl bg-secondary border border-border p-4 text-left text-sm">
              <div className="flex justify-between mb-1.5"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-semibold">LAB-{Math.floor(Math.random() * 9000) + 1000}</span></div>
              <div className="flex justify-between mb-1.5"><span className="text-muted-foreground">Tests</span><span>{cartItems.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid</span><span className="font-mono font-bold text-success">₹{finalTotal}</span></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={() => { setBooked(false); setCart({}); }} className="rounded-md border border-border py-2.5 text-sm font-medium hover:bg-secondary">Done</button>
              <Link to="/profile" className="rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark text-center">View bookings</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
