import { useEffect, useRef, useState } from 'react'
import { ScrollReveal } from './ScrollEffects'
import tandoorTikkaImage from '../assets/images/tandoor-tikka.jpg'
import tandoorBiryaniImage from '../assets/images/tandoor-biryani.jpg'
import chopsticksBlackBeanImage from '../assets/images/holy-chopsticks-black-bean.jpg'
import chopsticksManchurianImage from '../assets/images/holy-chopsticks-manchurian.jpg'
import momoCrispyBitesImage from '../assets/images/momo-chow-crispy-bites.jpg'
import momoCrispyPlatterImage from '../assets/images/momo-chow-crispy-platter.jpg'
import varanasiGhat from '../assets/varanasi-ghat.png'

const EXPERIENCES = {
  tandoor: {
    name: 'Tandoor Villa',
    accent: '#CFB08B',
    location: 'Nadesar, Varanasi',
    cuisine: 'North Indian & Royal Mughlai',
    established: 'Est. 2012',
    description: 'A warm, fire-led dining room rooted in the royal kitchens of North India and the living heritage of Varanasi.',
    tags: ['Royal Mughlai', 'Tandoor craft', 'Fine dining'],
    images: [tandoorTikkaImage, tandoorBiryaniImage],
    href: '/restaurants/tandoor-villa',
    cta: 'Order on Zomato',
    ctaHref: 'https://www.zomato.com/varanasi/tandoor-villa-nadesar/order?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacAHCn6bVtnOBEbCzrWt0Y6PR_GKCc87RPcLgDoiyw0wStc2Bd38-0N95txDQ_aem_epn1rX5crhG32hKQoYdckQ',
  },
  chopsticks: {
    name: 'Holy Chopsticks',
    accent: '#CFB08B',
    location: 'Nadesar, Varanasi',
    cuisine: 'Pan-Asian & wok craft',
    established: 'Nadesar dining room',
    description: 'A spirited Pan-Asian kitchen where wok heat, bright aromatics, and the pace of Nadesar shape every plate.',
    tags: ['Pan-Asian', 'Wok craft', 'Nadesar'],
    images: [chopsticksBlackBeanImage, chopsticksManchurianImage],
    href: '/restaurants/holy-chopsticks',
    cta: 'Order on Zomato',
    ctaHref: 'https://www.zomato.com/varanasi/holy-chopsticks-nadesar',
  },
  momo: {
    name: 'Momo Chow',
    accent: '#CFB08B',
    location: 'Nadesar, Varanasi',
    cuisine: 'Momos & quick bites',
    established: 'Made for the city',
    description: 'A casual, quick-bite stop for hand-folded momos, vivid sauces, and food worth sharing on the move.',
    tags: ['Momos', 'Quick bites', 'Street energy'],
    images: [momoCrispyBitesImage, momoCrispyPlatterImage],
    href: '/restaurants/momo-chow',
    cta: 'Order on Zomato',
    ctaHref: 'https://www.zomato.com/varanasi/momo-chow-nadesar',
  },
}

const PILLARS = [
  ['01', 'Distinct brand DNA', 'Every restaurant is built from the ground up with its own kitchen philosophy, visual identity, and menu architecture.'],
  ['02', 'Culinary authenticity', 'From slow-cooked Royal Mughlai recipes to Pan-Asian delicacies, every kitchen is led by specialized craftsmanship.'],
  ['03', 'Operational excellence', 'Hospitality management, supply chain quality, and guest standards stay connected while each dining room shines independently.'],
]

const DIRECTORY = [
  ['Tandoor Villa', 'Est. 2012', 'North Indian & Royal Mughlai', 'Nadesar, Varanasi', 'Reserve a table', 'tel:+919559985999'],
  ['Holy Chopsticks', 'Nadesar dining room', 'Pan-Asian & wok craft', 'Nadesar, Varanasi', 'Reserve a table', 'tel:+919559985999'],
  ['Momo Chow', 'Quick-bite kitchen', 'Momos & bold sauces', 'Nadesar, Varanasi', 'Order now', 'https://www.zomato.com/varanasi/momo-chow-nadesar'],
]

