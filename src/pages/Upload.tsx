import { motion } from 'framer-motion'
import { ResumeDropzone } from '../components/upload/ResumeDropzone'
import { PageContainer } from '../components/PageContainer'
import { AnimatedPage, PageIntro } from '../components/ui'
import { CopyRow, CopySeparator } from '../components/ui/CopyRow'

const steps = [
  { step: '01', label: 'Upload resume', detail: 'PDF or Word format' },
  { step: '02', label: 'AI scans profile', detail: 'Skills & ATS signals' },
  { step: '03', label: 'Get your report', detail: 'Scores & action plan' },
]

export function UploadPage() {
  return (
    <PageContainer>
      <AnimatedPage>
        <PageIntro
          eyebrow="Analyze"
          title="Upload your resume"
          description="Secure AI processing. Your file stays private and results arrive in seconds."
        />

        <div className="mb-10 flex flex-wrap gap-4">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, rotateX: 6, rotateY: -4 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="card-3d-lift rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/10"
            >
              <CopyRow className="gap-x-2">
                <span className="text-xs font-bold text-rose-400">{item.step}</span>
                <CopySeparator />
                <span className="text-sm font-semibold text-white">{item.label}</span>
                <CopySeparator />
                <span className="text-xs text-gray-500">{item.detail}</span>
              </CopyRow>
            </motion.div>
          ))}
        </div>

        <ResumeDropzone />
      </AnimatedPage>
    </PageContainer>
  )
}
