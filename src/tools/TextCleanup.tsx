import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const OPS: { id: string; name: string; fn: (s: string) => string }[] = [
  { id: "upper", name: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { id: "lower", name: "lowercase", fn: (s) => s.toLowerCase() },
  { id: "title", name: "Title Case", fn: (s) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
  { id: "sentence", name: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (m) => m.toUpperCase()) },
  { id: "camel", name: "camelCase", fn: (s) => s.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { id: "snake", name: "snake_case", fn: (s) => s.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase() },
  { id: "kebab", name: "kebab-case", fn: (s) => s.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase() },
  { id: "reverse", name: "Reverse", fn: (s) => [...s].reverse().join("") },
  { id: "trim", name: "Trim & collapse whitespace", fn: (s) => s.trim().replace(/\s+/g, " ") },
  { id: "stripHtml", name: "Strip HTML tags", fn: (s) => s.replace(/<[^>]+>/g, "") },
];

export default function TextCleanup() {
  const [text, setText] = useState("");
  const [op, setOp] = useState(OPS[0].id);
  const fn = OPS.find((o) => o.id === op)!.fn;
  const output = fn(text);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card-premium p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {OPS.map((o) => (
            <button key={o.id} onClick={() => setOp(o.id)} className={`rounded-md border px-2.5 py-1 text-xs ${op === o.id ? "border-primary text-primary bg-primary/5" : "border-border"}`}>{o.name}</button>
          ))}
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full min-h-[280px] rounded-md border border-input bg-card p-3 text-sm" placeholder="Paste text…" />
        <TrustBadge />
      </div>
      <div className="card-premium p-4">
        <div className="flex justify-end mb-2"><button onClick={() => navigator.clipboard.writeText(output)} className="rounded-md border border-border px-2.5 py-1 text-xs">Copy</button></div>
        <pre className="min-h-[320px] rounded-md bg-secondary p-3 text-sm whitespace-pre-wrap break-words">{output || <span className="text-muted-foreground">Result…</span>}</pre>
      </div>
    </div>
  );
}