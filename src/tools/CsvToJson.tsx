import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function CsvToJson() {
  const [csv, setCsv] = useState("name,role,city\nAda,Engineer,London\nGrace,Admiral,New York");
  const [delim, setDelim] = useState(",");
  const [headers, setHeaders] = useState(true);

  const json = useMemo(() => {
    try {
      const rows = parseCsv(csv, delim);
      if (!rows.length) return "[]";
      if (headers) {
        const [head, ...rest] = rows;
        return JSON.stringify(rest.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""]))), null, 2);
      }
      return JSON.stringify(rows, null, 2);
    } catch (e) {
      return `// Error: ${(e as Error).message}`;
    }
  }, [csv, delim, headers]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-4">
        <div className="flex gap-2 mb-3 items-center text-sm">
          <label className="flex items-center gap-1">Delim<input value={delim} onChange={(e) => setDelim(e.target.value || ",")} className="w-12 ml-1 rounded border border-input bg-card px-2 py-1 text-center" /></label>
          <label className="flex items-center gap-1"><input type="checkbox" checked={headers} onChange={(e) => setHeaders(e.target.checked)} /> First row = headers</label>
        </div>
        <textarea value={csv} onChange={(e) => setCsv(e.target.value)} className="w-full min-h-[320px] rounded-md border border-input bg-card p-3 font-mono text-xs" />
        <TrustBadge />
      </div>
      <div className="card-premium p-4">
        <div className="flex justify-end mb-2"><button onClick={() => navigator.clipboard.writeText(json)} className="rounded-md border border-border px-2.5 py-1 text-xs">Copy JSON</button></div>
        <pre className="min-h-[360px] overflow-auto rounded-md bg-secondary p-3 font-mono text-xs">{json}</pre>
      </div>
    </div>
  );
}

function parseCsv(s: string, d: string): string[][] {
  const rows: string[][] = [[]];
  let i = 0, field = "", inQ = false;
  while (i < s.length) {
    const c = s[i];
    if (inQ) {
      if (c === '"' && s[i + 1] === '"') { field += '"'; i += 2; continue; }
      if (c === '"') { inQ = false; i++; continue; }
      field += c; i++; continue;
    }
    if (c === '"') { inQ = true; i++; continue; }
    if (c === d) { rows[rows.length - 1].push(field); field = ""; i++; continue; }
    if (c === "\n" || c === "\r") {
      rows[rows.length - 1].push(field); field = "";
      if (c === "\r" && s[i + 1] === "\n") i++;
      if (i + 1 < s.length) rows.push([]);
      i++; continue;
    }
    field += c; i++;
  }
  rows[rows.length - 1].push(field);
  return rows.filter((r) => r.length > 1 || (r[0] && r[0].length));
}