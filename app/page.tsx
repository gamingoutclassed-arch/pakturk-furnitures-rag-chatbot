'use client'

import { FormEvent, useMemo, useState } from 'react'
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone, Send, Sparkles, Store, X } from 'lucide-react'

const suggestedQuestions = [
  'What type of furniture do you sell?',
  'Where are your showrooms?',
  'What are your opening hours?',
  'Can I customize furniture?',
  'Do you deliver across Pakistan?',
  'What is your return policy?',
  'What is your warranty?',
  'Do you have antique furniture?',
]

type Message = { role: 'user' | 'assistant'; content: string }

const welcomeMessage: Message = {
  role: 'assistant',
  content: 'Welcome to PakTurk Furnitures. How can I help you today?',
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const hasConversation = messages.length > 1
  const visibleSuggestions = useMemo(() => hasConversation ? suggestedQuestions.slice(0, 4) : suggestedQuestions, [hasConversation])

  async function askQuestion(question: string) {
    const trimmed = question.trim()
    if (!trimmed || isLoading) return
    setInput('')
    setError('')
    setMessages((current) => [...current, { role: 'user', content: trimmed }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setMessages((current) => [...current, { role: 'assistant', content: data.answer }])
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to reach the assistant.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void askQuestion(input)
  }

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#261f1a]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="relative hidden w-[42%] overflow-hidden bg-[#2d241e] px-12 py-10 text-[#f7f3ee] lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,#b9824b_48%,transparent_49%),linear-gradient(15deg,transparent_0%,#8b5e38_48%,transparent_49%)] [background-size:90px_90px,140px_140px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full border border-[#cda77c]/60 bg-[#8b5e38] text-lg font-semibold">P</div>
              <div>
                <p className="font-serif text-lg tracking-wide">PakTurk</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#cda77c]">Furnitures</p>
              </div>
            </div>
            <div className="mt-24 max-w-md">
              <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#cda77c]"><Sparkles className="size-3" /> Crafted for living</p>
              <h1 className="font-serif text-5xl leading-[1.05] xl:text-6xl">Furniture with a story worth keeping.</h1>
              <p className="mt-7 max-w-sm text-sm leading-7 text-[#d8c9bb]">Discover handmade solid-wood pieces, shaped by skilled hands and inspired by Turkish, Pakistani, and Central Asian craft traditions.</p>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-5 border-t border-white/15 pt-6 text-xs text-[#d8c9bb]">
            <div><p className="mb-1 font-serif text-lg text-[#f7f3ee]">100%</p><p>Solid wood furniture</p></div>
            <div><p className="mb-1 font-serif text-lg text-[#f7f3ee]">2</p><p>Islamabad showrooms</p></div>
          </div>
        </aside>

        <section className="flex min-h-screen flex-1 flex-col bg-[#fbfaf8]">
          <header className="flex items-center justify-between border-b border-[#e8e0d7] px-5 py-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#8b5e38] font-semibold text-white">P</div>
              <div><p className="font-serif text-lg">PakTurk</p><p className="text-[9px] uppercase tracking-[0.26em] text-[#8b5e38]">Furnitures</p></div>
            </div>
            <div className="hidden lg:block"><p className="text-xs uppercase tracking-[0.25em] text-[#8b5e38]">Customer care</p><h2 className="mt-1 font-serif text-2xl">Ask PakTurk</h2></div>
            <button onClick={() => setShowDetails((value) => !value)} className="flex items-center gap-2 rounded-full border border-[#ddd2c7] px-3 py-2 text-xs text-[#6f6259] transition hover:bg-[#f1e9e0]" aria-expanded={showDetails}><span className="size-2 rounded-full bg-[#67916b]" /> Online now <ArrowUpRight className="size-3.5" /></button>
          </header>

          {showDetails && <div className="border-b border-[#e8e0d7] bg-[#f7f1ea] px-5 py-4 text-xs text-[#6f6259] sm:px-8 lg:px-12"><div className="flex flex-wrap gap-x-6 gap-y-2"><span className="flex items-center gap-2"><MapPin className="size-3.5 text-[#8b5e38]" /> PWD & F-8/3, Islamabad</span><span className="flex items-center gap-2"><Clock3 className="size-3.5 text-[#8b5e38]" /> Daily, 10:00 AM–9:00 PM</span><span className="flex items-center gap-2"><Mail className="size-3.5 text-[#8b5e38]" /> info@pakturkfurnitures.com</span></div></div>}

          <div className="flex flex-1 flex-col px-5 pb-5 pt-8 sm:px-8 lg:px-16 lg:pt-12">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              <div className="mb-8 lg:hidden"><p className="text-xs uppercase tracking-[0.22em] text-[#8b5e38]">Customer care</p><h1 className="mt-2 font-serif text-3xl">How can we help?</h1></div>
              <div className="flex-1 overflow-y-auto pr-1" aria-live="polite">
                <div className="flex flex-col gap-5">
                  {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[75%] ${message.role === 'user' ? 'rounded-br-sm bg-[#8b5e38] text-white' : 'rounded-bl-sm border border-[#e8e0d7] bg-white text-[#40362f] shadow-[0_3px_14px_rgba(79,55,35,0.04)]'}`}>{message.content}</div></div>)}
                  {isLoading && <div className="flex justify-start"><div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-[#e8e0d7] bg-white px-5 py-4"><span className="size-1.5 animate-bounce rounded-full bg-[#b58a63] [animation-delay:-0.3s]" /><span className="size-1.5 animate-bounce rounded-full bg-[#b58a63] [animation-delay:-0.15s]" /><span className="size-1.5 animate-bounce rounded-full bg-[#b58a63]" /><span className="sr-only">Assistant is typing</span></div></div>}
                  {error && <div className="rounded-xl border border-[#d9a69d] bg-[#fdf0ed] px-4 py-3 text-sm text-[#8d4035]">{error}</div>}
                </div>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#9a8879]">{hasConversation ? 'Explore more' : 'Popular questions'}</p>
                <div className="flex flex-wrap gap-2">{visibleSuggestions.map((question) => <button key={question} onClick={() => void askQuestion(question)} disabled={isLoading} className="rounded-full border border-[#dfd4c9] bg-white px-3 py-2 text-left text-xs text-[#65574c] transition hover:border-[#b58a63] hover:bg-[#f8f1e9] disabled:cursor-not-allowed disabled:opacity-60">{question}</button>)}</div>
                <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2 rounded-2xl border border-[#d9cec3] bg-white p-2 shadow-[0_8px_24px_rgba(79,55,35,0.07)]"><label htmlFor="question" className="sr-only">Ask a question</label><input id="question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about our furniture..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-[#332921] outline-none placeholder:text-[#aa9b8e]" disabled={isLoading} /><button type="submit" disabled={isLoading || !input.trim()} className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#8b5e38] text-white transition hover:bg-[#704725] disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send question"><Send className="size-4" /></button></form>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#a39487]"><span>Answers are based on verified PakTurk information.</span><span className="flex items-center gap-1"><MessageCircle className="size-3" /> Need a person? <a href="https://wa.me/923091999199" target="_blank" rel="noreferrer" className="font-medium text-[#8b5e38] underline">WhatsApp us</a></span></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
