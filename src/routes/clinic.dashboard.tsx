import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, Fragment } from "react";
import { LayoutDashboard, CalendarCheck, Users, Wallet, Star, Settings, LogOut, Bell, Plus, CheckCircle2, X, Eye, Clock, TrendingUp, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/clinic/dashboard")({
  head: () => ({ meta: [{ title: "Clinic dashboard — MedConnect" }] }),
  component: ClinicDashboard,
});

type View = "Dashboard" | "Appointments" | "Patients" | "Schedule" | "Earnings" | "Reviews" | "Settings";

const navItems: { icon: typeof LayoutDashboard; label: View }[] = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: CalendarCheck, label: "Appointments" },
  { icon: Users, label: "Patients" },
  { icon: Clock, label: "Schedule" },
  { icon: Wallet, label: "Earnings" },
  { icon: Star, label: "Reviews" },
  { icon: Settings, label: "Settings" },
];

function ClinicDashboard() {
  const [view, setView] = useState<View>("Dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 text-white bg-gradient-to-b from-primary via-primary-dark to-foreground">
        <div className="p-5 border-b border-white/10">
          <div className="text-base font-bold">Med<span className="text-white/60">Connect</span></div>
          <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1">Clinic Portal</div>
        </div>
        <div className="p-4 border-b border-white/10 flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-xs font-bold ring-2 ring-white/20">AK</div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate">Dr. Anil Kapoor</div>
            <div className="text-[10px] text-white/60">SkinCare Clinic</div>
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

      <div className="flex-1 min-w-0">
        <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <div className="font-semibold">{view === "Dashboard" ? "Welcome back, Dr. Kapoor 👨‍⚕️" : view}</div>
            <div className="text-xs text-muted-foreground">SkinCare Clinic · Siliguri</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-success">
              <span className="live-dot" /> Online
            </span>
            <button className="relative p-2 rounded-md hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-emergency" />
            </button>
          </div>
        </header>

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
          {view === "Appointments" && <AppointmentsView />}
          {view === "Patients" && <PatientsView />}
          {view === "Schedule" && <ScheduleView />}
          {view === "Earnings" && <EarningsView />}
          {view === "Reviews" && <ReviewsView />}
          {view === "Settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  const stats = [
    { label: "Today's bookings", value: "14", delta: "+3 vs yesterday", tone: "primary", icon: CalendarCheck },
    { label: "Total patients", value: "1,284", delta: "+18 this week", tone: "success", icon: Users },
    { label: "Earnings today", value: "₹8,400", delta: "+22%", tone: "warning", icon: Wallet },
    { label: "Rating", value: "4.8", delta: "184 reviews", tone: "emergency", icon: Star },
  ];
  return (
    <>
      <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-wider text-white/70 font-bold">Today's overview</div>
          <h2 className="mt-1 text-2xl font-bold">You have 14 appointments today</h2>
          <p className="text-sm text-white/80 mt-1">Next patient: <span className="font-semibold">Riya Sharma — 11:00 AM</span></p>
          <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-primary text-sm font-semibold hover:bg-white/90 transition">
            <Eye className="h-4 w-4" /> View today's schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card border border-border p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center bg-${s.tone}-soft text-${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <TrendingUp className="h-3.5 w-3.5 text-success" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
            <div className={`mt-1 text-2xl font-bold text-${s.tone}`}>{s.value}</div>
            <div className="text-[11px] text-success mt-1 font-medium">{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <AppointmentsView compact />
        <RecentPatients />
      </div>
    </>
  );
}

const initialAppts = [
  { id: 1, time: "10:00", patient: "Anita Kumar", type: "Consultation", status: "Completed", fee: 600 },
  { id: 2, time: "11:00", patient: "Riya Sharma", type: "Follow-up", status: "Confirmed", fee: 400 },
  { id: 3, time: "11:30", patient: "Vikash Roy", type: "Consultation", status: "Pending", fee: 600 },
  { id: 4, time: "12:00", patient: "Meera Pal", type: "Procedure", status: "Confirmed", fee: 1500 },
  { id: 5, time: "5:00 PM", patient: "Sneha Bose", type: "Consultation", status: "Confirmed", fee: 600 },
];

function AppointmentsView({ compact = false }: { compact?: boolean }) {
  const [appts, setAppts] = useState(initialAppts);
  const update = (id: number, status: string) => setAppts((a) => a.map((x) => x.id === id ? { ...x, status } : x));

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">{compact ? "Today's appointments" : "All appointments"}</h2>
        <button className="text-xs text-primary font-medium hover:underline">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Time</th>
              <th className="text-left px-6 py-3 font-medium">Patient</th>
              <th className="text-left px-6 py-3 font-medium">Type</th>
              <th className="text-left px-6 py-3 font-medium">Fee</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {appts.map((a) => (
              <tr key={a.id} className="hover:bg-secondary/50">
                <td className="px-6 py-3 font-mono">{a.time}</td>
                <td className="px-6 py-3 font-medium">{a.patient}</td>
                <td className="px-6 py-3 text-muted-foreground">{a.type}</td>
                <td className="px-6 py-3 font-mono">₹{a.fee}</td>
                <td className="px-6 py-3"><StatusChip s={a.status} /></td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => update(a.id, "Completed")} className="p-1.5 rounded hover:bg-success-soft text-success" title="Complete"><CheckCircle2 className="h-4 w-4" /></button>
                    <button onClick={() => update(a.id, "No-show")} className="p-1.5 rounded hover:bg-emergency-soft text-emergency" title="No-show"><X className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
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

function RecentPatients() {
  const patients = [
    { name: "Anita Kumar", age: 34, last: "Today", visits: 4 },
    { name: "Vikram Roy", age: 52, last: "Yesterday", visits: 12 },
    { name: "Sneha Bose", age: 28, last: "2 days ago", visits: 2 },
    { name: "Rahul Das", age: 41, last: "1 week ago", visits: 8 },
  ];
  return (
    <div className="rounded-xl bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Recent patients</h2>
        <button className="text-xs text-primary hover:underline">All patients</button>
      </div>
      <div className="space-y-3">
        {patients.map((p) => (
          <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition">
            <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center text-xs font-bold">
              {p.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">Age {p.age} · {p.visits} visits</div>
            </div>
            <div className="text-[11px] text-muted-foreground">{p.last}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientsView() {
  const patients = [
    { name: "Anita Kumar", age: 34, phone: "+91 98765 11111", last: "Today", visits: 4, status: "Active" },
    { name: "Vikram Roy", age: 52, phone: "+91 98765 22222", last: "Yesterday", visits: 12, status: "Active" },
    { name: "Sneha Bose", age: 28, phone: "+91 98765 33333", last: "2 days ago", visits: 2, status: "New" },
    { name: "Rahul Das", age: 41, phone: "+91 98765 44444", last: "1 week ago", visits: 8, status: "Active" },
    { name: "Meera Pal", age: 36, phone: "+91 98765 55555", last: "2 weeks ago", visits: 3, status: "Inactive" },
  ];
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold">Patients ({patients.length})</h2>
        <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold inline-flex items-center gap-1"><Plus className="h-3.5 w-3.5" /> Add patient</button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="text-left px-6 py-3 font-medium">Name</th>
            <th className="text-left px-6 py-3 font-medium">Age</th>
            <th className="text-left px-6 py-3 font-medium">Phone</th>
            <th className="text-left px-6 py-3 font-medium">Visits</th>
            <th className="text-left px-6 py-3 font-medium">Last visit</th>
            <th className="text-left px-6 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {patients.map((p) => (
            <tr key={p.name} className="hover:bg-secondary/50">
              <td className="px-6 py-3 font-medium">{p.name}</td>
              <td className="px-6 py-3 font-mono">{p.age}</td>
              <td className="px-6 py-3 font-mono text-muted-foreground">{p.phone}</td>
              <td className="px-6 py-3 font-mono">{p.visits}</td>
              <td className="px-6 py-3 text-muted-foreground">{p.last}</td>
              <td className="px-6 py-3"><StatusChip s={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScheduleView() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["9:00", "10:00", "11:00", "12:00", "4:00", "5:00", "6:00", "7:00"];
  return (
    <div className="rounded-xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-semibold text-lg">Weekly schedule</h2>
          <p className="text-xs text-muted-foreground">Tap a slot to toggle availability</p>
        </div>
        <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold">Save changes</button>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-2 min-w-[640px]">
          <div></div>
          {days.map(d => <div key={d} className="text-center text-xs font-semibold text-muted-foreground">{d}</div>)}
          {slots.map(s => (
            <Fragment key={s}>
              <div className="text-xs text-muted-foreground font-mono py-2">{s}</div>
              {days.map((d, i) => {
                const off = (i === 6) || (i === 0 && s.startsWith("4"));
                return (
                  <button key={d+s} className={`h-10 rounded-md text-[11px] font-medium border transition ${
                    off ? "bg-muted text-muted-foreground border-border" : "bg-success-soft text-success border-success/20 hover:bg-success hover:text-success-foreground"
                  }`}>
                    {off ? "Off" : "Open"}
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function EarningsView() {
  const days = [{d:"Mon",v:60},{d:"Tue",v:78},{d:"Wed",v:52},{d:"Thu",v:88},{d:"Fri",v:95},{d:"Sat",v:70},{d:"Sun",v:45}];
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold">Earnings this week</h2>
          <span className="text-xs text-success font-semibold">+22% vs last week</span>
        </div>
        <div className="flex items-end justify-between gap-2 h-48">
          {days.map(c => (
            <div key={c.d} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-muted-foreground">₹{Math.round(c.v * 80)}</div>
              <div className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary-glow" style={{height:`${c.v}%`}} />
              <div className="text-xs text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-5 space-y-3">
        <h2 className="font-semibold">Payout snapshot</h2>
        {[
          { label: "Today", value: "₹8,400", delta: "+22%" },
          { label: "This week", value: "₹52,200", delta: "+18%" },
          { label: "This month", value: "₹2.1L", delta: "+24%" },
          { label: "Pending payout", value: "₹14,800", delta: "Friday" },
        ].map(r => (
          <div key={r.label} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-3">
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

function ReviewsView() {
  const reviews = [
    { name: "Anita Kumar", rating: 5, date: "2 days ago", comment: "Dr. Kapoor was very thorough and patient. Cleared all my doubts about my skin treatment." },
    { name: "Vikram Roy", rating: 5, date: "1 week ago", comment: "Excellent doctor. Clinic is clean and well-managed. Highly recommended." },
    { name: "Meera Pal", rating: 4, date: "2 weeks ago", comment: "Good consultation. Slight wait time but treatment was effective." },
  ];
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
      <div className="rounded-xl bg-card border border-border p-6 text-center">
        <div className="text-5xl font-bold text-warning">4.8</div>
        <div className="flex justify-center gap-0.5 mt-2">
          {Array.from({length:5}).map((_,i) => <Star key={i} className="h-5 w-5 fill-warning text-warning" />)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">Based on 184 reviews</div>
        <div className="mt-5 space-y-2">
          {[5,4,3,2,1].map(n => (
            <div key={n} className="flex items-center gap-2 text-xs">
              <span className="w-3">{n}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-warning" style={{width: `${[80,15,3,1,1][5-n]}%`}} />
              </div>
              <span className="w-8 text-right text-muted-foreground">{[80,15,3,1,1][5-n]}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-card border border-border p-5 space-y-4">
        <h2 className="font-semibold">Recent reviews</h2>
        {reviews.map((r,i) => (
          <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">{r.name}</div>
              <div className="flex items-center gap-0.5">
                {Array.from({length:5}).map((_,i) => <Star key={i} className={`h-3.5 w-3.5 ${i<r.rating?"fill-warning text-warning":"text-muted"}`} />)}
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground">{r.date}</div>
            <p className="mt-1.5 text-sm text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  const [name, setName] = useState("SkinCare Clinic");
  const [fee, setFee] = useState("600");
  return (
    <div className="rounded-xl bg-card border border-border p-6 space-y-4 max-w-2xl">
      <h2 className="font-semibold text-lg flex items-center gap-2"><Stethoscope className="h-5 w-5 text-primary" /> Clinic settings</h2>
      <div>
        <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Clinic name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Consultation fee (₹)</label>
        <input value={fee} onChange={(e)=>setFee(e.target.value)} className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary font-mono" />
      </div>
      <button className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Save changes</button>
    </div>
  );
}
