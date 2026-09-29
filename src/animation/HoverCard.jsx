import { motion, useReducedMotion } from 'framer-motion'

/**
 * Card lift: rises on hover with a custom cubic-bezier and an expanding shadow.
 *
 * Kept as a Framer Motion component rather than a CSS :hover rule so the
 * shadow and lift share one spring-free, precisely-timed curve, and so the
 * press state (whileTap) reads correctly on touch.
 */
// Built once at module scope, never during render.
const MOTION = {
  a: motion.a,
  button: motion.button,
  div: motion.div,
  article: motion.article,
  section: motion.section,
}

export default function HoverCard({
  as: Tag = 'div',
  lift = 8,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Motion = MOTION[Tag] ?? motion.div

  return (
    <Motion
      className={className}
      initial={false}
      whileHover={
        reduce
          ? undefined
          : { y: -lift, boxShadow: '0 22px 44px rgba(16,24,40,.16)' }
      }
      whileTap={reduce ? undefined : { y: -lift / 2 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Motion>
  )
}
