import { useRef, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function SvgConverter() {
  const [svg, setSvg] = useState<string>("");
  const [scale, setScale] = useState(2);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<string>("");

  const handleFile = (f: File) => {
    const r = new FileReader();
    r.onload = () => setSvg(String(r.result || ""));
    r.readAsText(f);
  };

  const render = (download: boolean) => {
    if (!svg) { setStatus("Paste an SVG or drop a file first."); return; }
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    const el = doc.documentElement as unknown as SVGSVGElement;
    const w = Number(el.getAttribute("width")) || el.viewBox?.baseVal?.width || 512;
    const h = Number(el.getAttribute("height")) || el.viewBox?.baseVal?.height || 512;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = previewRef.current ?? document.createElement("canvas");
      c.width = w * scale; c.height = h * scale;
      const ctx = c.getContext("2d")!;
      if (format === "jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, c.width, c.height); }
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      if (download) {
        const a = document.createElement("a");
        a.href = c.toDataURL(format === "png" ? "image/png" : "image/jpeg", 0.92);
        a.download = `converted.${format}`;
        a.click();
      }
      setStatus(`Rendered at ${c.width}×${c.height}`);
    };
    img.onerror = () => setStatus("Could not parse SVG.");
    img.src = url;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-5 space-y-3">
        <label className="text-sm font-medium">SVG source</label>
        <textarea value={svg} onChange={(e) => setSvg(e.target.value)} placeholder="<svg …>" className="w-full min-h-[200px] rounded-md border border-input bg-card p-3 font-mono text-xs" />
        <input type="file" accept="image/svg+xml,.svg" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="text-xs" />
        <div className="flex items-center gap-4 text-sm">
          <label>Scale ×{scale}</label>
          <input type="range" min={1} max={6} value={scale} onChange={(e) => setScale(+e.target.value)} className="flex-1 accent-[var(--color-primary)]" />
        </div>
        <div className="flex gap-2">
          {(["png", "jpeg"] as const).map((f) => (
            <button key={f} onClick={() => setFormat(f)} className={`flex-1 rounded-md border px-3 py-2 text-xs font-semibold uppercase ${format === f ? "border-primary text-primary bg-primary/5" : "border-border"}`}>{f}</button>
          ))}
        </div>
        <button onClick={() => render(true)} className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-semibold">Download {format.toUpperCase()}</button>
        <button onClick={() => render(false)} className="w-full rounded-md border border-border py-2 text-xs">Preview only</button>
        {status && <p className="text-xs text-muted-foreground">{status}</p>}
        <TrustBadge />
      </div>
      <div className="card-premium p-5 grid place-items-center bg-secondary/40 min-h-[300px] overflow-auto">
        <canvas ref={previewRef} className="max-w-full h-auto rounded-md bg-white shadow-sm" />
      </div>
    </div>
  );
}