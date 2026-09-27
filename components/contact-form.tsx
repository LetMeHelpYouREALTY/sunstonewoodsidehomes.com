'use client'

import { useState, type FormEvent } from 'react'

import { LeadFormAlerts } from '@/components/lead-form-alerts'
import { postLeadForm } from '@/lib/lead-form-client'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const successMessage =
  "Thank you — your concierge request was sent. Dr. Duffy's team will respond within one business day."

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      form: 'concierge',
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      timeline: String(formData.get('timeline') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
      sourceUrl:
        typeof window !== 'undefined' ? window.location.href : '/contact',
    }

    try {
      const ok = await postLeadForm(payload)
      if (ok) {
        setStatus('success')
        form.reset()
        return
      }
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="space-y-4">
      <LeadFormAlerts status={status} successMessage={successMessage} />
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 text-sm text-foreground"
      >
        <label className="flex flex-col gap-2">
          <span>Full name</span>
          <input
            name="name"
            type="text"
            placeholder="Alex Martinez"
            className="rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
            disabled={status === 'submitting'}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            required
            disabled={status === 'submitting'}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Phone</span>
          <input
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className="rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            disabled={status === 'submitting'}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span>Preferred move-in timeframe</span>
          <select
            name="timeline"
            className="rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            disabled={status === 'submitting'}
          >
            <option value="next-60-days">Next 60 days</option>
            <option value="3-6-months">3–6 months</option>
            <option value="6-12-months">6–12 months</option>
            <option value="research-phase">Just starting research</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span>How can we help?</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about the homes, floor plans, or financing guidance you need."
            className="rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            disabled={status === 'submitting'}
          />
        </label>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Send concierge request'}
        </button>
      </form>
    </div>
  )
}
