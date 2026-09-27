import { LEAD_FORM_ERROR_MESSAGE } from '@/lib/lead-form-client'

type LeadFormAlertsProps = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  successMessage: string
}

export function LeadFormAlerts({ status, successMessage }: LeadFormAlertsProps) {
  if (status === 'success') {
    return (
      <p
        className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
        role="status"
      >
        {successMessage}
      </p>
    )
  }

  if (status === 'error') {
    return (
      <p
        className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        role="alert"
      >
        {LEAD_FORM_ERROR_MESSAGE}
      </p>
    )
  }

  return null
}
