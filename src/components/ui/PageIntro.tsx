import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PageIntroProps = {
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
}

const easeOut = [0.22, 1, 0.36, 1] as const

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: PageIntroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="mb-8 sm:mb-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
              {eyebrow}
            </p>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-gray-400">
            {description}
          </p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </motion.header>
  )
}
