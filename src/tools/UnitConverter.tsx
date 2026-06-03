import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

type Category = "length" | "weight" | "temperature" | "volume" | "speed";

// Factors are to a canonical base unit per category.
const UNITS: Record<Category, { base: string; factors: Record<string, number> }> = {
  length: { base: "m", factors: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 } },
  weight: { base: "g", factors: { mg: 0.001, g: 1, kg: 1000, oz: 28.3495, lb: 453.592 } },
  temperature: { base: "C", factors: {} }, // special-cased
  volume: { base: "ml", factors: { ml: 1, l: 1000, tsp: 4.92892, tbsp: 14.7868, cup: 236.588, "fl oz": 29.5735, gal: 3785.41 } },
  speed: { base: "m/s", factors: { "m/s": 1, "km/h": 0.277778, mph: 0.44704, knot: 0.514444 } },
};

const TEMP_UNITS = ["C", "F", "K"] as const;
type Temp = (typeof TEMP_UNITS)[number];

function tempTo(value: number, from: Temp, to: Temp): number {
  let c: number;
  if (from === "C") c = value;
  else if (from === "F") c = (value - 32) * (5 / 9);
  else c = value - 273.15;
  if (to === "C") return c;
  if (to === "F") return c * (9 / 5) + 32;
  return c + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState("m");

  const unitList = category === "temperature" ? [...TEMP_UNITS] : Object.keys(UNITS[category].factors);

  function convert(target: string): string {
    if (category === "temperature") {
      const v = tempTo(value, from as Temp, target as Temp);
      return Number.isFinite(v) ? round(v) : "—";
    }
    const f = UNITS[category].factors;
    if (!(from in f) || !(target in f)) return "—";
    const inBase = value * f[from];
    const out = inBase / f[target];
    return round(out);
  }

  return (
    <div className="space-y-6">
      <div className="card-premium p-4 flex flex-wrap gap-2">
        {(["length", "weight", "temperature", "volume", "speed"] as Category[]).map((c) => (
          <button
            key={c}
            onClick={() => {
              setCategory(c);
              setFrom(c === "temperature" ? "C" : Object.keys(UNITS[c].factors)[0]);
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize ${category === c ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="card-premium p-5 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="text-muted-foreground block text-xs">Value</span>
          <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)} className="mt-1 w-40 rounded-md border border-input bg-card px-3 py-2 text-sm" />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground block text-xs">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="mt-1 rounded-md border border-input bg-card px-3 py-2 text-sm">
            {unitList.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>
        <TrustBadge />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {unitList.filter((u) => u !== from).map((u) => (
          <div key={u} className="card-premium p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{u}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{convert(u)}</div>
            <button
              onClick={() => navigator.clipboard.writeText(convert(u))}
              className="mt-2 text-[11px] text-muted-foreground hover:text-foreground"
            >
              copy →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function round(n: number): string {
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toFixed(2);
  if (abs >= 1) return n.toFixed(4);
  return n.toPrecision(4);
}