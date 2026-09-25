import { useEffect, useRef, useState } from 'react'
import './App.css'

const beautyAiSurveyUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe-Ii6gK3j3HmTPQMGPJdulPqDzzRxz7J7ktVuAgMYfuFDmBQ/viewform?usp=header'
import heroImage from './assets/digital-bloom-hero.png'
import skinsenseImage from './assets/skinsense-showcase.png'
import shopBackground from './assets/shop-background-orbits.png'
import checkupImage from './assets/the_beauty_pro_digital_checkup.png'
import consultationImage from './assets/Beauty_Business_Tech_Consult.png'
import websiteImage from './assets/One_Page_Website_Setup.png'
import logoImage from './assets/digital-bloom-logo.png'
import starterImage from './assets/starter.png'
import builtForYouImage from './assets/builtforyou.png'
import managedForYouImage from './assets/managedfor you.png'

const SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxKO5y6Y2-REKxyVwzBl93G5HQMDUmh58cRk7xj7oprcAUYWOh0aQQ8t7zWj9EDUdbA/exec'
const SIGNUP_ERROR = 'Something went wrong. Please try again or email support@thedigitalbloom.co.'
const legalPath = (pathname) => pathname === '/privacy' || pathname === '/terms' ? pathname.slice(1) : ''

const privacySections = [
  ['Information We Collect', ['Depending on how you interact with Digital Bloom, we may collect information such as:', ['Your name', 'Email address', 'Business type or professional role', 'Information you voluntarily provide through forms, surveys, waitlists, consultations, or booking notes', 'Purchase and order information', 'Information related to services you purchase from Digital Bloom', 'Basic technical information related to your use of the website, such as browser or device information, if analytics tools are used'], 'We only ask for information that is reasonably related to providing our services, resources, communications, and products.']],
  ['How We Use Your Information', ['Digital Bloom may use your information to:', ['Provide products, downloads, consultations, and other services you request', 'Manage the Digital Bloom community email list', 'Manage the SkinSense waitlist', 'Send product updates, educational resources, launch announcements, testing opportunities, and other communications you requested', 'Prepare for consultations and provide personalized follow-up resources', 'Process and manage purchases', 'Improve Digital Bloom products, programs, and website experiences', 'Respond to questions or support requests', 'Protect the security and integrity of our website and services'], 'We do not sell your personal information.']],
  ['Digital Bloom Community', ['If you join the Digital Bloom community, we may use the information you provide to send you educational resources, business technology information, product announcements, workshops, and Digital Bloom updates.', 'You may unsubscribe from marketing emails at any time using the unsubscribe link included in those communications.']],
  ['SkinSense Waitlist', ['The SkinSense waitlist is maintained separately from the general Digital Bloom community list.', 'If you join the SkinSense waitlist, your information may be used to send you:', ['Product development updates', 'Early-access opportunities', 'Product testing invitations', 'Launch announcements', 'SkinSense-related research or feedback opportunities'], 'Joining the SkinSense waitlist does not guarantee early access, testing participation, or future availability of the product.']],
  ['Purchases and Payments', ['Digital Bloom may use third-party platforms, including Payhip, to process purchases, payments, digital downloads, coaching products, and related transactions.', 'Digital Bloom does not directly collect or store your complete credit or debit card information.', "Payment information is handled by the applicable payment processor or ecommerce platform according to that provider's own privacy practices."]],
  ['Appointment Scheduling', ['Digital Bloom may use Calendly or another scheduling provider to manage consultations and appointments.', 'Information you provide while scheduling, including comments about your business or technology concerns, may be used to prepare for and provide your consultation.']],
  ['Third-Party Services', ['Digital Bloom may rely on third-party providers for services including:', ['Ecommerce and payment processing', 'Appointment scheduling', 'Email marketing', 'Website hosting', 'Analytics', 'Forms and surveys'], 'Those providers may process information according to their own privacy policies and terms.']],
  ['Cookies and Analytics', ['Digital Bloom may use cookies or similar technologies if analytics, embedded services, or other website tools are added.', 'These technologies may help us understand website usage, remember preferences, or improve website functionality.', 'If our use of cookies or analytics changes significantly, this Privacy Policy may be updated.']],
  ['Data Retention', ['We may keep personal information for as long as reasonably necessary to provide services, maintain business records, fulfill legal or financial obligations, and support the purposes described in this policy.']],
  ['Your Choices', ['You may:', ['Unsubscribe from marketing emails', 'Ask us to update inaccurate personal information', 'Request information about personal information you have provided to Digital Bloom', 'Request deletion of information where appropriate'], 'Certain transaction or business records may need to be retained for legal, financial, or administrative purposes.']],
  ['Security', ['Digital Bloom takes reasonable steps to protect information entrusted to us. However, no website, online service, or method of electronic storage can guarantee absolute security.']],
  ["Children's Privacy", ["Digital Bloom's business services, professional education, products, and consultations are not intentionally directed toward children.", 'We do not knowingly collect personal information from children through these services.']],
  ['Updates to This Policy', ['Digital Bloom may update this Privacy Policy as our products, services, technology, or legal obligations change.', 'The effective date at the top of this page will indicate when the policy was last updated.']],
  ['Contact', ['Questions about this Privacy Policy or your personal information may be sent to:', 'Digital Bloom', 'Email: support@thedigitalbloom.co']],
]

