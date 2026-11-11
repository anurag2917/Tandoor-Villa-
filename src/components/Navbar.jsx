import { useState, useEffect } from 'react'
import grubhubLogo from '../assets/grubhub-logo.png'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'The Directory', href: '#directory' },
  { label: 'Experiences', href: '#explore' },
  { label: 'Contact', href: '#contact' },
]

function HamburgerIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`origin-center transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
      <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`origin-center transition-transform duration-300 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
    </svg>
  )
}

function NavLink({ href, label, onClick, large = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={[
        'group relative inline-flex min-h-11 items-center font-[Inter,sans-serif] text-xs uppercase tracking-[0.14em]',
        'text-current/90 no-underline transition-colors duration-200 hover:text-current focus-visible:text-current',
        'after:absolute after:bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0',
        'after:bg-[#CFB08B] after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100',
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#CFB08B]',
        large ? 'min-h-[52px] font-[Sansita,serif] text-3xl normal-case tracking-normal' : '',
      ].join(' ')}
    >
      {label}
    </a>
  )
}

function CTAButton({ onClick, fullWidth = false }) {
  return (
    <a
      href="tel:+919559985999"
      onClick={onClick}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-full border border-[#CFB08B] bg-[#390F0D] px-[21px]',
        'font-[Inter,sans-serif] text-[11px] uppercase tracking-[0.16em] text-[#F5EDE0] no-underline',
        'transition-all duration-200 hover:-translate-y-px hover:bg-[#390F0D]/90',
        'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#CFB08B]',
        fullWidth ? 'min-w-[220px]' : '',
      ].join(' ')}
    >
      Reserve a table
    </a>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const handleScroll = () => setScrolled(window.scrollY > 36)
    document.addEventListener('keydown', handleKeyDown)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const navClass = [
    'fixed z-50 flex items-center justify-between text-[#F5EDE0] transition-all duration-300 ease-out',
    scrolled
      ? 'top-4 right-[clamp(20px,4vw,64px)] left-[clamp(20px,4vw,64px)] min-h-[62px] rounded-[28px] border border-[#CFB08B]/45 bg-[#F5EDE0] px-[clamp(22px,3.8vw,60px)] py-1.5 text-[#390F0D] shadow-none max-[900px]:top-3 max-[900px]:right-4 max-[900px]:left-4 max-[900px]:min-h-[58px] max-[900px]:rounded-[22px] max-[900px]:px-4 max-[900px]:py-1.5'
      : 'inset-x-0 top-0 min-h-[82px] bg-[linear-gradient(180deg,rgba(20,9,5,0.9)_0%,rgba(20,9,5,0.58)_48%,rgba(20,9,5,0)_100%)] px-[clamp(20px,5vw,76px)] py-4 max-[900px]:min-h-[72px] max-[900px]:px-5 max-[900px]:py-3',
  ].join(' ')

  return (
    <>
      <nav className={navClass} aria-label="Primary navigation">
        <a href="#home" className="inline-flex items-center gap-3 text-current no-underline" aria-label="Grubhub India home">
          <img
            className={`block object-contain transition-all duration-300 max-[900px]:h-14 max-[900px]:w-[188px] ${scrolled ? 'h-14 w-[196px] mix-blend-multiply max-[900px]:h-12 max-[900px]:w-[168px]' : 'h-16 w-[220px] mix-blend-screen invert brightness-200'}`}
            src={grubhubLogo}
            alt="Grubhub dining.catering"
          />
        </a>

        <div className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-[clamp(20px,2.4vw,38px)] transition-colors duration-300 max-[900px]:hidden ${scrolled ? 'text-[#390F0D]' : 'text-[#F5EDE0]'}`}>
          {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href} label={link.label} />)}
        </div>

        <div className="flex items-center">
          <div className="max-[900px]:hidden"><CTAButton /></div>
          <button
            className="hidden h-11 w-11 place-items-center rounded-xl border border-[#CFB08B] bg-transparent text-current transition-colors duration-200 hover:bg-[#390F0D] hover:text-[#F5EDE0] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#CFB08B] max-[900px]:grid"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#390F0D] px-6 pb-10 pt-24 text-[#F5EDE0] transition-opacity duration-300" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.2em] text-[#CFB08B]">Grubhub India</div>
          <nav className="flex flex-col items-center gap-3" aria-label="Mobile primary navigation">
            {NAV_LINKS.map(link => <NavLink key={link.href} href={link.href} label={link.label} onClick={closeMenu} large />)}
          </nav>
          <CTAButton onClick={closeMenu} fullWidth />
        </div>
      )}
    </>
  )
}
