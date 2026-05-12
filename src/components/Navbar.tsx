import { Link } from "@tanstack/react-router";
import { Siren } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`text-xl font-bold tracking-tight ${className}`}>
      <span className="text-foreground">Med</span>
      <span className="text-primary">Connect</span>
    </Link>
  );
}

export function SOSPill({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <Link
      to="/sos"
      className={`relative inline-flex items-center gap-1.5 rounded-full bg-emergency text-emergency-foreground font-semibold sos-btn hover:opacity-90 transition ${
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"
      }`}
    >
      <Siren className="h-3.5 w-3.5" strokeWidth={2.2} />
      SOS
    </Link>
  );
}

export function LangSwitcher() {
  const langs = ["EN", "हि", "বা"];
  return (
    <div className="hidden md:inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs">
      {langs.map((l, i) => (
        <button
          key={l}
          className={`px-2.5 py-1 rounded-full transition ${
            i === 0 ? "bg-primary-soft text-primary font-medium" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

interface NavbarProps {
  active?: "hospitals" | "doctors" | "clinics" | "labs" | "emergency";
}

export function Navbar({ active }: NavbarProps) {
  const links: { label: string; key: NavbarProps["active"]; to: string }[] = [
    { label: "Hospitals", key: "hospitals", to: "/search" },
    { label: "Doctors", key: "doctors", to: "/doctors" },
    { label: "Clinics", key: "clinics", to: "/clinics" },
    { label: "Labs", key: "labs", to: "/labs" },
    { label: "Emergency", key: "emergency", to: "/sos" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`text-sm transition ${
                  active === l.key ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-sm font-medium rounded-md border border-border hover:border-primary hover:text-primary transition"
          >
            Login
          </Link>
          <SOSPill />
        </div>
      </div>
    </header>
  );
}
