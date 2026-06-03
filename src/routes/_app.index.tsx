import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, TOOLS } from "@/lib/toolsConfig";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Toolzy — 25+ Free Private Browser Tools (No Signup)" },
      {
        name: "description",
        content:
          "Toolzy is 25+ free instant browser tools — QR code generator, image resizer, password generator, JSON formatter, Pomodoro timer, unit converter and more. No signup. No uploads. 100% private.",
      },
      { name: "keywords", content: "free online tools, browser tools, qr code generator, image resizer, password generator, json formatter, pomodoro timer, unit converter, private tools, no signup tools" },
      { property: "og:title", content: "Toolzy — Free Private Browser Tools" },
      { property: "og:description", content: "25+ instant tools that run locally. No uploads. No accounts. No tracking." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const FEATURED_IDS = ["qr-generator", "password-generator", "image-resizer", "json-formatter", "pomodoro", "unit-converter"];

const HOME_FAQS = [
  { q: "Is Toolzy really free?", a: "Yes — every tool is free with no signup, no paywall, and no usage limits. There's no premium tier." },
  { q: "How is Toolzy private?", a: "Every tool runs entirely inside your browser. No file is uploaded, no input is logged, and no account is required. You can disconnect from the internet after the page loads and most tools still work." },
  { q: "Do I need to install anything?", a: "No. Toolzy works on any modern browser — desktop or mobile. Add it to your home screen and it works like an app." },
  { q: "Can I use Toolzy commercially?", a: "Yes. Generated QR codes, passwords, palettes, and exports are yours to use however you like — personal or commercial." },
  { q: "Why is Toolzy faster than other tool sites?", a: "Two reasons: there's no server round-trip (everything runs locally), and the page bundle is tiny (each tool lazy-loads only when you open it)." },
];

function Home() {
  const featured = FEATURED_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as typeof TOOLS;
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
      <section className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
          🔒 100% private — runs locally on your device
        </div>
        <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
          Tiny, fast, <span className="text-primary">private</span> tools.
          <br className="hidden sm:block" />
          <span className="text-muted-foreground">No accounts. No uploads.</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-muted-foreground">
          {TOOLS.length} hand-picked utilities that run entirely in your browser. Generate QR codes,
          resize images, create secure passwords, format JSON, focus with Pomodoro — without a single
          byte leaving your device.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 justify-center">
          <Link to="/tools/qr-generator" className="rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90">
            Try the QR generator
          </Link>
          <a href="#all-tools" className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-secondary">
            Browse all {TOOLS.length} tools
          </a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <Stat n={TOOLS.length + "+"} label="Tools" />
          <Stat n="0" label="Signups required" />
          <Stat n="0 KB" label="Of your data uploaded" />
          <Stat n="100%" label="Browser-native" />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Featured tools</h2>
          <span className="text-xs text-muted-foreground">Most loved by our users</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <Link key={tool.id} to={tool.path} className="card-premium p-5 block group">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-lg">{tool.icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold tracking-tight group-hover:text-primary transition-colors">{tool.name}</div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 sm:grid-cols-3">
        <Pillar icon="🔒" title="Private by default" body="Everything runs in your browser. No uploads, no accounts, no telemetry. Use it on a flight if you want." />
        <Pillar icon="⚡" title="Instant" body="Each tool lazy-loads only the code it needs. No spinners, no waiting for a server response." />
        <Pillar icon="🎁" title="Truly free" body="No premium tier, no popups, no signup wall. The whole catalog, forever." />
      </section>

      <section id="all-tools" className="mt-16 space-y-10 scroll-mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">All {TOOLS.length} tools</h2>
        {CATEGORIES.map((cat) => {
          const items = TOOLS.filter((t) => t.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-lg font-semibold tracking-tight">{cat}</h3>
                <span className="text-xs text-muted-foreground">{items.length} tools</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="card-premium p-5 block group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-lg border border-border">
                        {tool.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold tracking-tight group-hover:text-primary transition-colors">
                          {tool.name}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{tool.tagline}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-5 divide-y divide-border border border-border rounded-xl bg-card">
          {HOME_FAQS.map((f, i) => (
            <details key={i} className="group p-5">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-3 text-sm font-medium">
                <span>{f.q}</span>
                <span className="text-muted-foreground group-open:rotate-45 transition-transform text-lg leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-border text-center text-xs text-muted-foreground">
        <p>Toolzy — built for speed, privacy, and getting things done.</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-foreground font-semibold text-base">{n}</div>
      <div>{label}</div>
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="card-premium p-5">
      <div className="text-2xl">{icon}</div>
      <div className="mt-3 text-sm font-semibold">{title}</div>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}