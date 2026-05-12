import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutDashboard, BedDouble, CalendarCheck, Users, BarChart3, Settings, LogOut, Bell, Plus, Minus, CheckCircle2, X, Eye, Search, Stethoscope, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/staff/dashboard")({
  head: () => ({ meta: [{ title: "Staff dashboard — MedConnect" }] }),
  component: StaffDashboard,
});

type View = "Dashboard" | "Availability" | "Appointments" | "Doctors" | "Reports" | "Settings";

const navItems: { icon: typeof LayoutDashboard; label: View }[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BedDouble, label: "Availability" },
  { icon: CalendarCheck, label: "Appointments" },
  { icon: Users, label: "Doctors" },
  { icon: BarChart3, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

function StaffDashboard() {
  const [view, setView] = useState<View>("Dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[200px] shrink-0 text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="p-5 border-b border-white/10">
          <div className="text-base font-bold">Med<span className="text-white/60">Connect</span></div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1">Hospital Portal</div>
        </div>
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold">RV</div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Ravi Verma</div>
            <div className="text-[10px] text-white/60">Ward staff</div>
          </div>
        </div>
        <nav className="flex-1 py-3">
          {navItems.map((n) => (
            <button
              key={n.label}
              onClick={() => setView(n.label)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium border-l-2 transition text-left ${
                view === n.label ? "bg-white/10 border-white text-white" : "border-transparent text-white/70 hover:bg-white/5"
              }`}
            >
              <n.icon className="h-4 w-4" strokeWidth={1.5} /> {n.label}
            </button>
          ))}
        </nav>
        <Link to="/login" className="m-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white">
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <div className="font-semibold">{view === "Dashboard" ? "Good morning, Ravi 👋" : view}</div>
            <div className="text-xs text-muted-foreground">North Bengal Medical College</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-success">
              <span className="live-dot" /> Live connected
            </span>
            <button className="relative p-2 rounded-md hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emergency" />
            </button>
          </div>
        </header>

        {/* mobile tab strip */}
        <div className="md:hidden flex overflow-x-auto bg-card border-b border-border px-3">
          {navItems.map((n) => (
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
          {view === "Availability" && <AvailabilityView />}
          {view === "Appointments" && <AppointmentsView />}
          {view === "Doctors" && <DoctorsView />}
          {view === "Reports" && <ReportsView />}
          {view === "Settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

/* ---------- VIEWS ---------- */

const stats = [
  { label: "Today's bookings", value: "42", delta: "+8 vs yesterday", tone: "primary", icon: CalendarCheck },
  { label: "Beds available", value: "12", delta: "of 30 general", tone: "success", icon: BedDouble },
  { label: "ICU beds", value: "3", delta: "of 8 critical", tone: "warning", icon: Stethoscope },
  { label: "SOS received", value: "2", delta: "Both resolved", tone: "emergency", icon: Bell },
];

function DashboardView() {
  return (
    <>
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20">
              <span className="live-dot" /> Patients see your updates in real time
            </div>
            <h2 className="mt-3 text-2xl font-bold">Good morning, Ravi 👋</h2>
            <p className="text-sm text-white/80 mt-1">42 bookings today · 12 beds free · 2 SOS events resolved.</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/15 backdrop-blur border border-white/20">
            <div className="text-[10px] uppercase tracking-wider text-white/70">Last sync</div>
            <div className="text-lg font-bold">2 min ago</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4 shadow-card hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center bg-${s.tone}-soft text-${s.tone}`}>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold text-${s.tone}`}>{s.value}</div>
            <div className="text-[10px] text-text-muted mt-1">{s.delta}</div>
          </div>
        ))}
      </div>
      <AvailabilityView compact />
      <AppointmentsView compact />
    </>
  );
}

function AvailabilityView({ compact = false }: { compact?: boolean }) {
  const [general, setGeneral] = useState(12);
  const [icu, setIcu] = useState(3);
  const [ot, setOt] = useState(true);
  const [amb, setAmb] = useState(true);
  const [savedAt, setSavedAt] = useState<string>("2 min ago");

  const save = () => setSavedAt("just now");

  return (
    <div className="rounded-xl bg-card border border-border p-6 mt-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold text-lg">{compact ? "Update availability" : "Availability control"}</h2>
          <p className="text-xs text-muted-foreground">Changes broadcast instantly to patient apps.</p>
        </div>
        <span className="text-xs text-success inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Saved {savedAt}</span>
      </div>
      <div className="space-y-5">
        <BedRow label="General beds" desc="Tap +/− to update" value={general} setValue={(v) => { setGeneral(v); save(); }} total={30} color="primary" />
        <div className="border-t border-border" />
        <BedRow label="ICU beds" desc="Critical care units" value={icu} setValue={(v) => { setIcu(v); save(); }} total={8} color="success" />
        <div className="border-t border-border" />
        <ToggleRow label="OT available" desc="Operating theatre" on={ot} setOn={(v) => { setOt(v); save(); }} />
        <div className="border-t border-border" />
        <ToggleRow label="Ambulance" desc="24/7 dispatch" on={amb} setOn={(v) => { setAmb(v); save(); }} />
      </div>
    </div>
  );
}

function BedRow({ label, desc, value, setValue, total, color }: { label: string; desc: string; value: number; setValue: (v: number) => void; total: number; color: string }) {
  const pct = Math.round((value / total) * 100);
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
        <div className="mt-2 h-1.5 w-48 bg-muted rounded-full overflow-hidden">
          <div className={`h-full bg-${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
        </div>
        <div className="text-[10px] text-text-muted mt-1 font-mono">{value} / {total} beds</div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setValue(Math.max(0, value - 1))} className="h-9 w-9 rounded-full border border-border bg-card hover:border-primary flex items-center justify-center"><Minus className="h-4 w-4" /></button>
        <div className={`text-3xl font-bold font-mono w-12 text-center text-${color}`}>{value}</div>
        <button onClick={() => setValue(Math.min(total, value + 1))} className="h-9 w-9 rounded-full border border-border bg-card hover:border-primary flex items-center justify-center"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, on, setOn }: { label: string; desc: string; on: boolean; setOn: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div><div className="font-semibold">{label}</div><div className="text-xs text-muted-foreground">{desc}</div></div>
      <button onClick={() => setOn(!on)} className={`relative inline-flex h-7 w-12 rounded-full transition ${on ? "bg-success" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

const initialAppts = [
  { id: 1, time: "09:30", patient: "Anita Kumar", doctor: "Dr. Sharma", type: "OPD", status: "Completed" },
  { id: 2, time: "10:00", patient: "Rahul Das", doctor: "Dr. Sharma", type: "OPD", status: "Confirmed" },
  { id: 3, time: "10:30", patient: "Meera Pal", doctor: "Dr. Das", type: "Follow-up", status: "Pending" },
  { id: 4, time: "11:00", patient: "Vikram Roy", doctor: "Dr. Mehta", type: "OPD", status: "Confirmed" },
  { id: 5, time: "11:30", patient: "Sneha Bose", doctor: "Dr. Sharma", type: "OPD", status: "No-show" },
];

function AppointmentsView({ compact = false }: { compact?: boolean }) {
  const [appts, setAppts] = useState(initialAppts);
  const [filter, setFilter] = useState<"All" | "Pending" | "Confirmed" | "Completed">("All");

  const filtered = filter === "All" ? appts : appts.filter((a) => a.status === filter);

  const update = (id: number, status: string) =>
    setAppts((a) => a.map((x) => (x.id === id ? { ...x, status } : x)));

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden mt-4">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-semibold text-lg">{compact ? "Today's appointments" : "All appointments"}</h2>
        <div className="flex items-center gap-2">
          {(["All", "Pending", "Confirmed", "Completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs rounded-full px-3 py-1 border transition ${
                filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Time</th>
              <th className="text-left px-6 py-3 font-medium">Patient</th>
              <th className="text-left px-6 py-3 font-medium">Doctor</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-secondary/50">
                <td className="px-6 py-3 font-mono">{a.time}</td>
                <td className="px-6 py-3 font-medium">{a.patient}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.doctor}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.type}</td>
                <td className="px-6 py-3"><StatusChip s={a.status} /></td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => update(a.id, "Confirmed")} className="p-1.5 rounded hover:bg-success-soft text-success" title="Confirm"><CheckCircle2 className="h-4 w-4" /></button>
                    <button onClick={() => update(a.id, "No-show")} className="p-1.5 rounded hover:bg-emergency-soft text-emergency" title="Mark no-show"><X className="h-4 w-4" /></button>
                    <button className="p-1.5 rounded hover:bg-primary-soft text-primary" title="View"><Eye className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">No appointments match this filter.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusChip({ s }: { s: string }) {
  const map: Record<string, string> = {
    Confirmed: "bg-success-soft text-success",
    Pending: "bg-warning-soft text-warning",
    "No-show": "bg-emergency-soft text-emergency",
    Completed: "bg-muted text-muted-foreground",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map[s] ?? "bg-muted"}`}>{s}</span>;
}

const initialDocs = [
  { id: 1, name: "Dr. Rajesh Sharma", initials: "RS", specialty: "Cardiologist", fee: 500, active: true },
  { id: 2, name: "Dr. Priya Das", initials: "PD", specialty: "Cardiologist", fee: 450, active: true },
  { id: 3, name: "Dr. Arjun Mehta", initials: "AM", specialty: "Neurologist", fee: 700, active: false },
];

function DoctorsView() {
  const [docs, setDocs] = useState(initialDocs);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [fee, setFee] = useState("500");
  const [search, setSearch] = useState("");

  const filtered = docs.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()));

  const add = () => {
    if (!name || !specialty) return;
    setDocs([...docs, { id: Date.now(), name, initials: name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(), specialty, fee: Number(fee) || 500, active: true }]);
    setName(""); setSpecialty(""); setFee("500"); setAdding(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-card border border-border p-5 flex items-center gap-3 flex-wrap">
        <div className="flex-1 flex items-center gap-2 bg-input border border-border rounded-md px-3 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search doctors..." className="bg-transparent py-2 text-sm outline-none flex-1" />
        </div>
        <button onClick={() => setAdding((s) => !s)} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:bg-primary-dark inline-flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add doctor
        </button>
      </div>

      {adding && (
        <div className="rounded-xl bg-card border border-border p-5 grid sm:grid-cols-3 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Doctor name" className="rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
          <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" className="rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
          <input value={fee} onChange={(e) => setFee(e.target.value)} placeholder="Fee" className="rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary font-mono" />
          <div className="sm:col-span-3 flex justify-end gap-2">
            <button onClick={() => setAdding(false)} className="rounded-md border border-border px-3 py-1.5 text-xs">Cancel</button>
            <button onClick={add} className="rounded-md bg-success text-success-foreground px-4 py-1.5 text-xs font-semibold">Save doctor</button>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Doctor</th>
              <th className="text-left px-6 py-3 font-medium">Specialty</th>
              <th className="text-left px-6 py-3 font-medium">Fee</th>
              <th className="text-left px-6 py-3 font-medium">Active</th>
              <th className="text-right px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-secondary/50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{d.initials}</div>
                    <span className="font-medium">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-muted-foreground">{d.specialty}</td>
                <td className="px-6 py-3 font-mono">₹{d.fee}</td>
                <td className="px-6 py-3">
                  <button onClick={() => setDocs(docs.map((x) => (x.id === d.id ? { ...x, active: !x.active } : x)))} className={`relative inline-flex h-6 w-11 rounded-full transition ${d.active ? "bg-success" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${d.active ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="px-6 py-3 text-right">
                  <button onClick={() => setDocs(docs.filter((x) => x.id !== d.id))} className="p-1.5 rounded hover:bg-emergency-soft text-emergency"><X className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsView() {
  const days = [
    { d: "Mon", v: 60 }, { d: "Tue", v: 78 }, { d: "Wed", v: 52 }, { d: "Thu", v: 88 },
    { d: "Fri", v: 95 }, { d: "Sat", v: 70 }, { d: "Sun", v: 100 },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Bookings this week</h2>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-48">
          {days.map((c, i) => (
            <div key={c.d} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-text-muted">{Math.round(c.v * 0.4)}</div>
              <div className="w-full rounded-t-md transition-all hover:opacity-80" style={{ height: `${c.v}%`, background: i === 6 ? "var(--color-success)" : "var(--color-primary)" }} />
              <div className="text-xs text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-5 space-y-3">
        <h2 className="font-semibold">Revenue snapshot</h2>
        {[
          { label: "Today", value: "₹21,000", delta: "+12%" },
          { label: "This week", value: "₹1.2L", delta: "+8%" },
          { label: "This month", value: "₹4.8L", delta: "+18%" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between rounded-md bg-secondary px-4 py-3">
            <div>
              <div className="text-xs text-muted-foreground">{r.label}</div>
              <div className="text-lg font-bold font-mono">{r.value}</div>
            </div>
            <span className="text-xs font-semibold text-success">{r.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const [hospitalName, setHospitalName] = useState("North Bengal Medical College");
  const [phone, setPhone] = useState("+91 353 256 5000");
  return (
    <div className="rounded-xl bg-card border border-border p-6 space-y-4 max-w-2xl">
      <h2 className="font-semibold text-lg">Hospital settings</h2>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Hospital name</label>
        <input value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Contact phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary font-mono" />
      </div>
      <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Save changes</button>
    </div>
  );
}
