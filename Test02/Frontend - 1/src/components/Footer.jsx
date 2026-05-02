import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="main-section footer">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="foter-inner-wrap">
          <div className="footer-layout-grid">
            <div className="footer-menu-wrap-2" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'start' }}>
              {/* Brand Column */}
              <div className="footer-logo-wrap logo" style={{ gap: '1.5vw' }}>
                <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '2vw', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                  VITALIS <span style={{ color: '#2EC4B6' }}>AI</span>
                </div>
                <div className="footer-text" style={{ color: '#8d8d8d', fontSize: '1.2vw', lineHeight: 1.8, maxWidth: '20vw' }}>
                  AI-powered public healthcare assistant bringing quality medical guidance to 900M+ underserved rural citizens across India.
                </div>
              </div>
              {/* Navigation Column */}
              <div className="footer-menu-pages vat-1">
                <div className="footer-text" style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5vw', fontSize: '1.3vw' }}>Navigate</div>
                <a href="#hero" className="footer-page w-inline-block">
                  <div className="footer-text">Home</div>
                </a>
                <a href="#about-intro" className="footer-page w-inline-block">
                  <div className="footer-text">About</div>
                </a>
                <a href="#why-us" className="footer-page w-inline-block">
                  <div className="footer-text">Why Us</div>
                </a>
                <a href="#testimonial" className="footer-page w-inline-block">
                  <div className="footer-text">How It Works</div>
                </a>
                <a href="#cta" className="footer-page w-inline-block">
                  <div className="footer-text">Contact</div>
                </a>
              </div>
              {/* Features Column */}
              <div className="footer-menu-pages">
                <div className="footer-text" style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5vw', fontSize: '1.3vw' }}>Features</div>
                <div className="footer-page no-hover"><div className="footer-text">AI Triage</div></div>
                <div className="footer-page no-hover"><div className="footer-text">Voice Input</div></div>
                <div className="footer-page no-hover"><div className="footer-text">Hospital Finder</div></div>
                <div className="footer-page no-hover"><div className="footer-text">Emergency Alerts</div></div>
                <div className="footer-page no-hover"><div className="footer-text">Health History</div></div>
              </div>
              {/* Contact Column */}
              <div className="footer-menu-pages edge-border">
                <div className="footer-text" style={{ color: '#fff', fontWeight: 600, marginBottom: '0.5vw', fontSize: '1.3vw' }}>Contact</div>
                <div className="footer-page no-hover"><div className="footer-text">teamzyphers@gmail.com</div></div>
                <div className="footer-page no-hover"><div className="footer-text">India</div></div>
                <Link to="http://localhost:5174/" className="footer-page w-inline-block" style={{ marginTop: '0.5vw' }}>
                  <div className="footer-text" style={{ color: '#2EC4B6', fontWeight: 500 }}>Get Consultancy →</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom-block" style={{ borderTop: '1px solid #2c2c2c', paddingTop: '1.5vw', marginTop: '2vw' }}>
            <div className="copyright-wrapper">
              <p className="copyright-text">
                © 2025 VITALIS AI — Built by <span style={{ color: '#2EC4B6', fontWeight: 600 }}>TEAM ZYPHERS</span>
              </p>
            </div>
            <div className="misc-wrap">
              <div className="footer-powered">
                <div className="footer-misc-text footer" style={{ color: '#8d8d8d' }}>
                  Empowering rural healthcare with AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
