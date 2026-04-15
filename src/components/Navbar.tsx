import Link from "next/link";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white font-bold text-sm">
            A
          </div>
          <span className="text-lg font-bold text-foreground hidden sm:inline">AI<span className="text-violet-500">Folio</span></span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Tools</Link>
          <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
          <Link href="/featured" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Featured</Link>
          <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/submit"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 px-4 text-sm font-medium text-white transition-colors"
          >
            + Submit Tool
          </Link>
          <Link
            href="/submit"
            className="sm:hidden h-9 w-9 items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors flex"
          >
            +
          </Link>
        </div>
      </div>
    </header>
  );
}
