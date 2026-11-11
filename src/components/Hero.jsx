import { useEffect, useState } from 'react'
import heroImage from '../assets/hero_bg.png'
import { Button } from './ui/button'

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 12.5L12.5 3.5M5 3.5H12.5V11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Hero() {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) return undefined

    const timer = window.setInterval(() => {
      setZoomed(previous => !previous)
    }, 13000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex min-h-[max(650px,100svh)] overflow-hidden bg-[#F5EDE0] text-[#F5EDE0]" aria-labelledby="hero-title">
      <img
        className={[
          'absolute inset-0 h-full w-full origin-center transform-gpu object-cover object-center brightness-[1.16] saturate-[1.08]',
          'transition-transform duration-[13000ms] ease-in-out',
          zoomed ? 'scale-[1.08]' : 'scale-100',
        ].join(' ')}
        src={heroImage}
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,9,5,0.95)_0%,rgba(20,9,5,0.72)_36%,rgba(20,9,5,0.16)_72%,rgba(20,9,5,0.04)_100%),linear-gradient(0deg,rgba(20,9,5,0.48),transparent_42%)]" />
      <div className="relative z-10 flex min-h-[inherit] w-[min(58%,760px)] flex-col justify-center px-[clamp(28px,7vw,78px)] pb-[70px] pt-[148px] max-[900px]:min-h-[calc(100svh-72px)] max-[900px]:w-full max-[900px]:bg-[linear-gradient(180deg,rgba(57,15,13,0.72)_0%,#390F0D_68%)] max-[900px]:px-6 max-[900px]:pb-[42px] max-[900px]:pt-[138px]">
        <h1 id="hero-title" className="max-w-[710px] font-[Sansita,serif] text-[clamp(54px,6vw,92px)] font-normal leading-[0.95] tracking-[-0.045em] max-[900px]:max-w-[590px] max-[900px]:text-[clamp(40px,12vw,84px)] max-[900px]:tracking-[-0.06em]">
          Different
          <span className="block text-[#CFB08B]">Tables.</span>
          <span className="block text-[#F5EDE0]">One shared table.</span>
        </h1>
        <p className="mt-7 max-w-[490px] font-[Inter,sans-serif] text-[15px] leading-[1.75] text-[#F5EDE0]/72">
          Three restaurants with distinct menus and a common love of good food.
        </p>
        <div className="mt-[30px] flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <a href="#explore">
              Explore our brands
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
