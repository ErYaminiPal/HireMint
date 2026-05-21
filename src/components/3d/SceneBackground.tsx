import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'

export function SceneBackground() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2, -2]), {
    stiffness: 80,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), {
    stiffness: 80,
    damping: 20,
  })
  const gridX = useTransform(mx, [-0.5, 0.5], ['48%', '52%'])
  const gridY = useTransform(my, [-0.5, 0.5], ['38%', '42%'])

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  const spotlight = useMotionTemplate`radial-gradient(900px circle at ${gridX} ${gridY}, rgba(255,0,110,0.1), transparent 65%)`

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 flex items-end justify-center"
      >
        <div
          className="scene-grid-floor h-[55vh] w-[160%] max-w-none opacity-40"
          style={{ transform: 'rotateX(72deg) translateZ(-80px)' }}
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotateZ: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-gradient-to-br from-rose-500/20 to-violet-600/10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 24, 0], rotateZ: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[10%] top-[28%] h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/10 blur-2xl"
      />
    </div>
  )
}
