import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const easeOut = [0.22, 1, 0.36, 1] as const

type AnimatedPageProps = {
  children: ReactNode
}

export function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
