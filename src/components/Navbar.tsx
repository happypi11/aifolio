import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <style>{`
        .navbar {
          position: sticky !important;
          top: 0 !important;
          z-index: 50 !important;
          background: rgba(15, 15, 18, 0.85) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          border-bottom: 1px solid rgb(40, 40, 50) !important;
          box-shadow: none !important;
          height: 52px !important;
          padding: 8px 16px !important;
        }
        .navbar-container {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          max-width: 1280px !important;
          margin: 0 auto !important;
          width: 100% !important;
          height: 100% !important;
        }
        .navbar-logo {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          text-decoration: none !important;
          flex-shrink: 0 !important;
        }
        .navbar-logo-icon {
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
        .navbar-logo-text {
          font-size: 16px !important;
          font-weight: 600 !important;
          color: rgb(240, 238, 232) !important;
          text-decoration: none !important;
          display: none !important;
        }
        @media (min-width: 640px) {
          .navbar-logo-text { display: inline !important; }
        }
        .navbar-logo-accent {
          color: #6a23e7 !important;
        }
        .navbar-nav {
          display: flex !important;
          align-items: center !important;
          gap: 4px !important;
        }
        .navbar-link {
          font-size: 14px !important;
          font-weight: 400 !important;
          color: rgb(107, 114, 128) !important;
          padding: 8px 12px !important;
          text-decoration: none !important;
          border-radius: 6px !important;
          transition: color 0.15s ease, background 0.15s ease !important;
          white-space: nowrap !important;
        }
        .navbar-link:hover {
          color: rgb(240, 238, 232) !important;
          background: rgb(30, 30, 38) !important;
        }
        .navbar-actions {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-shrink: 0 !important;
        }
        .navbar-submit {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 32px !important;
          padding: 0 14px !important;
          background: #6a23e7 !important;
          color: white !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          border-radius: 6px !important;
          text-decoration: none !important;
          border: none !important;
          cursor: pointer !important;
          transition: background 0.15s ease !important;
          white-space: nowrap !important;
        }
        .navbar-submit:hover {
          background: #7c3aed !important;
        }
      `}</style>
      
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">A</div>
            <span className="navbar-logo-text">
              AI<span className="navbar-logo-accent">Folio</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="navbar-nav">
            <Link href="/" className="navbar-link">Home</Link>
            <Link href="/tools" className="navbar-link">All Tools</Link>
            <Link href="/categories" className="navbar-link">Categories</Link>
            <Link href="/featured" className="navbar-link">Featured</Link>
            <Link href="/leaderboard" className="navbar-link">Leaderboard</Link>
          </nav>

          {/* Right actions */}
          <div className="navbar-actions">
            <Link href="/submit" className="navbar-submit">
              + Submit Tool
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
