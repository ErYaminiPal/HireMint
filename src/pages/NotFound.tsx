import { motion } from 'framer-motion'
import { PageContainer } from '../components/PageContainer'
import { AnimatedPage, GlowButton, PageIntro } from '../components/ui'
import { ROUTES } from '../routes/paths'

export function NotFoundPage() {
  return (
    <PageContainer>
      <AnimatedPage>
        <PageIntro
          eyebrow="Error"
          title="Page not found"
          description="The URL you entered does not exist. Head back home or start a new analysis."
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="py-8 text-center"
        >
          <p className="text-8xl font-bold text-white/10">404</p>
          <div className="mt-8 flex justify-center">
            <GlowButton to={ROUTES.HOME}>Back to home</GlowButton>
          </div>
        </motion.div>
      </AnimatedPage>
    </PageContainer>
  )
}
