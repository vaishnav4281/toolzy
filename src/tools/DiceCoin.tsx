import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DiceCoin() {
  const [count, setCount] = useState(2);
  const [rolls, setRolls] = useState<number[]>([3, 5]);
  const [coin, setCoin] = useState<"Heads" | "Tails" | null>(null);
  const [spinning, setSpinning] = useState(false);

  const roll = () => {
    setSpinning(true);
    let t = 0;
    const id = setInterval(() => {
      setRolls(Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 6)));
      if (++t > 8) { clearInterval(id); setSpinning(false); }
    }, 60);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-6">
        <h3 className="text-sm font-semibold mb-3">🎲 Dice</h3>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm">Dice
            <input type="number" min={1} max={10} value={count} onChange={(e) => setCount(Math.max(1, Math.min(10, +e.target.value)))} className="ml-2 w-16 rounded-md border border-input bg-card px-2 py-1" />
          </label>
          <button onClick={roll} disabled={spinning} className="ml-auto rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50">Roll</button>
        </div>
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px] items-center">
          {rolls.map((r, i) => <span key={i} className="text-6xl">{FACES[r - 1]}</span>)}
        </div>
        <div className="mt-3 text-center text-sm text-muted-foreground">Sum: <strong className="text-foreground">{rolls.reduce((a, b) => a + b, 0)}</strong></div>
        <TrustBadge />
      </div>
      <div className="card-premium p-6">
        <h3 className="text-sm font-semibold mb-3">🪙 Coin</h3>
        <div className="grid place-items-center min-h-[140px]">
          <button onClick={() => setCoin(Math.random() < 0.5 ? "Heads" : "Tails")} className="h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 text-2xl font-bold text-yellow-900 shadow-lg hover:scale-105 transition">
            {coin ?? "Flip"}
          </button>
        </div>
      </div>
    </div>
  );
}