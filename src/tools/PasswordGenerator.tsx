import { useEffect, useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const NUMS = "23456789";
const SYMS = "!@#$%^&*()-_=+[]{};:,.?";

function randInt(max: number) {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function generate(length: number, opts: { upper: boolean; lower: boolean; num: boolean; sym: boolean }) {
  let pool = "";
  if (opts.upper) pool += UPPER;
  if (opts.lower) pool += LOWER;
  if (opts.num) pool += NUMS;
  if (opts.sym) pool += SYMS;
  if (!pool) return "";
  let out = "";
  for (let i = 0; i < length; i++) out += pool[randInt(pool.length)];
  return out;
}

function strength(pwd: string): { label: string; pct: number; color: string } {
  if (!pwd) return { label: "—", pct: 0, color: "bg-muted" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 20) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: "Very weak", color: "bg-destructive" },
    { label: "Weak", color: "bg-destructive" },
    { label: "Okay", color: "bg-amber-500" },
    { label: "Good", color: "bg-amber-500" },
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Very strong", color: "bg-emerald-600" },
    { label: "Excellent", color: "bg-emerald-700" },
  ];
  const m = map[Math.min(score, 6)];
  return { label: m.label, pct: Math.min(100, (score / 6) * 100), color: m.color };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [num, setNum] = useState(true);
  const [sym, setSym] = useState(true);
  const [count, setCount] = useState(5);
  const [seed, setSeed] = useState(0);

  const passwords = useMemo(() => {
    void seed;
    return Array.from({ length: count }, () => generate(length, { upper, lower, num, sym }));
  }, [length, upper, lower, num, sym, count, seed]);

  useEffect(() => {
    setSeed((s) => s + 1);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card-premium p-5 space-y-4 lg:col-span-1">
        <label className="block text-sm">
          <span className="text-muted-foreground">Length: <strong className="text-foreground">{length}</strong></span>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full mt-2" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">How many?</span>
          <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.max(1, Math.min(20, +e.target.value)))} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
        </label>
        <div className="space-y-2 pt-2">
          <Toggle label="Uppercase (A–Z)" checked={upper} onChange={setUpper} />
          <Toggle label="Lowercase (a–z)" checked={lower} onChange={setLower} />
          <Toggle label="Numbers (0–9)" checked={num} onChange={setNum} />
          <Toggle label="Symbols (!@#…)" checked={sym} onChange={setSym} />
        </div>
        <button onClick={() => setSeed((s) => s + 1)} className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90">
          Regenerate
        </button>
        <TrustBadge />
      </div>
      <div className="card-premium p-5 lg:col-span-2 space-y-2">
        {passwords.map((p, i) => {
          const s = strength(p);
          return (
            <div key={i} className="rounded-md border border-border bg-card p-3">
              <div className="flex items-center justify-between gap-3">
                <code className="font-mono text-sm break-all">{p || "Select at least one character set"}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(p)}
                  className="shrink-0 rounded-md border border-border px-2.5 py-1 text-xs hover:bg-secondary"
                >
                  Copy
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-20 text-right">{s.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm cursor-pointer">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-primary" />
    </label>
  );
}