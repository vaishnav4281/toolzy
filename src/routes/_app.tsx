import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";

/**
 * Pathless layout route — wraps the home page and every /tools/* page
 * with the persistent sidebar shell. URL is unchanged (no `_app` segment).
 */
export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="fixed top-0 left-0 h-screen w-64">
          <Sidebar />
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
          <div className="absolute left-0 top-0 h-full w-72 bg-background shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 h-12">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="rounded-md p-2 hover:bg-secondary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
          <span className="text-sm font-semibold">BurnerTools</span>
          <span className="w-9" />
        </div>

        <Outlet />
      </main>
    </div>
  );
}