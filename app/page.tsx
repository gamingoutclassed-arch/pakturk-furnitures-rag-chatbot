'use client'

import { FormEvent, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
} from 'lucide-react'

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
  const visibleSuggestions = useMemo(
    () => (hasConversation ? suggestedQuestions.slice(0, 4) : suggestedQuestions),
    [hasConversation]
  )

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
    <main className="min-h-screen bg-[#f4efe9] text-[#2b211b] selection:bg-[#d8b994] selection:text-[#2b211b]">
      <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#fbfaf8] lg:flex-row">
        <aside className="relative hidden w-[39%] overflow-hidden bg-[#2a211b] px-12 py-10 text-[#f8f1e9] lg:flex lg:flex-col lg:justify-between xl:px-20 xl:py-12">
          <div className="absolute -right-28 top-20 size-96 rounded-full border border-[#c69a6c]/20" />
          <div className="absolute -right-12 top-36 size-64 rounded-full border border-[#c69a6c]/15" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(120deg,transparent_0%,#b9824b_48%,transparent_49%),linear-gradient(15deg,transparent_0%,#8b5e38_48%,transparent_49%)] [background-size:90px_90px,140px_140px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full border border-[#d7b58f]/60 bg-[#8b5e38] font-serif text-xl shadow-lg shadow-black/20">P</div>
              <div>
                <p className="font-serif text-xl tracking-wide">PakTurk</p>
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#d2ac80]">Furnitures</p>
              </div>
            </div>

            <div className="mt-28 max-w-lg">
              <p className="mb-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#d2ac80]"><Sparkles className="size-3.5" /> Crafted for living</p>
              <h1 className="font-serif text-5xl leading-[1.04] xl:text-7xl">Furniture with a story worth keeping.</h1>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[#d7c6b5]">Discover handmade solid-wood pieces, shaped by skilled hands and inspired by Turkish, Pakistani, and Central Asian craft traditions.</p>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-7 text-xs text-[#cdbbaa]">
            <div className="flex items-baseline gap-2">
              <p className="font-serif text-2xl text-[#f8f1e9]">100%</p>
              <p>solid wood</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-serif text-2xl text-[#f8f1e9]">2</p>
              <p>Islamabad showrooms</p>
            </div>
          </div>
        </aside>

        <section className="flex min-h-screen flex-1 flex-col bg-[#fcfbf9]">
          <header className="flex items-center justify-between border-b border-[#ebe3da] px-5 py-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#8b5e38] font-serif text-lg text-white">P</div>
              <div>
                <p className="font-serif text-lg">PakTurk</p>
                <p className="text-[9px] uppercase tracking-[0.26em] text-[#8b5e38]">Furnitures</p>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#9a7555]">Customer care</p>
              <h2 className="mt-1 font-serif text-2xl text-[#33271f]">Ask PakTurk</h2>
            </div>

            <button
              onClick={() => setShowDetails((value) => !value)}
              className="group flex items-center gap-2 rounded-full border border-[#ded3c8] bg-white px-3.5 py-2 text-xs text-[#6f6259] shadow-sm transition hover:border-[#b58a63] hover:bg-[#faf4ee]"
              aria-expanded={showDetails}
            >
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7b9d78] opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-[#5f8b5e]" /></span>
              Online now
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </header>

          {showDetails && (
            <div className="border-b border-[#ebe3da] bg-[#f8f1e9] px-5 py-4 text-xs text-[#6f6259] sm:px-8 lg:px-12">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                <span className="flex items-center gap-2"><MapPin className="size-3.5 text-[#8b5e38]" /> PWD & F-8/3, Islamabad</span>
                <span className="flex items-center gap-2"><Clock3 className="size-3.5 text-[#8b5e38]" /> Daily, 10:00 AM–9:00 PM</span>
                <span className="flex items-center gap-2"><Mail className="size-3.5 text-[#8b5e38]" /> info@pakturkfurnitures.com</span>
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col px-5 pb-5 pt-8 sm:px-8 lg:px-16 lg:pt-12">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
              <div className="mb-8 lg:hidden">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#9a7555]">Customer care</p>
                <h1 className="mt-2 font-serif text-3xl text-[#33271f]">How can we help?</h1>
              </div>

              <div className="flex-1 overflow-y-auto pr-1" aria-live="polite">
                <div className="flex flex-col gap-6">
                  {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} className={`flex items-end gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.role === 'assistant' && (
                        <div className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#8b5e38] font-serif text-sm text-white shadow-sm">P</div>
                      )}
                      <div className={`max-w-[88%] whitespace-pre-wrap break-words rounded-[20px] px-5 py-4 text-[14px] leading-7 sm:max-w-[75%] ${message.role === 'user' ? 'rounded-br-md bg-[#8b5e38] text-white shadow-[0_6px_18px_rgba(139,94,56,0.18)]' : 'rounded-bl-md border border-[#e9e0d7] bg-white text-[#40362f] shadow-[0_5px_18px_rgba(79,55,35,0.05)]'}`}>
                        {message.content}
                      </div>
                      {message.role === 'user' && <div className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-[#dfd3c8] bg-[#f5eee7] text-[#8b5e38]"><UserRound className="size-4" /></div>}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-end gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#8b5e38] font-serif text-sm text-white">P</div>
                      <div className="flex items-center gap-1.5 rounded-[20px] rounded-bl-md border border-[#e9e0d7] bg-white px-5 py-4 shadow-sm">
                        <span className="size-1.5 animate-bounce rounded-full bg-[#b58a63] [animation-delay:-0.3s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-[#b58a63] [animation-delay:-0.15s]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-[#b58a63]" />
                        <span className="sr-only">Assistant is typing</span>
                      </div>
                    </div>
                  )}

                  {error && <div className="rounded-2xl border border-[#d9a69d] bg-[#fdf0ed] px-4 py-3 text-sm text-[#8d4035]">{error}</div>}
                </div>
              </div>

              <div className="mt-9">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a8879]">{hasConversation ? 'Explore more' : 'Popular questions'}</p>
                  <span className="hidden items-center gap-1 text-[10px] text-[#b0a197] sm:flex"><Check className="size-3 text-[#7b9d78]" /> Verified information</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {visibleSuggestions.map((question) => (
                    <button key={question} onClick={() => void askQuestion(question)} disabled={isLoading} className="rounded-full border border-[#dfd4c9] bg-white px-3.5 py-2 text-left text-xs text-[#65574c] shadow-sm transition hover:-translate-y-0.5 hover:border-[#b58a63] hover:bg-[#faf4ee] hover:text-[#704725] disabled:cursor-not-allowed disabled:opacity-60">
                      {question}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2 rounded-[20px] border border-[#d9cec3] bg-white p-2 shadow-[0_10px_28px_rgba(79,55,35,0.08)] transition-within:border-[#b58a63] focus-within:border-[#b58a63] focus-within:ring-4 focus-within:ring-[#b58a63]/10">
                  <label htmlFor="question" className="sr-only">Ask a question</label>
                  <input id="question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about our furniture..." className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[#332921] outline-none placeholder:text-[#aa9b8e]" disabled={isLoading} />
                  <button type="submit" disabled={isLoading || !input.trim()} className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#8b5e38] text-white shadow-sm transition hover:bg-[#704725] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send question"><Send className="size-4" /></button>
                </form>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#a39487]">
                  <span>Answers are based on verified PakTurk information.</span>
                  <span className="flex items-center gap-1"><MessageCircle className="size-3" /> Need a person? <a href="https://wa.me/923091999199" target="_blank" rel="noreferrer" className="font-medium text-[#8b5e38] underline decoration-[#cda77c] underline-offset-2">WhatsApp us</a></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
