import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Navbar";
import { ChevronLeft, Pencil } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — MedConnect" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-[380px] bg-card rounded-2xl border border-border shadow-elevated p-7">
        {step === 1 ? (
          <>
            <div className="text-center mb-6">
              <Logo />
            </div>
            <h1 className="text-xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Login with your mobile number</p>

            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Mobile number</label>
            <div className="flex items-stretch rounded-md border border-border overflow-hidden focus-within:border-primary transition">
              <span className="bg-primary-soft text-primary text-sm font-mono font-semibold px-3 flex items-center">+91</span>
              <input
                type="tel"
                placeholder="98765 43210"
                className="flex-1 bg-input px-3 py-2.5 text-sm outline-none font-mono"
                maxLength={10}
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition"
            >
              Send OTP
            </button>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Don't have an account? <a className="text-primary font-semibold hover:underline cursor-pointer">Register</a>
            </p>

            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-full border border-border p-0.5 bg-secondary">
                {["EN", "हि", "বা"].map((l, i) => (
                  <button key={l} className={`px-3 py-1 rounded-full text-xs font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm mb-4">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="text-xl font-bold">Verify your number</h1>
            <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-2">
              <span className="font-mono">+91 98765 43210</span>
              <button onClick={() => setStep(1)} className="text-primary"><Pencil className="h-3 w-3" /></button>
            </p>
            <p className="text-sm text-muted-foreground mt-4 mb-5">Enter the 6-digit code sent to your WhatsApp and SMS</p>

            <div className="flex justify-between gap-1.5">
              {otp.map((v, i) => (
                <input
                  key={i}
                  value={v}
                  onChange={(e) => {
                    const next = [...otp];
                    next[i] = e.target.value.slice(-1);
                    setOtp(next);
                    if (e.target.value && i < 5) (e.target.nextElementSibling as HTMLInputElement | null)?.focus();
                  }}
                  className={`h-14 w-12 text-center font-mono text-lg font-semibold rounded-md border bg-card outline-none transition ${
                    v ? "border-primary text-primary" : "border-border focus:border-primary"
                  }`}
                  maxLength={1}
                />
              ))}
            </div>

            <p className="mt-4 text-xs text-text-muted text-center font-mono">Resend OTP in 0:28</p>

            <Link to="/" className="mt-5 block text-center rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition">
              Verify
            </Link>
          </>
        )}
      </div>

      <div className="mt-6 text-xs text-text-muted text-center">
        <Link to="/clinic/login" className="hover:text-foreground">Clinic doctor</Link>
        <span className="mx-2">·</span>
        <Link to="/staff/login" className="hover:text-foreground">Hospital staff</Link>
        <span className="mx-2">·</span>
        <Link to="/admin/login" className="hover:text-foreground">Admin</Link>
      </div>
    </div>
  );
}
