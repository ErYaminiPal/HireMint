import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../../routes/paths'
import { GlowButton } from '../ui/GlowButton'

export function CTABanner() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, rotateX: 8 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        whileHover={{ scale: 1.02, rotateX: 2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-rose-600/25 via-violet-600/20 to-cyan-600/25 transition-opacity duration-500 group-hover:opacity-110"
        />
        <motion.div
          aria-hidden
          className="absolute -inset-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'conic-gradient(from 0deg, transparent, rgba(255,0,110,0.2), rgba(58,134,255,0.15), transparent)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative space-y-4" style={{ transform: 'translateZ(24px)' }}>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready to magnetize your career?
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-300 sm:text-base">
            Personalized skill report in under a minute.
          </p>
          <div className="pt-4">
            <GlowButton to={ROUTES.UPLOAD}>
              Start free analysis
              <ArrowRight className="size-4" aria-hidden />
            </GlowButton>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
