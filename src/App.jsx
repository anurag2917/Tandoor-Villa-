import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Brands'
import LoadingScreen from './components/LoadingScreen'
import ChatBot from './components/ChatBot'
import Privacy from './components/Privacy'
import { ScrollProgress, ScrollReveal } from './components/ScrollEffects'
import { Approach, Contact, Directory, ExperienceSwitcher, SiteFooter } from './components/ExperienceSections'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5EDE0] font-[Inter,sans-serif] text-[#390F0D]">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <ChatBot />
      <main>
        <Hero />
        <ScrollReveal delay={80} variant="left"><Story /></ScrollReveal>
        <ScrollReveal delay={120} variant="right"><ExperienceSwitcher /></ScrollReveal>
        <ScrollReveal delay={160}><Approach /></ScrollReveal>
        <ScrollReveal delay={200} variant="left"><Directory /></ScrollReveal>
        <ScrollReveal delay={240} variant="right"><Contact /></ScrollReveal>
        <ScrollReveal delay={260}><Privacy /></ScrollReveal>
      </main>
      <ScrollReveal delay={280}><SiteFooter /></ScrollReveal>
    </div>
  )
}

export default App
