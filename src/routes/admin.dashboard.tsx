import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, BarChart3, Building2, FlaskConical, Stethoscope, Users, UserCog, Siren, CalendarCheck, Settings, CreditCard, Search, Bell, ShieldCheck, ChevronRight, LogOut, Plus, X } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin dashboard — MedConnect" }] }),
  component: AdminDashboard,
});

type View = "Dashboard" | "Analytics" | "Hospitals" | "Labs" | "Doctors" | "Patients" | "Staff" | "SOS Events" | "Bookings" | "Settings" | "Billing";

const sections: { label: string; items: { icon: typeof LayoutDashboard; label: View }[] }[] = [
  { label: "Overview", items: [{ icon: LayoutDashboard, label: "Dashboard" }, { icon: BarChart3, label: "Analytics" }] },
  { label: "Tenants", items: [{ icon: Building2, label: "Hospitals" }, { icon: FlaskConical, label: "Labs" }, { icon: Stethoscope, label: "Doctors" }] },
  { label: "Users", items: [{ icon: Users, label: "Patients" }, { icon: UserCog, label: "Staff" }] },
  { label: "System", items: [{ icon: Siren, label: "SOS Events" }, { icon: CalendarCheck, label: "Bookings" }, { icon: Settings, label: "Settings" }, { icon: CreditCard, label: "Billing" }] },
];

