import { useEffect, useState } from 'react'
import grubhubLogo from '../assets/grubhub-logo.png'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const exitTimer = window.setTimeout(() => {
      setExiting(true)
      document.body.style.overflow = ''
    }, 850)
    const hideTimer = window.setTimeout(() => setVisible(false), 1350)

    return () => {
      document.body.style.overflow = ''
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#390F0D] text-[#F5EDE0] transition-opacity duration-500 ${exiting ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Grubhub India"
    >
      <style>{`
        @keyframes loading-logo-breathe {
          0%, 100% { opacity: 0.78; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes loading-line-draw {
          0%, 100% { opacity: 0.35; transform: scaleX(0.35); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes loading-label-fade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.85; }
        }
        .loading-logo-breathe { animation: loading-logo-breathe 1.8s ease-in-out infinite; }
        .loading-line-draw { animation: loading-line-draw 1.4s ease-in-out infinite; }
        .loading-label-fade { animation: loading-label-fade 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .loading-logo-breathe, .loading-line-draw, .loading-label-fade { animation: none; }
        }
      `}</style>
      <div className="flex flex-col items-center">
        <img
          src={grubhubLogo}
          alt="Grubhub dining.catering"
          className="loading-logo-breathe h-auto w-[min(74vw,300px)] mix-blend-screen invert brightness-200"
        />
        <span className="loading-line-draw mt-8 h-px w-20 origin-center bg-[#CFB08B]" />
        <span className="loading-label-fade mt-4 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.28em] text-[#F5EDE0]/65">
          Varanasi · India
        </span>
      </div>
    </div>
  )
}
