import { motion } from 'framer-motion'
import { UploadCloud, FileText, ShieldCheck, Sparkles } from 'lucide-react'
import { ResumeDropzone } from '../components/upload/ResumeDropzone'
import { PageContainer } from '../components/PageContainer'
import { AnimatedPage, PageIntro } from '../components/ui'
import { CopyRow, CopySeparator } from '../components/ui/CopyRow'

const steps = [
  {
    step: '01',
    label: 'Upload Resume',
    detail: 'PDF or DOCX supported',
    icon: UploadCloud,
  },
  {
    step: '02',
    label: 'AI Resume Scan',
    detail: 'ATS + skill analysis',
    icon: Sparkles,
  },
  {
    step: '03',
    label: 'Get Insights',
    detail: 'Score, fixes & roadmap',
    icon: ShieldCheck,
  },
]

export function UploadPage() {
  return (
    <PageContainer>
      <AnimatedPage>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B12]/80 p-6 sm:p-10 backdrop-blur-xl">

          {/* Background Glow Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          </div>

          <PageIntro
            eyebrow="HireMint AI"
            title="Upload your resume"
            description="Secure AI-powered resume analysis with ATS scoring, skill insights, and recruiter-focused improvements in seconds."
          />

          {/* Upload Process Steps */}
          <div className="mb-12 mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((item, i) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-rose-500/40 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-rose-500/10"
                >
                  {/* Glow Hover */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-violet-500/10" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                        <Icon size={22} />
                      </div>

                      <span className="text-xs font-bold tracking-widest text-rose-400">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mb-1 text-lg font-semibold text-white">
                      {item.label}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500/10 to-violet-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-[#101018]/80 p-6 shadow-2xl backdrop-blur-xl">
              <ResumeDropzone />

              {/* Supported Formats */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  <FileText size={16} className="text-rose-400" />
                  PDF Supported
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  <FileText size={16} className="text-violet-400" />
                  DOCX Supported
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Secure Upload
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <CopyRow className="justify-center gap-x-3 text-xs text-gray-500">
              <span>AI ATS Analysis</span>
              <CopySeparator />
              <span>Instant Resume Feedback</span>
              <CopySeparator />
              <span>Private & Secure</span>
            </CopyRow>
          </motion.div>
        </div>
      </AnimatedPage>
    </PageContainer>
  )
}