import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HeadlineLetters } from '../3d/Letters3D'
import { HeroScene } from '../3d/HeroScene'
import { ROUTES } from '../../routes/paths'
import { GlowButton } from '../ui/GlowButton'
import { TiltCard } from '../ui/TiltCard'

const easeOut = [0.22, 1, 0.36, 1] as const

const TAGLINE =
  'HireMint analyzes your resume with advanced AI, surfaces skill gaps, and delivers actionable insights.'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: easeOut },
  }),
}

export function Hero() {
  return (
    <HeroScene>
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mb-8 flex justify-center sm:mb-10"
      >
        <motion.span
          whileHover={{
            scale: 1.05,
            rotateX: 8,
            boxShadow: '0 0 32px rgba(255,0,110,0.35)',
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-300 backdrop-blur-sm sm:text-sm"
        >
          <Sparkles className="size-3.5 text-rose-400" aria-hidden />
          AI-powered resume intelligence
        </motion.span>
      </motion.div>

      <div className="overflow-visible px-2">
        <HeadlineLetters
          line1="Transform Your Resume Into A"
          line2="Career Magnet"
        />
      </div>

      <motion.p
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-6 max-w-[min(100%,64rem)] px-2 text-center text-sm leading-relaxed text-gray-400 sm:mt-8 sm:text-lg md:whitespace-nowrap"
      >
        {TAGLINE}
      </motion.p>

      <motion.div
        custom={0.3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row"
        style={{ transform: 'translateZ(60px)' }}
      >
        <GlowButton to={ROUTES.UPLOAD}>
          Analyze my resume
          <ArrowRight className="size-4" aria-hidden />
        </GlowButton>
        <GlowButton to={ROUTES.FEATURES} variant="secondary">
          Explore features
        </GlowButton>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
        className="relative mx-auto mt-16 max-w-4xl sm:mt-20"
        style={{ transform: 'translateZ(90px)' }}
      >
        <TiltCard className="rounded-2xl">
          <div className="card-3d-lift relative overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/80 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="text-xs text-gray-500">hiremint-analysis.json</span>
            </div>
            <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-6">
              {[
                { label: 'ATS Score', value: '94%', color: 'text-emerald-400' },
                { label: 'Skills matched', value: '28', color: 'text-cyan-400' },
                { label: 'Gaps found', value: '4', color: 'text-violet-400' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{
                    y: -6,
                    rotateX: 6,
                    rotateY: -4,
                    borderColor: 'rgba(255,0,110,0.35)',
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                >
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </HeroScene>
  )
}
