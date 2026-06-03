import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Premium QR generator with multiple downloadable design templates.
 * Every preset renders to an offscreen canvas locally — no uploads.
 */

type Shape = "square" | "rectangle" | "story" | "card" | "ticket" | "polaroid";

interface Preset {
  id: string;
  name: string;
  shape: Shape;
  bg: string | { type: "gradient"; from: string; to: string; angle?: number };
  dark: string;
  light: string;
  accent: string;
  caption?: string;
  textColor?: string;
}

const PRESETS: Preset[] = [
  { id: "classic",  name: "Classic",        shape: "square",    bg: "#ffffff", dark: "#0f172a", light: "#ffffff", accent: "#0f172a" },
  { id: "midnight", name: "Midnight",       shape: "square",    bg: "#0f172a", dark: "#ffffff", light: "#0f172a", accent: "#ffffff", textColor: "#e2e8f0" },
  { id: "indigo",   name: "Indigo Gradient",shape: "rectangle", bg: { type: "gradient", from: "#4f46e5", to: "#06b6d4" }, dark: "#0f172a", light: "#ffffff", accent: "#ffffff", caption: "SCAN ME", textColor: "#ffffff" },
  { id: "sunset",   name: "Sunset",         shape: "rectangle", bg: { type: "gradient", from: "#f97316", to: "#db2777" }, dark: "#1a0b1a", light: "#ffffff", accent: "#ffffff", caption: "TAP TO OPEN", textColor: "#ffffff" },
  { id: "emerald",  name: "Emerald",        shape: "card",      bg: "#ecfdf5", dark: "#064e3b", light: "#ecfdf5", accent: "#10b981", caption: "Scan with camera", textColor: "#064e3b" },
  { id: "noir",     name: "Noir & Gold",    shape: "card",      bg: "#0a0a0a", dark: "#f0d78c", light: "#0a0a0a", accent: "#c9a84c", caption: "PRIVATE LINK", textColor: "#f0d78c" },
  { id: "ticket",   name: "Event Ticket",   shape: "ticket",    bg: "#ffffff", dark: "#111827", light: "#ffffff", accent: "#4f46e5", caption: "ADMIT ONE", textColor: "#111827" },
  { id: "story",    name: "Story (9:16)",   shape: "story",     bg: { type: "gradient", from: "#312e81", to: "#0f172a", angle: 160 }, dark: "#ffffff", light: "#312e81", accent: "#fbbf24", caption: "SCAN ME", textColor: "#ffffff" },
  { id: "polaroid", name: "Polaroid",       shape: "polaroid",  bg: "#ffffff", dark: "#0f172a", light: "#ffffff", accent: "#0f172a", caption: "burnertools.app", textColor: "#0f172a" },
];

