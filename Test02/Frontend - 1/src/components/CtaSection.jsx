import { Link } from 'react-router-dom'

function CtaSection() {
  const buttonBgTransform = {
    transform: 'translate3d(-300%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
  }

  const buttonSkewTransform = {
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(-14deg, 0)',
  }

  return (
    <section id="cta" className="main-section">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="cta-content">
          <div className="cta-heading-wrap">
            <div className="big-text cta">Start Consultation NOW</div>
          </div>
          <div className="cta-button-wrap">
            <Link to="http://localhost:5174/" className="button-slide w-inline-block">
              <div className="button-slide-in-wrap">
                <div style={buttonBgTransform} className="button-bg-wrap">
                  <div aria-hidden="true" style={buttonSkewTransform} className="button-bg"></div>
                </div>
                <div className="button-slide-text">Get Consultancy</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="cta-bg-separator"></div>
    </section>
  )
}

export default CtaSection
