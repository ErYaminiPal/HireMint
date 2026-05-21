import type { ReactNode } from 'react'

type CopyRowProps = {
  children: ReactNode
  className?: string
  centered?: boolean
}

/** Inline copy: stays on one line when short; wraps with spacing when long. */
export function CopyRow({
  children,
  className = '',
  centered = false,
}: CopyRowProps) {
  return (
    <div
      className={[
        'flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-2',
        centered ? 'justify-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export function CopySeparator() {
  return (
    <span
      className="hidden shrink-0 text-base text-white/25 sm:inline"
      aria-hidden
    >
      ·
    </span>
  )
}
