import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register once for the whole app. Importing this module anywhere is enough —
// registerPlugin is idempotent, but keeping it in one place avoids the common
// bug where a plugin is used in a component that forgot to register it.
gsap.registerPlugin(useGSAP, ScrollTrigger)

// Honour the OS "reduce motion" setting. Read lazily (not at module scope) so it
// is correct if the user changes the setting without reloading.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, useGSAP }
