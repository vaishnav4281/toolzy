import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function DuplicateRemover() {
  const [text, setText] = useState("");
  const [trim, setTrim] = useState(true);
  const [caseInsensitive, setCi] = useState(false);
  const [sort, setSort] = useState(false);
  const [removeBlanks, setRb] = useState(true);

  const { output, removed } = useMemo(() => {
    let lines = text.split(/\r?\n/);
    if (trim) lines = lines.map((l) => l.trim());
    if (removeBlanks) lines = lines.filter(Boolean);
    const seen = new Set<string>();
    const out: string[] = [];
    for (const l of lines) {
      const key = caseInsensitive ? l.toLowerCase() : l;
      if (!seen.has(key)) { seen.add(key); out.push(l); }
    }
    if (sort) out.sort((a, b) => a.localeCompare(b));
    return { output: out.join("\n"), removed: lines.length - out.length };
  }, [text, trim, caseInsensitive, sort, removeBlanks]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card-premium p-4">
        <div className="flex flex-wrap gap-3 text-xs mb-2">
          {[ ["Trim", trim, setTrim], ["Ignore case", caseInsensitive, setCi], ["Sort A→Z", sort, setSort], ["Remove blanks", removeBlanks, setRb] ].map(([l, v, s]: any) => (
            <label key={l} className="flex items-center gap-1"><input type="checkbox" checked={v} onChange={(e) => s(e.target.checked)} />{l}</label>
          ))}
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="One item per line…" className="w-full min-h-[300px] rounded-md border border-input bg-card p-3 font-mono text-xs" />
        <TrustBadge />
      </div>
      <div className="card-premium p-4">
        <div className="flex justify-between mb-2 text-xs">
          <span className="text-muted-foreground">{removed} duplicates removed</span>
          <button onClick={() => navigator.clipboard.writeText(output)} className="rounded-md border border-border px-2.5 py-1">Copy</button>
        </div>
        <pre className="min-h-[340px] rounded-md bg-secondary p-3 font-mono text-xs whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
}