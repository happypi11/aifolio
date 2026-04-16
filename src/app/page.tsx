"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

// Top featured tools
const featuredTools = toolsData
  .filter((t) => t.pricing === "Featured")
  .slice(0, 6);

// Top voted tools
const topTools = [...toolsData].sort((a, b) => b.votes - a.votes).slice(0, 10);

const pricingColors: Record<string, string> = {
  Free: "free-badge",
  Paid: "paid-badge",
  Freemium: "freemium-badge",
  Featured: "featured-badge",
  Trial: "trial-badge",
};

function ToolCard({ tool, index }: { tool: typeof toolsData[0]; index: number }) {
  const colorClass = pricingColors[tool.pricing] || "free-badge";

  return (
    <Link href={`/tool/${tool.slug}`} className="tool-card group">
      <div className="tool-card-header">
        <div className="tool-card-icon">
          {tool.name.slice(0, 2).toUpperCase()}
        </div>
        <span className={`tool-card-badge ${colorClass}`}>
          {tool.pricing}
        </span>
      </div>
      <div className="tool-card-body">
        <h3 className="tool-card-title">{tool.name}</h3>
        <p className="tool-card-desc">{tool.desc}</p>
      </div>
      <div className="tool-card-footer">
        <span className="tool-card-category">{tool.category}</span>
        <span className="tool-card-votes">↑ {tool.votes}</span>
      </div>
    </Link>
  );
}