const termsSections = [
  ['About Digital Bloom', ['Digital Bloom is a technology education and solutions company that helps beauty professionals and small businesses build digital confidence, simplify operations, and grow through practical technology.', 'Digital Bloom may offer educational resources, digital products, consultations, technology services, workshops, business tools, and experimental technology products.']],
  ['Educational Information', ['Digital Bloom provides practical technology education and business resources.', 'Information provided through the website, guides, workshops, consultations, and other materials is intended for general educational and informational purposes.', 'Results will vary depending on your business, tools, implementation, decisions, and circumstances.', 'Digital Bloom does not guarantee specific business, financial, marketing, technology, or revenue results.']],
  ['SkinSense', ['SkinSense is an emerging Digital Bloom beauty-technology project.', 'SkinSense content, demonstrations, prototypes, personalized insights, or future product features are intended for educational and informational purposes and should not be treated as medical advice, diagnosis, or treatment.', 'SkinSense is not a substitute for care from a dermatologist, physician, or other qualified healthcare professional.', 'SkinSense features may change during development, testing, and future releases.', 'Participation in a waitlist, test, or early-access program does not guarantee continued access or commercial availability.']],
  ['Digital Products', ['Digital Bloom may sell or provide downloadable resources, worksheets, guides, templates, or other digital materials.', 'Unless otherwise stated, digital products are licensed for your personal or internal business use.', 'You may not reproduce, resell, distribute, sublicense, publish, or commercially redistribute Digital Bloom materials without written permission.']],
  ['Services and Consultations', ['Some Digital Bloom services include technology consultations, website services, coaching-style products, or other professional support.', 'The scope of each service will be described on the applicable product page, checkout page, or service agreement.', 'Customers are responsible for providing accurate information and cooperating reasonably so Digital Bloom can provide the purchased service.']],
  ['Beauty Business Tech Consultations', ['For scheduled technology consultations:', ['Please provide at least 24 hours\' notice if you need to cancel or reschedule.', 'Appointments canceled with less than 24 hours\' notice may be forfeited and may require a new booking.', 'If you are more than 15 minutes late, your session may need to be shortened or rescheduled.', 'If Digital Bloom must cancel, you will be offered a new appointment time or a refund for the affected session.']]],
  ['Purchases and Checkout', ['Digital Bloom may use third-party platforms such as Payhip and payment processors to manage purchases.', "By completing a purchase, you may also be agreeing to the applicable provider's terms and policies.", 'Prices, product availability, and service offerings may change.']],
  ['Refunds', ['Refund eligibility may vary depending on the product or service purchased.', 'Any product-specific or service-specific cancellation and refund terms shown on a product page, checkout page, booking page, or service agreement will apply to that purchase.', 'If you have a concern about a purchase, contact Digital Bloom at the email listed below.']],
  ['One-Page Website and Other Implementation Services', ['Website setup, automation, technology implementation, or similar services may require information, content, approvals, platform access, or other materials from the customer.', 'Project timelines may be affected if required information or approvals are delayed.', 'Additional work outside the originally described scope may require a separate agreement or additional payment.']],
  ['Intellectual Property', ['Digital Bloom branding, website content, written materials, graphics, educational resources, digital products, course materials, and original technology concepts are owned by Digital Bloom or used with permission.', 'You may not copy, reproduce, sell, republish, or commercially exploit Digital Bloom content without permission except where explicitly allowed.']],
  ['Acceptable Use', ['You agree not to:', ['Use the website for unlawful purposes', 'Attempt to interfere with website security or functionality', 'Misrepresent your identity when purchasing or booking services', 'Copy or redistribute protected Digital Bloom materials without permission', 'Attempt to gain unauthorized access to Digital Bloom systems or accounts']]],
  ['Third-Party Platforms and Links', ['Digital Bloom may link to or integrate with services operated by third parties, including Payhip, Calendly, email providers, social platforms, and other technology services.', 'Digital Bloom is not responsible for the availability, security, policies, or independent actions of third-party services.']],
  ['No Guarantee of Results', ['Technology recommendations and business strategies can have different outcomes depending on many factors outside Digital Bloom\'s control.', 'Digital Bloom does not guarantee increased revenue, customer growth, website traffic, automation savings, search rankings, or other specific outcomes.']],
  ['Availability and Changes', ['Digital Bloom may modify, suspend, discontinue, or update products, services, website features, pricing, educational programs, or experimental technology when reasonably necessary.']],
  ['Limitation of Liability', ['To the extent permitted by law, Digital Bloom is not responsible for indirect, incidental, special, or consequential losses arising from use of the website, educational materials, products, services, recommendations, or third-party platforms.', 'Nothing in these Terms is intended to exclude rights or protections that cannot legally be excluded.']],
  ['Changes to These Terms', ['Digital Bloom may update these Terms as the business, website, products, or services change.', 'The effective date at the top of this page will indicate the latest revision.']],
  ['Contact', ['Questions regarding these Terms may be sent to:', 'Digital Bloom', 'Email: support@thedigitalbloom.co']],
]

