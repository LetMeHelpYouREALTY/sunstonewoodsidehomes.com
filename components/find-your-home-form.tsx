'use client'

import { useState, type FormEvent } from 'react'

import { LeadFormAlerts } from '@/components/lead-form-alerts'
import { postLeadForm } from '@/lib/lead-form-client'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const successMessage =
  "Thank you — we'll help you find your Las Vegas home. Dr. Duffy's team will respond within one business day."

export function FindYourHomeForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      form: 'find-your-home',
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      moveInDate: String(formData.get('moveInDate') ?? '').trim(),
      sourceUrl:
        typeof window !== 'undefined' ? window.location.href : '/',
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">First Name *</span>
            <input
              name="firstName"
              type="text"
              required
              disabled={status === 'submitting'}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Last Name *</span>
            <input
              name="lastName"
              type="text"
              required
              disabled={status === 'submitting'}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Email *</span>
          <input
            name="email"
            type="email"
            required
            disabled={status === 'submitting'}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Phone Number *</span>
          <input
            name="phone"
            type="tel"
            required
            disabled={status === 'submitting'}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Move-In Timeline</span>
          <input
            name="moveInDate"
            type="text"
            placeholder="e.g., Spring 2026, Fall 2026"
            disabled={status === 'submitting'}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'SIGN UP'}
        </button>
      </form>
    </div>
  )
}