function LeaderboardItem({ tool, index }: { tool: typeof toolsData[0]; index: number }) {
  const medalColors = ["text-amber-400", "text-slate-300", "text-amber-600", "text-muted-foreground"];
  return (
    <Link href={`/tool/${tool.slug}`} className="leaderboard-item group">
      <span className={`leaderboard-rank ${medalColors[index] || medalColors[3]}`}>
        {index + 1}
      </span>
      <div className="leaderboard-icon">
        {tool.name.slice(0, 2).toUpperCase()}
      </div>
      <div className="leaderboard-info">
        <p className="leaderboard-name">{tool.name}</p>
        <p className="leaderboard-cat">{tool.category}</p>
      </div>
      <div className="leaderboard-stats">
        <span className="leaderboard-votes">↑ {tool.votes}</span>
        <span className="leaderboard-pricing">{tool.pricing}</span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      <style>{`
        /* ==========================================
           HERO SECTION - from toolfame.com / turbo0.com
           ========================================== */
        .hero-section {
          background: rgb(15, 15, 18) !important;
          padding: 96px 0 64px 0 !important;
          text-align: center !important;
          position: relative !important;
          overflow: hidden !important;
        }
        .hero-glow {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 600px !important;
          height: 400px !important;
          background: radial-gradient(ellipse, rgba(106, 35, 231, 0.12), transparent 70%) !important;
          pointer-events: none !important;
          z-index: 0 !important;
        }
        .hero-content {
          position: relative !important;
          z-index: 1 !important;
          max-width: 720px !important;
          margin: 0 auto !important;
          padding: 0 16px !important;
        }
        .hero-badge {
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
          border-radius: 100px !important;
          border: 1px solid rgba(106, 35, 231, 0.3) !important;
          background: rgba(106, 35, 231, 0.08) !important;
          padding: 4px 12px !important;
          font-size: 12px !important;
          color: #a78bfa !important;
          margin-bottom: 24px !important;
          font-weight: 500 !important;
        }
        .hero-h1 {
          font-size: 48px !important;
          font-weight: 700 !important;
          line-height: 1.1 !important;
          letter-spacing: -0.02em !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 24px 0 !important;
          text-align: center !important;
        }
        .hero-gradient {
          background: linear-gradient(135deg, #a855f7, #ec4899) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }
        .hero-subtitle {
          font-size: 18px !important;
          color: rgb(107, 114, 128) !important;
          line-height: 1.6 !important;
          margin: 0 0 40px 0 !important;
          max-width: 560px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        /* ==========================================
           SEARCH - from toolfame.com (dark adapted)
           ========================================== */
        .hero-search-form {
          position: relative !important;
          width: 100% !important;
          max-width: 600px !important;
          margin: 0 auto !important;
        }
        .hero-search-input {
          width: 100% !important;
          height: 52px !important;
          border-radius: 12px !important;
          border: 1px solid rgb(40, 40, 50) !important;
          background: rgb(22, 22, 28) !important;
          padding: 14px 20px !important;
          padding-left: 48px !important;
          font-size: 15px !important;
          color: rgb(240, 238, 232) !important;
          outline: none !important;
          box-shadow: none !important;
          transition: border-color 0.15s ease !important;
        }
        .hero-search-input::placeholder {
          color: rgb(107, 114, 128) !important;
        }
        .hero-search-input:focus {
          border-color: #6a23e7 !important;
        }
        .hero-search-icon {
          position: absolute !important;
          left: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 18px !important;
          height: 18px !important;
          color: rgb(107, 114, 128) !important;
          pointer-events: none !important;
        }
        .hero-stats {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 32px !important;
          margin-top: 24px !important;
          font-size: 14px !important;
        }
        .hero-stat-strong {
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
        }
        .hero-stat-label {
          color: rgb(107, 114, 128) !important;
        }

        /* ==========================================
           SECTION HEADERS
           ========================================== */
        .section-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 24px !important;
        }
        .section-title {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 4px 0 !important;
        }
        .section-subtitle {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          margin: 0 !important;
        }
        .section-link {
          font-size: 13px !important;
          color: #a78bfa !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }
        .section-link:hover {
          color: #c4b5fd !important;
        }

        /* ==========================================
           TOOL CARDS - from dang.ai card style (dark)
           ========================================== */
        .tool-card {
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
          background: rgb(22, 22, 28) !important;
          border: 1px solid rgb(40, 40, 50) !important;
          border-radius: 12px !important;
          padding: 20px !important;
          text-decoration: none !important;
          transition: all 0.2s ease !important;
          cursor: pointer !important;
        }
        .tool-card:hover {
          border-color: #6a23e7 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 32px rgba(106, 35, 231, 0.15) !important;
        }
        .tool-card-header {
          display: flex !important;
          align-items: flex-start !important;
          justify-content: space-between !important;
          gap: 8px !important;
        }
        .tool-card-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 40px !important;
          height: 40px !important;
          border-radius: 8px !important;
          background: rgba(106, 35, 231, 0.15) !important;
          color: #a78bfa !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          flex-shrink: 0 !important;
        }
        .tool-card-badge {
          font-size: 11px !important;
          font-weight: 500 !important;
          padding: 2px 10px !important;
          border-radius: 100px !important;
          flex-shrink: 0 !important;
        }
        .free-badge { background: rgba(16, 185, 129, 0.1) !important; color: #34d399 !important; }
        .paid-badge { background: rgba(245, 158, 11, 0.1) !important; color: #fbbf24 !important; }
        .freemium-badge { background: rgba(59, 130, 246, 0.1) !important; color: #60a5fa !important; }
        .featured-badge { background: rgba(106, 35, 231, 0.1) !important; color: #a78bfa !important; }
        .trial-badge { background: rgba(249, 115, 22, 0.1) !important; color: #fb923c !important; }

        .tool-card-body {
          flex: 1 !important;
          min-width: 0 !important;
        }
        .tool-card-title {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 6px 0 !important;
          line-height: 1.4 !important;
          transition: color 0.15s ease !important;
        }
        .tool-card:hover .tool-card-title {
          color: #a78bfa !important;
        }
        .tool-card-desc {
          font-size: 13px !important;
          color: rgb(107, 114, 128) !important;
          line-height: 1.5 !important;
          margin: 0 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }
        .tool-card-footer {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
          margin-top: auto !important;
          padding-top: 4px !important;
        }
        .tool-card-category {
          font-size: 12px !important;
          color: rgb(107, 114, 128) !important;
          background: rgb(30, 30, 38) !important;
          padding: 2px 8px !important;
          border-radius: 6px !important;
        }
        .tool-card-votes {
          font-size: 13px !important;
          color: rgb(107, 114, 128) !important;
          font-weight: 500 !important;
        }

        /* ==========================================
           GRID LAYOUTS - from toolfame.com
           ========================================== */
        .page-container {
          max-width: 1280px !important;
          padding: 0 16px !important;
          margin: 0 auto !important;
        }
        .section-gap {
          padding: 0 16px !important;
        }
        .tools-grid-3 {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
          gap: 16px !important;
        }
        .tools-grid-2 {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
          gap: 12px !important;
        }
        .categories-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 12px !important;
        }
        @media (min-width: 640px) {
          .categories-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 768px) {
          .categories-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .categories-grid { grid-template-columns: repeat(6, 1fr) !important; }
        }

        /* ==========================================
           LEADERBOARD - from dofollow.tools style
           ========================================== */
        .leaderboard-panel {
          border: 1px solid rgb(40, 40, 50) !important;
          border-radius: 12px !important;
          background: rgb(22, 22, 28) !important;
          overflow: hidden !important;
        }
        .leaderboard-item {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 12px 16px !important;
          text-decoration: none !important;
          transition: background 0.15s ease !important;
          border-bottom: 1px solid rgb(40, 40, 50) !important;
        }
        .leaderboard-item:last-child {
          border-bottom: none !important;
        }
        .leaderboard-item:hover {
          background: rgb(30, 30, 38) !important;
        }
        .leaderboard-rank {
          font-size: 16px !important;
          font-weight: 700 !important;
          width: 24px !important;
          text-align: center !important;
          flex-shrink: 0 !important;
        }
        .leaderboard-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 36px !important;
          height: 36px !important;
          border-radius: 8px !important;
          background: rgba(106, 35, 231, 0.15) !important;
          color: #a78bfa !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          flex-shrink: 0 !important;
        }
        .leaderboard-info {
          flex: 1 !important;
          min-width: 0 !important;
        }
        .leaderboard-name {
          font-size: 14px !important;
          font-weight: 500 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 2px 0 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          transition: color 0.15s ease !important;
        }
        .leaderboard-item:hover .leaderboard-name {
          color: #a78bfa !important;
        }
        .leaderboard-cat {
          font-size: 12px !important;
          color: rgb(107, 114, 128) !important;
          margin: 0 !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        .leaderboard-stats {
          text-align: right !important;
          flex-shrink: 0 !important;
        }
        .leaderboard-votes {
          display: block !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          color: #a78bfa !important;
        }
        .leaderboard-pricing {
          display: block !important;
          font-size: 11px !important;
          color: rgb(107, 114, 128) !important;
        }

        /* ==========================================
           TWO-COLUMN LAYOUT
           ========================================== */
        .two-col-layout {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }
        @media (min-width: 1024px) {
          .two-col-layout { grid-template-columns: 2fr 1fr !important; }
        }

        /* ==========================================
           CATEGORY CARDS
           ========================================== */
        .category-card {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 16px !important;
          border-radius: 12px !important;
          border: 1px solid rgb(40, 40, 50) !important;
          background: rgb(22, 22, 28) !important;
          text-decoration: none !important;
          text-align: center !important;
          transition: all 0.2s ease !important;
        }
        .category-card:hover {
          border-color: #6a23e7 !important;
          box-shadow: 0 4px 20px rgba(106, 35, 231, 0.1) !important;
        }
        .category-icon {
          font-size: 24px !important;
        }
        .category-name {
          font-size: 12px !important;
          font-weight: 500 !important;
          color: rgb(240, 238, 232) !important;
          transition: color 0.15s ease !important;
        }
        .category-card:hover .category-name {
          color: #a78bfa !important;
        }
        .category-count {
          font-size: 11px !important;
          color: rgb(107, 114, 128) !important;
        }

        /* ==========================================
           NEWSLETTER - from toolfame.com style
           ========================================== */
        .newsletter-section {
          padding: 0 16px !important;
        }
        .newsletter-card {
          max-width: 672px !important;
          margin: 0 auto !important;
          border-radius: 16px !important;
          border: 1px solid rgba(106, 35, 231, 0.3) !important;
          background: linear-gradient(180deg, rgba(106, 35, 231, 0.05), rgba(236, 72, 153, 0.05)) !important;
          padding: 40px 32px !important;
          text-align: center !important;
          position: relative !important;
          overflow: hidden !important;
        }
        .newsletter-glow {
          position: absolute !important;
          top: 0 !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: 400px !important;
          height: 200px !important;
          background: radial-gradient(ellipse, rgba(106, 35, 231, 0.2), transparent 70%) !important;
          pointer-events: none !important;
        }
        .newsletter-title {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 8px 0 !important;
          position: relative !important;
        }
        .newsletter-desc {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          margin: 0 0 24px 0 !important;
          position: relative !important;
        }
        .newsletter-form {
          display: flex !important;
          gap: 8px !important;
          max-width: 400px !important;
          margin: 0 auto !important;
          position: relative !important;
        }
        .newsletter-input {
          flex: 1 !important;
          height: 40px !important;
          padding: 0 12px !important;
          border-radius: 8px !important;
          border: 1px solid rgb(40, 40, 50) !important;
          background: rgb(22, 22, 28) !important;
          font-size: 14px !important;
          color: rgb(240, 238, 232) !important;
          outline: none !important;
        }
        .newsletter-input::placeholder {
          color: rgb(107, 114, 128) !important;
        }
        .newsletter-input:focus {
          border-color: #6a23e7 !important;
        }
        .newsletter-btn {
          height: 40px !important;
          padding: 0 20px !important;
          border-radius: 8px !important;
          background: #6a23e7 !important;
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          border: none !important;
          cursor: pointer !important;
          white-space: nowrap !important;
          transition: background 0.15s ease !important;
        }
        .newsletter-btn:hover {
          background: #7c3aed !important;
        }
      `}</style>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>🔥</span> {toolsData.length}+ tools in directory
          </div>
          <h1 className="hero-h1">
            Discover the Best<br />
            <span className="hero-gradient">AI Tools & SaaS</span>
          </h1>
          <p className="hero-subtitle">
            A curated directory of AI tools, productivity apps, and SaaS products for builders and indie makers.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="hero-search-form">
            <svg className="hero-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AI tools, categories, tags..."
              className="hero-search-input"
            />
          </form>

          {/* Stats */}
          <div className="hero-stats">
            <span><strong className="hero-stat-strong">{toolsData.length}+</strong> <span className="hero-stat-label">Tools</span></span>
            <span><strong className="hero-stat-strong">{categoriesData.length}</strong> <span className="hero-stat-label">Categories</span></span>
            <span><strong className="hero-stat-strong">24K+</strong> <span className="hero-stat-label">Monthly Visitors</span></span>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="section-gap">
        <div className="page-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Tools</h2>
              <p className="section-subtitle">Hand-picked by our team</p>
            </div>
            <Link href="/featured" className="section-link">View all →</Link>
          </div>
          <div className="tools-grid-3">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Two-col layout: Latest Tools + Leaderboard */}
      <section className="section-gap">
        <div className="page-container">
          <div className="two-col-layout">
            {/* Latest tools */}
            <div>
              <div className="section-header">
                <div>
                  <h2 className="section-title">Latest Tools</h2>
                  <p className="section-subtitle">Fresh additions to our directory</p>
                </div>
                <Link href="/tools" className="section-link">View all →</Link>
              </div>
              <div className="tools-grid-2">
                {toolsData.slice(0, 8).map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <div className="section-header">
                <div>
                  <h2 className="section-title">🏆 Leaderboard</h2>
                  <p className="section-subtitle">Top voted this week</p>
                </div>
                <Link href="/leaderboard" className="section-link">View all →</Link>
              </div>
              <div className="leaderboard-panel">
                {topTools.map((tool, i) => (
                  <LeaderboardItem key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-gap">
        <div className="page-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Browse Categories</h2>
              <p className="section-subtitle">Find tools by category</p>
            </div>
            <Link href="/categories" className="section-link">All categories →</Link>
          </div>
          <div className="categories-grid">
            {categoriesData.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="category-card">
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-glow" />
          <h2 className="newsletter-title">Get the best tools in your inbox</h2>
          <p className="newsletter-desc">Weekly curated list of the hottest AI tools and indie products. No spam.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="newsletter-input" />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
