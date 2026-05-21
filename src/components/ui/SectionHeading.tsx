import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  centered?: boolean
  className?: string
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: easeOut }}
      className={[
        'space-y-4',
        centered ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-gray-400 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
