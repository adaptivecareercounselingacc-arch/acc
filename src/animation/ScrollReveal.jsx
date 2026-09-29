import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from './gsapSetup'

/**
 * Reusable scroll-reveal wrapper.
 *
 *   <ScrollReveal>            …fades the wrapper itself up into place
 *   <ScrollReveal stagger>    …fades its direct children one after another
 *
 * Fires when the element reaches 80% down the viewport. All tweens and
 * ScrollTriggers are created inside useGSAP's scope, so they are reverted
 * automatically on unmount — no manual kill() bookkeeping, no leaks.
 *
 * Props
 *   as        element/component to render        (default 'div')
 *   stagger   true | number — animate children   (true = 0.12s apart)
 *   y         travel distance in px              (default 40)
 *   duration  seconds                            (default 0.8)
 *   delay     seconds before the tween starts    (default 0)
 *   start     ScrollTrigger start string         (default 'top 80%')
 *   once      play once, never reverse           (default true)
 */
export default function ScrollReveal({
  children,
  as: Tag = 'div',
  stagger = false,
  y = 40,
  duration = 0.8,
  delay = 0,
  start = 'top 80%',
  once = true,
  className,
  ...rest
}) {
  const scope = useRef(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      // Reduced motion: show everything immediately, create no ScrollTriggers.
      if (prefersReducedMotion()) {
        gsap.set(stagger ? root.children : root, { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      const targets = stagger ? Array.from(root.children) : root
      if (stagger && targets.length === 0) return

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          stagger: stagger === true ? 0.12 : stagger,
          scrollTrigger: {
            trigger: root,
            start,
            once,
            // Without this a reveal that is already past the trigger point on
            // load (e.g. the user deep-linked to #book) would never fire.
            invalidateOnRefresh: true,
          },
        }
      )
    },
    { scope, dependencies: [stagger, y, duration, delay, start, once] }
  )

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  )
}
