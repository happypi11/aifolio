import Link from "next/link";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

export default function ToolsPage() {
  const sorted = [...toolsData].sort((a, b) => b.votes - a.votes);

  const pricingFilters = ["All", "Free", "Paid", "Freemium", "Featured"];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold">All AI Tools</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {toolsData.length} tools and counting — from AI assistants to productivity boosters
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/tools" className="block text-sm px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-500 font-medium">
                      All ({toolsData.length})
                    </Link>
                  </li>
                  {categoriesData.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between text-sm px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <span>{cat.icon} {cat.name}</span>
                        <span className="text-xs text-muted-foreground">{cat.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Pricing</h3>
                <ul className="space-y-1">
                  {pricingFilters.map((p) => (
                    <li key={p}>
                      <button className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${p === "All" ? "bg-violet-500/10 text-violet-500 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Tools grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{sorted.length} tools</p>
              <div className="flex gap-2">
                {["Most Voted", "Most Viewed", "Newest"].map((s) => (
                  <button key={s} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${s === "Most Voted" ? "border-violet-500/50 bg-violet-500/10 text-violet-500" : "border-border text-muted-foreground hover:border-violet-500/30"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {sorted.map((tool) => {
                const pricingColors: Record<string, string> = {
                  Free: "bg-emerald-500/10 text-emerald-500",
                  Paid: "bg-amber-500/10 text-amber-500",
                  Freemium: "bg-blue-500/10 text-blue-500",
                  Featured: "bg-violet-500/10 text-violet-500",
                  Trial: "bg-orange-500/10 text-orange-500",
                };
                const color = pricingColors[tool.pricing] || "bg-muted text-muted-foreground";

                return (
                  <Link
                    key={tool.slug}
                    href={`/tool/${tool.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-5 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-sm shrink-0">
                        {tool.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${color}`}>
                        {tool.pricing}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm group-hover:text-violet-500 transition-colors">{tool.name}</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
}