const navLinks = [
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#beauty', label: 'For Beauty Pros' },
  { href: beautyAiSurveyUrl, label: 'Beauty + AI Survey', external: true },
  { href: '#shop', label: 'Shop' },
  { href: '#skinsense-waitlist', label: 'SkinSense Waitlist' },
  { href: '#community', label: 'Contact' },
]

const services = [
  {
    title: 'Digital Education',
    description: 'Practical learning on AI, digital tools, cybersecurity, and workshops designed for real business needs.',
    accent: 'neutral',
  },
  {
    title: 'Business Technology Solutions',
    description: 'Simple automations for leads, follow-up, scheduling, communication, and day-to-day operations.',
    accent: 'dark',
  },
  {
    title: 'Digital Products & Tools',
    description: 'Actionable templates, guides, resources, and technology products you can use right away.',
    accent: 'white',
  },
]

const painPoints = [
  'I keep hearing about AI but don’t know where to start.',
  'I answer the same client questions repeatedly.',
  'I want clients to automatically follow up or rebook.',
  'There are too many apps and I don’t know what I need.',
]

const shopCategories = [
  'All',
  'Digital Downloads',
  'Courses & Workshops',
  'Business Tools',
  'Privacy & Security',
  'Services',
]

const shopProducts = [
  {
    name: 'The Beauty Pro Digital Checkup',
    description: 'A quick 24-point self-assessment designed to help beauty professionals identify their digital strengths, gaps, and next priorities.',
    category: 'Digital Downloads',
    type: 'Digital download',
    price: 'FREE',
    image: checkupImage,
    payhipUrl: 'https://payhip.com/b/6UvoW',
    cta: 'Get the Free Checkup',
    isLive: true,
    downloadType: 'digital-download',
  },
  {
    name: 'Beauty Business Tech Consultation',
    description: 'A focused 1-hour technology consultation for beauty professionals who want help choosing the right tools, simplifying workflows, or using AI, automation, and digital systems more effectively.',
    category: 'Services',
    type: 'Service',
    price: '$49',
    image: consultationImage,
    payhipUrl: 'https://payhip.com/order?link=reINm&pricing_plan=QyBbwoKOGD',
    cta: 'Book Your Consultation',
    isLive: true,
    downloadType: 'service',
  },
  {
    name: 'Beauty Pro One-Page Website',
    description: 'A professionally built one-page website designed to give beauty professionals a clean, credible place to showcase their business, services, and essential information online.',
    category: 'Services',
    type: 'Service',
    price: '$150',
    image: websiteImage,
    payhipUrl: 'https://payhip.com/b/glPD3',
    cta: 'Get Your Website',
    isLive: true,
    downloadType: 'service',
  },
  {
    name: 'Starter',
    description: 'A simple starting point for small businesses seeking help with their first automations.',
    category: 'Services',
    type: 'Service',
    price: '$197 setup · first month free, then $49/month',
    image: starterImage,
    payhipUrl: 'https://payhip.com/order?link=e91J3&pricing_plan=APzDPraVzE',
    cta: 'Pay $197 Setup',
    isAutomationService: true,
  },
  {
    name: 'Built for You',
    description: 'A business automation system set up for you, including a CRM, up to 10 automations, an AI receptionist or chat assistant, review and reactivation workflows, training, and 30 days of support. Required software is paid for separately by the client.',
    category: 'Services',
    type: 'Service',
    price: '$997 one-time',
    image: builtForYouImage,
    payhipUrl: 'https://payhip.com/order?link=cG2gM&pricing_plan=q3BoKDdEBE',
    cta: 'Pay $997',
    isLive: true,
    isAutomationService: true,
  },
  {
    name: 'Managed for You',
    description: 'Ongoing setup and management of your business automations, with a separate $497 one-time setup fee and recurring management at $497 per month.',
    category: 'Services',
    type: 'Service',
    price: '$497 setup · first month free, then $497/month',
    image: managedForYouImage,
    payhipUrl: 'https://payhip.com/order?link=GKToN&pricing_plan=q3BoKD03BE',
    cta: 'Pay $497 Setup',
    isAutomationService: true,
  },
  {
    name: 'Practical Technology Workshop',
    description: 'A placeholder workshop for building confidence with the tools your business actually needs.',
    category: 'Courses & Workshops',
    type: 'PLACEHOLDER · Workshop',
    price: 'TBD',
    badge: 'Coming Soon',
    image: null,
    payhipUrl: '',
    cta: 'View Product',
    isLive: false,
    isVisible: false,
    downloadType: 'course',
  },
  {
    name: 'Business Systems Starter Kit',
    description: 'A placeholder collection of templates for clearer operations, follow-up, and client communication.',
    category: 'Business Tools',
    type: 'PLACEHOLDER · Business resource',
    price: 'TBD',
    badge: 'New',
    image: null,
    payhipUrl: '',
    cta: 'View Product',
    isLive: false,
    isVisible: false,
    downloadType: 'digital-download',
  },
]

