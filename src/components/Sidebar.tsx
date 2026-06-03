import { Link, useRouterState } from "@tanstack/react-router";
import { CATEGORIES, TOOLS } from "@/lib/toolsConfig";
import { useState } from "react";

/**
 * Responsive sidebar. Routes derived from toolsConfig — adding a tool
 * automatically adds a nav link.
 */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");

  const filtered = query
    ? TOOLS.filter((t) =>
        (t.name + " " + t.keywords.join(" ")).toLowerCase().includes(query.toLowerCase()),
      )
    : null;

  return (
    <aside className="h-full w-full overflow-y-auto border-r border-border bg-background/60 backdrop-blur-md">
      <div className="p-4 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold">T</span>
          <span className="text-sm font-semibold tracking-tight">Toolzy</span>
        </Link>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="mt-3 w-full rounded-md border border-input bg-card px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <nav className="p-3 space-y-6">
        {filtered ? (
          <div className="space-y-1">
            {filtered.length === 0 && (
              <div className="px-2 py-4 text-xs text-muted-foreground">No tools match "{query}".</div>
            )}
            {filtered.map((t) => (
              <NavLink key={t.id} path={t.path} icon={t.icon} name={t.name} active={path === t.path} onClick={onNavigate} />
            ))}
          </div>
        ) : (
          CATEGORIES.map((cat) => {
            const items = TOOLS.filter((t) => t.category === cat);
            return (
              <div key={cat}>
                <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{cat}</div>
                <div className="space-y-0.5">
                  {items.map((t) => (
                    <NavLink key={t.id} path={t.path} icon={t.icon} name={t.name} active={path === t.path} onClick={onNavigate} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}

function NavLink({ path, icon, name, active, onClick }: { path: string; icon: string; name: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/80 hover:bg-secondary hover:text-foreground"
      }`}
    >
      <span className="text-base leading-none w-5 text-center">{icon}</span>
      <span className="truncate">{name}</span>
    </Link>
  );
}