import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VerifiedBadge } from "@/components/HospitalCard";
import { myBookings, sosContacts } from "@/lib/mockData";
import { Pencil, Upload, FileText, Trash2, Plus, MessageCircle, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My profile — MedConnect" }] }),
  component: ProfilePage,
});

const TABS = ["Bookings", "Health Records", "SOS Contacts", "Settings"] as const;

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)} className={`relative inline-flex h-6 w-11 rounded-full transition ${on ? "bg-success" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function ProfilePage() {
  const [tab, setTab] = useState<typeof TABS[number]>("Bookings");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-[700px] mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="rounded-xl bg-card border border-border p-5 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">RD</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg">Rahul Das</h1>
              <VerifiedBadge />
            </div>
            <div className="text-sm text-muted-foreground font-mono">+91 98765 43210</div>
          </div>
          <button className="text-primary text-sm inline-flex items-center gap-1 hover:underline"><Pencil className="h-3.5 w-3.5" /> Edit</button>
        </div>

        {/* Tabs */}
        <div className="sticky top-16 bg-background z-20 border-b border-border mt-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
          <div className="flex overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="py-5 space-y-5">
          {tab === "Bookings" && (
            <>
              <div>
                <h2 className="text-xs uppercase tracking-wider text-text-muted mb-2">Upcoming</h2>
                <div className="rounded-xl bg-card border border-border border-l-4 border-l-success p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-semibold">{myBookings[0].doctor}</div>
                      <div className="text-xs text-muted-foreground">{myBookings[0].specialty} · {myBookings[0].hospital}</div>
                    </div>
                    <span className="rounded-full bg-success-soft text-success px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">Confirmed</span>
                  </div>
                  <div className="text-sm text-primary font-medium">{myBookings[0].date} · {myBookings[0].time}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="text-xs rounded-md border border-border px-3 py-1.5 hover:border-emergency hover:text-emergency">Cancel</button>
                    <span className="text-xs text-text-muted font-mono">#{myBookings[0].id}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase tracking-wider text-text-muted mb-2">Past bookings</h2>
                <div className="space-y-2">
                  {myBookings.slice(1).map((b) => (
                    <div key={b.id} className="rounded-xl bg-card border border-border p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-medium text-sm">{b.doctor}</div>
                          <div className="text-xs text-muted-foreground">{b.specialty} · {b.hospital}</div>
                          <div className="text-xs text-muted-foreground mt-1">{b.date} · {b.time}</div>
                        </div>
                        <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">Completed</span>
                      </div>
                      <button className="mt-3 text-xs rounded-md border border-primary text-primary px-3 py-1.5 hover:bg-primary-soft">Book again</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "Health Records" && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Your records</h2>
                <button className="inline-flex items-center gap-1 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold hover:bg-primary-dark">
                  <Upload className="h-3.5 w-3.5" /> Upload
                </button>
              </div>
              {[
                { name: "ECG report", type: "Lab report", date: "12 Apr 2025" },
                { name: "Cardio prescription", type: "Prescription", date: "12 Apr 2025" },
                { name: "Chest X-Ray", type: "Scan", date: "5 Mar 2025" },
              ].map((r) => (
                <div key={r.name} className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary-soft text-primary flex items-center justify-center">
                    <FileText className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground"><span className="rounded bg-accent px-1.5 py-0.5 mr-1.5 text-[10px]">{r.type}</span>{r.date}</div>
                  </div>
                  <button className="text-xs text-primary font-medium hover:underline">View</button>
                </div>
              ))}
            </>
          )}

          {tab === "SOS Contacts" && (
            <>
              <div className="rounded-md bg-emergency-soft border border-emergency/20 px-4 py-3 text-xs text-emergency">
                These contacts are notified via WhatsApp when you trigger SOS.
              </div>
              {sosContacts.map((c) => (
                <div key={c.id} className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emergency text-emergency-foreground flex items-center justify-center font-bold text-sm">{c.id}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.relation} · <span className="font-mono">{c.phone}</span></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className={`h-4 w-4 ${c.whatsapp ? "text-success" : "text-text-muted"}`} />
                    <Toggle initial={c.whatsapp} />
                    <button className="text-text-muted hover:text-emergency p-1"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
              <button className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center justify-center gap-1">
                <Plus className="h-4 w-4" /> Add contact
              </button>
            </>
          )}

          {tab === "Settings" && (
            <>
              <div className="rounded-xl bg-card border border-border p-4">
                <h3 className="font-semibold text-sm mb-3">Language</h3>
                <div className="inline-flex rounded-full border border-border bg-secondary p-0.5">
                  {["EN", "हि", "বা"].map((l, i) => (
                    <button key={l} className={`px-4 py-1.5 rounded-full text-xs font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-card border border-border p-4 space-y-3">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <div className="flex items-center justify-between text-sm"><span>WhatsApp alerts</span><Toggle initial /></div>
                <div className="flex items-center justify-between text-sm"><span>SMS alerts</span><Toggle /></div>
              </div>
              <Link to="/login" className="block w-full text-center rounded-md border-2 border-emergency text-emergency py-2.5 text-sm font-bold hover:bg-emergency-soft transition inline-flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4" /> Log out
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
