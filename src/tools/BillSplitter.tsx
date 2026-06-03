import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function BillSplitter() {
  const [bill, setBill] = useState(120);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(4);
  const tipAmt = bill * (tip / 100);
  const total = bill + tipAmt;
  const each = people > 0 ? total / people : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-5 space-y-4">
        <label className="block text-sm"><span className="text-muted-foreground">Bill total ($)</span>
          <input type="number" value={bill} onChange={(e) => setBill(+e.target.value)} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2" />
        </label>
        <div>
          <div className="flex justify-between text-sm"><span>Tip</span><span className="font-mono">{tip}%</span></div>
          <input type="range" min={0} max={30} value={tip} onChange={(e) => setTip(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
          <div className="flex gap-1 mt-1">
            {[10, 15, 18, 20, 25].map((t) => <button key={t} onClick={() => setTip(t)} className={`flex-1 rounded border px-2 py-1 text-xs ${tip === t ? "border-primary text-primary" : "border-border"}`}>{t}%</button>)}
          </div>
        </div>
        <label className="block text-sm"><span className="text-muted-foreground">People</span>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, +e.target.value))} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2" />
        </label>
        <TrustBadge />
      </div>
      <div className="card-premium p-5 grid gap-3">
        <Row label="Tip" value={tipAmt} />
        <Row label="Total with tip" value={total} />
        <Row label="Per person" value={each} highlight />
      </div>
    </div>
  );
}
function Row({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-md border p-4 ${highlight ? "border-primary/50 bg-primary/5" : "border-border bg-secondary"}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-2xl font-semibold ${highlight ? "text-primary" : ""}`}>${value.toFixed(2)}</span>
    </div>
  );
}