function AdminDashboard() {
  const [view, setView] = useState<View>("Dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex flex-col w-[210px] shrink-0 bg-foreground text-background">
        <div className="p-5 border-b border-white/10">
          <div className="text-base font-bold">Med<span className="text-primary">Connect</span></div>
          <div className="inline-flex items-center gap-1 mt-2 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3" /> Super Admin
          </div>
        </div>
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">AS</div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Aman Singh</div>
            <div className="text-[10px] text-white/60">Platform admin</div>
          </div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {sections.map((sec) => (
            <div key={sec.label} className="mb-3">
              <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-white/40 font-semibold">{sec.label}</div>
              {sec.items.map((n) => (
                <button
                  key={n.label}
                  onClick={() => setView(n.label)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium border-l-2 transition text-left ${
                    view === n.label ? "bg-primary/15 border-primary text-white" : "border-transparent text-white/70 hover:bg-white/5"
                  }`}
                >
                  <n.icon className="h-4 w-4" strokeWidth={1.5} /> {n.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <Link to="/login" className="m-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <div className="font-semibold">{view}</div>
            <div className="text-xs text-muted-foreground">All tenants · India</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-md border border-border bg-input px-3 w-64">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input placeholder="Search tenants, users..." className="bg-transparent py-1.5 text-sm outline-none flex-1" />
            </div>
            <button className="relative p-2 rounded-md hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emergency" />
            </button>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">AS</div>
          </div>
        </header>

        <div className="md:hidden flex overflow-x-auto bg-card border-b border-border px-2">
          {sections.flatMap((s) => s.items).map((n) => (
            <button
              key={n.label}
              onClick={() => setView(n.label)}
              className={`shrink-0 px-3 py-2.5 text-xs font-medium border-b-2 ${
                view === n.label ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {n.label}
            </button>
          ))}
        </div>

        <main className="p-6 space-y-6">
          {view === "Dashboard" && <DashboardView />}
          {view === "Analytics" && <AnalyticsView />}
          {view === "Hospitals" && <HospitalsView />}
          {view === "Labs" && <PlaceholderView title="Labs" desc="Manage lab tenants and home-collection availability." />}
          {view === "Doctors" && <PlaceholderView title="Doctors" desc="All registered doctors across the platform." />}
          {view === "Patients" && <PlaceholderView title="Patients" desc="Search and manage patient accounts." />}
          {view === "Staff" && <PlaceholderView title="Staff accounts" desc="Hospital staff users with portal access." />}
          {view === "SOS Events" && <SOSEventsView />}
          {view === "Bookings" && <PlaceholderView title="All bookings" desc="Cross-tenant bookings ledger." />}
          {view === "Billing" && <BillingView />}
          {view === "Settings" && <PlaceholderView title="Platform settings" desc="Global config, integrations, branding." />}
        </main>
      </div>
    </div>
  );
}

/* ---------- VIEWS ---------- */

const stats = [
  { label: "Hospitals", value: "48", delta: "+3 this month", tone: "primary", icon: Building2 },
  { label: "Bookings today", value: "1,284", delta: "+18%", tone: "success", icon: CalendarCheck },
  { label: "SOS today", value: "7", delta: "All resolved", tone: "emergency", icon: Siren },
  { label: "Revenue", value: "₹2.4L", delta: "+12%", tone: "success", icon: CreditCard },
];

function DashboardView() {
  return (
    <>
      {/* Hero card */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden bg-gradient-to-r from-primary via-primary-dark to-foreground">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/70 font-bold">Platform overview</div>
            <h2 className="mt-1 text-2xl font-bold">Everything looks healthy 🟢</h2>
            <p className="text-sm text-white/80 mt-1">48 hospitals, 1,284 bookings today, 7 SOS events resolved.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur border border-white/20">
              <div className="text-[10px] uppercase tracking-wider text-white/70">Uptime</div>
              <div className="text-lg font-bold">99.98%</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur border border-white/20">
              <div className="text-[10px] uppercase tracking-wider text-white/70">Active staff</div>
              <div className="text-lg font-bold">312</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-5 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-${s.tone}-soft text-${s.tone}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-success uppercase">Live</span>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-3xl font-bold text-${s.tone}`}>{s.value}</div>
            <div className="text-[11px] text-success mt-1 font-medium">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <BookingsChart />
        <SOSEventsCard />
      </div>

      <HospitalsView />

      <div className="grid lg:grid-cols-2 gap-4">
        <PendingApprovals />
        <RevenueCard />
      </div>
    </>
  );
}

function BookingsChart() {
  const days = [
    { d: "Mon", v: 60 }, { d: "Tue", v: 78 }, { d: "Wed", v: 52 }, { d: "Thu", v: 88 },
    { d: "Fri", v: 95 }, { d: "Sat", v: 70 }, { d: "Sun", v: 100, today: true },
  ];
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold">Bookings this week</h2>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>
      <div className="flex items-end justify-between gap-2 h-48">
        {days.map((c) => (
          <div key={c.d} className="flex-1 flex flex-col items-center gap-2">
            <div className="text-[10px] font-mono text-text-muted">{Math.round(c.v * 14)}</div>
            <div className="w-full rounded-t-md transition hover:opacity-80" style={{
              height: `${c.v}%`,
              background: c.today ? "var(--color-success)" : "var(--color-primary)",
            }} />
            <div className="text-xs text-muted-foreground">{c.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const initialSosEvents = [
  { id: 1, name: "Anita Kumar", time: "10:24 AM", hospital: "North Bengal MC", eta: "8 min", status: "Resolved" },
  { id: 2, name: "Vikram Roy", time: "11:42 AM", hospital: "CityMed", eta: "14 min", status: "Resolved" },
  { id: 3, name: "Priya Sen", time: "1:08 PM", hospital: "Neotia Getwel", eta: "22 min", status: "Pending" },
];

function SOSEventsCard() {
  const [events] = useState(initialSosEvents);
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">SOS events today</h2>
        <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
      </div>
      <div className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition">
            <div className="h-8 w-8 rounded-full bg-emergency-soft text-emergency flex items-center justify-center"><Siren className="h-4 w-4" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{e.name}</div>
              <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <span className="font-mono">{e.time}</span> <ChevronRight className="h-3 w-3" /> {e.hospital} · {e.eta}
              </div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              e.status === "Resolved" ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
            }`}>{e.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const initialTenants = [
  { id: 1, name: "North Bengal MC", type: "Govt", beds: 12, icu: 3, bookings: 284, status: "Active" },
  { id: 2, name: "Siliguri District Hospital", type: "Govt", beds: 5, icu: 0, bookings: 178, status: "Active" },
  { id: 3, name: "CityMed Multispeciality", type: "Private", beds: 18, icu: 4, bookings: 312, status: "Active" },
  { id: 4, name: "CityMed Clinic", type: "Private", beds: null, icu: null, bookings: null, status: "Pending" },
];

function HospitalsView() {
  const [tenants, setTenants] = useState(initialTenants);
  const [showOnboard, setShowOnboard] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Private");

  const onboard = () => {
    if (!name) return;
    setTenants([...tenants, { id: Date.now(), name, type, beds: null, icu: null, bookings: null, status: "Pending" }]);
    setName(""); setType("Private"); setShowOnboard(false);
  };

  const approve = (id: number) =>
    setTenants(tenants.map((t) => (t.id === id ? { ...t, status: "Active", beds: 0, icu: 0, bookings: 0 } : t)));

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Tenant hospitals</h2>
        <button onClick={() => setShowOnboard((s) => !s)} className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary-dark inline-flex items-center gap-1">
          <Plus className="h-3.5 w-3.5" /> Onboard hospital
        </button>
      </div>
      {showOnboard && (
        <div className="px-6 py-4 bg-secondary border-b border-border grid sm:grid-cols-3 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Hospital name" className="rounded-md bg-card border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md bg-card border border-border px-3 py-2 text-sm outline-none focus:border-primary">
            <option>Private</option><option>Govt</option>
          </select>
          <div className="flex gap-2">
            <button onClick={onboard} className="flex-1 rounded-md bg-success text-success-foreground px-3 py-2 text-xs font-semibold">Submit</button>
            <button onClick={() => setShowOnboard(false)} className="rounded-md border border-border px-3 py-2 text-xs">Cancel</button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Hospital</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Beds</th>
              <th className="text-left px-6 py-3 font-medium">ICU</th>
              <th className="text-left px-6 py-3 font-medium">Bookings today</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-secondary/50">
                <td className="px-6 py-3 font-medium">{t.name}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    t.type === "Govt" ? "bg-primary-soft text-primary" : "bg-accent text-accent-foreground"
                  }`}>{t.type}</span>
                </td>
                <td className="px-6 py-3 font-mono">{t.beds ?? "—"}</td>
                <td className="px-6 py-3 font-mono">{t.icu ?? "—"}</td>
                <td className="px-6 py-3 font-mono">{t.bookings ?? "—"}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    t.status === "Active" ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
                  }`}>{t.status}</span>
                </td>
                <td className="px-6 py-3 text-right">
                  {t.status === "Pending"
                    ? <button onClick={() => approve(t.id)} className="text-success font-semibold text-xs hover:underline">Approve</button>
                    : <button className="text-primary font-medium text-xs hover:underline">Manage</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const initialApprovals = [
  { id: 1, name: "CityMed Clinic", type: "Private", city: "Siliguri", ago: "2 hrs ago" },
  { id: 2, name: "Apollo Diagnostics", type: "Lab", city: "Darjeeling", ago: "5 hrs ago" },
];

function PendingApprovals() {
  const [pending, setPending] = useState(initialApprovals);
  const remove = (id: number) => setPending((p) => p.filter((x) => x.id !== id));

  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Pending approvals</h2>
        <span className="rounded-full bg-warning-soft text-warning px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">{pending.length} pending</span>
      </div>
      {pending.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">No pending approvals 🎉</div>
      ) : (
        <div className="space-y-3">
          {pending.map((p) => (
            <div key={p.id} className="rounded-lg bg-warning-soft border border-warning/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.type} · {p.city} · Submitted {p.ago}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => remove(p.id)} className="flex-1 rounded-md bg-success text-success-foreground py-1.5 text-xs font-semibold hover:opacity-90">Approve</button>
                <button onClick={() => remove(p.id)} className="flex-1 rounded-md border border-emergency text-emergency py-1.5 text-xs font-semibold hover:bg-emergency-soft">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RevenueCard() {
  const data = [
    { name: "CityMed Multispeciality", amount: 84200, pct: 95 },
    { name: "Neotia Getwel", amount: 62800, pct: 72 },
    { name: "North Bengal MC", amount: 48400, pct: 55 },
    { name: "Siliguri District Hospital", amount: 26100, pct: 30 },
  ];
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <h2 className="font-semibold mb-4">Revenue this month</h2>
      <div className="space-y-4">
        {data.map((r) => (
          <div key={r.name}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-foreground font-medium truncate pr-2">{r.name}</span>
              <span className="font-mono font-semibold">₹{(r.amount / 1000).toFixed(1)}k</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <BookingsChart />
      <RevenueCard />
    </div>
  );
}

function SOSEventsView() {
  return <SOSEventsCard />;
}

function BillingView() {
  const rows = [
    { month: "Apr 2025", bookings: 1842, revenue: "₹9.21L", commission: "₹46,050", status: "Paid" },
    { month: "Mar 2025", bookings: 1620, revenue: "₹8.10L", commission: "₹40,500", status: "Paid" },
    { month: "Feb 2025", bookings: 1485, revenue: "₹7.42L", commission: "₹37,100", status: "Paid" },
  ];
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border"><h2 className="font-semibold">Billing history</h2></div>
      <table className="w-full text-sm">
        <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Month</th>
            <th className="text-left px-6 py-3 font-medium">Bookings</th>
            <th className="text-left px-6 py-3 font-medium">Revenue</th>
            <th className="text-left px-6 py-3 font-medium">Commission</th>
            <th className="text-left px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.month} className="hover:bg-secondary/50">
              <td className="px-6 py-3 font-medium">{r.month}</td>
              <td className="px-6 py-3 font-mono">{r.bookings}</td>
              <td className="px-6 py-3 font-mono">{r.revenue}</td>
              <td className="px-6 py-3 font-mono">{r.commission}</td>
              <td className="px-6 py-3"><span className="rounded-full bg-success-soft text-success px-2 py-0.5 text-[10px] font-bold uppercase">{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PlaceholderView({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-card border border-dashed border-border p-12 text-center">
      <div className="mx-auto h-12 w-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-3">
        <Building2 className="h-5 w-5" />
      </div>
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{desc}</p>
    </div>
  );
}
