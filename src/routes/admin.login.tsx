import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Navbar";
import { ShieldCheck, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin login — MedConnect" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-elevated p-7">
        <div className="text-center mb-6"><Logo /></div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="h-3 w-3" /> Super Admin
        </div>
        <h1 className="text-xl font-bold">Platform sign in</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-5">Restricted area · MedConnect team only</p>
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 focus-within:border-primary">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input type="email" defaultValue="admin@medconnect.in" className="flex-1 bg-transparent py-2.5 text-sm outline-none" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-input px-3 focus-within:border-primary">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input type="password" defaultValue="••••••••" className="flex-1 bg-transparent py-2.5 text-sm outline-none font-mono" />
          </div>
        </div>
        <Link to="/admin/dashboard" className="mt-5 block text-center rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition">
          Sign in
        </Link>
        <div className="mt-4 text-center text-xs">
          <Link to="/staff/login" className="text-muted-foreground hover:text-foreground">Hospital staff login</Link>
        </div>
      </div>
    </div>
  );
}
