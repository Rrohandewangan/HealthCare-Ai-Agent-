import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import WhyUsSection from '../components/WhyUsSection'
import TestimonialSection from '../components/TestimonialSection'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  const lenisRef = useRef(null)

  // Hide about section before paint so it doesn't flash
  useLayoutEffect(() => {
    gsap.set('.about-sticky-wrap', { opacity: 0, y: 40 })
  }, [])

  useEffect(() => {
    // Add w-mod-js class to html element
    document.documentElement.classList.add('w-mod-js')
    if ('ontouchstart' in window) {
      document.documentElement.classList.add('w-mod-touch')
    }

    // Load external script helper
    const loadScript = (src, attrs = {}) => {
      return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`)
        if (existing) { resolve(); return }
        const script = document.createElement('script')
        script.src = src
        script.type = 'text/javascript'
        script.setAttribute('data-wf-loaded', 'true')
        Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v))
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    // Load jQuery + Webflow IX2 runtime for scroll animations
    const loadWebflowScripts = async () => {
      try {
        await loadScript(
          'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=68ae68d1a017ccf41fd5f812',
          { integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=', crossorigin: 'anonymous' }
        )
        await loadScript('https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/js/webflow.schunk.36b8fb49256177c8.js')
        await loadScript('https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/js/webflow.schunk.82f44582d86d1ea9.js')
        await loadScript('https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/js/webflow.schunk.1d96d0c61ec66ecf.js')
        await loadScript('https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/js/webflow.schunk.b4435221be879eb3.js')
        await loadScript('https://cdn.prod.website-files.com/68ae68d1a017ccf41fd5f812/js/webflow.06ea5449.fa8f08d16f7da919.js')
        // Initialize Webflow IX2
        if (window.Webflow && window.Webflow.require) {
          try { window.Webflow.require('ix2').init() } catch(e) {}
          window.Webflow.ready()
        }
      } catch (e) {
        console.warn('Webflow IX2 scripts not available, using fallback animations')
        runFallbackAnimations()
      }
    }

    loadWebflowScripts()

    // Hero reveal animation — VITALIS AI visible immediately, refined entrance
    const heroTl = gsap.timeline({ delay: 0.1 })

    // Set initial state for animation (visible but slightly transformed)
    gsap.set('.hero-title-anim', { opacity: 0.3, scale: 0.88, y: 20 })
    gsap.set('.hero-accent-anim', { opacity: 0, scale: 0.7, rotation: -10 })

    // Titles fade in with scale — feels premium and immediate
    heroTl.to(
      '.hero-title-anim',
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
      },
      0
    )
    // Accent shapes pop in with rotation
    heroTl.to(
      '.hero-accent-anim',
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'back.out(1.2)',
      },
      0.15
    )

    // Accent continuous rotation
    gsap.to('.hero-accent-rotate', {
      rotation: 360, duration: 20, repeat: -1, ease: 'none',
    })
    gsap.to('.hero-accent', {
      rotation: -360, duration: 15, repeat: -1, ease: 'none',
    })

    // After hero animation finishes, smoothly reveal about section
    heroTl.eventCallback('onComplete', () => {
      gsap.to('.about-sticky-wrap', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      })
    })

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Resize handler
    let resizeTimeout
    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
    }
    window.addEventListener('resize', onResize)
    const resizeObserver = new ResizeObserver(() => onResize())
    resizeObserver.observe(document.body)

    // Project card animation
    const items = document.querySelectorAll('.project-card')
    const offset = 30

    gsap.set(items, {
      zIndex: (index) => items.length - index,
      opacity: 0,
      scale: 0.8,
    })

    function diagonalLoop(cards) {
      let totalItems = cards.length
      let currentItem = 0

      function updatePositions() {
        for (let i = 0; i < totalItems; i++) {
          let itemIndex = (currentItem + i) % totalItems
          let item = cards[itemIndex]
          gsap.to(item, {
            x: offset * i,
            y: -offset * i * 1.5,
            zIndex: totalItems - i,
            scale: 1,
            opacity: 1,
            duration: 0.6,
          })
        }
      }

      function moveToNext() {
        currentItem = (currentItem + 1) % totalItems
        updatePositions()
      }

      updatePositions()
      return setInterval(moveToNext, 2000)
    }

    function straightLoop(cards) {
      let totalItems = cards.length
      let currentItem = 0

      function updatePositions() {
        for (let i = 0; i < totalItems; i++) {
          let itemIndex = (currentItem + i) % totalItems
          let item = cards[itemIndex]
          gsap.to(item, {
            x: 0,
            y: -offset * i * 1.5,
            zIndex: totalItems - i,
            scale: 1,
            opacity: 1,
            duration: 0.6,
          })
        }
      }

      function moveToNext() {
        currentItem = (currentItem + 1) % totalItems
        updatePositions()
      }

      updatePositions()
      return setInterval(moveToNext, 2000)
    }

    let cardInterval = null
    const scrollTriggerCard = ScrollTrigger.create({
      trigger: '.about-scroll-trigger',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (window.innerWidth <= 428) {
          cardInterval = straightLoop(items)
        } else {
          cardInterval = diagonalLoop(items)
        }
      },
    })

    // Counter animation — store final values, display them initially, animate on scroll
    const counterEls = document.querySelectorAll('.why-us-card .number')
    const counterData = []
    counterEls.forEach((el) => {
      const finalValue = parseInt(el.textContent, 10)
      counterData.push({ el, finalValue })
    })

    // Refresh ScrollTrigger after about section becomes visible
    const counterObserver = new MutationObserver(() => {
      const aboutWrap = document.querySelector('.about-sticky-wrap')
      if (aboutWrap && getComputedStyle(aboutWrap).opacity !== '0') {
        ScrollTrigger.refresh()
        counterObserver.disconnect()
      }
    })
    counterObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style'] })

    counterData.forEach(({ el, finalValue }) => {
      const card = el.closest('.why-us-card')
      if (!card) return

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          el.textContent = '0'
          let obj = { val: 0 }
          gsap.to(obj, {
            val: finalValue,
            duration: 2,
            ease: 'power1.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.val)
            }
          })
        },
      })
    })

    // Why Us title reveal ("Why you should" / "choose us")
    ScrollTrigger.create({
      trigger: '#why-us',
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.to('[data-w-id="aeadade5-e6d7-d60d-f874-4e556f2ddcf8"]', {
          opacity: 1, yPercent: 0, duration: 1, ease: 'power3.out',
        })
        gsap.to('[data-w-id="50340bfa-5868-b077-5006-0dc57e3fb4d6"]', {
          opacity: 1, yPercent: 0, duration: 1, delay: 0.15, ease: 'power3.out',
        })
      },
    })

    // About intro description reveal
    ScrollTrigger.create({
      trigger: '[data-w-id="de8898c9-d965-078d-e7d6-7adcfac5b566"]',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to('[data-w-id="de8898c9-d965-078d-e7d6-7adcfac5b566"]', {
          opacity: 1, yPercent: 0, duration: 1.2, ease: 'power3.out',
        })
      },
    })

    // Project card inner reveal
    ScrollTrigger.create({
      trigger: '[data-w-id="8e11c56b-e3f4-ff65-65d0-4f02d77fd2c6"]',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to('[data-w-id="8e11c56b-e3f4-ff65-65d0-4f02d77fd2c6"]', {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        })
      },
    })

    return () => {
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (cardInterval) clearInterval(cardInterval)
    }
  }, [])

  return (
    <div data-w-id="b087e2d9-32d6-6d90-0f55-d873310a37eb" className="sticky-wrap">
      <div className="sticky-hero">
        <Navbar />
        <HeroSection />
      </div>
      <div className="about-sticky-wrap">
        <AboutSection />
        <WhyUsSection />
        <TestimonialSection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  )
}

// Fallback GSAP animations when Webflow IX2 is unavailable
function runFallbackAnimations() {
  // Hero title animations
  gsap.to('[data-w-id="fb9d825e-5fa2-f666-2aae-3902aab5a20c"]', {
    y: 0, duration: 1, delay: 0.3, ease: 'power3.out'
  })
  gsap.to('[data-w-id="4cc81edb-691e-166e-097b-1841bfeb20b5"]', {
    y: 0, duration: 1, delay: 0.5, ease: 'power3.out'
  })
  gsap.to('[data-w-id="db748b10-221d-6f7a-bc0b-b02180bdc733"]', {
    y: 0, duration: 1, delay: 0.3, ease: 'power3.out'
  })
  gsap.to('[data-w-id="db748b10-221d-6f7a-bc0b-b02180bdc73e"]', {
    y: 0, duration: 1, delay: 0.5, ease: 'power3.out'
  })
  // Hero accent wrap
  gsap.to('.hero-accent-wrap:not(.shade)', {
    y: 0, duration: 1.2, delay: 0.4, ease: 'power3.out'
  })
  // Hero accent rotation
  gsap.to('.hero-accent-rotate', {
    rotation: 360, duration: 20, repeat: -1, ease: 'none'
  })

  // About section - reveal text on scroll
  document.querySelectorAll('.big-text.about').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { y: '50%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
        )
      }
    })
  })

  // Why us title reveal
  ScrollTrigger.create({
    trigger: '.why-us-title',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo('[data-w-id="aeadade5-e6d7-d60d-f874-4e556f2ddcf8"]',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' }
      )
      gsap.fromTo('[data-w-id="50340bfa-5868-b077-5006-0dc57e3fb4d6"]',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      )
    }
  })

  // Big desc reveal
  ScrollTrigger.create({
    trigger: '.big-desc',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo('[data-w-id="de8898c9-d965-078d-e7d6-7adcfac5b566"]',
        { y: '40%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
    }
  })

  // Project card inner reveal
  ScrollTrigger.create({
    trigger: '.project-card-block',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.fromTo('[data-w-id="8e11c56b-e3f4-ff65-65d0-4f02d77fd2c6"]',
        { y: '15vw', opacity: 0 },
        { y: '0', opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
    }
  })

  // Why-us background color
  ScrollTrigger.create({
    trigger: '[data-w-id="83d5e1e3-fbd3-9a00-65bf-3d958e0811eb"]',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      gsap.to('[data-w-id="83d5e1e3-fbd3-9a00-65bf-3d958e0811eb"]', {
        backgroundColor: 'rgb(0, 0, 0)',
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  })

  // Testimonial section scroll-based rotation
  const testimonialRotate = document.querySelector('.testimonial-rotate')
  if (testimonialRotate) {
    ScrollTrigger.create({
      trigger: '.testimonial-sticky-wrap',
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const rotation = progress * -270
        gsap.set(testimonialRotate, { rotateZ: rotation })

        // Show/hide testimonial steps based on progress
        const stepIndex = Math.min(Math.floor(progress * 4), 3)
        const classes = ['t-1', 't-2', 't-3', 't-4']
        classes.forEach((cls, i) => {
          const el = document.querySelector(`.single-big-testimonial.${cls}`)
          if (el) {
            const children = el.querySelectorAll('.review-emphasis, .name-designation, .testiminoal-content, .testimonial-photo')
            children.forEach(child => {
              child.style.opacity = (i === stepIndex) ? '1' : '0'
              child.style.transition = 'opacity 0.4s ease'
            })
          }
        })
      }
    })
  }
}

export default HomePage
