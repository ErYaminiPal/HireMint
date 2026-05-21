import {
  BarChart3,
  Brain,
  FileSearch,
  Lock,
  Target,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FeatureItem = {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

export const FEATURES: FeatureItem[] = [
  {
    icon: Brain,
    title: 'Deep AI analysis',
    description:
      'Extract skills, impact metrics, and seniority signals recruiters care about.',
    tag: 'Core',
  },
  {
    icon: Target,
    title: 'Skill gap detection',
    description:
      'See missing competencies for your target role and how to close each gap.',
    tag: 'Insights',
  },
  {
    icon: FileSearch,
    title: 'ATS optimization',
    description:
      'Formatting and keyword recommendations tuned for applicant tracking systems.',
    tag: 'ATS',
  },
  {
    icon: BarChart3,
    title: 'Career insights',
    description:
      'Understand how your profile stacks up against market expectations.',
    tag: 'Analytics',
  },
  {
    icon: Zap,
    title: 'Results in seconds',
    description:
      'Upload once and receive a structured report you can act on immediately.',
    tag: 'Speed',
  },
  {
    icon: Lock,
    title: 'Privacy first',
    description:
      'Secure processing. Your data is never sold or used to train public models.',
    tag: 'Security',
  },
]
