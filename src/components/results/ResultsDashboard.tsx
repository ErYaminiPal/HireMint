import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { ROUTES } from '../../routes/paths'
import { CopyRow, CopySeparator } from '../ui/CopyRow'
import { GlowButton } from '../ui/GlowButton'
import { TiltCard } from '../ui/TiltCard'

const easeOut = [0.22, 1, 0.36, 1] as const

const scores = [
  { label: 'ATS Score', value: 94, color: 'from-emerald-500 to-teal-400' },
  { label: 'Role Match', value: 87, color: 'from-rose-500 to-fuchsia-500' },
  { label: 'Impact Score', value: 91, color: 'from-cyan-500 to-blue-500' },
]

const skills = [
  { name: 'React / TypeScript', level: 92, status: 'strong' as const },
  { name: 'System Design', level: 74, status: 'gap' as const },
  { name: 'Leadership', level: 88, status: 'strong' as const },
  { name: 'Cloud (AWS)', level: 68, status: 'gap' as const },
]

const recommendations = [
  'Add quantified outcomes to your latest role bullet points.',
  'Include "system design" and "distributed systems" for senior SWE roles.',
  'Reorder skills section to lead with React, Node, and AWS.',
]

export function ResultsDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-3">
        {scores.map((score, i) => (
          <TiltCard key={score.label}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, ease: easeOut }}
              className="card-3d-lift rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <CopyRow className="gap-x-2">
                <p className="text-sm text-gray-500">{score.label}</p>
                <CopySeparator />
                <p className="text-3xl font-bold text-white">{score.value}%</p>
              </CopyRow>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: easeOut }}
                  className={`h-full rounded-full bg-gradient-to-r ${score.color}`}
                />
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      <TiltCard>
        <section className="card-3d-lift rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <CopyRow className="mb-6 gap-x-3">
            <h2 className="text-xl font-bold text-white">Skill breakdown</h2>
            <CopySeparator />
            <p className="text-sm text-gray-400">
              Gaps highlighted in amber
            </p>
          </CopyRow>
          <ul className="space-y-4">
            {skills.map((skill, i) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 6, rotateX: 4 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
              >
                <CopyRow className="mb-2 gap-x-2">
                  {skill.status === 'strong' ? (
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="size-4 shrink-0 text-amber-400" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {skill.name}
                  </span>
                  <CopySeparator />
                  <span className="text-sm text-gray-500">
                    {skill.level}% match
                  </span>
                </CopyRow>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.1 }}
                    className={`h-full rounded-full ${skill.status === 'strong' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </section>
      </TiltCard>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="card-3d-lift rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6"
      >
        <CopyRow className="mb-4 gap-x-3">
          <h2 className="text-lg font-bold text-white">AI recommendations</h2>
          <CopySeparator />
          <p className="text-sm text-gray-400">Actionable next steps</p>
        </CopyRow>
        <ul className="space-y-3">
          {recommendations.map((text) => (
            <motion.li
              key={text}
              whileHover={{ x: 4, rotateX: 2 }}
              className="flex items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5"
            >
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-rose-400" />
              <p className="text-sm leading-relaxed text-gray-300">{text}</p>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <div className="flex flex-wrap gap-4">
        <GlowButton to={ROUTES.UPLOAD} variant="secondary">
          Upload another resume
        </GlowButton>
        <GlowButton to={ROUTES.FEATURES} variant="ghost">
          Explore features
        </GlowButton>
      </div>
    </div>
  )
}
