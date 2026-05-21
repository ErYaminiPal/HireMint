import { FeatureGrid } from '../components/features/FeatureGrid'
import { PageContainer } from '../components/PageContainer'
import { AnimatedPage, GlowButton, PageIntro } from '../components/ui'
import { ROUTES } from '../routes/paths'

export function FeaturesPage() {
  return (
    <PageContainer>
      <AnimatedPage>
        <PageIntro
          eyebrow="Platform"
          title="Powerful features"
          description="Everything SkillMint delivers to turn your resume into interview-winning material."
          action={
            <GlowButton to={ROUTES.UPLOAD}>Start free analysis</GlowButton>
          }
        />

        <FeatureGrid />
      </AnimatedPage>
    </PageContainer>
  )
}
