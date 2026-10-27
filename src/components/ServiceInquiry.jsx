import { useRef, useState } from 'react'
import { categoryPackages, serviceCatalog } from '../pages/serviceData'
import './ServiceInquiry.css'
import { submitInquiry } from './submitInquiry.js'

const serviceOptions = [
  [serviceCatalog[0].slug, serviceCatalog[0].title],
  ['website-health-check', 'Website Health Check ($49)'],
  ...serviceCatalog.slice(1).map(({ slug, title }) => [slug, title]),
  ['general-inquiry', 'General Inquiry'],
]

export default function ServiceInquiry({ service: pageService }) {
  const params = new URLSearchParams(window.location.search)
  const requestedService = params.get('service') || pageService?.slug || 'general-inquiry'
  const requestedPackage = params.get('package') || ''
  const initialService = serviceOptions.some(([value]) => value === requestedService) ? requestedService : 'general-inquiry'
  const category = initialService === 'website-health-check' ? serviceCatalog[0].slug : initialService
  const index = serviceCatalog.findIndex(({ slug }) => slug === category)
  const packageContext = index >= 0 && (categoryPackages[index].some(([name]) => name === requestedPackage) || (index === 3 && requestedPackage === 'Interest list')) ? requestedPackage : ''
  const [selectedService, setSelectedService] = useState(packageContext === 'Website Health Check' ? 'website-health-check' : initialService)
  const [contactMethod, setContactMethod] = useState('Email')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const submittingRef = useRef(false)
  const [showContext, setShowContext] = useState(Boolean(packageContext))
  const statusRef = useRef(null)

  async function submit(event) {
    event.preventDefault()
    if (submittingRef.current || status === 'success') return
    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(Array.from(data, ([key, value]) => [key, String(value).trim()]))
    const nextErrors = {}
    if (!values.name) nextErrors.name = 'Enter your name.'
    if (!values.email || !form.elements.email.validity.valid) nextErrors.email = 'Enter a valid email address.'
    if (!serviceOptions.some(([value]) => value === values.service)) nextErrors.service = 'Choose a service.'
    if (!values.details) nextErrors.details = 'Tell us a little about what you need.'
    if (!['Email', 'Phone'].includes(values.contactMethod)) nextErrors.contactMethod = 'Choose how you would like us to contact you.'
    if (values.contactMethod === 'Phone' && (!values.phone || !/^[+\d\s().-]{7,50}$/.test(values.phone))) nextErrors.phone = 'Enter a phone number including your area or country code.'
    setErrors(nextErrors)
    setStatus('idle')
    if (Object.keys(nextErrors).length) {
      form.elements[Object.keys(nextErrors)[0]].focus()
      return
    }
    const serviceTitle = serviceOptions.find(([value]) => value === values.service)[1]
    data.set('serviceTitle', serviceTitle)
    data.set('message', values.details)
    if (showContext) data.set('package', packageContext)
    data.set('_subject', `Service inquiry: ${showContext ? packageContext : serviceTitle}`)
    submittingRef.current = true
    setStatus('submitting')
    try {
      await submitInquiry(data)
      setStatus('success')
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch (error) {
      setStatus('error')
      setErrors({ form: error.message })
      submittingRef.current = false
    }
  }

  function clearFeedback(event) {
    if (submittingRef.current || status === 'success') return
    setStatus('idle')
    const name = event.target.name
    setErrors(current => {
      const remaining = { ...current }
      delete remaining[name]
      delete remaining.form
      return remaining
    })
  }
  function feedback(name) {
    return errors[name] ? <span className="inquiry-error" id={`inquiry-${name}-error`}>{errors[name]}</span> : null
  }
  function errorProps(name) {
    return { 'aria-invalid': errors[name] ? 'true' : undefined, 'aria-describedby': errors[name] ? `inquiry-${name}-error` : undefined }
  }
  return (
    <section id="inquiry" className="service-block inquiry-section shared-inquiry" aria-labelledby="inquiry-title">
      <p className="inquiry-eyebrow">LET’S TALK</p>
      <h2 id="inquiry-title">Tell us what you have in mind.</h2>
      <p id="inquiry-instructions">Send us your inquiry and we’ll follow up using your preferred contact method.</p>
      <p className="inquiry-required-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
      {showContext && <p className="inquiry-package-context">Selected package: <strong>{packageContext}</strong></p>}
      <form className="inquiry-form" onSubmit={submit} aria-busy={status === 'submitting'} onChange={clearFeedback} noValidate aria-describedby="inquiry-instructions inquiry-privacy">
        {Object.keys(errors).length > 0 && <p className="inquiry-error-summary inquiry-full" role="alert">{errors.form || 'Please check the highlighted fields. Your inquiry has not been sent.'}</p>}
        <div hidden aria-hidden="true">
          <label htmlFor="inquiry-gotcha">Leave this field empty</label>
          <input id="inquiry-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="inquiry-name">Name <span aria-hidden="true">*</span>
          <input id="inquiry-name" name="name" autoComplete="name" required maxLength={120} {...errorProps('name')} />{feedback('name')}
        </label>
        <label htmlFor="inquiry-email">Email <span aria-hidden="true">*</span>
          <input id="inquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} {...errorProps('email')} />{feedback('email')}
        </label>
        <label className="inquiry-full" htmlFor="inquiry-organization">Business/Organization (optional)
          <input id="inquiry-organization" name="organization" autoComplete="organization" maxLength={200} />
        </label>
        <label className="inquiry-full" htmlFor="inquiry-service">Service Interested In <span aria-hidden="true">*</span>
          <select id="inquiry-service" name="service" required value={selectedService} onChange={event => { setSelectedService(event.target.value); setShowContext(false) }} {...errorProps('service')}>
            {serviceOptions.map(([value, title]) => <option key={value} value={value}>{title}</option>)}
          </select>{feedback('service')}
        </label>
        <label className="inquiry-full" htmlFor="inquiry-details">Project Details <span aria-hidden="true">*</span>
          <textarea id="inquiry-details" name="details" required rows={6} maxLength={1800} {...errorProps('details')} />{feedback('details')}
        </label>
        <label htmlFor="inquiry-contactMethod">Preferred Contact Method <span aria-hidden="true">*</span>
          <select id="inquiry-contactMethod" name="contactMethod" required value={contactMethod} onChange={event => setContactMethod(event.target.value)} {...errorProps('contactMethod')}>
            <option>Email</option><option>Phone</option>
          </select>{feedback('contactMethod')}
        </label>
        {contactMethod === 'Phone' && <label htmlFor="inquiry-phone">Phone number <span aria-hidden="true">*</span>
          <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" required maxLength={50} {...errorProps('phone')} />{feedback('phone')}
        </label>}
        <p className="inquiry-privacy inquiry-full" id="inquiry-privacy">Share only what we need to discuss your project. Please leave out passwords, payment information, and sensitive personal details. Submitting an inquiry does not sign you up for community updates. <a href="/privacy">Privacy Policy</a>.</p>
        <button className="button button-primary" type="submit" disabled={status === 'submitting' || status === 'success'}>{status === 'submitting' ? 'Sending…' : status === 'success' ? 'Inquiry Sent' : 'Send Inquiry'} <span aria-hidden="true">→</span></button>
        <div className="inquiry-full" role="status" aria-live="polite">
          {status === 'submitting' && <p>Sending your inquiry…</p>}
          {status === 'success' && <div className="inquiry-draft" tabIndex={-1} ref={statusRef}>
            <h3>Thank you! Your inquiry has been sent.</h3>
            <p>We’ll follow up using your preferred contact method. An inquiry does not confirm a booking or an interest-list subscription.</p>
          </div>}
        </div>
      </form>
    </section>
  )
}
