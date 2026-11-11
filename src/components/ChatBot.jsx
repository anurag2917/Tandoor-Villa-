import { useEffect, useState } from 'react'

const ORDER_LINKS = {
  'Tandoor Villa': 'https://www.zomato.com/varanasi/tandoor-villa-nadesar/order?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacAHCn6bVtnOBEbCzrWt0Y6PR_GKCc87RPcLgDoiyw0wStc2Bd38-0N95txDQ_aem_epn1rX5crhG32hKQoYdckQ',
  'Holy Chopsticks': 'https://www.zomato.com/varanasi/holy-chopsticks-nadesar',
  'Momo Chow': 'https://www.zomato.com/varanasi/momo-chow-nadesar',
}

const QUICK_QUESTIONS = [
  { label: 'Reserve a table', key: 'reserve' },
  { label: 'Where should I eat?', key: 'recommend' },
  { label: 'Order online', key: 'order' },
]

function getReply(key) {
  if (key === 'reserve') {
    return {
      text: 'Call us to reserve a table or ask about today’s availability.',
      action: { label: '+91 95599 85999', href: 'tel:+919559985999' },
    }
  }

  if (key === 'recommend') {
    return {
      text: 'Choose Tandoor Villa for Royal Mughlai, Holy Chopsticks for Pan-Asian flavours, or Momo Chow for quick bites.',
    }
  }

  return {
    text: 'Order from any of our kitchens on Zomato:',
    links: Object.entries(ORDER_LINKS),
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const askQuestion = key => {
    const question = QUICK_QUESTIONS.find(item => item.key === key)
    setMessages(previous => [...previous, { type: 'question', text: question.label }, { type: 'answer', ...getReply(key) }])
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {open && (
        <section
          id="grubhub-chat-panel"
          className="w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#CFB08B]/60 bg-[#F5EDE0] text-[#390F0D] shadow-[0_20px_70px_rgba(57,15,13,0.2)]"
          aria-label="Grubhub India hospitality assistant"
        >
          <div className="flex items-center justify-between bg-[#390F0D] px-5 py-4 text-[#F5EDE0]">
            <div>
              <p className="font-[Sansita,serif] text-xl">Ask Grubhub India</p>
              <p className="mt-1 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.16em] text-[#F5EDE0]/60">Varanasi dining assistant</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-[#CFB08B]/60 text-lg text-[#F5EDE0] transition-colors hover:bg-[#F5EDE0] hover:text-[#390F0D]" aria-label="Close chat">
              ×
            </button>
          </div>

          <div className="max-h-[min(52vh,380px)] space-y-4 overflow-y-auto px-5 py-5">
            <div className="max-w-[90%] border-l-2 border-[#CFB08B] pl-3 font-[Inter,sans-serif] text-sm leading-6 text-[#390F0D]/75">
              Welcome. I can help you choose a restaurant, order online, or reserve a table.
            </div>
            {messages.map((message, index) => (
              <div key={`${message.type}-${index}`} className={message.type === 'question' ? 'ml-auto max-w-[88%] bg-[#390F0D] px-3 py-2 font-[Inter,sans-serif] text-sm text-[#F5EDE0]' : 'max-w-[92%] border-l-2 border-[#CFB08B] pl-3 font-[Inter,sans-serif] text-sm leading-6 text-[#390F0D]/75'}>
                <p>{message.text}</p>
                {message.action && <a href={message.action.href} className="mt-2 inline-flex font-semibold text-[#390F0D] underline underline-offset-4">{message.action.label}</a>}
                {message.links && (
                  <div className="mt-2 space-y-1">
                    {message.links.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="block font-semibold text-[#390F0D] underline underline-offset-4">{name} ↗</a>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-[#390F0D]/15 px-5 py-4">
            <p className="mb-3 font-[Inter,sans-serif] text-[10px] uppercase tracking-[0.16em] text-[#390F0D]/50">Quick help</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map(question => (
                <button key={question.key} type="button" onClick={() => askQuestion(question.key)} className="min-h-10 border border-[#390F0D]/25 px-3 py-2 font-[Inter,sans-serif] text-xs text-[#390F0D] transition-colors hover:border-[#390F0D] hover:bg-[#390F0D] hover:text-[#F5EDE0]">
                  {question.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <button type="button" onClick={() => setOpen(previous => !previous)} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#CFB08B] bg-[#390F0D] px-5 font-[Inter,sans-serif] text-xs uppercase tracking-[0.14em] text-[#F5EDE0] shadow-[0_10px_30px_rgba(57,15,13,0.18)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#CFB08B]" aria-expanded={open} aria-controls="grubhub-chat-panel">
        <span className="h-2 w-2 rounded-full bg-[#CFB08B]" aria-hidden="true" />
        {open ? 'Close assistant' : 'Ask us'}
      </button>
    </div>
  )
}
