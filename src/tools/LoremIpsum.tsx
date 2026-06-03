import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos quas molestias excepturi occaecati cupiditate provident similique mollitia animi laborum dolorum fuga harum quidem rerum facilis expedita distinctio nam libero tempore cum soluta nobis eligendi optio cumque impedit minus quod maxime placeat facere possimus omnis assumenda repellendus".split(" ");

function pick(n: number) {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += WORDS[Math.floor(Math.random() * WORDS.length)] + " ";
  }
  return out.trim();
}

function sentence() {
  const n = 6 + Math.floor(Math.random() * 12);
  const s = pick(n);
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

function paragraph() {
  const n = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: n }, sentence).join(" ");
}

export default function LoremIpsum() {
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [seed, setSeed] = useState(0);

  const text = useMemo(() => {
    void seed;
    if (unit === "words") return pick(count);
    if (unit === "sentences") return Array.from({ length: count }, sentence).join(" ");
    return Array.from({ length: count }, paragraph).join("\n\n");
  }, [unit, count, seed]);

  return (
    <div className="space-y-4">
      <div className="card-premium p-4 flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="text-muted-foreground block text-xs">Generate</span>
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, +e.target.value)))} className="mt-1 w-24 rounded-md border border-input bg-card px-3 py-2 text-sm" />
        </label>
        <div className="flex rounded-md border border-border overflow-hidden">
          {(["paragraphs", "sentences", "words"] as const).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className={`px-3 py-2 text-xs ${unit === u ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"}`}>
              {u}
            </button>
          ))}
        </div>
        <button onClick={() => setSeed((s) => s + 1)} className="rounded-md bg-secondary px-3 py-2 text-xs font-medium hover:bg-secondary/80">Regenerate</button>
        <button onClick={() => navigator.clipboard.writeText(text)} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 ml-auto">Copy</button>
      </div>
      <div className="card-premium p-5">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">{text}</pre>
        <TrustBadge />
      </div>
    </div>
  );
}