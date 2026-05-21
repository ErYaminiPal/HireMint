import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

type DocConfig = {
  id: string
  label: string
  type: 'Resume' | 'CV'
  top: string
  size: 'sm' | 'md' | 'lg'
  duration: number
  delay: number
  direction: 'ltr' | 'rtl'
  depth: number
  rotate: number
}

const documents: DocConfig[] = [
  {
    id: 'r1',
    label: 'Resume.pdf',
    type: 'Resume',
    top: '12%',
    size: 'md',
    duration: 28,
    delay: 0,
    direction: 'ltr',
    depth: -60,
    rotate: -8,
  },
  {
    id: 'c1',
    label: 'CV_Senior.docx',
    type: 'CV',
    top: '28%',
    size: 'sm',
    duration: 32,
    delay: 4,
    direction: 'rtl',
    depth: 30,
    rotate: 6,
  },
  {
    id: 'r2',
    label: 'Resume_Final.pdf',
    type: 'Resume',
    top: '48%',
    size: 'lg',
    duration: 36,
    delay: 2,
    direction: 'ltr',
    depth: 20,
    rotate: -4,
  },
  {
    id: 'c2',
    label: 'CV_Product.pdf',
    type: 'CV',
    top: '62%',
    size: 'md',
    duration: 30,
    delay: 8,
    direction: 'rtl',
    depth: -40,
    rotate: 10,
  },
  {
    id: 'r3',
    label: 'Resume_ATS.pdf',
    type: 'Resume',
    top: '78%',
    size: 'sm',
    duration: 26,
    delay: 6,
    direction: 'ltr',
    depth: 50,
    rotate: -12,
  },
]

const sizeStyles = {
  sm: 'w-36 px-3 py-2.5 text-[10px]',
  md: 'w-44 px-3.5 py-3 text-xs',
  lg: 'w-52 px-4 py-3.5 text-xs',
}

function FloatingDocCard({ doc }: { doc: DocConfig }) {
  const xFrom = doc.direction === 'ltr' ? '-18vw' : '118vw'
  const xTo = doc.direction === 'ltr' ? '118vw' : '-18vw'

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 will-change-transform"
      style={{
        top: doc.top,
        transformStyle: 'preserve-3d',
        transform: `translateZ(${doc.depth}px) rotate(${doc.rotate}deg)`,
      }}
      initial={{ x: xFrom, opacity: 0 }}
      animate={{
        x: [xFrom, xTo],
        opacity: [0, 0.85, 0.85, 0],
      }}
      transition={{
        x: {
          duration: doc.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: doc.delay,
        },
        opacity: {
          duration: doc.duration,
          repeat: Infinity,
          ease: 'linear',
          delay: doc.delay,
          times: [0, 0.08, 0.92, 1],
        },
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateY: doc.direction === 'ltr' ? [0, 12, 0] : [0, -12, 0],
          rotateX: [0, 6, 0],
        }}
        transition={{
          duration: 5 + doc.delay * 0.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={[
          'flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.06] shadow-xl backdrop-blur-md',
          sizeStyles[doc.size],
          doc.type === 'CV'
            ? 'border-cyan-500/25 shadow-cyan-500/10'
            : 'border-violet-500/25 shadow-violet-500/10',
        ].join(' ')}
      >
        <div
          className={[
            'flex size-8 shrink-0 items-center justify-center rounded-lg',
            doc.type === 'CV'
              ? 'bg-cyan-500/20 text-cyan-300'
              : 'bg-violet-500/20 text-violet-300',
          ].join(' ')}
        >
          <FileText className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold text-white/90">{doc.type}</p>
          <p className="truncate text-gray-500">{doc.label}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FloatingDocuments() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {documents.map((doc) => (
        <FloatingDocCard key={doc.id} doc={doc} />
      ))}
    </div>
  )
}
