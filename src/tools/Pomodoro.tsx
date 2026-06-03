import { useEffect, useRef, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

type Phase = "focus" | "short" | "long";
const DURATIONS: Record<Phase, number> = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS: Record<Phase, string> = { focus: "Focus", short: "Short break", long: "Long break" };

function chime() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    o.start();
    o.stop(ctx.currentTime + 0.8);
  } catch { /* ignore */ }
}

export default function Pomodoro() {
  const [phase, setPhase] = useState<Phase>("focus");
  const [completed, setCompleted] = useState(0);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(DURATIONS.focus);
  const endRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      if (endRef.current == null) return;
      const r = Math.max(0, Math.round((endRef.current - Date.now()) / 1000));
      setRemaining(r);
      if (r === 0) {
        chime();
        setRunning(false);
        if (phase === "focus") {
          const nextCompleted = completed + 1;
          setCompleted(nextCompleted);
          const next: Phase = nextCompleted % 4 === 0 ? "long" : "short";
          setPhase(next);
          setRemaining(DURATIONS[next]);
        } else {
          setPhase("focus");
          setRemaining(DURATIONS.focus);
        }
      }
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [running, phase, completed]);

  useEffect(() => {
    document.title = running ? `${format(remaining)} — ${LABELS[phase]}` : "Pomodoro Focus Timer";
  }, [remaining, running, phase]);

  const start = () => {
    endRef.current = Date.now() + remaining * 1000;
    setRunning(true);
  };
  const pause = () => {
    setRunning(false);
    endRef.current = null;
  };
  const reset = (p: Phase = "focus") => {
    setRunning(false);
    setPhase(p);
    setRemaining(DURATIONS[p]);
    endRef.current = null;
  };

  const pct = (1 - remaining / DURATIONS[phase]) * 100;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card-premium p-8 lg:col-span-2 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{LABELS[phase]}</div>
        <div className="mt-2 text-7xl sm:text-8xl font-semibold tabular-nums tracking-tight">{format(remaining)}</div>
        <div className="mt-6 h-2 rounded-full overflow-hidden bg-secondary">
          <div className="h-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {running ? (
            <button onClick={pause} className="rounded-md bg-foreground text-background px-5 py-2 text-sm font-medium">Pause</button>
          ) : (
            <button onClick={start} className="rounded-md bg-primary text-primary-foreground px-5 py-2 text-sm font-medium">Start</button>
          )}
          <button onClick={() => reset(phase)} className="rounded-md border border-border px-5 py-2 text-sm">Reset</button>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">Completed focus blocks: <strong>{completed}</strong></div>
      </div>
      <div className="card-premium p-5 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Switch mode</div>
        {(["focus", "short", "long"] as Phase[]).map((p) => (
          <button key={p} onClick={() => reset(p)} className={`w-full text-left rounded-md px-3 py-2 text-sm ${phase === p ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary"}`}>
            {LABELS[p]} · {DURATIONS[p] / 60} min
          </button>
        ))}
        <TrustBadge />
      </div>
    </div>
  );
}

function format(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}