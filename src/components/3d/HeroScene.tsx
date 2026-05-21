import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { useRef } from 'react'
import { FloatingDocuments } from './FloatingDocuments'

type HeroSceneProps = {
  children: ReactNode
}

function FloatingShape({
  className,
  depth,
  delay,
}: {
  className: string
  depth: number
  delay: number
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, -16, 0], rotateY: [0, 180, 360] }}
      transition={{ duration: 14 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
      style={{ transform: `translateZ(${depth}px)` }}
    />
  )
}

export function HeroScene({ children }: HeroSceneProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 120,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 120,
    damping: 24,
  })

  const glowX = useTransform(mx, (v) => `${(v + 0.5) * 100}%`)
  const glowY = useTransform(my, (v) => `${(v + 0.5) * 100}%`)
  const heroGlow = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, rgba(255,0,128,0.15), transparent 60%)`

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-x-clip overflow-y-visible px-4 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20"
      style={{ perspective: '1400px' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: heroGlow }}
        />
        <div className="absolute left-1/2 top-0 h-[520px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[120px] animate-float" />
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-rose-500/15 blur-[100px]" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
      </div>

      <FloatingDocuments />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <FloatingShape
          delay={0}
          depth={-120}
          className="absolute left-[6%] top-[22%] h-20 w-20 rounded-2xl border border-violet-500/30 bg-violet-500/10 shadow-[0_20px_60px_rgba(139,92,246,0.25)] backdrop-blur-sm sm:h-28 sm:w-28"
        />
        <FloatingShape
          delay={2}
          depth={80}
          className="absolute right-[8%] top-[30%] h-16 w-16 rotate-45 rounded-xl border border-cyan-400/30 bg-cyan-500/10 shadow-[0_20px_50px_rgba(34,211,238,0.2)] sm:h-24 sm:w-24"
        />
        <div
          className="scene-grid-floor absolute bottom-0 left-1/2 h-[40vh] w-[140%] -translate-x-1/2 opacity-30"
          style={{ transform: 'rotateX(78deg) translateZ(-100px)' }}
        />
      </div>

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div style={{ transform: 'translateZ(50px)' }}>{children}</div>
      </motion.div>
    </section>
  )
}
