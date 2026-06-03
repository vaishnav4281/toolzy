import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsImlhdCI6MTcwMDAwMDAwMH0.s8h5_vJqgF1lY4mZ1Yj1rsVoVbU8aoP7CqJh3z3hY8I";

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE);
  const parts = useMemo(() => decodeJwt(token.trim()), [token]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-premium p-4">
        <label className="text-sm font-medium">JWT</label>
        <textarea value={token} onChange={(e) => setToken(e.target.value)} className="mt-2 w-full min-h-[300px] rounded-md border border-input bg-card p-3 font-mono text-xs break-all" />
        <TrustBadge />
      </div>
      <div className="space-y-4">
        <Panel title="Header" color="text-indigo-600" json={parts.header} error={parts.headerError} />
        <Panel title="Payload" color="text-emerald-600" json={parts.payload} error={parts.payloadError} />
        <Panel title="Signature" color="text-rose-600" raw={parts.signature} />
        {parts.payload?.exp && (
          <div className="rounded-md border border-border p-3 text-xs">
            <strong>Expires:</strong> {new Date(parts.payload.exp * 1000).toLocaleString()} {Date.now() > parts.payload.exp * 1000 ? <span className="text-destructive">(expired)</span> : <span className="text-emerald-600">(valid)</span>}
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({ title, color, json, raw, error }: { title: string; color: string; json?: any; raw?: string; error?: string }) {
  return (
    <div className="card-premium p-4">
      <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${color}`}>{title}</div>
      {error ? <p className="text-xs text-destructive">{error}</p> : (
        <pre className="rounded-md bg-secondary p-3 font-mono text-xs overflow-auto whitespace-pre-wrap break-all">{raw ?? (json ? JSON.stringify(json, null, 2) : "—")}</pre>
      )}
    </div>
  );
}

function decodeJwt(t: string) {
  const out: { header?: any; payload?: any; signature?: string; headerError?: string; payloadError?: string } = {};
  const [h, p, s] = t.split(".");
  try { if (h) out.header = JSON.parse(b64url(h)); } catch (e) { out.headerError = (e as Error).message; }
  try { if (p) out.payload = JSON.parse(b64url(p)); } catch (e) { out.payloadError = (e as Error).message; }
  if (s) out.signature = s;
  return out;
}
function b64url(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return decodeURIComponent(atob(s).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""));
}