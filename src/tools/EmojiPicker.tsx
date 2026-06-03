import { useEffect, useMemo, useRef, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

/**
 * Apple iPhone Emoji tool.
 * - Browse + search a curated iOS emoji catalog
 * - Copy any emoji to clipboard
 * - Preview and download Apple-style PNG artwork from emoji-datasource-apple
 * - Keep copied output as normal Unicode so it still works everywhere
 */

const CATEGORIES: { name: string; emojis: string[] }[] = [
  { name: "Smileys", emojis: "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤧 🥵 🥶 🥴 😵 🤯 🤠 🥳 🥸 😎 🤓 🧐".split(" ") },
  { name: "People", emojis: "👋 🤚 🖐 ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦶 👂 👃 🧠 🫀 🫁 🦷 🦴 👀 👁 👅 👄 💋 🩸".split(" ") },
  { name: "Animals", emojis: "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷 🕸 🦂".split(" ") },
  { name: "Food", emojis: "🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕".split(" ") },
  { name: "Travel", emojis: "🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🦯 🦽 🦼 🛴 🚲 🛵 🏍 🛺 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩 💺 🛰 🚀 🛸 🚁 🛶 ⛵️ 🚤 🛥 🛳 ⛴ 🚢".split(" ") },
  { name: "Objects", emojis: "⌚️ 📱 📲 💻 ⌨️ 🖥 🖨 🖱 🖲 🕹 🗜 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽 🎞 📞 ☎️ 📟 📠 📺 📻 🎙 🎚 🎛 🧭 ⏱ ⏲ ⏰ 🕰 ⌛️ ⏳ 📡 🔋 🔌 💡 🔦 🕯 🧯 🛢 💸 💵 💴 💶 💷 💰 💳".split(" ") },
  { name: "Symbols", emojis: "❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳".split(" ") },
  { name: "Flags", emojis: "🏳️ 🏴 🏁 🚩 🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️ 🇺🇸 🇬🇧 🇪🇺 🇨🇦 🇩🇪 🇫🇷 🇮🇹 🇪🇸 🇵🇹 🇳🇱 🇸🇪 🇳🇴 🇫🇮 🇩🇰 🇮🇪 🇵🇱 🇨🇭 🇦🇹 🇨🇿 🇬🇷 🇹🇷 🇷🇺 🇺🇦 🇮🇳 🇵🇰 🇧🇩 🇯🇵 🇨🇳 🇰🇷 🇸🇬 🇹🇭 🇻🇳 🇮🇩 🇵🇭 🇲🇾 🇦🇪 🇸🇦 🇮🇱 🇧🇷 🇲🇽 🇦🇷 🇨🇱 🇿🇦 🇦🇺 🇳🇿".split(" ") },
];

const ALL = CATEGORIES.flatMap((c) => c.emojis);
const APPLE_EMOJI_CDN =
  "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@15.1.2/img/apple/64";

function emojiToCodepoints(emoji: string) {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

function appleEmojiUrl(emoji: string) {
  return `${APPLE_EMOJI_CDN}/${emojiToCodepoints(emoji)}.png`;
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  W: number,
  bg: "transparent" | "white" | "gradient",
) {
  ctx.clearRect(0, 0, W, W);
  if (bg === "white") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, W);
  }
  if (bg === "gradient") {
    const g = ctx.createLinearGradient(0, 0, W, W);
    g.addColorStop(0, "#4f46e5");
    g.addColorStop(1, "#06b6d4");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, W);
  }
}