function SectionLabel({ children, dark = false }) {
  return (
    <p className={`mb-5 flex items-center gap-3 font-[Inter,sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#CFB08B]' : 'text-[#390F0D]'}`}>
      {children}
    </p>
  )
}

export function ExperienceSwitcher() {
  const tabRefs = useRef({})
  const [activeBrand, setActiveBrand] = useState(() => {
    const brandFromUrl = new URLSearchParams(window.location.search).get('brand')
    return brandFromUrl in EXPERIENCES ? brandFromUrl : 'tandoor'
  })
  const brand = EXPERIENCES[activeBrand]

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('brand', activeBrand)
    window.history.replaceState(null, '', `${url.pathname}?${url.searchParams.toString()}${url.hash}`)
  }, [activeBrand])

  const selectBrand = (key, focus = false) => {
    setActiveBrand(key)
    if (focus) tabRefs.current[key]?.focus()
  }

  const handleTabKeyDown = event => {
    const keys = Object.keys(EXPERIENCES)
    const currentIndex = keys.indexOf(activeBrand)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % keys.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + keys.length) % keys.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = keys.length - 1

    if (nextIndex !== currentIndex) {
      event.preventDefault()
      selectBrand(keys[nextIndex], true)
    }
  }

  return (
    <section
      id="explore"
      className="relative overflow-hidden border-y border-[#390F0D]/15 bg-[#F5EDE0] px-6 py-24 text-[#390F0D] sm:px-10 lg:px-16 lg:py-32"
      style={{ '--brand-accent': brand.accent }}
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full opacity-15 blur-3xl transition-colors duration-500" style={{ backgroundColor: brand.accent }} />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel dark>Explore the experiences</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <h2 className="max-w-2xl font-[Sansita,serif] text-[clamp(44px,6vw,82px)] leading-[0.94] tracking-[-0.05em]">
            Three brands.
            <span className="block text-[#CFB08B]">Three points of view.</span>
          </h2>
          {/* Varanasi Ghat Vector */}
          <div className="hidden lg:flex lg:justify-end">
            <img
              src={varanasiGhat}
              alt="Varanasi Ghat illustration"
              className="max-h-[175px] w-auto max-w-[440px] object-contain opacity-75 select-none transition-opacity duration-300 hover:opacity-95"
            />
          </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} variant="right">
          <div className="mt-14 grid border-y border-[#390F0D]/15 md:grid-cols-3" role="tablist" aria-label="Explore our restaurant brands">
          {Object.entries(EXPERIENCES).map(([key, item]) => (
            <button
              key={key}
              type="button"
              ref={element => { tabRefs.current[key] = element }}
              role="tab"
              id={`experience-tab-${key}`}
              aria-selected={activeBrand === key}
              aria-controls={`experience-panel-${key}`}
              tabIndex={activeBrand === key ? 0 : -1}
              onKeyDown={handleTabKeyDown}
              onClick={() => selectBrand(key)}
              className={`group relative border-b border-[#390F0D]/15 px-1 py-6 text-left transition-colors duration-300 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0 ${activeBrand === key ? 'text-[#390F0D]' : 'text-[#390F0D]/45 hover:text-[#390F0D]/80'}`}
            >
              <span className="flex items-center justify-between gap-5 font-[Sansita,serif] text-2xl tracking-tight">
                {item.name}
                <span className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ backgroundColor: activeBrand === key ? '#390F0D' : 'currentColor' }} />
              </span>
              <span className="mt-2 block font-[Inter,sans-serif] text-xs uppercase tracking-[0.16em] text-[#390F0D]/45">{item.cuisine}</span>
              <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#390F0D] transition-transform duration-300 md:inset-x-7 md:first:left-0 ${activeBrand === key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
            </button>
          ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div id={`experience-panel-${activeBrand}`} role="tabpanel" aria-labelledby={`experience-tab-${activeBrand}`} className="mt-12 grid gap-8 motion-reduce:transition-none lg:grid-cols-12 lg:gap-10">
            <div className="relative pb-12 lg:col-span-8 lg:pb-10">
              <div className="relative border border-[#390F0D]/20 bg-[#390F0D] p-2 sm:p-3">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <img src={brand.images[0]} alt={`${brand.name} dining experience`} className="h-full w-full object-cover brightness-[0.78] saturate-[0.82] transition-transform duration-1000 motion-reduce:transition-none hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#390F0D]/75 via-transparent to-[#390F0D]/10" />
                  <div className="absolute left-5 top-5 flex items-center gap-3 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.2em] text-[#F5EDE0]/75">
                    <span className="h-px w-8 bg-[#CFB08B]" />
                    {brand.location}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-[#F5EDE0]">
                    <p className="font-[Sansita,serif] text-3xl leading-none sm:text-4xl">{brand.name}</p>
                    <span className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.16em] text-[#F5EDE0]/70">01 / 02</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 right-5 w-[38%] min-w-[145px] border-8 border-[#F5EDE0] bg-[#F5EDE0] shadow-[0_16px_30px_rgba(57,15,13,0.2)] sm:right-8">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={brand.images[1]} alt={`${brand.name} interior and dining details`} className="h-full w-full object-cover brightness-[0.82] saturate-[0.82] transition-transform duration-700 motion-reduce:transition-none hover:scale-105" />
                  </div>
                  <p className="hidden px-2 py-2 font-[Inter,sans-serif] text-[9px] uppercase tracking-[0.14em] text-[#390F0D]/60 sm:block">A closer look</p>
                </div>
              </div>
            </div>
          <div className="flex flex-col justify-center lg:col-span-4">
            <span className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.2em]" style={{ color: brand.accent }}>{brand.established}</span>
            <h3 className="mt-4 font-[Sansita,serif] text-5xl leading-none tracking-tight">{brand.name}</h3>
            <p className="mt-6 font-[Inter,sans-serif] text-[15px] leading-7 text-[#390F0D]/70">{brand.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {brand.tags.map(tag => <span key={tag} className="border-b border-[#CFB08B]/45 px-1 pb-2 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.14em] text-[#390F0D]/55">{tag}</span>)}
            </div>
            <a href={brand.ctaHref} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-11 w-fit items-center gap-3 border-b border-[#390F0D] pb-2 font-[Sansita,serif] text-lg text-[#390F0D] transition-all duration-300 hover:gap-5 motion-reduce:transition-none">
              {brand.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function Approach() {
  return (
    <section id="approach" className="relative overflow-hidden bg-[#F5EDE0] px-6 py-24 text-[#390F0D] sm:px-10 lg:px-16 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel dark>Our approach</SectionLabel>
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="max-w-3xl font-[Sansita,serif] text-[clamp(44px,6vw,78px)] leading-[0.94] tracking-[-0.05em]">Built with character. Run with care.</h2>
          <p className="font-[Inter,sans-serif] text-[15px] leading-7 text-[#390F0D]/60">A hospitality group shaped by Varanasi: precise in operation, generous in spirit, and never uniform in expression.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="grid grid-cols-1 border-l border-t border-[#390F0D]/15 md:grid-cols-3">
          {PILLARS.map(([number, title, copy], index) => (
            <ScrollReveal key={number} delay={index * 100}>
              <article className="h-full border-b border-r border-[#390F0D]/15 p-8 transition-colors duration-300 hover:bg-[#390F0D]/5 lg:p-14">
              <span className="mb-8 block font-mono text-sm text-[#CFB08B]">{number}</span>
              <h3 className="mb-4 font-[Sansita,serif] text-[22px] font-semibold text-[#390F0D]">{title}</h3>
              <p className="font-[Inter,sans-serif] text-[15px] leading-relaxed text-[#390F0D]/55">{copy}</p>
              </article>
            </ScrollReveal>
          ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function Directory() {
  return (
    <section id="directory" className="relative overflow-hidden bg-[#F5EDE0] px-6 py-24 text-[#390F0D] sm:px-10 lg:px-16 lg:py-32">
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <SectionLabel>Dining directory</SectionLabel>
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-[Sansita,serif] text-[clamp(44px,6vw,78px)] leading-[0.94] tracking-[-0.05em]">Choose your table.</h2>
          <p className="max-w-sm font-[Inter,sans-serif] text-sm leading-6 text-[#390F0D]/60">Three addresses, one city, and a reason to make tonight feel different.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={140} variant="left">
          <div className="divide-y divide-[#390F0D]/15 border-y border-[#390F0D]/15">
          {DIRECTORY.map(([name, badge, cuisine, location, action, href], index) => (
            <ScrollReveal key={name} delay={index * 100}>
              <div className="group flex flex-col items-start justify-between gap-5 py-8 transition-colors duration-300 hover:bg-[#390F0D]/[0.04] md:flex-row md:items-center">
              <div className="min-w-[220px]">
                <h3 className="font-[Sansita,serif] text-2xl">{name}</h3>
                <span className="mt-2 inline-flex rounded-full border border-[#CFB08B] px-2.5 py-1 font-[Inter,sans-serif] text-[9px] uppercase tracking-[0.14em] text-[#390F0D]">{badge}</span>
                </div>
              <span className="font-[Inter,sans-serif] text-sm text-[#390F0D]/60 md:min-w-[220px]">{cuisine}</span>
              <span className="font-[Inter,sans-serif] text-sm text-[#390F0D]/60 md:min-w-[180px]">{location}</span>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="font-[Sansita,serif] text-sm uppercase tracking-[0.12em] text-[#390F0D] transition-transform duration-300 group-hover:translate-x-1">{action} ↗</a>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function Contact() {
  const [inquiry, setInquiry] = useState('General Inquiry')
  return (
    <section id="contact" className="relative overflow-hidden bg-[#F5EDE0] px-6 py-24 text-[#390F0D] sm:px-10 lg:px-16 lg:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <ScrollReveal variant="left" className="lg:col-span-5">
          <SectionLabel dark>Business enquiries</SectionLabel>
          <h2 className="max-w-lg font-[Sansita,serif] text-[clamp(44px,6vw,78px)] leading-[0.94] tracking-[-0.05em]">Bring something good to the table.</h2>
          <p className="mt-7 max-w-md font-[Inter,sans-serif] text-[15px] leading-7 text-[#390F0D]/60">For partnerships, private dining, events, careers, and hospitality conversations, write to the group team.</p>
          <div className="mt-10 space-y-3 font-[Inter,sans-serif] text-sm text-[#390F0D]/75">
            <p>Head office · Varanasi, Uttar Pradesh</p>
            <a href="mailto:hello@grubhubindia.com" className="block transition-colors hover:text-[#CFB08B]">hello@grubhubindia.com</a>
            <a href="tel:+919559985999" className="block transition-colors hover:text-[#CFB08B]">+91 95599 85999</a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={140} variant="right" className="lg:col-span-7">
          <form onSubmit={event => event.preventDefault()}>
          <div className="mb-10 flex flex-wrap gap-2">
            {['General Inquiry', 'Business / Partnership', 'Private Dining & Events'].map(option => (
              <button key={option} type="button" onClick={() => setInquiry(option)} className={`border-b px-1 py-2 font-[Sansita,serif] text-sm transition-colors ${inquiry === option ? 'border-[#390F0D] text-[#390F0D]' : 'border-transparent text-[#390F0D]/45 hover:border-[#390F0D]/60 hover:text-[#390F0D]'}`}>{option}</button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {['Your name', 'Email address', 'Phone number'].map(label => (
              <label key={label} className="flex flex-col gap-2 font-[Inter,sans-serif] text-xs uppercase tracking-[0.14em] text-[#390F0D]/45">
                {label}
                <input type={label === 'Email address' ? 'email' : 'text'} placeholder={label} className="border-b border-[#390F0D]/25 bg-transparent py-4 font-[Inter,sans-serif] text-base normal-case tracking-normal text-[#390F0D] placeholder:text-[#390F0D]/25 focus:border-[#390F0D] focus:outline-none" />
              </label>
            ))}
            <label className="flex flex-col gap-2 font-[Inter,sans-serif] text-xs uppercase tracking-[0.14em] text-[#390F0D]/45 md:col-span-2">
              Tell us what you have in mind
              <textarea rows="3" placeholder="A few words about your enquiry" className="resize-none border-b border-[#390F0D]/25 bg-transparent py-4 font-[Inter,sans-serif] text-base normal-case tracking-normal text-[#390F0D] placeholder:text-[#390F0D]/25 focus:border-[#390F0D] focus:outline-none" />
            </label>
          </div>
          <button type="submit" className="mt-10 inline-flex items-center gap-3 border-b border-[#CFB08B] pb-2 font-[Sansita,serif] text-lg text-[#CFB08B] transition-all hover:gap-5">Send enquiry <span aria-hidden="true">↗</span></button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#390F0D] px-6 pb-5 pt-20 text-[#F5EDE0] sm:px-10 lg:px-16 lg:pt-24">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-[#F5EDE0]/20 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-[Sansita,serif] text-3xl">Grubhub India</p>
            <p className="mt-5 max-w-xs font-[Inter,sans-serif] text-sm leading-6 text-[#F5EDE0]/65">Independent dining rooms from Varanasi, built around food, place, and the people who gather around it.</p>
          </div>
          <div>
            <h3 className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.18em] text-[#CFB08B]">Our restaurants</h3>
            <div className="mt-5 space-y-3 font-[Inter,sans-serif] text-sm text-[#F5EDE0]/80">
              <a className="block hover:text-[#CFB08B]" href="/restaurants/tandoor-villa">Tandoor Villa</a>
              <a className="block hover:text-[#CFB08B]" href="/restaurants/holy-chopsticks">Holy Chopsticks</a>
              <a className="block hover:text-[#CFB08B]" href="/restaurants/momo-chow">Momo Chow</a>
            </div>
          </div>
          <div>
            <h3 className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.18em] text-[#CFB08B]">Group navigation</h3>
            <div className="mt-5 space-y-3 font-[Inter,sans-serif] text-sm text-[#F5EDE0]/80">
              <a className="block hover:text-[#CFB08B]" href="#home">Home</a>
              <a className="block hover:text-[#CFB08B]" href="#approach">Our approach</a>
              <a className="block hover:text-[#CFB08B]" href="#directory">Our restaurants</a>
              <a className="block hover:text-[#CFB08B]" href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.18em] text-[#CFB08B]">Follow along</h3>
            <div className="mt-5 space-y-3 font-[Inter,sans-serif] text-sm text-[#F5EDE0]/80">
              <a className="block hover:text-[#CFB08B]" href="https://www.instagram.com/tandoorvilla/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a className="block hover:text-[#CFB08B]" href="https://www.linkedin.com/company/grubhubindia" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="block hover:text-[#CFB08B]" href="#privacy">Privacy note ↗</a>
              <p className="max-w-[220px] pt-2 text-xs leading-5 text-[#F5EDE0]/55">We only use information you share with us to respond to enquiries and reservations.</p>
            </div>
          </div>
        </div>
        <p aria-hidden="true" className="pointer-events-none max-w-full select-none overflow-hidden whitespace-nowrap font-[Sansita,serif] text-[clamp(48px,11vw,160px)] leading-none tracking-[-0.08em] text-[#F5EDE0]/[0.08]">GRUBHUB INDIA</p>
        <div className="flex flex-col gap-2 pt-4 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.15em] text-[#F5EDE0]/50 sm:flex-row sm:justify-between">
          <span>Varanasi · India</span>
          <span>© 2026 Grubhub India</span>
        </div>
      </div>
    </footer>
  )
}
