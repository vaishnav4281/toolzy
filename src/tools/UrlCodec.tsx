import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function UrlCodec() {
  const [text, setText] = useState("https://example.com/?q=hello world&lang=en");
  let encoded = "", decoded = "", err = "";
  try { encoded = encodeURIComponent(text); } catch (e) { err = (e as Error).message; }
  try { decoded = decodeURIComponent(text); } catch (e) { err = (e as Error).message; }

  return (
    <div className="space-y-6">
      <div className="card-premium p-4">
        <label className="text-sm font-medium">Input</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-2 w-full min-h-[140px] rounded-md border border-input bg-card p-3 font-mono text-xs" />
        {err && <p className="text-xs text-destructive mt-1">{err}</p>}
        <TrustBadge />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Out title="Encoded" value={encoded} />
        <Out title="Decoded" value={decoded} />
      </div>
    </div>
  );
}

function Out({ title, value }: { title: string; value: string }) {
  return (
    <div className="card-premium p-4">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
        <button onClick={() => navigator.clipboard.writeText(value)} className="rounded-md border border-border px-2 py-0.5 text-xs">Copy</button>
      </div>
      <pre className="min-h-[140px] rounded-md bg-secondary p-3 font-mono text-xs whitespace-pre-wrap break-all">{value || "—"}</pre>
    </div>
  );
}