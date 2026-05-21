import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

type NavLinkAnimatedProps = {
  to: string
  children: string
  end?: boolean
  onClick?: () => void
}

export function NavLinkAnimated({
  to,
  children,
  end,
  onClick,
}: NavLinkAnimatedProps) {
  return (
    <NavLink to={to} end={end} onClick={onClick} className="relative py-1">
      {({ isActive }) => (
        <>
          <motion.span
            className="text-sm font-medium"
            animate={{ color: isActive ? '#ffffff' : '#9ca3af' }}
            whileHover={{ color: '#ffffff', scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
            />
          )}
        </>
      )}
    </NavLink>
  )
}
