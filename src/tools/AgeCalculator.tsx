import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-01");
  const stats = useMemo(() => {
    const start = new Date(dob);
    if (Number.isNaN(start.getTime())) return null;
    const now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    let m = now.getMonth() - start.getMonth();
    let d = now.getDate() - start.getDate();
    if (d < 0) { m--; const pm = new Date(now.getFullYear(), now.getMonth(), 0); d += pm.getDate(); }
    if (m < 0) { y--; m += 12; }
    const ms = now.getTime() - start.getTime();
    return {
      ymd: { y, m, d },
      totalDays: Math.floor(ms / 86400000),
      totalHours: Math.floor(ms / 3600000),
      totalMinutes: Math.floor(ms / 60000),
      totalWeeks: Math.floor(ms / (86400000 * 7)),
    };
  }, [dob]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-5 space-y-3">
        <label className="block text-sm"><span className="text-muted-foreground">Date of birth</span>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-card px-3 py-2" />
        </label>
        <TrustBadge />
      </div>
      {stats && (
        <div className="card-premium p-5 space-y-3">
          <div className="rounded-md bg-primary/5 border border-primary/30 p-4 text-center">
            <div className="text-xs uppercase text-muted-foreground">You are</div>
            <div className="mt-1 text-3xl font-semibold text-primary">{stats.ymd.y}y {stats.ymd.m}m {stats.ymd.d}d</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Stat l="Weeks" v={stats.totalWeeks} />
            <Stat l="Days" v={stats.totalDays} />
            <Stat l="Hours" v={stats.totalHours} />
            <Stat l="Minutes" v={stats.totalMinutes} />
          </div>
        </div>
      )}
    </div>
  );
}
function Stat({ l, v }: { l: string; v: number }) {
  return <div className="rounded-md bg-secondary border border-border p-3"><div className="text-[10px] uppercase text-muted-foreground">{l}</div><div className="font-mono">{v.toLocaleString()}</div></div>;
}