export default function EmojiPicker() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState("😀");
  const [composed, setComposed] = useState("😀");
  const [bg, setBg] = useState<"transparent" | "white" | "gradient">("transparent");
  const [pxSize, setPxSize] = useState(256);
  const [copied, setCopied] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const list = useMemo(() => {
    if (query) return ALL.filter((e) => e.includes(query));
    return CATEGORIES[active].emojis;
  }, [query, active]);

  const copy = (e: string) => {
    navigator.clipboard.writeText(e);
    setCopied(e);
    setTimeout(() => setCopied(null), 900);
  };

  const drawAndDownload = async (download: boolean) => {
    const c = canvasRef.current ?? document.createElement("canvas");
    const W = Math.max(pxSize, 128);
    c.width = W;
    c.height = W;
    const ctx = c.getContext("2d")!;
    drawBackground(ctx, W, bg);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = appleEmojiUrl(selected);
    await img.decode();

    const padding = W * 0.12;
    ctx.drawImage(img, padding, padding, W - padding * 2, W - padding * 2);

    if (download) {
      const a = document.createElement("a");
      a.href = c.toDataURL("image/png");
      a.download = `apple-emoji-${emojiToCodepoints(selected)}.png`;
      a.click();
    }
  };

  useEffect(() => {
    void drawAndDownload(false);
  }, [selected, bg, pxSize]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <div className="card-premium p-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emoji (paste one to find similar)…" className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm" />
          {!query && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CATEGORIES.map((c, i) => (
                <button key={c.name} onClick={() => setActive(i)} className={`rounded-full border px-3 py-1 text-xs ${active === i ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}>{c.name}</button>
              ))}
            </div>
          )}
        </div>
        <div className="card-premium p-3">
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-1 max-h-[480px] overflow-y-auto">
            {list.map((e, i) => (
              <button
                key={`${e}-${i}`}
                onClick={() => {
                  copy(e);
                  setSelected(e);
                  setComposed((c) => (c.length > 60 ? c : c + e));
                }}
                className={`relative grid h-10 w-10 place-items-center rounded-md transition hover:bg-secondary ${
                  copied === e || selected === e ? "ring-2 ring-primary" : ""
                }`}
                title={`Copy ${e}`}
              >
                <img
                  src={appleEmojiUrl(e)}
                  alt={e}
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.nextElementSibling?.classList.remove("opacity-0");
                  }}
                />
                <span className="pointer-events-none absolute text-2xl leading-none opacity-0">
                  {e}
                </span>
              </button>
            ))}
          </div>
          {copied && <div className="mt-2 text-xs text-primary">Copied {copied} to clipboard</div>}
        </div>
      </div>

      <div className="card-premium p-5 space-y-4 h-fit lg:sticky lg:top-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Composer</label>
          <input value={composed} onChange={(e) => setComposed(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2 text-2xl" style={{ fontFamily: `"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif` }} />
          <div className="flex gap-2 mt-2">
            <button onClick={() => copy(composed)} className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-xs font-semibold">Copy text</button>
            <button onClick={() => setComposed("")} className="rounded-md border border-border px-3 py-2 text-xs">Clear</button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Background</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["transparent", "white", "gradient"] as const).map((b) => (
              <button key={b} onClick={() => setBg(b)} className={`rounded-md border px-2 py-1 text-xs capitalize ${bg === b ? "border-primary text-primary" : "border-border"}`}>{b}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs"><span>PNG size</span><span className="font-mono">{pxSize}px</span></div>
          <input type="range" min={128} max={1024} step={32} value={pxSize} onChange={(e) => setPxSize(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
        </div>
        <div className="rounded-md border border-border bg-secondary/40 p-3 grid place-items-center min-h-[180px]" style={{ backgroundImage: bg === "transparent" ? "linear-gradient(45deg,#eee 25%,transparent 25%),linear-gradient(-45deg,#eee 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#eee 75%),linear-gradient(-45deg,transparent 75%,#eee 75%)" : undefined, backgroundSize: "16px 16px", backgroundPosition: "0 0,0 8px,8px -8px,-8px 0" }}>
          <div className="grid place-items-center gap-3">
            <img src={appleEmojiUrl(selected)} alt={selected} className="h-24 w-24 object-contain" />
            <canvas ref={canvasRef} className="max-h-44 w-auto rounded-md" />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => drawAndDownload(false)} className="flex-1 rounded-md border border-border py-2 text-xs">Preview</button>
          <button onClick={() => drawAndDownload(true)} className="flex-1 rounded-md bg-primary text-primary-foreground py-2 text-xs font-semibold">Download PNG</button>
        </div>
        <TrustBadge />
      </div>
    </div>
  );
}
