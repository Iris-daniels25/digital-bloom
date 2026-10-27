import { useRef, useState } from 'react'
import { categoryPackages, serviceCatalog } from '../pages/serviceData'
import './ServiceInquiry.css'

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
  const [draft, setDraft] = useState('')
  const [showContext, setShowContext] = useState(Boolean(packageContext))
  const statusRef = useRef(null)

  function prepare(event) {
    event.preventDefault()
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
    setDraft('')
    if (Object.keys(nextErrors).length) {
      form.elements[Object.keys(nextErrors)[0]].focus()
      return
    }
    const serviceTitle = serviceOptions.find(([value]) => value === values.service)[1]
    const body = [
      'Digital Bloom service inquiry',
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Business/Organization: ${values.organization || 'Not provided'}`,
      `Service Interested In: ${serviceTitle}`,
      ...(showContext ? [`Package of interest: ${packageContext}`] : []),
      `Preferred Contact Method: ${values.contactMethod}`,
      ...(values.contactMethod === 'Phone' ? [`Phone: ${values.phone}`] : []),
      `Project Details: ${values.details}`,
    ].join('\n\n')
    try {
      setDraft(`mailto:hello@thedigitalbloom.co?subject=${encodeURIComponent(`Service inquiry: ${showContext ? packageContext : serviceTitle}`)}&body=${encodeURIComponent(body)}`)
      requestAnimationFrame(() => statusRef.current?.focus())
    } catch {
      setErrors({ form: 'We could not prepare your email draft. Please email hello@thedigitalbloom.co directly.' })
    }
  }
  function clearFeedback(event) {
    setDraft('')
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
      <p id="inquiry-instructions">This form prepares an email draft. Open it in your email app, review it, and send it yourself. Nothing is sent by this website.</p>
      <p className="inquiry-required-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
      {showContext && <p className="inquiry-package-context">Selected package: <strong>{packageContext}</strong></p>}
      <form className="inquiry-form" onSubmit={prepare} onChange={clearFeedback} noValidate aria-describedby="inquiry-instructions inquiry-privacy">
        {Object.keys(errors).length > 0 && <p className="inquiry-error-summary inquiry-full" role="alert">{errors.form || 'Please check the highlighted fields. Your inquiry has not been sent.'}</p>}
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
        <p className="inquiry-privacy inquiry-full" id="inquiry-privacy">Share only what we need to discuss your project. Please leave out passwords, payment information, and sensitive personal details. Preparing a draft does not sign you up for community updates. <a href="/privacy">Privacy Policy</a>.</p>
        <button className="button button-primary" type="submit">Prepare Email Draft <span aria-hidden="true">→</span></button>
        {draft && <div className="inquiry-draft inquiry-full" role="status" tabIndex={-1} ref={statusRef}>
          <h3>Your email draft is ready.</h3>
          <p>It has not been sent. The button below opens your email app, where you can review and send it. An inquiry does not confirm a booking or an interest-list subscription.</p>
          <a className="button button-primary" href={draft}>Open My Email App <span aria-hidden="true">↗</span></a>
          <p>If your email app does not open, email <a href="mailto:hello@thedigitalbloom.co">hello@thedigitalbloom.co</a> directly. This website cannot confirm email delivery.</p>
        </div>}
      </form>
    </section>
  )
}
