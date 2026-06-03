import { useCallback, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function Base64Image() {
  const [dataUri, setDataUri] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleFile = useCallback((f: File) => {
    setName(f.name);
    const r = new FileReader();
    r.onload = () => setDataUri(String(r.result || ""));
    r.readAsDataURL(f);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div
        className="card-premium p-6 grid place-items-center min-h-[280px] cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
        onClick={() => document.getElementById("b64-file")?.click()}
      >
        <input id="b64-file" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        {dataUri ? <img src={dataUri} alt={name} className="max-h-72 rounded-md" /> : (
          <div className="text-center text-sm text-muted-foreground">
            <div className="text-3xl mb-2">📥</div>
            Drop an image or click to choose
          </div>
        )}
        <TrustBadge />
      </div>
      <div className="card-premium p-4 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{name || "Base64 data URI"}</span>
          <button onClick={() => navigator.clipboard.writeText(dataUri)} disabled={!dataUri} className="rounded-md border border-border px-2.5 py-1 text-xs disabled:opacity-40">Copy</button>
        </div>
        <textarea readOnly value={dataUri} placeholder="data:image/png;base64,…" className="w-full flex-1 min-h-[300px] rounded-md border border-input bg-card p-3 font-mono text-[10px]" />
        {dataUri && <p className="mt-2 text-xs text-muted-foreground">Size: {Math.ceil(dataUri.length / 1024)} KB</p>}
      </div>
    </div>
  );
}