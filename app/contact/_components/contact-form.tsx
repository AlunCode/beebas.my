'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendContactMessage } from '@/app/actions/contact'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await sendContactMessage(formData)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-2xl mx-auto mb-4">✅</div>
        <p className="font-extrabold text-[#1C1C1C] text-lg mb-1">Message sent!</p>
        <p className="text-sm text-muted-foreground mb-5">We'll get back to you within 24 hours.</p>
        <button
          onClick={() => setSent(false)}
          className="text-sm font-semibold text-muted-foreground hover:text-[#1C1C1C] underline underline-offset-2 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
      <h2 className="font-extrabold text-[#1C1C1C] text-lg mb-6">Send a message</h2>

      <form action={handleSubmit} className="space-y-5">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your name</Label>
            <Input name="name" type="text" placeholder="Ahmad" required className="h-11 rounded-xl text-base" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email address</Label>
            <Input name="email" type="email" placeholder="you@example.com" required className="h-11 rounded-xl text-base" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Subject</Label>
          <Input name="subject" type="text" placeholder="Feature request / Bug / General question" required className="h-11 rounded-xl text-base" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Message</Label>
          <textarea
            name="body"
            rows={5}
            placeholder="Tell us what's on your mind..."
            required
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-base resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold text-base border-0 shadow-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </span>
          ) : 'Send message →'}
        </Button>
      </form>
    </div>
  )
}
