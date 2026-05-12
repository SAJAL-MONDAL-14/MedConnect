import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ChevronLeft, CreditCard, CheckCircle2, Building2, Wallet, Loader2 } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({ meta: [{ title: "Confirm booking — MedConnect" }] }),
  component: BookingPage,
});

type Step = 1 | 2;

function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("Rahul Das");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [note, setNote] = useState("");
  const [pay, setPay] = useState<"clinic" | "online">("clinic");
  const [submitting, setSubmitting] = useState(false);

  const valid = name.trim().length > 1 && /\d/.test(phone);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => navigate({ to: "/booking-success" }), 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[900px] mx-auto px-6 py-8">
        <Link to="/hospital/$id" params={{ id: "nbmc" }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to hospital
        </Link>

        <h1 className="text-2xl font-semibold mb-1">Confirm your booking</h1>
        <p className="text-sm text-muted-foreground mb-6">Review the details and confirm.</p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((n, i) => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {step > n ? <CheckCircle2 className="h-4 w-4" /> : n}
              </div>
              <span className={`text-xs font-medium ${step >= n ? "text-foreground" : "text-muted-foreground"}`}>
                {n === 1 ? "Patient details" : "Payment"}
              </span>
              {i === 0 && <div className={`flex-1 h-px ${step > 1 ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-4">
            <div className="rounded-xl bg-card border border-border p-5">
              <h2 className="font-semibold mb-4">Appointment</h2>
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">RS</div>
                <div>
                  <div className="font-semibold">Dr. Rajesh Sharma</div>
                  <div className="text-xs text-muted-foreground">Cardiologist · North Bengal Medical College</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                <div><div className="text-xs text-muted-foreground mb-1">Date</div><div className="font-medium">Friday, 2 May 2025</div></div>
                <div><div className="text-xs text-muted-foreground mb-1">Time</div><div className="font-medium font-mono">10:00 AM</div></div>
                <div><div className="text-xs text-muted-foreground mb-1">Room</div><div className="font-medium">OPD Block, Room 4</div></div>
                <div><div className="text-xs text-muted-foreground mb-1">Booking ID</div><div className="font-mono text-xs text-muted-foreground">Auto-generated</div></div>
              </div>
            </div>

            {step === 1 && (
              <div className="rounded-xl bg-card border border-border p-5">
                <h2 className="font-semibold mb-4">Patient details</h2>
                <div className="space-y-3">
                  <Field label="Full name" value={name} onChange={setName} />
                  <Field label="Phone" value={phone} onChange={setPhone} mono />
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Describe your symptoms (optional)</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="e.g. Chest pain for 2 days, mild shortness of breath..."
                      className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
                <button
                  disabled={!valid}
                  onClick={() => setStep(2)}
                  className="mt-5 w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition disabled:opacity-50"
                >
                  Continue to payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl bg-card border border-border p-5">
                <h2 className="font-semibold mb-4">Payment method</h2>
                <div className="space-y-2">
                  <PayOption
                    selected={pay === "clinic"}
                    onClick={() => setPay("clinic")}
                    icon={<Building2 className="h-5 w-5" />}
                    title="Pay at clinic"
                    desc="Pay ₹500 directly at hospital reception"
                  />
                  <PayOption
                    selected={pay === "online"}
                    onClick={() => setPay("online")}
                    icon={<Wallet className="h-5 w-5" />}
                    title="Pay online (Razorpay)"
                    desc="UPI, Card, Wallet, NetBanking"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button onClick={() => setStep(1)} className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">
                    Back
                  </button>
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold hover:bg-primary-dark transition disabled:opacity-70"
                  >
                    {submitting
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirming...</>
                      : <><CreditCard className="h-4 w-4" /> Confirm booking</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl bg-card border border-border p-5">
              <h3 className="font-semibold mb-3">Fee summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Consultation</span><span className="font-mono">₹500</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Platform fee</span><span className="font-mono">₹0</span></div>
                <div className="flex justify-between pt-3 border-t border-border font-semibold"><span>Total</span><span className="font-mono">₹500</span></div>
              </div>
              <div className="mt-4 rounded-md bg-success-soft border border-success/20 px-3 py-2 text-xs text-success">
                {pay === "clinic" ? "Pay ₹500 directly at the hospital" : "₹500 will be charged via Razorpay"}
              </div>
              <p className="mt-3 text-[11px] text-text-muted text-center">Free cancellation up to 2 hours before</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, mono }: { label: string; value: string; onChange: (v: string) => void; mono?: boolean }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md bg-input border border-border px-3 py-2 text-sm outline-none focus:border-primary ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}

function PayOption({ selected, onClick, icon, title, desc }: { selected: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg border-2 p-4 flex items-center gap-3 transition ${
        selected ? "border-primary bg-primary-soft" : "border-border bg-card hover:border-primary/50"
      }`}
    >
      <div className={`h-10 w-10 rounded-md flex items-center justify-center ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-primary bg-primary" : "border-border"}`}>
        {selected && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
      </div>
    </button>
  );
}
