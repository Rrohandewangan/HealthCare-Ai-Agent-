import midnightImg from '../assets/images/midnight.jpg'
import highFeverImg from '../assets/images/high-fever.jpg'
import doctorImg from '../assets/images/doctor.jpg'

function AboutSection() {
  const buttonBgTransform = {
    transform: 'translate3d(-300%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
  }

  const buttonSkewTransform = {
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(-14deg, 0)',
  }

  return (
    <section id="about" className="main-section about">
      <div className="w-layout-blockcontainer main-container full w-container">
        <div className="about-inner-sticky">
          <div data-w-id="9f573ebc-d9d4-6fb8-33b4-a13ee4cafd3e" className="about-wrap">
            <div className="about-inner-wrap">
              <div className="about-content">
                <div className="about-line">
                  <div className="big-text-wrap">
                    <div data-w-id="d2cbc0df-e302-3a69-273f-6afb71676984" className="big-text about">
                      Midnight.{' '}
                    </div>
                  </div>
                  <div className="about-image-resize">
                    <div className="about-image-wrap">
                      <img
                        width="Auto"
                        height="Auto"
                        alt="Midnight scene"
                        src={midnightImg}
                        loading="lazy"
                        className="about-image var-1"
                      />
                      <img
                        width="Auto"
                        height="Auto"
                        alt="High fever"
                        src={highFeverImg}
                        loading="lazy"
                        className="about-image var-2"
                      />
                      <img
                        width="Auto"
                        height="Auto"
                        alt="Doctor"
                        src={doctorImg}
                        loading="lazy"
                        className="about-image var-3"
                      />
                    </div>
                  </div>
                  <div className="big-text-wrap">
                    <div data-w-id="d2cbc0df-e302-3a69-273f-6afb71676987" className="big-text about">
                      High fever.
                    </div>
                  </div>
                </div>
                <div className="about-line">
                  <div className="big-text-wrap">
                    <div data-w-id="d2cbc0df-e302-3a69-273f-6afb7167698b" className="big-text about">
                      The nearest doctor
                    </div>
                  </div>
                  <div className="lottie-wrap">
                    <div
                      className="lottie-arrow"
                      data-w-id="086f6cd3-9da5-1ab3-3131-a2c5707dd8f8"
                      data-animation-type="lottie"
                      data-src="https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/68aea80b92580b8368d92c8f_Bouncy%20arrow.json"
                      data-loop="1"
                      data-direction="1"
                      data-autoplay="1"
                      data-is-ix2-target="0"
                      data-renderer="svg"
                      data-default-duration="0"
                      data-duration="1"
                    ></div>
                  </div>
                  <div className="big-text-wrap">
                    <div data-w-id="0cde54da-fe86-720f-a42f-be6f7288ad4e" className="big-text about">
                      is 100 km away.
                    </div>
                  </div>
                </div>
                <div className="about-line">
                  <div className="big-text-wrap">
                    <div data-w-id="d2cbc0df-e302-3a69-273f-6afb7167698f" className="big-text about">
                      NO Worries
                    </div>
                  </div>
                  <div className="hero-button-wrap">
                    <a href="#" className="button-slide w-inline-block">
                      <div className="button-slide-in-wrap">
                        <div style={buttonBgTransform} className="button-bg-wrap">
                          <div aria-hidden="true" style={buttonSkewTransform} className="button-bg"></div>
                        </div>
                        <div className="button-slide-text">VITALIS AI</div>
                      </div>
                    </a>
                  </div>
                  <div className="big-text-wrap">
                    <div data-w-id="438582fe-9cc4-0cf1-7453-01cca42ef2fa" className="big-text about">
                      Here's the solution
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="line-link w-inline-block">
                <div className="line-link-wrap">
                  <div className="line-link-text small">VITALIS AI</div>
                  <div className="link-line"></div>
                </div>
              </a>
            </div>
          </div>
          <div data-w-id="023030e2-a0f0-751d-dd4d-8dd1bb593210" className="about-second-bg"></div>
          <div id="Service" className="project-card-block">
            <div data-w-id="eef5e6f0-eff0-029d-6701-42874cfe2020" className="about-scroll-trigger"></div>
            <div className="project-card-wrapper">
              <div data-w-id="8e11c56b-e3f4-ff65-65d0-4f02d77fd2c6" className="project-card-inner">
                {projectCards.map((card, index) => (
                  <div key={index} className={`project-card var-${index + 1}`}>
                    <div className="project-card-title">
                      <div className="small-text">{card.num}</div>
                      <div className="medium-big-text">{card.title}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1vw', justifyContent: 'flex-end', flex: 1 }}>
                      <div style={{ width: '4.5vw', height: '4.5vw', borderRadius: '50%', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2vw', lineHeight: 1 }}>
                        {card.icon}
                      </div>
                      <div className="small-text" style={{ lineHeight: '1.7' }}>
                        {card.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="about-intro" className="project-desc-wrap">
              <div data-w-id="de8898c9-d965-078d-e7d6-7adcfac5b566" className="big-desc">
                <div className="medium-big-text">
                  Introducing
                  <div className="VITALIS_AI">VITALIS AI</div>
                  Instant AI triage, multilingual symptom assessment, and nearest hospital finder — bringing quality healthcare guidance to 900 million underserved rural citizens.
                </div>
              </div>
            </div>
          </div>
          <div className="project-window"></div>
        </div>
      </div>
    </section>
  )
}

const projectCards = [
  { num: '01.', title: 'AI Triage', icon: '🩺', bg: 'rgba(26,107,189,0.12)', desc: 'Advanced symptom analysis using Claude AI to assess severity and recommend next steps instantly.' },
  { num: '02.', title: 'Voice Input', icon: '🎤', bg: 'rgba(23,169,110,0.12)', desc: 'Describe symptoms in your own language using voice, with no typing required and no language barrier.' },
  { num: '03.', title: 'Hospital Finder', icon: '🗺️', bg: 'rgba(245,158,11,0.12)', desc: 'Instantly locate and get directions to the nearest hospitals and clinics when urgent care is needed.' },
  { num: '04.', title: 'Emergency Alerts', icon: '🚨', bg: 'rgba(229,62,62,0.12)', desc: 'Critical severity cases trigger immediate emergency guidance with direct ambulance contact information.' },
  { num: '05.', title: 'Health History', icon: '📋', bg: 'rgba(14,122,79,0.12)', desc: 'Save consultations securely, track symptoms over time, and share reports with your doctor.' },
  { num: '06.', title: 'Privacy First', icon: '🔒', bg: 'rgba(26,107,189,0.12)', desc: 'JWT-authenticated sessions, encrypted storage, and secure handling practices for every consultation.' },
]

export default AboutSection
