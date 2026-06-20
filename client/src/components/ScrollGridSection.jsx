import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, scroll, cubicBezier } from 'motion'
import communityPrayer from '../assets/onearth-inspired/community-prayer.jpg'
import heroPrayer from '../assets/onearth-inspired/hero-prayer.jpg'
import mosqueGathering from '../assets/onearth-inspired/mosque-gathering.jpg'
import outdoorPrayer from '../assets/onearth-inspired/outdoor-prayer.jpg'
import './ScrollGridSection.css'

const unsplashImage = (id) =>
  `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=60`

// Local Al-Huda photos first; free Unsplash images fill the remaining slots.
const LAYER_1 = [
  {
    src: communityPrayer,
    alt: 'Children attending an Al-Huda weekend Islamic class.',
  },
  {
    src: unsplashImage('photo-1741942739533-2825e11372e7'),
    alt: 'Families seated in a mosque hall for community iftar.',
  },
  {
    src: outdoorPrayer,
    alt: 'Al-Huda community members gathered on prayer mats.',
  },
  {
    src: unsplashImage('photo-1771536145073-b79d8d6ab218'),
    alt: 'Rows of worshippers praying together in congregation.',
  },
  {
    src: unsplashImage('photo-1637034120715-cdd8f1c9347d'),
    alt: 'Children sitting together during an Islamic learning session.',
  },
  {
    src: unsplashImage('photo-1778784509942-fab20ec1ca06'),
    alt: 'Two people reading the Qur\'an together.',
  },
]
const LAYER_2 = [
  {
    src: heroPrayer,
    alt: 'Worshippers standing shoulder to shoulder in prayer.',
  },
  {
    src: unsplashImage('photo-1741719396796-6b7484ef9f6f'),
    alt: 'A worshipper praying inside a mosque.',
  },
  {
    src: mosqueGathering,
    alt: 'Al-Huda community gathering for prayer and reminders.',
  },
  {
    src: unsplashImage('photo-1651293478838-1f51675131c5'),
    alt: 'An Islamic lecture being delivered inside a mosque.',
  },
  {
    src: unsplashImage('photo-1712249239085-2161afc54d60'),
    alt: 'People sitting on the floor reading Islamic texts.',
  },
  {
    src: unsplashImage('photo-1712249237537-8c5a0420653b'),
    alt: 'Children sitting together at a mosque.',
  },
]
const LAYER_3 = [
  {
    src: unsplashImage('photo-1778784520034-4bd45eb46cf9'),
    alt: 'Two people reading the Qur\'an together on a rug.',
  },
  {
    src: unsplashImage('photo-1761939998833-7a746e01f31f'),
    alt: 'A person praying in a sunlit mosque.',
  },
]
const SCALER = {
  src: mosqueGathering,
  alt: 'Al-Huda community members seated for a gathering.',
}

export default function ScrollGridSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = rootRef.current
    if (!root) return

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
    )

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
