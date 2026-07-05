import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, scroll, cubicBezier } from 'motion'
import communityPrayer from '../assets/onearth-inspired/community-prayer.jpg'
import heroPrayer from '../assets/onearth-inspired/hero-prayer.jpg'
import appDemo from '../assets/onearth-inspired/appDemo.jpg'
import quiz1 from '../assets/onearth-inspired/quiz1.jpg'
import quiz2 from '../assets/onearth-inspired/quiz2.jpg'
import quiz3 from '../assets/onearth-inspired/quiz3.jpg'
import lecture1 from '../assets/onearth-inspired/Lecutre-1.jpg'
import lecture2 from '../assets/onearth-inspired/Lecutre-2.jpg'
import lecture3 from '../assets/onearth-inspired/Lecutre-3.jpg'
import outdoorPrayer from '../assets/onearth-inspired/outdoor-prayer.jpg'
import summerCamp from '../assets/summer-camp-bg.jpg'
import './ScrollGridSection.css'

// All tiles are bundled Al-Huda photos (no network dependency); repeats are
// intentional — the tiles are small and read as texture, not duplicates.
const LAYER_1 = [
  { src: communityPrayer, alt: 'Children attending an Al-Huda weekend Islamic class.' },
  { src: lecture3, alt: 'Al-Huda community gathering for prayer and reminders.' },
  { src: outdoorPrayer, alt: 'Al-Huda community members gathered on prayer mats.' },
  { src: quiz1, alt: 'Cabin at the Al-Huda summer camp and family retreat.' },
  { src: lecture1, alt: 'Worshippers standing shoulder to shoulder in prayer.' },
  { src: communityPrayer, alt: 'Weekend Islamic class in session.' },
]
const LAYER_2 = [
  { src: heroPrayer, alt: 'Worshippers standing shoulder to shoulder in prayer.' },
  { src: outdoorPrayer, alt: 'Outdoor congregational prayer on grass.' },
  { src: quiz3, alt: 'Al-Huda community gathering for prayer and reminders.' },
  { src: quiz2, alt: 'Al-Huda family retreat grounds.' },
  { src: communityPrayer, alt: 'Children learning together at the centre.' },
  { src: outdoorPrayer, alt: 'Community members gathered on prayer mats.' },
]
const LAYER_3 = [
  { src: summerCamp, alt: 'Al-Huda summer camp and family retreat.' },
  { src: lecture2, alt: 'Congregation standing for prayer.' },
]
const SCALER = {
  src: appDemo,
  alt: 'Al-Huda community members seated for a gathering.',
}

export default function ScrollGridSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Reduced motion / small screens: skip the pinned scrollytelling and show
    // the assembled grid statically (otherwise tiles stay at scale(0) forever).
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    ) {
      root.classList.add('sg-static')
      return
    }

    const image = root.querySelector('.scaler img')
    const firstSection = root.querySelector('.sg-scroll')
    const layers = root.querySelectorAll('.grid > .layer')
    if (!image || !firstSection) return

    // Natural (grid-cell) size before animating. Scale up to cover the
    // viewport at scroll start, then back to 1 (its grid-cell size).
    // motion v12 scroll-drives transforms reliably; width/height do not get
    // driven, so we use scale instead.
    const naturalWidth = image.offsetWidth
    const naturalHeight = image.offsetHeight
    const coverScale = Math.max(
      window.innerWidth / naturalWidth,
      window.innerHeight / naturalHeight,
    ) * 0.5

    const stoppers = []

    // Center image shrinks from full-screen to its grid-cell size.
    stoppers.push(
      scroll(
        animate(
          image,
          { scale: [coverScale, 1] },
          { ease: cubicBezier(0.65, 0, 0.35, 1) }, // GSAP power2.inOut
        ),
        { target: firstSection, offset: ['start start', '80% end'] },
      ),
    )

    // Per-layer reveal: different power curve each.
    const scaleEasings = [
      cubicBezier(0.42, 0, 0.58, 1), // power1.inOut
      cubicBezier(0.76, 0, 0.24, 1), // power3.inOut
      cubicBezier(0.87, 0, 0.13, 1), // power4.inOut
    ]

    layers.forEach((layer, index) => {
      const endOffset = `${1 - index * 0.05} end`

      // fade: hold opacity 0 until 55% of scroll, then to 1.
      stoppers.push(
        scroll(
          animate(
            layer,
            { opacity: [0, 0, 1] },
            { offset: [0, 0.55, 1], easing: cubicBezier(0.61, 1, 0.88, 1) }, // sine.out
          ),
          { target: firstSection, offset: ['start start', endOffset] },
        ),
      )

      // reveal: hold scale 0 until 30% of scroll, then to 1.
      stoppers.push(
        scroll(
          animate(
            layer,
            { scale: [0, 0, 1] },
            { offset: [0, 0.3, 1], easing: scaleEasings[index] },
          ),
          { target: firstSection, offset: ['start start', endOffset] },
        ),
      )
    })

    return () => stoppers.forEach((stop) => stop())
  }, [])

  return (
    <div className="scroll-grid" id="about" ref={rootRef}>
      <header className="sg-header">
        <div className="container sg-intro">
          <div>
            <span className="section-tag">About Al-Huda</span>
            <h2 className="section-title">
              A spiritual home shaped by knowledge, service, and belonging.
            </h2>
          </div>
          <p className="sg-intro-lead">
            Al-Huda Islamic Centre serves families and individuals through prayer,
            Islamic education, community care, and spaces where faith can be practiced
            with dignity and warmth.
          </p>
        </div>
      </header>
      <main>
        <section className="sg-scroll">
          <div className="content">
            <div className="grid">
              <div className="layer" style={{ transform: 'scale(0)' }}>
                {LAYER_1.map((image, i) => (
                  <div key={i}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
              <div className="layer" style={{ transform: 'scale(0)' }}>
                {LAYER_2.map((image, i) => (
                  <div key={i}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
              <div className="layer" style={{ transform: 'scale(0)' }}>
                {LAYER_3.map((image, i) => (
                  <div key={i}>
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
              <div className="scaler">
                <img src={SCALER.src} alt={SCALER.alt} />
              </div>
            </div>
          </div>
        </section>
        <section className="sg-outro">
          <div className="container sg-outro-inner">
            <div className="sg-badge">
              <span className="sg-badge-number">5+</span>
              <span className="sg-badge-text">Years of Service</span>
            </div>
            <div className="sg-work">
              <span className="section-tag">Our Work</span>
              <h3>Building capacity for the next generation.</h3>
              <p>
                From weekend classes and Ramadan programs to Jumuah prayer and
                volunteer-led care, our work is rooted in practical service and
                sincere connection.
              </p>
              <Link to="/mission" className="btn btn-primary btn-lg">
                Read Our Mission
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
