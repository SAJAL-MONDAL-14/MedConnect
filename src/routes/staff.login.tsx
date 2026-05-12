import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Navbar";
import { Mail, Lock, Building2 } from "lucide-react";

export const Route = createFileRoute("/staff/login")({
  head: () => ({ meta: [{ title: "Staff login — MedConnect" }] }),
  component: StaffLogin,
});

function StaffLogin() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-10 text-white relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <Logo className="text-white" />
        <div>
          <Building2 className="h-12 w-12 mb-6 opacity-80" strokeWidth={1.2} />
          <h2 className="text-3xl font-bold leading-tight">Real-time bed updates,<br/>powered by your team.</h2>
          <p className="mt-4 text-white/70 max-w-md">Update availability in seconds. Patients see the changes immediately. No more phone calls or admission delays.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { v: "48", l: "Hospitals" },
              { v: "1.2k", l: "Bookings/day" },
              { v: "<2s", l: "Update lag" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-white/10 backdrop-blur border border-white/15 p-3">
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-xs text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-white/50">© 2025 MedConnect Health</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6"><Logo /></div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Hospital Portal</div>
          <h1 className="text-2xl font-bold">Staff sign in</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Use the credentials provided by your admin.</p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Work email</label>
              <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 focus-within:border-primary">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input type="email" defaultValue="ravi@nbmc.in" className="flex-1 bg-transparent py-2.5 text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Password</label>
              <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 focus-within:border-primary">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input type="password" defaultValue="••••••••" className="flex-1 bg-transparent py-2.5 text-sm outline-none font-mono" />
              </div>
            </div>
          </div>

          <Link to="/staff/dashboard" className="mt-5 block text-center rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition">
            Sign in to dashboard
          </Link>

          <div className="mt-4 flex justify-between text-xs">
            <Link to="/login" className="text-muted-foreground hover:text-foreground">Patient login</Link>
            <a className="text-primary hover:underline cursor-pointer">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
