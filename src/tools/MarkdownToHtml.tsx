import { useEffect, useState } from "react";
import { marked } from "marked";
import { TrustBadge } from "@/components/TrustBadge";

const SAMPLE = `# Hello, BurnerTools\n\n**Markdown** runs locally — try editing.\n\n- Lists\n- Tables\n- \`code\`\n\n> Quote me.`;

export default function MarkdownToHtml() {
  const [md, setMd] = useState(SAMPLE);
  const [html, setHtml] = useState("");
  useEffect(() => {
    Promise.resolve(marked.parse(md, { gfm: true, breaks: true })).then((r) => setHtml(String(r)));
  }, [md]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="card-premium p-4 lg:col-span-1">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Markdown</label>
        <textarea value={md} onChange={(e) => setMd(e.target.value)} className="mt-2 w-full min-h-[380px] rounded-md border border-input bg-card p-3 font-mono text-xs" />
        <TrustBadge />
      </div>
      <div className="card-premium p-4 lg:col-span-1">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">HTML</span>
          <button onClick={() => navigator.clipboard.writeText(html)} className="rounded-md border border-border px-2 py-0.5 text-xs">Copy</button>
        </div>
        <pre className="min-h-[380px] rounded-md bg-secondary p-3 font-mono text-[11px] overflow-auto whitespace-pre-wrap break-words">{html}</pre>
      </div>
      <div className="card-premium p-4 lg:col-span-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Preview</div>
        <div className="prose prose-sm max-w-none min-h-[380px] rounded-md border border-border p-3 bg-card" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}