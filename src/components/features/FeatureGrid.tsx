import { motion } from 'framer-motion'
import { FEATURES } from '../../data/features'
import { CopyRow, CopySeparator } from '../ui/CopyRow'
import { TiltCard } from '../ui/TiltCard'

const easeOut = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
}

export function FeatureGrid() {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {FEATURES.map((feature) => (
        <motion.li key={feature.title} variants={item}>
          <TiltCard className="h-full">
            <article className="card-3d-lift h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 ring-1 ring-transparent transition-all duration-300 hover:border-rose-500/30 hover:ring-rose-500/20 sm:p-7">
              <CopyRow className="mb-4 gap-x-3">
                <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                  {feature.tag}
                </span>
                <CopySeparator />
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </CopyRow>
              <p className="mb-4 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="inline-flex rounded-xl bg-gradient-to-br from-rose-500/25 via-violet-500/25 to-cyan-500/25 p-3 ring-1 ring-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <feature.icon className="size-6 text-violet-300" aria-hidden />
              </motion.div>
            </article>
          </TiltCard>
        </motion.li>
      ))}
    </motion.ul>
  )
}