function ProductCard({ product }) {
  const checkoutUrl = product.payhipUrl

  return (
    <article className={`product-card${product.isAutomationService ? ' product-card-automation' : ''}`}>
      <div className="product-image">
        {product.image ? (
          checkoutUrl ? <a className="product-image-link" href={checkoutUrl} aria-label={`View ${product.name} on Payhip`}><img src={product.image} alt="" /></a> : <img src={product.image} alt="" />
        ) : <span>{product.isLive ? 'Digital Bloom download' : 'Product image'}<br />{product.isLive ? 'available now' : 'coming soon'}</span>}
        {product.badge ? <span className={`product-badge ${product.isLive ? 'is-live' : ''}`}>{product.badge}</span> : null}
      </div>
      <div className="product-card-copy">
        <p className="product-type">{product.type}</p>
        <h2>{checkoutUrl ? <a className="product-title-link" href={checkoutUrl}>{product.name}</a> : product.name}</h2>
        <p>{product.description}</p>
        <div className="product-card-footer">
          <strong>Price: {product.price}</strong>
          {product.cta && checkoutUrl ? <a className="text-link" href={checkoutUrl}>
            {product.cta} <span aria-hidden="true">→</span>
          </a> : null}
        </div>
      </div>
    </article>
  )
}

function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const visibleProducts = shopProducts
    .filter((product) => product.isVisible !== false)
    .filter((product) => activeCategory === 'All' || product.category === activeCategory)

  return (
    <main id="main-content" className="shop-page" style={{ '--shop-background': `url(${shopBackground})` }}>
      <section className="shop-hero">
        <h1>Shop Digital Bloom</h1>
        <p>Practical tools, resources, education and technology designed to help you work smarter and grow with confidence.</p>
      </section>

      <section className="shop-catalog" aria-labelledby="shop-catalog-heading">
        <div className="shop-intro">
          <h2 id="shop-catalog-heading">Resources for what you’re building.</h2>
          <p>Digital Bloom products may include digital education, templates, business technology resources, privacy and security tools, and services. The catalog is still being built, so availability will grow over time.</p>
        </div>
        <div className="shop-filters" role="group" aria-label="Filter shop products">
          {shopCategories.map((category) => (
            <button type="button" className={activeCategory === category ? 'is-active' : ''} onClick={() => setActiveCategory(category)} key={category}>
              {category}
            </button>
          ))}
        </div>
        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard product={product} key={product.name} />)}
          </div>
        ) : (
          <div className="shop-empty">
            <span aria-hidden="true">✦</span>
            <h2>New tools are blooming soon.</h2>
            <p>This category is still taking shape.</p>
            <a className="text-link" href="#community">Join the community for product drops and updates <span aria-hidden="true">→</span></a>
          </div>
        )}
      </section>
    </main>
  )
}

function SkinSenseWaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.elements.website.value) return
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData(form)
      const payload = new URLSearchParams({
        formType: 'skinsense',
        firstName: formData.get('firstName'),
        email: formData.get('email'),
        interest: formData.get('interest') || '',
        source: 'Digital Bloom Website',
        consent: 'Yes',
        website: formData.get('website') || '',
      })
      await fetch(SIGNUP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload })
      setIsSubmitted(true)
      form.reset()
    } catch {
      setSubmitError(SIGNUP_ERROR)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="main-content" className="skinsense-waitlist-page">
      <section className="skinsense-waitlist-hero" aria-labelledby="skinsense-waitlist-title">
        <div className="skinsense-waitlist-copy">
          <h1 id="skinsense-waitlist-title">Smarter skincare starts with better insight.</h1>
          <p className="skinsense-waitlist-supporting-copy">SkinSense is an upcoming Digital Bloom beauty-tech project exploring more accessible, personalized skincare insights through practical technology.</p>
          <div className="skinsense-waitlist-rule" aria-hidden="true" />
          <p className="skinsense-waitlist-intro">Join the SkinSense waitlist for product updates, early-access opportunities, testing invitations, and launch announcements.</p>

          {isSubmitted ? (
            <div className="skinsense-waitlist-success" role="status">
              <h2>You’re on the SkinSense waitlist.</h2>
              <p>We’ll keep you updated as SkinSense develops and let you know when early testing and access become available.</p>
            </div>
          ) : (
            <form className="skinsense-waitlist-form" onSubmit={handleSubmit}>
              <div className="skinsense-waitlist-fields">
                <div>
                  <label htmlFor="skinsense-first-name">First Name</label>
                  <input id="skinsense-first-name" name="firstName" type="text" autoComplete="given-name" required />
                </div>
                <div>
                  <label htmlFor="skinsense-email">Email</label>
                  <input id="skinsense-email" name="email" type="email" autoComplete="email" required />
                </div>
              </div>
              <div>
                <label htmlFor="skinsense-interest">What interests you? <span>(Optional)</span></label>
                <select id="skinsense-interest" name="interest" defaultValue="">
                  <option value="">Select an interest</option>
                  <option>Personalized skincare insights</option>
                  <option>Early access</option>
                  <option>Product testing</option>
                  <option>SkinSense updates</option>
                </select>
              </div>
              <label className="consent-checkbox">
                <input type="checkbox" name="consentGiven" required />
                <span>I agree to receive SkinSense updates, including product news, early-access opportunities, testing invitations, and launch announcements.</span>
              </label>
              <input className="honeypot" name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              {submitError ? <p className="skinsense-waitlist-error" role="alert">{submitError}</p> : null}
              <button className="button button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Join the SkinSense Waitlist'} <span aria-hidden="true">→</span>
              </button>
            </form>
          )}
        </div>
        <div className="skinsense-waitlist-visual">
          <img src={skinsenseImage} alt="SkinSense skincare technology product showcase" />
        </div>
      </section>
    </main>
  )
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Use'
  const sections = isPrivacy ? privacySections : termsSections

  return (
    <main id="main-content" className="legal-page">
      <article className="legal-content">
        <header className="legal-header">
          <p className="legal-kicker">Digital Bloom</p>
          <h1>{title}</h1>
          <p className="legal-effective-date">Effective date: September 16, 2026</p>
        </header>
        {isPrivacy ? (
          <p>Digital Bloom respects your privacy and aims to be transparent about how information is collected and used when you visit our website, join our community, sign up for the SkinSense waitlist, download resources, purchase products, or book services.</p>
        ) : (
          <>
            <p>These Terms govern your use of the Digital Bloom website, digital resources, products, consultations, programs, and other services.</p>
            <p>By using this website or purchasing a Digital Bloom product or service, you agree to these Terms.</p>
          </>
        )}
        {sections.map(([heading, content]) => (
          <section className="legal-section" key={heading}>
            <h2>{heading}</h2>
            {content.map((item, index) => Array.isArray(item) ? (
              <ul key={`${heading}-list-${index}`}>{item.map((listItem) => <li key={listItem}>{listItem}</li>)}</ul>
            ) : <p key={`${heading}-paragraph-${index}`}>{item}</p>)}
          </section>
        ))}
      </article>
    </main>
  )
}

