import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Tool C — JSON Formatter & Validator
 * ----------------------------------------------------------------
 * NATIVE STRUCTURED DATA HANDLING:
 *  - input goes through JSON.parse() inside try/catch
 *  - on success: JSON.stringify(parsed, null, indent) emits prettified output
 *  - on failure: the SyntaxError message (with byte offset) is shown verbatim
 *  - "Minify" path stringifies with no spacing for the smallest payload
 *  - 100% browser-native; no parser library required
 */
export default function JsonFormatter() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);

  const run = (mode: "pretty" | "minify") => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, mode === "pretty" ? indent : 0));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setOutput("");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => run("pretty")} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-95">Format</button>
        <button onClick={() => run("minify")} className="rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold hover:bg-secondary/80">Minify</button>
        <label className="ml-2 text-sm text-muted-foreground">
          Indent
          <select
            value={indent}
            onChange={(e) => setIndent(+e.target.value)}
            className="ml-2 rounded-md border border-input bg-card px-2 py-1 text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="ml-auto rounded-md border border-border bg-card px-3 py-2 text-xs font-medium hover:border-primary/50"
          >
            Copy output
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <strong className="font-semibold">Invalid JSON:</strong> {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-premium p-4">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Input</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="w-full min-h-[360px] resize-y rounded-md border border-input bg-card p-3 font-mono text-xs leading-relaxed outline-none focus:ring-2 focus:ring-ring/40"
          />
          <TrustBadge />
        </div>
        <div className="card-premium p-4">
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Output</h3>
          <pre className="min-h-[360px] overflow-auto rounded-md bg-secondary p-3 font-mono text-xs leading-relaxed whitespace-pre">
            {output || <span className="text-muted-foreground">Formatted JSON will appear here…</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}