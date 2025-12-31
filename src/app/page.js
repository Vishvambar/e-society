import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="container nav-container">
          <div className="logo-section">

            <span className="brand-name">Grand Horizon</span>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="btn btn-primary">
              Member Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Experience Premium <br /> Community Living</h1>
            <p className="hero-subtitle">
              Welcome to Grand Horizon Society. A seamless management system designed for comfort, security, and community transparency.
            </p>
            <div className="hero-actions">
              <Link href="/login" className="btn btn-primary btn-lg">
                Enter Portal
              </Link>
              <button className="btn btn-outline btn-lg">
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="abstract-shape"></div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Grand Horizon?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Advanced Security</h3>
              <p>State-of-the-art visitor tracking and gate management ensuring your peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Community Connect</h3>
              <p>Stay connected with neighbors, events, and announcements through our centralized hub.</p>
            </div>
            <div className="feature-card">
              <div className="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Total Transparency</h3>
              <p>Access financial reports, meeting minutes, and society bylaws instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Grand Horizon Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
