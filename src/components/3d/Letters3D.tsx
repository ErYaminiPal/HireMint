type HeadlineLettersProps = {
  line1: string
  line2: string
}

export function HeadlineLetters({ line1, line2 }: HeadlineLettersProps) {
  return (
    <h1 className="overflow-visible py-2 text-center text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
      <span className="block leading-[1.25] text-white">{line1}</span>
      <span className="text-cta-gradient mt-2 block leading-[1.3] sm:mt-3">
        {line2}
      </span>
    </h1>
  )
}
