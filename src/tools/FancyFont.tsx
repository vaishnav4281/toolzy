import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const STYLES: { name: string; map: (s: string) => string }[] = [
  { name: "𝐁𝐨𝐥𝐝", map: (s) => mapAlpha(s, 0x1d400, 0x1d41a) },
  { name: "𝐼𝑡𝑎𝑙𝑖𝑐", map: (s) => mapAlpha(s, 0x1d434, 0x1d44e) },
  { name: "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄", map: (s) => mapAlpha(s, 0x1d468, 0x1d482) },
  { name: "𝓢𝓬𝓻𝓲𝓹𝓽", map: (s) => mapAlpha(s, 0x1d4d0, 0x1d4ea) },
  { name: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯", map: (s) => mapAlpha(s, 0x1d504, 0x1d51e) },
  { name: "𝔻𝕠𝕦𝕓𝕝𝕖", map: (s) => mapAlpha(s, 0x1d538, 0x1d552) },
  { name: "𝙼𝚘𝚗𝚘", map: (s) => mapAlpha(s, 0x1d670, 0x1d68a) },
  { name: "Ⓒⓘⓡⓒⓛⓔⓓ", map: (s) => s.split("").map((c) => /[a-z]/i.test(c) ? String.fromCodePoint(0x24b6 + (c.toLowerCase().charCodeAt(0) - 97) + (c === c.toUpperCase() ? 0 : 26)) : c).join("") },
  { name: "🅂🅀🅄🄰🅁🄴🄳", map: (s) => s.toUpperCase().split("").map((c) => /[A-Z]/.test(c) ? String.fromCodePoint(0x1f130 + (c.charCodeAt(0) - 65)) : c).join("") },
  { name: "wide", map: (s) => s.split("").map((c) => /[!-~]/.test(c) ? String.fromCharCode(c.charCodeAt(0) + 0xfee0) : c).join("") },
  { name: "ǝsɹǝʌǝᴚ", map: (s) => [...s].reverse().map(flip).join("") },
];

const FLIP: Record<string, string> = { a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"ʃ",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z","?":"¿","!":"¡",".":"˙",",":"'" };
function flip(c: string) { return FLIP[c.toLowerCase()] ?? c; }

function mapAlpha(s: string, upperStart: number, lowerStart: number) {
  return s.split("").map((c) => {
    if (/[A-Z]/.test(c)) return String.fromCodePoint(upperStart + (c.charCodeAt(0) - 65));
    if (/[a-z]/.test(c)) return String.fromCodePoint(lowerStart + (c.charCodeAt(0) - 97));
    return c;
  }).join("");
}

export default function FancyFont() {
  const [text, setText] = useState("Make it fancy");
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div className="card-premium p-4">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your bio…" className="w-full rounded-md border border-input bg-card px-3 py-3 text-base" />
        <TrustBadge />
      </div>
      <div className="grid gap-2">
        {STYLES.map((st) => {
          const v = st.map(text);
          return (
            <button key={st.name} onClick={() => { navigator.clipboard.writeText(v); setCopied(st.name); setTimeout(() => setCopied(null), 1200); }} className="card-premium p-4 text-left flex items-center justify-between hover:border-primary/50 transition">
              <span className="text-lg truncate">{v}</span>
              <span className="text-xs text-muted-foreground shrink-0 ml-3">{copied === st.name ? "Copied!" : "Tap to copy"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}