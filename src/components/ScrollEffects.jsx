import { useEffect, useRef, useState } from 'react'

export function ScrollReveal({ children, delay = 0, variant = 'up', className = '' }) {
  const elementRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(reducedMotion)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches)
    updateMotionPreference()
    motionQuery.addEventListener('change', updateMotionPreference)

    if (motionQuery.matches) {
      return () => motionQuery.removeEventListener('change', updateMotionPreference)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    if (elementRef.current) observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  const hiddenVariants = {
    up: 'translate-y-12',
    left: '-translate-x-8',
    right: 'translate-x-8',
    scale: 'scale-[0.96]',
  }

  return (
    <div
      ref={elementRef}
      className={`w-full transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${visible || reducedMotion ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `${hiddenVariants[variant]} opacity-0`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div className="h-full origin-left bg-[#CFB08B] transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  )
}
