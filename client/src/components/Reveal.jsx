import { motion, useReducedMotion } from 'motion/react'

/*
 * Standard whileInView entrance (DESIGN.md: --ease-entrance / --dur-entrance).
 * Wrap section headers and card grids; do not nest Reveals.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
