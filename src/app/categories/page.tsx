import Link from "next/link";
import categoriesData from "@/data/categories.json";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/50 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-bold">All Categories</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse {categoriesData.length} categories of AI tools and SaaS products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categoriesData.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/50 bg-card hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all text-center"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <p className="font-semibold text-sm group-hover:text-violet-500 transition-colors">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} tools</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
