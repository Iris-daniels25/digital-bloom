import ServiceInquiry from '../components/ServiceInquiry'
import PackagePayment from '../components/PackagePayment'
import {
  creatorExtras,
  inquiryHref,
  meetingExtras,
  packages,
  serviceCatalog,
  websiteExtras,
} from './serviceData'
import './Services.css'
import lotusImage from '../assets/lotusflowerdb.jpeg'
import seniorsImage from '../assets/seniors.jpg'
import ServiceDetailHero from './ServiceDetailHero'
import { detailTheme } from './servicePresentation'

function ServiceImage({ service, eager = false }) {
  return (
    <div className="service-image-frame">
      <img
        src={service.image}
        alt={service.imageAlt}
        width={service.imageWidth}
        height={service.imageHeight}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}

export function AcademyFeature({ overview = false }) {
  return (
    <aside className={`academy-feature${overview ? ' academy-feature-banner' : ''}`}>
      <div className="academy-feature-copy">
      <p className="service-eyebrow">Senior Digital Safety Academy</p>
      <h2>{overview ? <>Stay Safe. Stay Connected.<br />Stay Confident.</> : 'Stay Safe on Your Smartphone'}</h2>
      {!overview && <p>Technology Made Simple. Safety Made Essential.</p>}
      <p>
        {overview ? 'Practical, friendly classes to help older adults navigate technology safely.' : 'Practical smartphone safety and everyday digital confidence, one clear step at a time.'}
      </p>
      <a
        className="button button-primary"
        href="/services/senior-digital-safety-academy"
      >
        Explore the Academy <span aria-hidden="true">→</span>
      </a>
      </div>
      {overview ? <img className="academy-banner-photo" src={seniorsImage} alt="Older adults learning together around a laptop with a friendly instructor" width="1440" height="810" loading="lazy" /> : <ServiceImage service={serviceCatalog[3]} />}
    </aside>
  )
}
export function ServiceCards() {
  return (
    <div className="service-grid">
      {serviceCatalog.slice(0, 3).map((service) => (
        <article className="service-panel" key={service.slug}>
          <ServiceImage service={service} />
          <h2>{service.title}</h2>
          <p>{[
            'Beautiful, functional websites, repairs, redesigns, and ongoing maintenance.',
            'Technical coordination, event assistance, and virtual administrative support.',
            'Live chat moderation and practical tools for content creators.',
          ][serviceCatalog.indexOf(service)]}</p>
          <a className="button button-primary" href={`/services/${service.slug}`}>
            Learn More <span aria-hidden="true">→</span>
          </a>

        </article>
      ))}
    </div>
  )
}
function PackageGroup({ title, items, category }) {
  return (
    <section className="service-block package-section" id={items === packages.website || items === packages.meetings || items === packages.creators || items === packages.academy ? 'service-packages' : undefined}>
      <h2>{title}</h2>
      <div className="package-grid">
        {items.map(([name, price, description]) => (
          <article className="package-card" key={name}>
            <h3>{name}</h3>
            <p className="package-price">{price}</p>
            <p>{description}</p>
            <PackagePayment category={category} name={name} price={price} />
            <a className="text-link package-inquiry-link" href={inquiryHref(category, name)} aria-label={price.includes('+') ? `Request a quote for ${name}` : undefined}>
              {price.includes('+') ? 'Request Quote' : `Ask about ${name}`} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
function List({ items }) {
  return (
    <ul className="service-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
function FAQ({ items }) {
  return (
    <section className="service-block">
      <h2>Frequently asked questions</h2>
      {items.map(([question, answer]) => (
        <details className="service-faq" key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  )
}
function HealthPromotion() {
  return (
    <section
      id="website-health-check"
      className="health-promotion service-block"
    >
      <p className="service-eyebrow">Website Health Check · $49 flat rate</p>
      <h2>Your $49 Could Go Toward Something Bigger.</h2>
      <p className="service-lead">
        Start with a Website Health Check. Apply the cost toward your next
        website project.
      </p>
      <List
        items={[
          '$49 flat-rate website audit',
          'Review of up to five existing website pages',
          'Broken links and contact form checks',
          'Mobile usability review',
          'Basic SEO and performance review',
          'Design and navigation recommendations',
          'Short written findings report',
        ]}
      />
      <p className="credit-explanation">
        Book a qualifying website service of $199 or more within 30 days of
        receiving your audit, and we'll credit your full $49 audit fee toward
        the project.
      </p>
      <div className="credit-example" aria-label="Audit credit example">
        <h3>Example: Bloom Business</h3>
        <dl>
          <div>
            <dt>Website package</dt>
            <dd>$699</dd>
          </div>
          <div>
            <dt>Audit credit</dt>
            <dd>−$49</dd>
          </div>
          <div>
            <dt>Remaining project cost</dt>
            <dd>$650</dd>
          </div>
          <div>
            <dt>Total paid including audit</dt>
            <dd>$699</dd>
          </div>
        </dl>
      </div>
      <h3>Audit credit terms</h3>
      <List
        items={[
          'Applies to website repairs, redesigns, and development projects priced at $199 or more.',
          'Customer must book within 30 days of receiving the audit report.',
          'One credit per customer or website project.',
          'Credit is nonrefundable, has no cash value, and cannot be combined with other promotions.',
          'Excludes domains, hosting, subscriptions, and third-party fees.',
          'The credit is applied once to the final project price. The audit payment is included in the example total, not charged again.',
        ]}
      />
      <a
        className="button button-primary"
        href={inquiryHref(serviceCatalog[0].slug, 'Website Health Check')}
      >
        Book My $49 Website Health Check <span aria-hidden="true">→</span>
      </a>
      <p className="service-note">
        Use Pay Now in the Website Health Check package card for Stripe checkout.
        An inquiry does not collect payment or confirm a booking.
      </p>
    </section>
  )
}
function Website() {
  const category = serviceCatalog[0].slug
  return (
    <>
      <section className="service-block">
        <h2>A website that fits your next step</h2>
        <p>
          Template-based builds start from an established layout adapted to your
          business. Custom-coded builds offer a tailored structure and
          implementation. Every website package includes mobile responsiveness,
          basic SEO, contact forms, and launch assistance. Form delivery and any
          integrations are agreed during scoping.
        </p>
        <p>
          Timelines are estimates and depend on agreed scope, content, and
          approvals. Complex integrations, hosting, domains, and third-party
          fees are separate.
        </p>
      </section>
      <PackageGroup
        title="Template-based websites"
        items={packages.website}
        category={category}
      />
      <PackageGroup
        title="Custom-coded websites"
        items={packages.custom}
        category={category}
      />
      <HealthPromotion />
      <PackageGroup
        title="Repairs, Redesigns & Maintenance"
        items={packages.repairs}
        category={category}
      />
      <section className="service-block">
        <h2>Extras & project terms</h2>
        <List items={websiteExtras} />
        <p>
          Website builds: 50% deposit and 50% before launch. Delivered-work bug
          fixes are included for 30 days; new features and changes outside the
          agreed scope are separate.
        </p>
      </section>
      <FAQ
        items={[
          [
            'Which website package should I choose?',
            'Start with the page count, revisions, and build approach you need. Send an inquiry so we can confirm the right scope before any commitment.',
          ],
          [
            'Does the Health Check include repairs?',
            'No. The $49 audit covers up to five existing pages and a short written findings report. Qualifying repairs, redesigns, or development projects of $199 or more booked within 30 days of receiving the report can receive the full $49 credit, subject to the terms above.',
          ],
          [
            'What does maintenance cover?',
            'Bloom Care includes monthly functionality checks and up to 30 minutes of minor content changes. Larger changes are scoped separately.',
          ],
        ]}
      />
    </>
  )
}
function Meetings() {
  const category = serviceCatalog[1].slug
  return (
    <>
      <section className="service-block">
        <h2>Calm, coordinated live support</h2>
        <p>
          Support can include participant admission, chat/Q&A moderation,
          speaker coordination, technical checks, polls, breakout assistance,
          recording support where authorized, and event reporting. Package scope
          and platform capabilities are confirmed before an event.
        </p>
      </section>
      <PackageGroup
        title="Live meeting & webinar packages"
        items={packages.meetings}
        category={category}
      />
      <section className="service-block">
        <h2>Virtual Administrative Support</h2>
        <p>
          Practical help with scheduling, invitations, agendas, follow-ups,
          document formatting, calendar coordination, and routine business
          communications.
        </p>
      </section>
      <PackageGroup
        title="Admin & virtual operations packages"
        items={packages.admin}
        category={category}
      />
      <section className="service-block">
        <h2>Event add-ons</h2>
        <List items={meetingExtras} />
      </section>
      <FAQ
        items={[
          [
            'Can you support my meeting platform?',
            'Tell us your platform, event format, and access requirements. We confirm permissions and test the needed capabilities before agreeing to support.',
          ],
          [
            'Will you record the event?',
            'Recording support is provided only where authorized and supported by the platform. Discuss participant permissions and your recording needs during scoping.',
          ],
          [
            'Is my requested date confirmed when I inquire?',
            'No. Dates, staffing, preparation, and scope must be agreed before a booking is confirmed.',
          ],
        ]}
      />
    </>
  )
}
function Creators() {
  return (
    <>
      <section className="service-block">
        <h2>A Stream Mod in your corner</h2>
        <p>
          Live Chat Moderator support for Facebook Live, TikTok LIVE, Instagram
          Live, YouTube Live, Twitch, and Kick, subject to permissions and
          tested capabilities.
        </p>
        <List
          items={[
            'Spam management and agreed rule enforcement',
            'Live chat monitoring and viewer questions',
            'Announcements and helpful reminders',
            'Community engagement aligned with your stream',
          ]}
        />
        <p>
          Moderation is scheduled and scoped in advance. We do not guarantee
          follower growth or around-the-clock coverage.
        </p>
      </section>
      <PackageGroup
        title="Stream moderation packages"
        items={packages.creators}
        category={serviceCatalog[2].slug}
      />
      <section className="service-block">
        <h2>Creator extras</h2>
        <List items={creatorExtras} />
      </section>
      <FAQ
        items={[
          [
            'Can you moderate on my platform?',
            'We support the listed platforms subject to moderator permissions and tested capabilities. Share your setup so we can check access before confirming the scope.',
          ],
          [
            'Can you use my chat rules and commands?',
            'Yes, share your rules, announcements, and escalation preferences. Chatbot command setup and moderation rules setup are available as listed extras, subject to platform capabilities.',
          ],
          [
            'Does a monthly package provide continuous coverage?',
            'No. Creator Partner includes up to 12 scheduled moderation hours per month. Requested stream times must be agreed in advance.',
          ],
        ]}
      />
    </>
  )
}
function Academy() {
  return (
    <>
      <section className="academy-framework service-block">
        <h2>STOP. VERIFY. PROTECT.</h2>
        <div className="package-grid">
          {[
            [
              'STOP.',
              'Pause before tapping a link, sharing information, or sending money.',
            ],
            ['VERIFY.', 'Check who is contacting you using a trusted source.'],
            [
              'PROTECT.',
              'Use safer settings and account habits, and ask for help when unsure.',
            ],
          ].map(([title, text]) => (
            <article className="package-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="service-block">
        <h2>Practical safety for everyday smartphone use</h2>
        <p>
          Stay Safe on Your Smartphone introduces smartphone safety, scams,
          phishing, AI-generated scams, passwords, privacy, and multifactor
          authentication through clear explanations and practical steps.
        </p>
        <h3>Four proposed courses · coming soon</h3>
        <ol className="service-list">
          <li>Smartphone Safety Essentials</li>
          <li>Scam & Fraud Awareness</li>
          <li>Passwords, Privacy & Online Accounts</li>
          <li>Everyday Digital Confidence</li>
        </ol>
        <p>
          Future course sessions are coming soon. No dates or active enrollment
          are currently published.
        </p>
      </section>
      <PackageGroup
        title="Learning options & pricing"
        items={packages.academy}
        category={serviceCatalog[3].slug}
      />
      <FAQ
        items={[
          [
            'Do I need to be confident with technology?',
            'No. The Academy is designed to make practical smartphone safety easier to understand, with readable materials and clear steps. Tell us any access needs when you inquire.',
          ],
          [
            'Can my organization request a workshop?',
            'Yes. Use Request a Workshop to discuss the group size, audience, accessibility needs, and proposed format. Dates and arrangements are confirmed separately.',
          ],
          [
            'Can I enroll now?',
            'No active enrollment or class schedule is published. Request a workshop or send an interest-list inquiry to hear more. An inquiry is not a confirmed place.',
          ],
        ]}
      />
    </>
  )
}
export default function ServicePages({ slug }) {
  const service = serviceCatalog.find((item) => item.slug === slug)
  const academy = service?.slug === serviceCatalog[3].slug
  return (
    <main
      id="main-content"
      className={`services-page${academy ? ' academy-page' : ''}${!service ? ' lotus-overview' : ` service-detail detail-${detailTheme(service.slug)}`}`}
    >
      <div className="services-container">
        {!service && <img className="overview-lotus" src={lotusImage} alt="" width="600" height="600" />}
        <nav className="service-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true"> / </span>
          {service ? (
            <>
              <a href="/services">Services</a>
              <span aria-hidden="true"> / </span>
              <span>{service.title}</span>
            </>
          ) : (
            <span>Services</span>
          )}
        </nav>
        {service ? <ServiceDetailHero service={service} /> : (
          <header className="service-hero">
            <div className="service-hero-copy">
              <p className="service-eyebrow">Our services</p>
              <h1>Practical support.<br />Real progress.</h1>
              <p className="service-lead">Choose the service area that fits your goals.</p>
            </div>
          </header>
        )}
        {!service ? (
          <>
            <ServiceCards />
            <AcademyFeature overview />
            <a className="health-highlight overview-health" href="/services/website-design-development#website-health-check">
              <strong>$49 Website Health Check</strong> — Get your audit fee credited toward a qualifying website project! <span aria-hidden="true">→</span>
            </a>
          </>
        ) : academy ? (
          <Academy />
        ) : slug === serviceCatalog[0].slug ? (
          <Website />
        ) : slug === serviceCatalog[1].slug ? (
          <Meetings />
        ) : (
          <Creators />
        )}
        <ServiceInquiry
          key={`${slug || 'overview'}-${window.location.search}`}
          service={service}
        />
      </div>
    </main>
  )
}
