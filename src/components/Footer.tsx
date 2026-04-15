import Link from "next/link";

export default function Footer() {
  const categories = [
    "AI Tools", "Image Generation", "Video", "Writing", "Development",
    "Marketing", "Productivity", "Design", "SEO", "Game"
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white font-bold text-sm">
                A
              </div>
              <span className="text-lg font-bold">AI<span className="text-violet-500">Folio</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover the best AI tools and SaaS products. Curated directory for builders and makers.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">GitHub</a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2">
              {["Submit Tool", "Featured", "Leaderboard", "Blog", "Newsletter"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 AIFolio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for builders 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
