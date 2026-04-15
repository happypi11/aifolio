import Link from "next/link";
import toolsData from "@/data/tools.json";

export const metadata = {
  title: "Featured Tools — AIFolio",
  description: "Hand-picked featured AI tools and SaaS products curated by our team.",
};

export default function FeaturedPage() {
  const featuredTools = toolsData.filter((t) => t.pricing === "Featured");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-500 mb-4">
            <span>⭐</span> Featured by our team
          </div>
          <h1 className="text-3xl font-bold">Featured Tools</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {featuredTools.length} hand-picked tools — the best of the best
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {featuredTools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No featured tools yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool, i) => {
              const pricingColors: Record<string, string> = {
                Free: "bg-emerald-500/10 text-emerald-500",
                Paid: "bg-amber-500/10 text-amber-500",
                Freemium: "bg-blue-500/10 text-blue-500",
                Featured: "bg-amber-500/10 text-amber-500",
                Trial: "bg-orange-500/10 text-orange-500",
              };
              const color = pricingColors[tool.pricing] || "bg-muted text-muted-foreground";

              return (
                <Link
                  key={tool.slug}
                  href={`/tool/${tool.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-5 hover:border-amber-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-500 font-bold text-sm shrink-0">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${color}`}>
                      {tool.pricing}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm group-hover:text-amber-500 transition-colors">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{tool.desc}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                    <span className="bg-muted px-2 py-0.5 rounded">{tool.category}</span>
                    <span className="ml-auto">↑ {tool.votes} votes</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
