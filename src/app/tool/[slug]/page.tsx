import Link from "next/link";
import toolsData from "@/data/tools.json";
import { notFound } from "next/navigation";

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = toolsData.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  const related = toolsData
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  const pricingColors: Record<string, string> = {
    Free: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Paid: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Freemium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Featured: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    Trial: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
  const pricingStyle = pricingColors[tool.pricing] || "bg-muted text-muted-foreground";

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <span>/</span>
          <Link href={`/category/${tool.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground transition-colors">{tool.category}</Link>
          <span>/</span>
          <span className="text-foreground">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-xl shrink-0">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold">{tool.name}</h1>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${pricingStyle}`}>
                      {tool.pricing}
                    </span>
                    <span className="bg-muted px-2.5 py-1 rounded-full text-xs text-muted-foreground">{tool.category}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-medium text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
                <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card hover:bg-muted px-6 text-sm font-medium transition-colors">
                  ↑ {tool.votes} votes
                </button>
                <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card hover:bg-muted px-6 text-sm font-medium transition-colors">
                  ⭐ Save
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Votes", value: tool.votes.toLocaleString() },
                { label: "Views", value: tool.views.toLocaleString() },
                { label: "Pricing", value: tool.pricing },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-4 text-center">
                  <p className="text-2xl font-bold text-violet-500">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Description placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <h2 className="text-lg font-semibold mb-3">About {tool.name}</h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>{tool.desc}</p>
                <p>
                  This tool is categorized under <strong className="text-foreground">{tool.category}</strong> and is available on AIFolio. 
                  Visit the official website to learn more about features, pricing, and how to get started.
                </p>
              </div>
            </div>

            {/* Screenshot placeholder */}
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <h2 className="text-lg font-semibold mb-4">Screenshots</h2>
              <div className="rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 aspect-video flex items-center justify-center">
                <span className="text-sm text-muted-foreground">Screenshot preview</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Info */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
              <h3 className="font-semibold">Tool Info</h3>
              {[
                { label: "Category", value: tool.category },
                { label: "Pricing", value: tool.pricing },
                { label: "Source", value: tool.source },
                { label: "Added", value: "2026-03-15" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <h3 className="font-semibold mb-4">Related Tools</h3>
                <div className="space-y-3">
                  {related.map((t) => (
                    <Link key={t.slug} href={`/tool/${t.slug}`} className="flex items-center gap-3 group">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-xs shrink-0">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium group-hover:text-violet-500 transition-colors truncate">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-600/5 to-fuchsia-600/5 p-6 text-center">
              <h3 className="font-semibold mb-2">Is this your tool?</h3>
              <p className="text-xs text-muted-foreground mb-4">Claim this listing and update the info, add screenshots, and more.</p>
              <Link href="/submit" className="block w-full h-10 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium flex items-center justify-center transition-colors">
                Claim / Update
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
