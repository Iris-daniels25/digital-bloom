import { useEffect } from 'react'
import './App.css'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#beauty', label: 'For Beauty Pros' },
  { href: '#contact', label: 'Contact' },
]

const processSteps = ['Learn', 'Simplify', 'Automate', 'Grow']

const services = [
  {
    title: 'Digital Education',
    description:
      'Practical learning on AI, digital tools, cybersecurity, and workshops, classes, and resources designed for real business needs.',
  },
  {
    title: 'Business Technology Solutions',
    description:
      'Simple automations for leads, follow-up, scheduling, communication, and day-to-day operations that save time and reduce overwhelm.',
  },
  {
    title: 'Digital Products & Tools',
    description:
      'Actionable templates, guides, resources, and technology products you can use right away to strengthen your digital foundation.',
  },
]

const painPoints = [
  'I keep hearing about AI but don’t know where to start.',
  'I answer the same client questions repeatedly.',
  'I want clients to automatically follow up or rebook.',
  'There are too many apps and I don’t know what I need.',
]

function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()} data-animate>
      <div className="section-copy">
        {title ? <h2>{title}</h2> : null}
        {intro ? <p className="section-intro">{intro}</p> : null}
      </div>
      {children}
    </section>
  )
}

function App() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-animate]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    animatedElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav" aria-label="Primary">
          <a href="#top" className="wordmark" aria-label="Digital Bloom home">
            Digital Bloom
          </a>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="button button-primary nav-cta" href="#community">
            Join the Community
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section id="top" className="hero section is-visible" data-animate>
          <p className="eyebrow">Technology education + solutions</p>
          <h1>Technology that helps your business bloom.</h1>
          <p className="hero-copy">
            Digital Bloom provides practical technology education and solutions for beauty professionals and small businesses ready to build digital confidence, simplify operations, and grow.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#about">
              Explore Digital Bloom
            </a>
            <a className="button button-secondary" href="https://example.com/beauty-ai-survey" target="_blank" rel="noreferrer">
              Take the Beauty + AI Survey
            </a>
          </div>
        </section>

        <Section
          id="about"
          title="Technology shouldn’t feel intimidating."
          intro="Navigating AI, automation, cybersecurity, and digital tools can feel overwhelming. Digital Bloom helps you move forward with clarity and support."
        >
          <ol className="step-list" aria-label="Digital Bloom process">
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Section>

        <Section id="what-we-do" title="What We Do">
          <div className="card-grid" role="list">
            {services.map((service) => (
              <article className="card" key={service.title} role="listitem">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="beauty"
          title="Built with beauty professionals in mind."
          intro="From hairstylists, estheticians, nail techs, barbers, makeup and lash artists to salon owners and independent professionals, Digital Bloom is designed for your real workflow."
        >
          <div className="feature-card">
            <h3>Digital Confidence for Beauty Professionals</h3>
            <p>
              Our upcoming program focuses on practical systems, tools, and AI habits you can use immediately.
            </p>
            <a className="button button-secondary" href="https://example.com/beauty-ai-survey" target="_blank" rel="noreferrer">
              Share your voice in the survey
            </a>
          </div>
        </Section>

        <Section
          id="pain-points"
          title="Common digital growing pains"
          intro="You are not alone if any of these sound familiar:"
        >
          <div className="card-grid pain-grid" role="list">
            {painPoints.map((item) => (
              <article className="card pain-card" key={item} role="listitem">
                <p>{item}</p>
              </article>
            ))}
          </div>
          <p className="closing-line">That’s where Digital Bloom comes in.</p>
        </Section>

        <Section id="founder" title="Meet the founder">
          <div className="founder-layout">
            <div className="photo-placeholder" role="img" aria-label="Placeholder for founder portrait">
              Founder photo placeholder
            </div>
            <div>
              <h3>Iris</h3>
              <p>
                Iris is a technologist, builder, and former beauty professional who created Digital Bloom to make technology practical, approachable, and aligned with everyday business growth.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="community"
          className="community"
          title="We’re growing something."
          intro="Join the Digital Bloom community for updates, resources, and early access to upcoming programs."
        >
          <form id="contact" className="community-form" action="#" method="post">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />

            <label htmlFor="audience">I’m a...</label>
            <select id="audience" name="audience" defaultValue="" required>
              <option value="" disabled>
                Select one
              </option>
              <option value="beauty-professional">Beauty Professional</option>
              <option value="small-business-owner">Small Business Owner</option>
              <option value="tech-professional">Tech Professional</option>
              <option value="other">Other</option>
            </select>

            <button className="button button-primary" type="submit">
              Grow With Us 🌱
            </button>
            <p className="form-note">Email integration placeholder — provider setup coming soon.</p>
          </form>
        </Section>
      </main>

      <footer className="site-footer">
        <p>Digital Bloom | Technology Education • Business Solutions • Digital Tools | Chicago, IL</p>
        <p>
          <a href="https://instagram.com/example" target="_blank" rel="noreferrer">
            Instagram
          </a>{' '}
          |{' '}
          <a href="mailto:hello@thedigitalbloom.co">Email</a> | <a href="/privacy">Privacy</a> |{' '}
          <a href="/terms">Terms</a>
        </p>
        <p>© 2026 Digital Bloom.</p>
      </footer>
    </>
  )
}

export default App
