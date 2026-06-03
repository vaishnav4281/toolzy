import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Tool B — Word & Reading Time Counter
 * ----------------------------------------------------------------
 * NATIVE TEXT ANALYSIS:
 *  - text is held in a single React state node (`value`)
 *  - useMemo recomputes stats only when `value` changes (cheap O(n) regex scans)
 *  - reading time uses 225 wpm (silent reading average), speaking 150 wpm
 *  - sentence count splits on terminal punctuation, ignoring trailing whitespace
 */
export default function WordCounter() {
  const [value, setValue] = useState("");

  const stats = useMemo(() => {
    const trimmed = value.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const sentences = trimmed
      ? trimmed.split(/[.!?]+\s+|[.!?]+$/).filter((s) => s.trim().length > 0)
      : [];
    const paragraphs = trimmed ? trimmed.split(/\n{2,}/).filter((p) => p.trim()) : [];
    return {
      chars: value.length,
      charsNoSpace: value.replace(/\s/g, "").length,
      words: words.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      readMin: Math.max(1, Math.round(words.length / 225)),
      speakMin: Math.max(1, Math.round(words.length / 150)),
    };
  }, [value]);

  const cards: [string, string | number][] = [
    ["Words", stats.words.toLocaleString()],
    ["Characters", stats.chars.toLocaleString()],
    ["No spaces", stats.charsNoSpace.toLocaleString()],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Reading time", `${stats.readMin} min`],
    ["Speaking time", `${stats.speakMin} min`],
  ];

  return (
    <div className="grid gap-6">
      <div className="card-premium p-6">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste or type your text here…"
          className="w-full min-h-[280px] resize-y rounded-md border border-input bg-card p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring/40"
        />
        <TrustBadge />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {cards.map(([label, val]) => (
          <div key={label} className="card-premium p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}