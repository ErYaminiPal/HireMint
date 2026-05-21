import { FeatureGrid } from '../features/FeatureGrid'
import { GlowButton } from '../ui/GlowButton'
import { SectionHeading } from '../ui/SectionHeading'
import { ROUTES } from '../../routes/paths'

export function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-white/5 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(34,211,238,0.08),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 space-y-8">
          <SectionHeading
            centered
            eyebrow="Features"
            title={
              <>
                Everything you need to{' '}
                <span className="text-cta-gradient">stand out</span>
              </>
            }
            description="Data-driven career moves, not guesswork."
          />
          <div className="flex justify-center">
            <GlowButton to={ROUTES.FEATURES} variant="secondary">
              View all features
            </GlowButton>
          </div>
        </div>

        <FeatureGrid />
      </div>
    </section>
  )
}
