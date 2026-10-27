import ServiceInquiry from '../components/ServiceInquiry'
import lotusImage from '../assets/lotusflowerdb.jpeg'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <div className="contact-container">
        <nav className="contact-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span>Contact</span></nav>
        <header className="contact-hero">
          <p className="contact-eyebrow">CONTACT DIGITAL BLOOM</p>
          <h1>Let's Grow<br />Something Together.</h1>
          <p>Tell us about your technology needs, your next project, or where you could use a little support. We’re here to help you explore a practical next step.</p>
          <img className="contact-lotus" src={lotusImage} alt="" width="600" height="600" />
        </header>
        <div className="contact-layout">
          <ServiceInquiry />
          <aside className="contact-connect" aria-labelledby="contact-connect-title">
            <h2 id="contact-connect-title">A conversation is a good place to start.</h2>
            <p>From your first website to a virtual event or everyday digital confidence, let’s talk about what would help you move forward.</p>
            <a className="contact-email" href="mailto:hello@thedigitalbloom.co">hello@thedigitalbloom.co <span aria-hidden="true">↗</span></a>
            <div className="contact-community">
              <h3>Stay in the loop.</h3>
              <p>Looking for news and resources? Join the community through our separate signup form.</p>
              <a href="/#community">Join the Community <span aria-hidden="true">→</span></a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
