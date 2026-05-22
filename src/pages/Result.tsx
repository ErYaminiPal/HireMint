import { ResultsDashboard } from '../components/results/ResultsDashboard'
import { PageContainer } from '../components/PageContainer'
import { AnimatedPage, GlowButton, PageIntro } from '../components/ui'
import { ROUTES } from '../routes/paths'

export function ResultPage() {
  return (
    <PageContainer>
      <AnimatedPage>
        <PageIntro
          eyebrow="Report"
          title="Your analysis results"
          description="Demo insights from HireMint AI. Upload a resume to generate your live report."
          action={
            <GlowButton to={ROUTES.UPLOAD} variant="secondary">
              Re-run analysis
            </GlowButton>
          }
        />
        <ResultsDashboard />
      </AnimatedPage>
    </PageContainer>
  )
}
