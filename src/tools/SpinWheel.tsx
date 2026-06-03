import { useEffect, useRef, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Tool D — Spin The Wheel (Random Name Picker)
 * ----------------------------------------------------------------
 * PURE-CANVAS GAME LOGIC:
 *  - Names are stored in React state and rendered as wedges on a 2D canvas
 *  - On spin: a random target angle is picked via Math.random()
 *  - An exponential ease-out (1 - (1-t)^3) drives smooth deceleration
 *    over a fixed duration (5s), framed with requestAnimationFrame
 *  - On stop, the wedge under the top pointer (12 o'clock) wins
 *  - No external graphics or physics library — ~120 lines, instant load
 */
const PALETTE = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#06b6d4", "#ec4899", "#84cc16", "#f97316", "#0ea5e9",
];

export default function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [names, setNames] = useState<string[]>(["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank"]);
  const [input, setInput] = useState("Alice\nBob\nCharlie\nDana\nEve\nFrank");
  const [rotation, setRotation] = useState(0); // radians
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  // Draw whenever rotation or names change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 8;
    ctx.clearRect(0, 0, size, size);

    if (names.length === 0) return;
    const slice = (Math.PI * 2) / names.length;

    for (let i = 0; i < names.length; i++) {
      const start = rotation + i * slice;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = PALETTE[i % PALETTE.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "600 14px ui-sans-serif, system-ui";
      const label = names[i].length > 18 ? names[i].slice(0, 17) + "…" : names[i];
      ctx.fillText(label, r - 14, 5);
      ctx.restore();
    }

    // hub
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "rgba(15,23,42,0.15)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [rotation, names]);

  const spin = () => {
    if (spinning || names.length === 0) return;
    setWinner(null);
    setSpinning(true);

    const start = performance.now();
    const duration = 5000;
    const startRot = rotation;
    const turns = 5 + Math.random() * 3;
    const targetRot = startRot + turns * Math.PI * 2;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const current = startRot + (targetRot - startRot) * eased;
      setRotation(current);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // pointer is at 12 o'clock => -PI/2
        const slice = (Math.PI * 2) / names.length;
        const normalized = ((-current - Math.PI / 2) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const idx = Math.floor(normalized / slice);
        setWinner(names[idx]);
        setSpinning(false);
      }
    };
    requestAnimationFrame(tick);
  };

  const apply = () => {
    const list = input.split("\n").map((s) => s.trim()).filter(Boolean);
    setNames(list);
    setWinner(null);
    setRotation(0);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="card-premium p-6 grid place-items-center relative">
        <div className="relative">
          {/* pointer */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-2 z-10"
            style={{ width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "20px solid var(--color-primary)" }}
          />
          <canvas ref={canvasRef} width={420} height={420} className="rounded-full shadow-lg" />
        </div>
        <button
          onClick={spin}
          disabled={spinning || names.length === 0}
          className="mt-6 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-95 disabled:opacity-40"
        >
          {spinning ? "Spinning…" : "Spin"}
        </button>
        {winner && (
          <div className="mt-4 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Winner</div>
            <div className="text-2xl font-semibold text-accent">{winner} 🎉</div>
          </div>
        )}
      </div>

      <div className="card-premium p-6">
        <label className="block text-sm font-medium">Names (one per line)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 w-full min-h-[260px] resize-y rounded-md border border-input bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <button
          onClick={apply}
          className="mt-3 w-full rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold hover:bg-secondary/80"
        >
          Update Wheel
        </button>
        <TrustBadge />
      </div>
    </div>
  );
}