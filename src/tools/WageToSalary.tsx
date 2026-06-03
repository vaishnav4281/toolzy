import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function WageToSalary() {
  const [wage, setWage] = useState(25);
  const [hours, setHours] = useState(40);
  const [weeks, setWeeks] = useState(52);

  const weekly = wage * hours;
  const annual = weekly * weeks;
  const monthly = annual / 12;
  const daily = weekly / 5;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-5 space-y-3">
        <Input label="Hourly wage ($)" value={wage} set={setWage} />
        <Input label="Hours / week" value={hours} set={setHours} />
        <Input label="Weeks / year" value={weeks} set={setWeeks} />
        <TrustBadge />
      </div>
      <div className="card-premium p-5 grid grid-cols-2 gap-3">
        <Stat label="Daily" value={daily} />
        <Stat label="Weekly" value={weekly} />
        <Stat label="Monthly" value={monthly} />
        <Stat label="Annual" value={annual} highlight />
      </div>
    </div>
  );
}
function Input({ label, value, set }: { label: string; value: number; set: (n: number) => void }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input type="number" value={value} onChange={(e) => set(+e.target.value)} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
    </label>
  );
}
function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-md p-4 border ${highlight ? "border-primary/50 bg-primary/5" : "border-border bg-secondary"}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-2xl font-semibold ${highlight ? "text-primary" : ""}`}>${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
    </div>
  );
}