import { motion } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type GlowButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  disabled?: boolean
}

const variants = {
  primary:
    'bg-cta-gradient text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:shadow-fuchsia-500/30',
  secondary:
    'border border-white/15 bg-white/5 text-gray-100 backdrop-blur-md hover:border-violet-400/40',
  ghost: 'text-gray-300 hover:bg-white/5 hover:text-white',
}

function addRipple(e: MouseEvent<HTMLElement>) {
  const target = e.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(target.clientWidth, target.clientHeight)
  const rect = target.getBoundingClientRect()
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${e.clientX - rect.left - diameter / 2}px`
  circle.style.top = `${e.clientY - rect.top - diameter / 2}px`
  circle.className =
    'pointer-events-none absolute rounded-full bg-white/30 animate-ripple'
  target.appendChild(circle)
  circle.addEventListener('animationend', () => circle.remove())
}

export function GlowButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}: GlowButtonProps) {
  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-shadow sm:text-base ${variants[variant]} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`

  const motionWrap = {
    whileHover: disabled ? undefined : { scale: 1.05, y: -3, rotateX: 4 },
    whileTap: disabled ? undefined : { scale: 0.96 },
  }

  const glow =
    variant === 'primary' ? (
      <span
        aria-hidden
        className="bg-cta-glow pointer-events-none absolute -inset-1 -z-10 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-80 animate-gradient-shift"
      />
    ) : null

  const inner = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  )

  if (to) {
    return (
      <motion.span
        className="relative inline-block"
        style={{ transformStyle: 'preserve-3d' }}
        {...motionWrap}
      >
        {glow}
        <Link
          to={to}
          className={classes}
          onClick={(e) => {
            if (!disabled) addRipple(e)
            onClick?.()
          }}
        >
          {inner}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={{ transformStyle: 'preserve-3d' }}
        {...motionWrap}
        onClick={addRipple}
      >
        {glow}
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      style={{ transformStyle: 'preserve-3d' }}
      disabled={disabled}
      {...motionWrap}
      onClick={(e) => {
        if (!disabled) addRipple(e)
        onClick?.()
      }}
    >
      {glow}
      {inner}
    </motion.button>
  )
}
