import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Button/link that leans toward the cursor and springs back on leave.
 *
 * Motion values are used rather than React state so the pull runs entirely on
 * the compositor — no re-render per mousemove.
 *
 *   <MagneticButton as="a" href="#book" className="btn-primary">Book</MagneticButton>
 */
// Built once at module scope, never during render.
const MOTION = {
  a: motion.a,
  button: motion.button,
  div: motion.div,
  article: motion.article,
  section: motion.section,
}

export default function MagneticButton({
  as: Tag = 'button',
  strength = 0.35,
  children,
  className,
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.6 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const Motion = MOTION[Tag] ?? motion.div

  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    // Offset from the element's centre, damped by `strength`.
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Motion
      ref={ref}
      className={className}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
