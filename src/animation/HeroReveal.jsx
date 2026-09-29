import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from './gsapSetup'

/**
 * Splits a heading into words and flips them up in 3D, then slides the
 * description and CTAs in behind it.
 *
 * The hero is a carousel, so `slideKey` is passed as a dependency: every time
 * the slide changes, useGSAP reverts the previous timeline (revertOnUpdate)
 * and builds a fresh one for the new copy. That is what keeps the animation
 * replaying per slide without stacking tweens.
 *
 * Pass `tag` and `title` as props; everything else (body, CTA row) comes in as
 * children and must carry data-hero="body" / data-hero="cta".
 */
export default function HeroReveal({ slideKey, tag, title, children }) {
  const scope = useRef(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const tagEl = root.querySelector('[data-hero="tag"]')
      const words = root.querySelectorAll('[data-hero="word"]')
      const body = root.querySelector('[data-hero="body"]')
      const cta = root.querySelector('[data-hero="cta"]')
      const shown = [tagEl, body, cta].filter(Boolean)

      if (prefersReducedMotion()) {
        gsap.set([...words, ...shown], { opacity: 1, y: 0, rotateX: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (tagEl) {
        tl.fromTo(tagEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 })
      }

      tl.fromTo(
        words,
        { opacity: 0, yPercent: 110, rotateX: -80 },
        {
          opacity: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.055,
        },
        tagEl ? '-=0.2' : 0
      )

      if (body) {
        tl.fromTo(body, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.45')
      }
      if (cta) {
        tl.fromTo(cta, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      }

      return () => tl.kill()
    },
    { scope, dependencies: [slideKey], revertOnUpdate: true }
  )

  return (
    <div className="slide-content" ref={scope}>
      {tag && (
        <span className="hero-tag-pill" data-hero="tag">
          {tag}
        </span>
      )}
      <h1 className="hero-title" data-hero="title">
        {title.split(' ').map((word, i) => (
          // Two spans: the outer clips, the inner is what actually flips up.
          <span className="hero-word" key={`${slideKey}-${i}`}>
            <span data-hero="word">{word}</span>
          </span>
        ))}
      </h1>
      {children}
    </div>
  )
}
