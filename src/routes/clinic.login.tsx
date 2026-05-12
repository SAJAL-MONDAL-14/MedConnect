import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Navbar";
import { Mail, Lock, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/clinic/login")({
  head: () => ({ meta: [{ title: "Clinic doctor login — MedConnect" }] }),
  component: ClinicLogin,
});

function ClinicLogin() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand */}
      <div className="hidden lg:flex flex-col justify-between p-10 text-white relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-foreground">
        <Logo className="text-white" />
        <div>
          <Stethoscope className="h-12 w-12 mb-6 opacity-80" strokeWidth={1.2} />
          <h2 className="text-3xl font-bold leading-tight">Run your clinic.<br/>Grow your practice.</h2>
          <p className="mt-4 text-white/70 max-w-md">Manage appointments, patients, and earnings from one beautiful dashboard built for independent doctors.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              { v: "320+", l: "Clinic doctors" },
              { v: "12k", l: "Bookings/mo" },
              { v: "4.8★", l: "Avg rating" },
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
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">Clinic Doctor Portal</div>
          <h1 className="text-2xl font-bold">Doctor sign in</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Manage your clinic appointments and patients.</p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Email or phone</label>
              <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 focus-within:border-primary">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input type="email" defaultValue="dr.kapoor@skincare.in" className="flex-1 bg-transparent py-2.5 text-sm outline-none" />
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

          <Link to="/clinic/dashboard" className="mt-5 block text-center rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition">
            Sign in to clinic
          </Link>

          <div className="mt-4 flex justify-between text-xs">
            <Link to="/login" className="text-muted-foreground hover:text-foreground">Patient login</Link>
            <Link to="/staff/login" className="text-muted-foreground hover:text-foreground">Hospital staff</Link>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-primary-soft text-xs">
            <div className="font-semibold text-primary mb-1">New to MedConnect?</div>
            <span className="text-muted-foreground">Register your clinic to start receiving online bookings. </span>
            <a className="text-primary font-semibold hover:underline cursor-pointer">Apply now →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
