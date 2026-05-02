import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <section className="header-section var-1">
      <div role="banner" className="navbar-content w-nav">
        <div className="navbar-wrapper" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="navbar-logo-dark w-nav-brand w--current" aria-current="page">
            <div className="main_team_logo">TEAM ZYPHERS</div>
          </Link>
          <Link to="http://localhost:5174/" className="consultancy-btn">
            <span className="consultancy-btn-text">Get Consultancy</span>
            <span className="consultancy-btn-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Navbar
