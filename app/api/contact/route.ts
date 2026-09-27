import { NextRequest, NextResponse } from 'next/server'

import {
  splitFullName,
  submitFollowUpBossEvent,
  type FubEventType,
} from '@/lib/fub-events'

type LeadFormKey = 'concierge' | 'find-your-home'

type ContactBody = {
  form?: string
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  timeline?: string
  moveInDate?: string
  message?: string
  sourceUrl?: string
}

type LeadFormConfig = {
  formName: string
  description: string
  fubType: FubEventType
  buildMessage: (body: ContactBody) => string
}

const timelineLabels: Record<string, string> = {
  'next-60-days': 'Next 60 days',
  '3-6-months': '3–6 months',
  '6-12-months': '6–12 months',
  'research-phase': 'Just starting research',
}

const LEAD_FORMS: Record<LeadFormKey, LeadFormConfig> = {
  concierge: {
    formName: 'Concierge request form',
    description: 'Concierge request form — Contact',
    fubType: 'General Inquiry',
    buildMessage: buildConciergeMessage,
  },
  'find-your-home': {
    formName: 'Find Your Home form',
    description: 'Find Your Home form - homepage',
    fubType: 'Property Inquiry',
    buildMessage: buildFindYourHomeMessage,
  },
}

function validationError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function parseContactBody(raw: unknown): ContactBody | null {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return null
  }
  return raw as ContactBody
}

function resolveFormKey(raw: string | undefined): LeadFormKey {
  if (raw === 'find-your-home') {
    return 'find-your-home'
  }
  return 'concierge'
}

function resolvePerson(body: ContactBody): {
  firstName: string
  lastName: string
  email?: string
  phone?: string
} | null {
  const email =
    typeof body.email === 'string' && body.email.trim()
      ? body.email.trim()
      : undefined
  const phone =
    typeof body.phone === 'string' && body.phone.trim()
      ? body.phone.trim()
      : undefined

  const firstRaw =
    typeof body.firstName === 'string' ? body.firstName.trim() : ''
  const lastRaw =
    typeof body.lastName === 'string' ? body.lastName.trim() : ''

  if (firstRaw) {
    if (!email && !phone) {
      return null
    }
    return { firstName: firstRaw, lastName: lastRaw, email, phone }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name || (!email && !phone)) {
    return null
  }

  const { firstName, lastName } = splitFullName(name)
  return { firstName, lastName, email, phone }
}

function buildConciergeMessage(body: ContactBody): string {
  const parts: string[] = []
  const visitorMessage =
    typeof body.message === 'string' ? body.message.trim() : ''
  if (visitorMessage) {
    parts.push(visitorMessage)
  }

  const timeline =
    typeof body.timeline === 'string' ? body.timeline.trim() : ''
  if (timeline) {
    const label = timelineLabels[timeline] ?? timeline
    parts.push(`Preferred move-in timeframe: ${label}`)
  }

  return parts.join('\n\n') || 'Concierge contact request'
}

function buildFindYourHomeMessage(body: ContactBody): string {
  const moveIn =
    typeof body.moveInDate === 'string' ? body.moveInDate.trim() : ''
  if (moveIn) {
    return `Move-in timeline: ${moveIn}\n\nHome search request from Find Your Home form.`
  }
  return 'Home search request from Find Your Home form.'
}

export async function POST(request: NextRequest) {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return validationError('Invalid JSON body')
  }

  const body = parseContactBody(raw)
  if (!body) {
    return validationError('Invalid request body')
  }

  const person = resolvePerson(body)
  if (!person) {
    return validationError('Name and either email or phone are required')
  }

  const formKey = resolveFormKey(
    typeof body.form === 'string' ? body.form : undefined,
  )
  const formConfig = LEAD_FORMS[formKey]

  const referer = request.headers.get('referer') ?? ''
  const sourceUrl =
    (typeof body.sourceUrl === 'string' && body.sourceUrl.trim()) || referer

  const result = await submitFollowUpBossEvent({
    type: formConfig.fubType,
    message: formConfig.buildMessage(body),
    description: formConfig.description,
    sourceUrl,
    person: {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      phone: person.phone,
      formName: formConfig.formName,
    },
  })

  if (!result.ok) {
    const status = result.status === 503 ? 503 : 502
    return NextResponse.json(
      { error: 'Unable to submit your request at this time' },
      { status },
    )
  }

  return NextResponse.json({ success: true })
}
