import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * BlankToolTemplate — copy/paste scaffolding for new 1-liner text tools.
 * -----------------------------------------------------------------------
 * 1. Duplicate this file to src/tools/<MyTool>.tsx
 * 2. Replace `transform()` with your native JS one-liner
 *    (case swap, slugify, reverse, strip-html, base64, etc.)
 * 3. Register it in src/lib/toolsConfig.ts with `Component: lazy(() => import(...))`
 *
 * The shell wires input → transform → live output → copy.
 */

// ---- The 1-line native transform you want to expose -------------------
const transform = (s: string): string => s.toUpperCase();
// -----------------------------------------------------------------------

export default function BlankToolTemplate() {
  const [value, setValue] = useState("");
  const output = transform(value);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card-premium p-4">
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Input</h3>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type or paste here…"
          className="w-full min-h-[280px] resize-y rounded-md border border-input bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
        <TrustBadge />
      </div>
      <div className="card-premium p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Output</h3>
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            disabled={!output}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:border-primary/50 disabled:opacity-40"
          >
            Copy
          </button>
        </div>
        <pre className="min-h-[280px] overflow-auto rounded-md bg-secondary p-3 text-sm whitespace-pre-wrap break-words">
          {output || <span className="text-muted-foreground">Result will appear here…</span>}
        </pre>
      </div>
    </div>
  );
}