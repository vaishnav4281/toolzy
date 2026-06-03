import { Suspense, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { ToolConfig } from "@/lib/toolsConfig";
import { TOOLS } from "@/lib/toolsConfig";

/**
 * ToolLayout — universal wrapper rendered around every tool component.
 * SEO tags are injected via TanStack's head() in the dynamic route file
 * (which reads the same tool config), so the markup is SSR-correct.
 */
export function ToolLayout({ tool, children }: { tool: ToolConfig; children: ReactNode }) {
  const related = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
      <nav className="text-xs text-muted-foreground mb-3" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-1.5">/</span>
        <span>{tool.category}</span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-xl border border-border">{tool.icon}</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{tool.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">{tool.tagline}</p>
          </div>
        </div>
        {tool.intro && (
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground max-w-3xl">{tool.intro}</p>
        )}
        <dl className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <ToolFact label="Category" value={tool.category} />
          <ToolFact label="Privacy" value="Runs in your browser" />
          <ToolFact label="Uploads" value="No server upload" />
          <ToolFact label="Access" value="Free, no signup" />
        </dl>
      </header>

      <Suspense fallback={<ToolFallback />}>{children}</Suspense>

      {(tool.howTo || tool.useCases) && (
        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          {tool.howTo && (
            <div>
              <h2 className="text-lg font-semibold tracking-tight">How to use</h2>
              <ol className="mt-4 space-y-3">
                {tool.howTo.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">{i + 1}</span>
                    <span className="text-foreground/90 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {tool.useCases && (
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Popular use cases</h2>
              <ul className="mt-4 space-y-2.5">
                {tool.useCases.map((u, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                    <span className="text-primary mt-1">→</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {tool.faqs && tool.faqs.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-border border border-border rounded-xl bg-card">
            {tool.faqs.map((f, i) => (
              <details key={i} className="group p-4 sm:p-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3 text-sm font-medium">
                  <span>{f.q}</span>
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-lg font-semibold tracking-tight">More in {tool.category}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.id} to={r.path} className="card-premium p-4 block">
                <div className="text-lg">{r.icon}</div>
                <div className="mt-2 text-sm font-semibold group-hover:text-primary">{r.name}</div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-14 pt-6 border-t border-border text-xs text-muted-foreground">
        <p>
          Every Toolzy utility runs entirely in your browser. No telemetry, no uploads, no logins —
          bookmark it and use it offline.
        </p>
      </footer>
    </div>
  );
}

function ToolFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-xs font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ToolFallback() {
  return (
    <div className="card-premium p-10 grid place-items-center">
      <div className="text-sm text-muted-foreground animate-pulse">Loading tool…</div>
    </div>
  );
}
