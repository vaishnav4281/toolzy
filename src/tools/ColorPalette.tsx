import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/** HEX <-> RGB <-> HSL converter + palette generator (complementary / analogous / triadic). */
export default function ColorPalette() {
  const [hex, setHex] = useState("#4f46e5");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const palettes = useMemo(() => {
    if (!hsl) return null;
    const { h, s, l } = hsl;
    return {
      complementary: [hsl, { h: (h + 180) % 360, s, l }].map(hslToHex),
      analogous: [-30, 0, 30].map((d) => hslToHex({ h: (h + d + 360) % 360, s, l })),
      triadic: [0, 120, 240].map((d) => hslToHex({ h: (h + d) % 360, s, l })),
      monochrome: [0.35, 0.55, 0.7, 0.85].map((nl) => hslToHex({ h, s, l: nl * 100 })),
    };
  }, [hsl]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="card-premium p-5 space-y-4">
        <label className="block text-sm font-medium">Pick a color</label>
        <div className="flex gap-3 items-center">
          <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 rounded-md border border-border bg-transparent" />
          <input value={hex} onChange={(e) => setHex(e.target.value)} className="flex-1 rounded-md border border-input bg-card px-3 py-2 font-mono text-sm" />
        </div>
        <div className="rounded-md border border-border overflow-hidden">
          <div className="h-24" style={{ background: hex }} />
          <div className="p-3 grid gap-1 text-xs font-mono">
            <Row label="HEX" value={hex.toUpperCase()} />
            {rgb && <Row label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />}
            {hsl && <Row label="HSL" value={`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`} />}
          </div>
        </div>
        <TrustBadge />
      </div>
      <div className="space-y-5">
        {palettes && (Object.entries(palettes) as [string, string[]][]).map(([name, cols]) => (
          <div key={name} className="card-premium p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{name}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {cols.map((c, i) => (
                <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="group rounded-md overflow-hidden border border-border text-left">
                  <div className="h-20" style={{ background: c }} />
                  <div className="px-2 py-1.5 text-xs font-mono flex items-center justify-between">
                    <span>{c.toUpperCase()}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-[10px]">copy</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <button onClick={() => navigator.clipboard.writeText(value)} className="hover:text-primary">{value}</button>
    </div>
  );
}

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}
function hslToHex({ h, s, l }: { h: number; s: number; l: number }) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`;
}