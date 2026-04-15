import Link from "next/link";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categoriesData.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const tools = toolsData.filter((t) =>
    t.category.toLowerCase().replace(/\s+/g, '-') === params.slug ||
    t.category.toLowerCase() === cat.name.toLowerCase()
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <span className="text-3xl">{cat.icon}</span>
          <h1 className="mt-2 text-3xl font-bold">{cat.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tools.length} tools in this category
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool) => {
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 text-violet-500 font-bold text-sm">
                    {tool.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>
                    {tool.pricing}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-violet-500 transition-colors">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                  <span className="bg-muted px-2 py-0.5 rounded">{tool.category}</span>
                  <span className="ml-auto">↑ {tool.votes}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {tools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No tools found in this category yet.</p>
            <Link href="/submit" className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-medium text-white transition-colors">
              Submit the first one!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