export default function QrGenerator() {
  const [text, setText] = useState("https://burnertools.app");
  const [caption, setCaption] = useState("");
  const [activeId, setActiveId] = useState<string>("indigo");
  const previewRef = useRef<HTMLCanvasElement>(null);
  const active = useMemo(() => PRESETS.find((p) => p.id === activeId)!, [activeId]);

  useEffect(() => {
    if (!previewRef.current) return;
    renderPreset(previewRef.current, text, { ...active, caption: caption || active.caption }, 720);
  }, [text, caption, active]);

  const download = (preset: Preset) => {
    const c = document.createElement("canvas");
    renderPreset(c, text, { ...preset, caption: caption || preset.caption }, 1600);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `qr-${preset.id}.png`;
    a.click();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <div className="card-premium p-6 h-fit">
        <label className="block text-sm font-medium">Text or URL</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-2 w-full min-h-[120px] resize-y rounded-md border border-input bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <label className="mt-4 block text-sm font-medium">Caption (optional)</label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder={active.caption ?? "Adds a label under the QR"}
          className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <button
          onClick={() => download(active)}
          className="mt-5 w-full rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-sm hover:opacity-95"
        >
          Download "{active.name}" (PNG)
        </button>
        <TrustBadge />
      </div>

      <div className="space-y-6">
        <div className="card-premium p-4 grid place-items-center bg-secondary/40">
          <canvas ref={previewRef} className="max-w-full h-auto rounded-md shadow-sm" />
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Choose a design — click to preview, then download
          </h3>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {PRESETS.map((p) => (
              <PresetCard key={p.id} preset={p} active={p.id === activeId} text={text} caption={caption} onSelect={() => setActiveId(p.id)} onDownload={() => download(p)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PresetCard({ preset, active, text, caption, onSelect, onDownload }: { preset: Preset; active: boolean; text: string; caption: string; onSelect: () => void; onDownload: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    renderPreset(ref.current, text, { ...preset, caption: caption || preset.caption }, 320);
  }, [text, caption, preset]);
  return (
    <div className={`rounded-lg border ${active ? "border-primary ring-2 ring-primary/30" : "border-border"} bg-card p-2 transition`}> 
      <button onClick={onSelect} className="block w-full">
        <canvas ref={ref} className="w-full h-auto rounded-md" />
      </button>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium truncate">{preset.name}</span>
        <button
          onClick={onDownload}
          className="rounded-md border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider hover:border-primary/60 hover:text-primary"
        >
          PNG
        </button>
      </div>
    </div>
  );
}

/** Draw a preset to a target canvas synchronously enough for our needs. */
function renderPreset(target: HTMLCanvasElement, text: string, preset: Preset, baseW: number) {
  const { shape } = preset;
  // Define dimensions for each shape
  let W = baseW, H = baseW;
  if (shape === "rectangle") { W = baseW; H = Math.round(baseW * 0.6); }
  if (shape === "story")     { W = Math.round(baseW * 0.5625); H = baseW; }
  if (shape === "card")      { W = baseW; H = Math.round(baseW * 1.1); }
  if (shape === "ticket")    { W = baseW; H = Math.round(baseW * 0.45); }
  if (shape === "polaroid")  { W = baseW; H = Math.round(baseW * 1.18); }

  target.width = W; target.height = H;
  const ctx = target.getContext("2d")!;

  // Background
  if (typeof preset.bg === "string") {
    ctx.fillStyle = preset.bg;
    ctx.fillRect(0, 0, W, H);
  } else {
    const angle = (preset.bg.angle ?? 135) * Math.PI / 180;
    const x = Math.cos(angle) * W, y = Math.sin(angle) * H;
    const g = ctx.createLinearGradient(0, 0, x, y);
    g.addColorStop(0, preset.bg.from);
    g.addColorStop(1, preset.bg.to);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // Generate QR off-screen
  const qrCanvas = document.createElement("canvas");
  // Make hi-res QR — independent of preset.
  const qrSize = Math.round(Math.min(W, H) * (shape === "rectangle" || shape === "ticket" ? 0.78 : 0.62));
  try {
    // Sync API — we accept the slight cost in exchange for atomic redraws
    // (qrcode v1 exposes a sync renderer via toDataURL but we want a canvas).
    QRCode.toCanvas(qrCanvas, text || " ", {
      width: qrSize,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: preset.dark, light: preset.light },
    });
  } catch {/* noop */}

  // Layout
  if (shape === "rectangle" || shape === "ticket") {
    // QR on left, caption on right
    const pad = Math.round(H * 0.08);
    const qx = pad;
    const qy = (H - qrSize) / 2;
    drawRoundedImage(ctx, qrCanvas, qx, qy, qrSize, qrSize, Math.round(qrSize * 0.06), preset.light);
    // Right text block
    const tx = qx + qrSize + pad;
    const tw = W - tx - pad;
    ctx.fillStyle = preset.textColor || preset.accent;
    ctx.textBaseline = "top";
    ctx.font = `700 ${Math.round(H * 0.13)}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`;
    wrapText(ctx, preset.caption || "SCAN ME", tx, H * 0.22, tw, Math.round(H * 0.15));
    ctx.font = `500 ${Math.round(H * 0.06)}px ui-sans-serif, system-ui`;
    ctx.fillText("burnertools.app", tx, H - pad - Math.round(H * 0.08));
    if (shape === "ticket") drawTicketNotches(ctx, W, H, preset);
  } else if (shape === "story") {
    const qx = (W - qrSize) / 2;
    const qy = (H - qrSize) / 2 - Math.round(H * 0.04);
    drawRoundedImage(ctx, qrCanvas, qx, qy, qrSize, qrSize, 18, preset.light);
    ctx.fillStyle = preset.textColor || "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = `800 ${Math.round(W * 0.09)}px ui-sans-serif, system-ui`;
    ctx.fillText(preset.caption || "SCAN ME", W / 2, qy + qrSize + Math.round(H * 0.04));
    ctx.font = `500 ${Math.round(W * 0.04)}px ui-sans-serif, system-ui`;
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText("made with burnertools.app", W / 2, H - Math.round(H * 0.06));
    ctx.textAlign = "start";
  } else if (shape === "card") {
    const qx = (W - qrSize) / 2;
    const qy = Math.round(H * 0.08);
    drawRoundedImage(ctx, qrCanvas, qx, qy, qrSize, qrSize, 14, preset.light);
    ctx.fillStyle = preset.textColor || preset.accent;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = `700 ${Math.round(W * 0.055)}px ui-sans-serif, system-ui`;
    ctx.fillText(preset.caption || "Scan with your camera", W / 2, qy + qrSize + Math.round(H * 0.04));
    ctx.font = `500 ${Math.round(W * 0.03)}px ui-sans-serif, system-ui`;
    ctx.fillStyle = preset.accent;
    ctx.fillText("burnertools.app", W / 2, H - Math.round(H * 0.06));
    ctx.textAlign = "start";
  } else if (shape === "polaroid") {
    // White card with shadow-y inner border around QR + handwritten-style caption
    const pad = Math.round(W * 0.05);
    const qx = (W - qrSize) / 2;
    const qy = pad;
    ctx.drawImage(qrCanvas, qx, qy, qrSize, qrSize);
    ctx.fillStyle = preset.textColor || "#111";
    ctx.textAlign = "center";
    ctx.font = `italic 600 ${Math.round(W * 0.055)}px "Snell Roundhand", "Apple Chancery", cursive, ui-sans-serif`;
    ctx.fillText(preset.caption || "scan me ✨", W / 2, qy + qrSize + Math.round(H * 0.06));
    ctx.textAlign = "start";
  } else {
    // square
    const qx = (W - qrSize) / 2;
    const qy = (H - qrSize) / 2;
    ctx.drawImage(qrCanvas, qx, qy, qrSize, qrSize);
  }
}

function drawRoundedImage(ctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, w: number, h: number, r: number, bg: string) {
  // White padded plate so QR stays readable on any background
  const pad = Math.round(w * 0.04);
  ctx.save();
  roundRect(ctx, x - pad, y - pad, w + pad * 2, h + pad * 2, r + pad);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.restore();
  ctx.drawImage(img, x, y, w, h);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawTicketNotches(ctx: CanvasRenderingContext2D, W: number, H: number, preset: Preset) {
  const r = Math.round(H * 0.08);
  const bg = "var(--page-bg)";
  // Punch two circles on left/right using background blend — approximate with primary bg color
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath(); ctx.arc(0, H / 2, r, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W, H / 2, r, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  void bg;
  void preset;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, yy);
      line = w;
      yy += lineH;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, yy);
}