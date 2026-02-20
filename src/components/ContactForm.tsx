import { useState, type FormEvent } from 'react'

interface FormData {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly message: string
  readonly requestAudit: boolean
}

interface FormErrors {
  readonly name?: string
  readonly email?: string
  readonly message?: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  requestAudit: true,
}

function validateForm(data: FormData): FormErrors {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required'
  }

  return errors
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const { [field as keyof FormErrors]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstErrorField = Object.keys(validationErrors)[0]
      const element = document.getElementById(`contact-${firstErrorField}`)
      element?.focus()
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-8" role="status">
        <p className="font-heading text-h2 font-bold text-accent-blue">
          Thank you for reaching out
        </p>
        <p className="mt-4 font-body text-lead text-text-body">
          We have received your message and will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className="block font-body text-sm font-semibold text-text-dark">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            value={formData.name}
            onChange={e => updateField('name', e.target.value)}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 font-body text-sm text-text-dark transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 font-body text-sm text-danger" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block font-body text-sm font-semibold text-text-dark">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 font-body text-sm text-text-dark transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 font-body text-sm text-danger" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="block font-body text-sm font-semibold text-text-dark">
            Phone <span className="font-normal text-text-body/60">(optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={e => updateField('phone', e.target.value)}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 font-body text-sm text-text-dark transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block font-body text-sm font-semibold text-text-dark">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={formData.message}
            onChange={e => updateField('message', e.target.value)}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className="mt-1 block w-full rounded-lg border border-border px-4 py-2.5 font-body text-sm text-text-dark transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1 font-body text-sm text-danger" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            id="contact-audit"
            type="checkbox"
            checked={formData.requestAudit}
            onChange={e => updateField('requestAudit', e.target.checked)}
            className="h-4 w-4 rounded border-border text-accent-blue focus:ring-accent-blue/20"
          />
          <label htmlFor="contact-audit" className="font-body text-sm text-text-body">
            Request a free mini audit of my website &amp; social media
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-accent-blue px-6 py-3 font-body text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
        >
          Send Message
        </button>
      </div>
    </form>
  )
}
