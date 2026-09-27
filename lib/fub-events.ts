const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events'
const SITE_ID = 'sunstonewoodsidehomes.com'

export type FubEventType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration'

export type FubPerson = {
  firstName: string
  lastName: string
  email?: string
  phone?: string
  formName: string
}

export type FubEventPayload = {
  type: FubEventType
  message: string
  description: string
  sourceUrl: string
  person: FubPerson
}

export function splitFullName(fullName: string): {
  firstName: string
  lastName: string
} {
  const trimmed = fullName.trim()
  const spaceIndex = trimmed.indexOf(' ')
  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: '' }
  }
  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  }
}

export function buildFubEventBody(payload: FubEventPayload) {
  const emails = payload.person.email
    ? [{ value: payload.person.email.trim() }]
    : []
  const phones = payload.person.phone
    ? [{ value: payload.person.phone.trim() }]
    : []

  return {
    source: SITE_ID,
    system: SITE_ID,
    type: payload.type,
    message: payload.message,
    description: payload.description,
    sourceUrl: payload.sourceUrl,
    person: {
      firstName: payload.person.firstName || 'Visitor',
      lastName: payload.person.lastName ?? '',
      emails,
      phones,
      tags: [SITE_ID, payload.person.formName],
    },
  }
}

export async function submitFollowUpBossEvent(
  payload: FubEventPayload,
): Promise<{ ok: true } | { ok: false; status: number }> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY
  if (!apiKey) {
    console.error(
      'FOLLOW_UP_BOSS_API_KEY is not configured for sunstonewoodsidehomes.com',
    )
    return { ok: false, status: 503 }
  }

  const authorization =
    'Basic ' + Buffer.from(`${apiKey}:`).toString('base64')

  try {
    const response = await fetch(FUB_EVENTS_URL, {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        'X-System': SITE_ID,
      },
      body: JSON.stringify(buildFubEventBody(payload)),
    })

    if (!response.ok) {
      console.error(
        `Follow Up Boss event rejected with status ${response.status}`,
      )
      return { ok: false, status: 502 }
    }

    return { ok: true }
  } catch {
    console.error('Follow Up Boss event request failed')
    return { ok: false, status: 502 }
  }
}
