import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function BoxShadow() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(20);
  const [blur, setBlur] = useState(40);
  const [spread, setSpread] = useState(-10);
  const [color, setColor] = useState("#4f46e5");
  const [alpha, setAlpha] = useState(0.35);
  const [inset, setInset] = useState(false);

  const css = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${withAlpha(color, alpha)}`;
  const full = `box-shadow: ${css};`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-5 space-y-3">
        {[
          { label: "X offset", v: x, set: setX, min: -100, max: 100 },
          { label: "Y offset", v: y, set: setY, min: -100, max: 100 },
          { label: "Blur", v: blur, set: setBlur, min: 0, max: 200 },
          { label: "Spread", v: spread, set: setSpread, min: -50, max: 100 },
        ].map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-xs"><span>{r.label}</span><span className="font-mono">{r.v}px</span></div>
            <input type="range" min={r.min} max={r.max} value={r.v} onChange={(e) => r.set(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
          </div>
        ))}
        <div>
          <div className="flex justify-between text-xs"><span>Opacity</span><span className="font-mono">{alpha.toFixed(2)}</span></div>
          <input type="range" min={0} max={1} step={0.01} value={alpha} onChange={(e) => setAlpha(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
        </div>
        <div className="flex items-center gap-3">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 rounded-md border border-border bg-transparent" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} /> Inset</label>
        </div>
        <pre className="rounded-md bg-secondary p-3 font-mono text-xs whitespace-pre-wrap break-all">{full}</pre>
        <button onClick={() => navigator.clipboard.writeText(full)} className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-semibold">Copy CSS</button>
        <TrustBadge />
      </div>
      <div className="card-premium p-6 grid place-items-center bg-secondary/40 min-h-[360px]">
        <div className="h-40 w-40 rounded-2xl bg-card border border-border" style={{ boxShadow: css }} />
      </div>
    </div>
  );
}

function withAlpha(hex: string, a: number) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${a})`;
}