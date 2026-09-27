import { CONTACT_PHONE } from '@/lib/site'

export const LEAD_FORM_ERROR_MESSAGE = `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${CONTACT_PHONE}.`

export type LeadFormId = 'concierge' | 'find-your-home'

export async function postLeadForm(
  payload: Record<string, unknown>,
): Promise<boolean> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return response.ok
}
