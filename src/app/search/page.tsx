"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import toolsData from "@/data/tools.json";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return toolsData.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {query ? `${results.length} result${results.length !== 1 ? "s" : ""} found` : "Enter a search term"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {!query.trim() ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Use the search bar above to find AI tools.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-muted-foreground">Try a different search term or browse categories.</p>
            <Link href="/categories" className="mt-4 inline-block text-sm text-violet-500 hover:text-violet-400">
              Browse categories →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((tool) => {
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
                  className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card p-5 hover:border-violet-500/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200"
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
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
