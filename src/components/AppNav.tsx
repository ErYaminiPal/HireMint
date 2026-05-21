import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes/paths'
import { GlowButton } from './ui/GlowButton'
import { NavLinkAnimated } from './ui/NavLinkAnimated'

export function AppNav() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/60"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={ROUTES.HOME}
            className="text-cta-gradient text-lg font-bold tracking-tight"
          >
            SkillMint
          </Link>
        </motion.div>

        <div className="hidden items-center gap-8 md:flex">
          <NavLinkAnimated to={ROUTES.FEATURES}>Features</NavLinkAnimated>
          <NavLinkAnimated to={ROUTES.UPLOAD}>Upload</NavLinkAnimated>
          <NavLinkAnimated to={ROUTES.RESULT}>Results</NavLinkAnimated>
          <GlowButton to={ROUTES.UPLOAD} className="!px-4 !py-2 !text-sm">
            Get started
          </GlowButton>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          className="inline-flex rounded-lg border border-white/10 p-2 text-gray-300 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4 sm:px-6">
              <NavLinkAnimated to={ROUTES.FEATURES} onClick={() => setOpen(false)}>
                Features
              </NavLinkAnimated>
              <NavLinkAnimated to={ROUTES.UPLOAD} onClick={() => setOpen(false)}>
                Upload
              </NavLinkAnimated>
              <NavLinkAnimated to={ROUTES.RESULT} onClick={() => setOpen(false)}>
                Results
              </NavLinkAnimated>
              <GlowButton
                to={ROUTES.UPLOAD}
                className="mt-2 w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Get started
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
