import { createFileRoute, notFound } from "@tanstack/react-router";
import { getToolById } from "@/lib/toolsConfig";
import { ToolLayout } from "@/components/ToolLayout";

/**
 * One dynamic route handles every tool. The lazy Component on the tool config
 * is fetched on demand — homepage bundle stays tiny.
 */
export const Route = createFileRoute("/_app/tools/$toolId")({
  beforeLoad: ({ params }) => {
    if (!getToolById(params.toolId)) throw notFound();
  },
  head: ({ params }) => {
    const tool = getToolById(params.toolId);
    if (!tool) return {};
    const ldScripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.name,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Any (browser)",
          description: tool.seoDescription,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ];
    if (tool.faqs && tool.faqs.length > 0) {
      ldScripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      });
    }
    ldScripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: tool.category },
          { "@type": "ListItem", position: 3, name: tool.name, item: tool.path },
        ],
      }),
    });
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { name: "keywords", content: tool.keywords.join(", ") },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: tool.path },
        { name: "twitter:title", content: tool.seoTitle },
        { name: "twitter:description", content: tool.seoDescription },
      ],
      links: [{ rel: "canonical", href: tool.path }],
      scripts: ldScripts,
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">Tool not found</h1>
      <p className="mt-2 text-muted-foreground">This tool doesn't exist (yet).</p>
    </div>
  ),
});

function ToolPage() {
  const { toolId } = Route.useParams();
  const tool = getToolById(toolId)!;
  const Component = tool.Component;

  return (
    <ToolLayout tool={tool}>
      {Component ? (
        <Component />
      ) : (
        <div className="card-premium p-10 text-center">
          <p className="text-sm font-medium">Coming soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            This tool is on the roadmap — drop the route into <code>toolsConfig.ts</code> with a
            lazy component to ship it.
          </p>
        </div>
      )}
    </ToolLayout>
  );
}