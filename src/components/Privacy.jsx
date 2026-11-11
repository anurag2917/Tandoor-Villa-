export default function Privacy() {
  return (
    <section id="privacy" className="border-t border-[#390F0D]/15 bg-[#F5EDE0] px-6 py-16 text-[#390F0D] sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-[Inter,sans-serif] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#CFB08B]">Privacy</p>
          <h2 className="mt-4 font-[Sansita,serif] text-4xl leading-none">A simple promise.</h2>
        </div>
        <div className="space-y-4 font-[Inter,sans-serif] text-sm leading-7 text-[#390F0D]/65">
          <p>We only use information you share with us to respond to enquiries, reservations, or hospitality requests.</p>
          <p>Ordering links take you to Zomato. Any information submitted there is handled under Zomato&apos;s own privacy policy.</p>
          <p>For questions about your information, contact <a className="text-[#390F0D] underline underline-offset-4" href="mailto:hello@grubhubindia.com">hello@grubhubindia.com</a>.</p>
        </div>
      </div>
    </section>
  )
}
