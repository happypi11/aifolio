import Link from "next/link";
import toolsData from "@/data/tools.json";

export const metadata = {
  title: "Leaderboard — AIFolio",
  description: "Top voted AI tools and SaaS products on AIFolio.",
};

export default function LeaderboardPage() {
  const sorted = [...toolsData].sort((a, b) => b.votes - a.votes).slice(0, 20);

  const rankColors = [
    "text-amber-400",   // gold
    "text-slate-300",   // silver
    "text-amber-600",   // bronze
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Top 20 most voted AI tools and SaaS products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
        <div className="space-y-2">
          {sorted.map((tool, i) => {
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
                className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-violet-500/30 hover:-translate-y-px hover:shadow-md hover:shadow-violet-500/5 transition-all duration-200 group"
              >
                {/* Rank */}
                <div className={`text-2xl font-bold w-10 text-center shrink-0 ${
                  i < 3 ? rankColors[i] : "text-muted-foreground"
                }`}>
                  {i + 1}
                </div>

                {/* Logo */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-sm shrink-0">
                  {tool.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Name & Category */}
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold group-hover:text-violet-500 transition-colors truncate">{tool.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{tool.category}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-violet-500">↑ {tool.votes}</p>
                    <p className="text-xs text-muted-foreground">votes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground">{tool.views.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
                    {tool.pricing}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
