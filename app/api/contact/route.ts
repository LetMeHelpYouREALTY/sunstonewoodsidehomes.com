import { NextRequest, NextResponse } from 'next/server'

import { submitFollowUpBossEvent, splitFullName } from '@/lib/fub-events'

const FORM_NAME = 'Concierge request form'

type ContactBody = {
  name?: string
  email?: string
  phone?: string
  timeline?: string
  message?: string
  sourceUrl?: string
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

function hasRequiredContactFields(body: ContactBody): boolean {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  if (!name) {
    return false
  }
  return Boolean(email || phone)
}

const timelineLabels: Record<string, string> = {
  'next-60-days': 'Next 60 days',
  '3-6-months': '3–6 months',
  '6-12-months': '6–12 months',
  'research-phase': 'Just starting research',
}

function buildMessage(body: ContactBody): string {
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

  if (!hasRequiredContactFields(body)) {
    return validationError('Name and either email or phone are required')
  }

  const referer = request.headers.get('referer') ?? ''
  const sourceUrl =
    (typeof body.sourceUrl === 'string' && body.sourceUrl.trim()) || referer

  const name = body.name!.trim()
  const email = typeof body.email === 'string' ? body.email.trim() : undefined
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined
  const { firstName, lastName } = splitFullName(name)

  const result = await submitFollowUpBossEvent({
    type: 'General Inquiry',
    message: buildMessage(body),
    description: `${FORM_NAME} — Contact`,
    sourceUrl,
    person: {
      firstName,
      lastName,
      email,
      phone,
      formName: FORM_NAME,
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
