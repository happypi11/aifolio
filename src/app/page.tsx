import Link from "next/link";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

// Top featured tools
const featuredTools = toolsData
  .filter((t) => t.pricing === "Featured")
  .slice(0, 6);

// Top voted tools
const topTools = [...toolsData].sort((a, b) => b.votes - a.votes).slice(0, 10);

function ToolCard({ tool, index }: { tool: typeof toolsData[0]; index: number }) {
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
      href={`/tool/${tool.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-5 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-sm">
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
        <span className="bg-muted px-2 py-0.5 rounded text-xs">{tool.category}</span>
        <span className="ml-auto">↑ {tool.votes}</span>
      </div>
    </Link>
  );
}

function LeaderboardItem({ tool, index }: { tool: typeof toolsData[0]; index: number }) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <span className={`text-lg font-bold w-6 text-center shrink-0 ${
        index === 0 ? "text-amber-400" : index === 1 ? "text-slate-300" : index === 2 ? "text-amber-600" : "text-muted-foreground"
      }`}>
        {index + 1}
      </span>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-xs shrink-0">
        {tool.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium group-hover:text-violet-500 transition-colors truncate">{tool.name}</p>
        <p className="text-xs text-muted-foreground truncate">{tool.category}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-sm font-semibold text-violet-500">↑ {tool.votes}</span>
        <p className="text-xs text-muted-foreground">{tool.pricing}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-28">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-500 mb-6">
            <span>🚀</span> 29 tools submitted today
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Discover the Best<br />
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              AI Tools & SaaS
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            A curated directory of {toolsData.length}+ AI tools, productivity apps, and SaaS products for builders and indie makers.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search AI tools, categories, tags..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border/50 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-8 mt-6 text-sm">
            <span><strong className="text-foreground">{toolsData.length}+</strong> <span className="text-muted-foreground">Tools</span></span>
            <span><strong className="text-foreground">{categoriesData.length}</strong> <span className="text-muted-foreground">Categories</span></span>
            <span><strong className="text-foreground">24K+</strong> <span className="text-muted-foreground">Monthly Visitors</span></span>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Tools</h2>
              <p className="text-sm text-muted-foreground mt-1">Hand-picked by our team</p>
            </div>
            <Link href="/featured" className="text-sm text-violet-500 hover:text-violet-400 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Two-col layout: All Tools + Leaderboard */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* All tools grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Latest Tools</h2>
                <p className="text-sm text-muted-foreground mt-1">Fresh additions to our directory</p>
              </div>
              <Link href="/tools" className="text-sm text-violet-500 hover:text-violet-400 transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolsData.slice(0, 8).map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">🏆 Leaderboard</h2>
                <p className="text-sm text-muted-foreground mt-1">Top voted this week</p>
              </div>
              <Link href="/leaderboard" className="text-sm text-violet-500 hover:text-violet-400 transition-colors">
                View all →
              </Link>
            </div>
            <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/50">
              {topTools.map((tool, i) => (
                <LeaderboardItem key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Browse Categories</h2>
              <p className="text-sm text-muted-foreground mt-1">Find tools by category</p>
            </div>
            <Link href="/categories" className="text-sm text-violet-500 hover:text-violet-400 transition-colors">
              All categories →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categoriesData.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/50 bg-card hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 transition-all text-center group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium group-hover:text-violet-500 transition-colors">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-600/5 to-fuchsia-600/5 p-8 sm:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/30 rounded-full blur-3xl" />
            </div>
            <h2 className="text-2xl font-bold">Get the best tools in your inbox</h2>
            <p className="mt-2 text-sm text-muted-foreground">Weekly curated list of the hottest AI tools and indie products. No spam.</p>
            <div className="mt-6 flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-10 px-3 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <button className="h-10 px-5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