function Slider({ items, label, renderItem, hideCounter = false }) {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setActiveIndex(Array.from(track.children).indexOf(entry.target))
        }
      })
    }, { root: track, threshold: [0.6] })
    Array.from(track.children).forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [items.length])

  const move = (direction) => {
    const nextIndex = Math.max(0, Math.min(items.length - 1, activeIndex + direction))
    trackRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
    setActiveIndex(nextIndex)
  }

  return (
    <div className="slider">
      <div className="slider-toolbar">
        {!hideCounter ? (
          <span className="slider-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        ) : <span aria-hidden="true" />}
        <div className="slider-controls">
          <button type="button" className="slider-arrow" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label={`Previous ${label}`}>←</button>
          <button type="button" className="slider-arrow" onClick={() => move(1)} disabled={activeIndex === items.length - 1} aria-label={`Next ${label}`}>→</button>
        </div>
      </div>
      <div className="slider-track" ref={trackRef} aria-label={label} role="region">
        {items.map((item, index) => renderItem(item, index))}
      </div>
      <div className="slider-progress" aria-hidden="true">
        {items.map((item, index) => <span className={index === activeIndex ? 'is-active' : ''} key={item.title} />)}
      </div>
    </div>
  )
}

function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()} data-animate>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {intro ? <p className="section-intro">{intro}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommunitySubmitted, setIsCommunitySubmitted] = useState(false)
  const [isCommunitySubmitting, setIsCommunitySubmitting] = useState(false)
  const [communitySubmitError, setCommunitySubmitError] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuToggleRef = useRef(null)
  const [legalPage, setLegalPage] = useState(() => legalPath(window.location.pathname) || legalPath(new URLSearchParams(window.location.search).get('route') || ''))
  const [isShop, setIsShop] = useState(() => window.location.hash === '#shop')
  const [isSkinSenseWaitlist, setIsSkinSenseWaitlist] = useState(() => window.location.hash === '#skinsense-waitlist')

  useEffect(() => {
    const onHashChange = () => {
      const shopRoute = window.location.hash === '#shop'
      const waitlistRoute = window.location.hash === '#skinsense-waitlist'
      setIsShop(shopRoute)
      setIsSkinSenseWaitlist(waitlistRoute)
      if (shopRoute || waitlistRoute) window.scrollTo(0, 0)
    }
    const onPathChange = () => setLegalPage(window.location.pathname === '/privacy' || window.location.pathname === '/terms' ? window.location.pathname.slice(1) : '')
    const onScroll = () => setIsScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPathChange)
    const pageTitle = legalPage === 'privacy' ? 'Privacy Policy | Digital Bloom' : legalPage === 'terms' ? 'Terms of Use | Digital Bloom' : 'Digital Bloom | Technology Education + Solutions'
    const pageDescription = legalPage === 'privacy'
      ? 'Read the Digital Bloom Privacy Policy.'
      : legalPage === 'terms'
        ? 'Read the Digital Bloom Terms of Use.'
        : 'Digital Bloom provides practical technology education and solutions for beauty professionals and small businesses.'
    document.title = pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription)
    const routedPath = new URLSearchParams(window.location.search).get('route')
    if (routedPath && legalPath(routedPath)) window.history.replaceState({}, '', `/${legalPath(routedPath)}`)
    window.addEventListener('scroll', onScroll, { passive: true })
    const animatedElements = document.querySelectorAll('[data-animate]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    animatedElements.forEach((element) => observer.observe(element))
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPathChange)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [isShop, isSkinSenseWaitlist, legalPage])

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        mobileMenuToggleRef.current?.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen])

  const homeLink = legalPage ? '/' : '#top'
  const sectionLink = (id) => legalPage ? `/#${id}` : `#${id}`
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const handleCommunitySubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.elements.website.value) return
    setCommunitySubmitError('')
    setIsCommunitySubmitting(true)
    try {
      const formData = new FormData(form)
      const payload = new URLSearchParams({
        formType: 'community',
        name: formData.get('name'),
        email: formData.get('email'),
        audienceType: formData.get('audienceType'),
        source: 'Digital Bloom Website',
        consent: 'Yes',
        website: formData.get('website') || '',
      })
      await fetch(SIGNUP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: payload })
      setIsCommunitySubmitted(true)
      form.reset()
    } catch {
      setCommunitySubmitError(SIGNUP_ERROR)
    } finally {
      setIsCommunitySubmitting(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav" aria-label="Primary">
          <a href={homeLink} className="wordmark" aria-label="Digital Bloom home"><img src={logoImage} alt="Digital Bloom" /></a>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const href = link.external ? link.href : sectionLink(link.href.slice(1))
              const isActive = !link.external && !legalPage && window.location.hash === link.href
              return <li key={link.href}><a className={isActive ? 'is-active' : ''} href={href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} aria-current={isActive ? 'page' : undefined}>{link.label}</a></li>
            })}
          </ul>
          <a className="button button-primary nav-cta" href={sectionLink('community')}>Join the Community <span aria-hidden="true">↗</span></a>
          <button
            ref={mobileMenuToggleRef}
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true">{isMobileMenuOpen ? '×' : '☰'}</span>
          </button>
        </nav>
        <div id="mobile-navigation" className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
          <ul>
            {navLinks.map((link) => {
              const href = link.external ? link.href : sectionLink(link.href.slice(1))
              const isActive = !link.external && !legalPage && window.location.hash === link.href
              return <li key={link.href}><a className={isActive ? 'is-active' : ''} href={href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} aria-current={isActive ? 'page' : undefined} tabIndex={isMobileMenuOpen ? 0 : -1} onClick={closeMobileMenu}>{link.label}</a></li>
            })}
          </ul>
          <a className="mobile-menu-cta" href={sectionLink('community')} tabIndex={isMobileMenuOpen ? 0 : -1} onClick={closeMobileMenu}>Join the Community <span aria-hidden="true">→</span></a>
        </div>
      </header>

      {legalPage ? <LegalPage type={legalPage} /> : isShop ? <ShopPage /> : isSkinSenseWaitlist ? <SkinSenseWaitlistPage /> : <main id="main-content">
        <section id="top" className="hero" data-animate>
          <img className="hero-media" src={heroImage} alt="" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Technology that helps your business <span className="bloom-word">bloom.</span></h1>
            <p className="hero-copy">Practical technology education and solutions for beauty professionals and small businesses.</p>
            <div className="button-row">
              <a className="button button-primary" href="#what-we-do">Explore Digital Bloom <span aria-hidden="true">↗</span></a>
              <a className="button button-light" href={beautyAiSurveyUrl} target="_blank" rel="noopener noreferrer">Take the Beauty + AI Survey</a>
            </div>
          </div>
        </section>

        <Section
          id="what-we-do"
          className="what-we-do-section"
          title="What We Do"
          intro="Digital Bloom is a technology education and solutions company that helps beauty professionals and small businesses build digital confidence, simplify operations, and grow through practical technology."
        >
          <Slider items={services} label="Digital Bloom services" hideCounter renderItem={(service, index) => (
            <article className={`service-slide service-${service.accent}`} key={service.title}>
              <span className="slide-number">0{index + 1}</span>
              <div className="service-art" aria-hidden="true"><span>{index === 0 ? '◌' : index === 1 ? '↗' : '✦'}</span></div>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          )} />
          <a className="button button-primary services-cta" href="#community">Explore Digital Bloom Services <span aria-hidden="true">→</span></a>
        </Section>

        <section id="beauty" className="editorial-feature" data-animate>
          <div className="feature-copy">
            <h2>Digital Confidence for Beauty Professionals</h2>
            <p>From hairstylists and estheticians to nail techs, barbers, makeup and lash artists, Digital Bloom is designed around the way you actually work.</p>
            <p className="feature-description">Our upcoming program focuses on practical systems, tools, and AI habits you can use immediately.</p>
            <a className="button button-light" href={beautyAiSurveyUrl} target="_blank" rel="noopener noreferrer">Help Shape the Program <span aria-hidden="true">↗</span></a>
          </div>
          <div className="pain-panel">
            <span className="panel-index">COMMON DIGITAL GROWING PAINS</span>
            <p className="panel-intro">You are not alone if any of these sound familiar:</p>
            <ul>{painPoints.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="panel-close">That’s where Digital Bloom comes in.</p>
          </div>
        </section>

        <section className="skinsense-section" data-animate>
          <div className="skinsense-visual">
            <img className="skinsense-image" src={skinsenseImage} alt="SkinSense product showcase" />
          </div>
          <div className="skinsense-copy">
            <h2>SkinSense</h2>
            <p className="skinsense-lead">Personalized skincare insights powered by practical technology.</p>
            <p>SkinSense is an upcoming Digital Bloom beauty-tech project exploring accessible personalized skincare insights.</p>
            <a className="text-link" href="#skinsense-waitlist">Join the SkinSense Waitlist <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <Section id="community" className="community" title="We’re growing something." intro="Join the Digital Bloom community for updates, resources, and early access to upcoming programs.">
          <div className="community-inner">
            <div className="community-promise"><span className="promise-mark">✦</span><p>Be the first to know what’s <span className="bloom-word">blooming.</span></p><small>Thoughtful resources and practical ideas, sent occasionally.</small></div>
            {isCommunitySubmitted ? (
              <div className="community-success" role="status">
                <h3>Welcome to the Digital Bloom community.</h3>
                <p>We’ll keep you updated with thoughtful resources, programs, products, events, and technology updates.</p>
              </div>
            ) : (
              <form id="contact" className="community-form" onSubmit={handleCommunitySubmit}>
                <label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" required />
                <label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="audience">I’m a...</label><select id="audience" name="audienceType" defaultValue="" required><option value="" disabled>Select one</option><option value="Beauty Professional">Beauty Professional</option><option value="Small Business Owner">Small Business Owner</option><option value="Tech Professional">Tech Professional</option><option value="Other">Other</option></select>
                <label className="consent-checkbox">
                  <input type="checkbox" name="consentGiven" required />
                  <span>I agree to receive emails from Digital Bloom about resources, programs, products, events, and technology updates.</span>
                </label>
                <input className="honeypot" name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" />
                {communitySubmitError ? <p className="community-error" role="alert">{communitySubmitError}</p> : null}
                <button className="button button-primary" type="submit" disabled={isCommunitySubmitting}>{isCommunitySubmitting ? 'Submitting…' : 'Grow With Us'} <span aria-hidden="true">↗</span></button>
                <p className="form-note">Thoughtful resources and practical ideas, sent occasionally.</p>
              </form>
            )}
          </div>
        </Section>
      </main>}

      <footer className="site-footer">
        <p>Digital Bloom | Technology Education • Business Solutions • Digital Tools</p>
        <p><a href="mailto:hello@thedigitalbloom.co">hello@thedigitalbloom.co</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
        <p>© 2026 Digital Bloom.</p>
      </footer>
    </>
  )
}

export default App
