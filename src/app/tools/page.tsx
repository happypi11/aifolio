"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";

type SortOption = "votes" | "views" | "newest";
type PricingFilter = "All" | "Free" | "Paid" | "Freemium" | "Featured" | "Trial";

const pricingColors: Record<string, string> = {
  Free: "free-badge",
  Paid: "paid-badge",
  Freemium: "freemium-badge",
  Featured: "featured-badge",
  Trial: "trial-badge",
};

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<PricingFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("votes");

  const filteredTools = useMemo(() => {
    let result = [...toolsData];

    if (selectedCategory) {
      result = result.filter(
        (t) => t.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory
      );
    }

    if (selectedPricing !== "All") {
      result = result.filter((t) => t.pricing === selectedPricing);
    }

    switch (sortBy) {
      case "votes":
        result.sort((a, b) => b.votes - a.votes);
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        break;
    }

    return result;
  }, [selectedCategory, selectedPricing, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "votes", label: "Most Voted" },
    { value: "views", label: "Most Viewed" },
    { value: "newest", label: "Newest" },
  ];

  const pricingFilters: PricingFilter[] = ["All", "Free", "Paid", "Freemium", "Featured", "Trial"];

  return (
    <div className="tools-page">
      <style>{`
        /* ==========================================
           TOOLS PAGE - Frankenstein from dofollow.tools (sidebar) 
           and dang.ai (dark cards)
           ========================================== */
        .tools-page {
          min-height: 100vh !important;
          background: rgb(15, 15, 18) !important;
        }
        .tools-header {
          border-bottom: 1px solid rgb(40, 40, 50) !important;
          background: rgb(15, 15, 18) !important;
          padding: 32px 0 !important;
        }
        .tools-header-container {
          max-width: 1280px !important;
          padding: 0 16px !important;
          margin: 0 auto !important;
        }
        .tools-header h1 {
          font-size: 28px !important;
          font-weight: 700 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 4px 0 !important;
        }
        .tools-header p {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          margin: 0 !important;
        }

        /* ==========================================
           MAIN LAYOUT - from dofollow.tools sidebar
           ========================================== */
        .tools-main {
          max-width: 1280px !important;
          padding: 32px 16px !important;
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 32px !important;
        }
        @media (min-width: 1024px) {
          .tools-main { flex-direction: row !important; }
        }

        /* ==========================================
           SIDEBAR - from dofollow.tools exact
           ========================================== */
        .tools-sidebar {
          width: 100% !important;
          flex-shrink: 0 !important;
        }
        @media (min-width: 1024px) {
          .tools-sidebar { width: 220px !important; }
        }
        .sidebar-sticky {
          position: sticky !important;
          top: calc(52px + 24px) !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 24px !important;
        }
        .sidebar-section {
          display: flex !important;
          flex-direction: column !important;
          gap: 4px !important;
        }
        .sidebar-title {
          font-size: 12px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          padding: 0 8px !important;
          margin-bottom: 4px !important;
        }
        .sidebar-btn {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          padding: 8px 8px !important;
          border-radius: 6px !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          color: rgb(107, 114, 128) !important;
          background: transparent !important;
          border: none !important;
          cursor: pointer !important;
          text-align: left !important;
          transition: all 0.15s ease !important;
          gap: 8px !important;
        }
        .sidebar-btn:hover {
          background: rgb(30, 30, 38) !important;
          color: rgb(240, 238, 232) !important;
        }
        .sidebar-btn.active {
          background: rgba(106, 35, 231, 0.1) !important;
          color: #a78bfa !important;
          font-weight: 500 !important;
        }
        .sidebar-btn-name {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          flex: 1 !important;
          min-width: 0 !important;
        }
        .sidebar-btn-count {
          font-size: 11px !important;
          color: rgb(107, 114, 128) !important;
          flex-shrink: 0 !important;
        }
        .sidebar-btn.active .sidebar-btn-count {
          color: #a78bfa !important;
        }

        /* ==========================================
           CONTENT AREA
           ========================================== */
        .tools-content {
          flex: 1 !important;
          min-width: 0 !important;
        }

        /* Sort bar */
        .sort-bar {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          margin-bottom: 16px !important;
          gap: 12px !important;
        }
        .sort-count {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          flex-shrink: 0 !important;
        }
        .sort-buttons {
          display: flex !important;
          gap: 6px !important;
          flex-wrap: wrap !important;
        }
        .sort-btn {
          font-size: 12px !important;
          padding: 6px 12px !important;
          border-radius: 6px !important;
          border: 1px solid rgb(40, 40, 50) !important;
          background: transparent !important;
          color: rgb(107, 114, 128) !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          white-space: nowrap !important;
        }
        .sort-btn:hover {
          border-color: rgba(106, 35, 231, 0.5) !important;
          color: rgb(240, 238, 232) !important;
        }
        .sort-btn.active {
          border-color: rgba(106, 35, 231, 0.5) !important;
          background: rgba(106, 35, 231, 0.1) !important;
          color: #a78bfa !important;
        }

        /* ==========================================
           TOOL CARDS - from dang.ai exact
           ========================================== */
        .tools-grid {
          display: grid !important;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
          gap: 16px !important;
        }
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

        .tool-card-body { flex: 1 !important; min-width: 0 !important; }
        .tool-card-title {
          font-size: 15px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 6px 0 !important;
          line-height: 1.4 !important;
          transition: color 0.15s ease !important;
        }
        .tool-card:hover .tool-card-title { color: #a78bfa !important; }
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

        /* Empty state */
        .tools-empty {
          text-align: center !important;
          padding: 64px 0 !important;
        }
        .tools-empty p {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          margin: 0 0 16px 0 !important;
        }
        .tools-empty-btn {
          font-size: 13px !important;
          color: #a78bfa !important;
          background: none !important;
          border: none !important;
          cursor: pointer !important;
          text-decoration: underline !important;
        }
      `}</style>

      {/* Header */}
      <div className="tools-header">
        <div className="tools-header-container">
          <h1>All AI Tools</h1>
          <p>{toolsData.length} tools and counting — from AI assistants to productivity boosters</p>
        </div>
      </div>

      <div className="tools-main">
        {/* Sidebar filters */}
        <aside className="tools-sidebar">
          <div className="sidebar-sticky">
            {/* Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Categories</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`sidebar-btn ${selectedCategory === null ? 'active' : ''}`}
              >
                <span className="sidebar-btn-name">
                  <span>All</span>
                </span>
                <span className="sidebar-btn-count">{toolsData.length}</span>
              </button>
              {categoriesData.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`sidebar-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                >
                  <span className="sidebar-btn-name">
                    <span>{cat.icon} {cat.name}</span>
                  </span>
                  <span className="sidebar-btn-count">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Pricing */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Pricing</h3>
              {pricingFilters.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPricing(p)}
                  className={`sidebar-btn ${selectedPricing === p ? 'active' : ''}`}
                >
                  <span className="sidebar-btn-name">{p}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Tools grid */}
        <div className="tools-content">
          {/* Sort bar */}
          <div className="sort-bar">
            <p className="sort-count">{filteredTools.length} tools</p>
            <div className="sort-buttons">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`sort-btn ${sortBy === opt.value ? 'active' : ''}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="tools-empty">
              <p>No tools found matching your filters.</p>
              <button
                onClick={() => { setSelectedCategory(null); setSelectedPricing("All"); }}
                className="tools-empty-btn"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="tools-grid">
              {filteredTools.map((tool) => {
                const colorClass = pricingColors[tool.pricing] || "free-badge";
                return (
                  <Link
                    key={tool.slug}
                    href={`/tool/${tool.slug}`}
                    className="tool-card group"
                  >
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
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
