import founderImage from '../assets/images/founderImage.jpeg'
import kitchenImage from '../assets/images/oldresturant.png'
import mandalaPattern from '../assets/mandala-pattern.png'
import { ScrollReveal } from './ScrollEffects'

export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#F5EDE0] px-6 py-24 text-[#390F0D] sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Decorative Gold Heritage Mandala Centered */}
      <img
        src={mandalaPattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 max-w-none opacity-[0.09] select-none md:w-[720px] lg:w-[860px]"
      />


      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 flex items-center justify-between border-b border-[#CFB08B]/30 pb-5">
          <p className="font-[Sansita,serif] text-xl text-[#390F0D]">Founder&apos;s story</p>
          <span className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.24em] text-[#CFB08B]">Grubhub India · Varanasi</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} variant="up">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-2 lg:block">
            <div className="sticky top-32">
              <div className="font-[Sansita,serif] text-5xl leading-none text-[#35100A]/80">काशी</div>
              <p className="mt-3 max-w-[110px] font-[Inter,sans-serif] text-[9px] uppercase leading-5 tracking-[0.12em] text-[#390F0D]/45">A city of faith, flavour, and gathering.</p>
              </div>
          </aside>

          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg">
              <div className="absolute -bottom-8 -left-5 hidden h-32 w-32 border-l border-b border-[#CFB08B]/60 sm:block" />
              <img
                src={founderImage}
                alt="A dining moment from the Grubhub India story"
                className="relative z-10 aspect-[4/5] w-[82%] object-cover brightness-[0.82] saturate-[0.8]"
              />
              <img
                src={kitchenImage}
                alt="Cooking and ingredients from a Grubhub India kitchen"
                className="absolute -bottom-10 right-0 z-20 aspect-[4/3] w-[52%] border-8 border-[#F5EDE0] object-cover brightness-[0.78] saturate-[0.78]"
              />
              <p className="absolute -bottom-24 left-4 z-30 max-w-[180px] -rotate-6 font-[Sansita,serif] text-xl leading-tight text-[#CFB08B]">
                A legacy of place, made for today.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:pl-5">
            <p className="mb-5 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.2em] text-[#CFB08B]">Born by the Ganga</p>
            <h2 className="max-w-xl font-[Sansita,serif] text-[clamp(44px,5.5vw,76px)] leading-[0.94] tracking-[-0.05em] ">
              Built for the
              <span className="block ">modern plate.</span>
            </h2>
            <div className="mt-8 space-y-5 font-[Inter,sans-serif] text-[15px] leading-7 text-[#390F0D]/72">
              <p>
                In Varanasi, food carries memory. It moves through narrow lanes, family kitchens, old markets, and long evenings around a shared table.
              </p>
              <p>
                Grubhub India began with a simple ambition: honour that spirit while creating dining rooms with their own point of view. The work is still evolving, but the idea remains the same. Make the food with care. Make the room feel alive. Give people a reason to return.
              </p>
            </div>
            <div className="mt-10 flex items-end justify-between border-t border-[#CFB08B]/30 pt-5">
              <div>
                <p className="font-[Sansita,serif] text-2xl text-[#35100A]">Grubhub India</p>
                <p className="mt-1 font-[Inter,sans-serif] text-[9px] uppercase tracking-[0.16em] text-[#390F0D]/45">Hospitality from Varanasi</p>
              </div>
              <span className="font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.16em] text-[#35100A]/45">2012 — Present</span>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
