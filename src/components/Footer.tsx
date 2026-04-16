import Link from "next/link";

export default function Footer() {
  const categories = [
    "AI Tools", "Image Generation", "Video", "Writing", "Development",
    "Marketing", "Productivity", "Design", "SEO", "Game"
  ];

  return (
    <>
      <style>{`
        .footer {
          background: rgb(15, 15, 18) !important;
          padding: 48px 0 24px 0 !important;
          border-top: 1px solid rgb(40, 40, 50) !important;
          color: rgb(240, 238, 232) !important;
        }
        .footer-container {
          max-width: 1280px !important;
          padding: 0 16px !important;
          margin: 0 auto !important;
        }
        .footer-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 32px !important;
        }
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        .footer-brand-col {
          grid-column: span 2 !important;
        }
        @media (min-width: 768px) {
          .footer-brand-col { grid-column: span 1 !important; }
        }
        .footer-logo {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          text-decoration: none !important;
          margin-bottom: 16px !important;
        }
        .footer-logo-icon {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 32px !important;
          height: 32px !important;
          border-radius: 6px !important;
          background: linear-gradient(135deg, #6a23e7, #a855f7) !important;
          color: white !important;
          font-weight: 700 !important;
          font-size: 14px !important;
          flex-shrink: 0 !important;
        }
        .footer-logo-text {
          font-size: 16px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          text-decoration: none !important;
        }
        .footer-logo-accent {
          color: #6a23e7 !important;
        }
        .footer-desc {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          line-height: 1.6 !important;
          max-width: 280px !important;
        }
        .footer-social {
          display: flex !important;
          gap: 12px !important;
          margin-top: 16px !important;
        }
        .footer-social-link {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
        }
        .footer-social-link:hover {
          color: rgb(240, 238, 232) !important;
        }
        .footer-section-title {
          font-size: 13px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          margin: 0 0 12px 0 !important;
          letter-spacing: 0.02em !important;
        }
        .footer-links {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
        }
        .footer-link {
          font-size: 14px !important;
          color: rgb(107, 114, 128) !important;
          text-decoration: none !important;
          transition: color 0.15s ease !important;
        }
        .footer-link:hover {
          color: rgb(240, 238, 232) !important;
        }
        .footer-bottom {
          margin-top: 40px !important;
          padding-top: 20px !important;
          border-top: 1px solid rgb(40, 40, 50) !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
        }
        @media (min-width: 640px) {
          .footer-bottom { flex-direction: row !important; }
        }
        .footer-copyright {
          font-size: 12px !important;
          color: rgb(107, 114, 128) !important;
        }
        .footer-tagline {
          font-size: 12px !important;
          color: rgb(107, 114, 128) !important;
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand-col">
              <Link href="/" className="footer-logo">
                <div className="footer-logo-icon">A</div>
                <span className="footer-logo-text">
                  AI<span className="footer-logo-accent">Folio</span>
                </span>
              </Link>
              <p className="footer-desc">
                Discover the best AI tools and SaaS products. Curated directory for builders and makers.
              </p>
              <div className="footer-social">
                <a href="#" className="footer-social-link">Twitter</a>
                <a href="#" className="footer-social-link">GitHub</a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="footer-section-title">Categories</h4>
              <ul className="footer-links">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat}>
                    <Link href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="footer-section-title">Resources</h4>
              <ul className="footer-links">
                {["Submit Tool", "Featured", "Leaderboard", "Blog", "Newsletter"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="footer-section-title">Company</h4>
              <ul className="footer-links">
                {["About", "Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="footer-link">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2026 AIFolio. All rights reserved.
            </p>
            <p className="footer-tagline">
              Built for builders 🚀
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
