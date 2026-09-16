import { placeholderLinks } from '../data/content'

function Footer() {
  return (
    <footer className="site-footer section" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <h2 id="contact-title">Stay Connected</h2>
        <p>Placeholder links are active and ready to be replaced when final URLs are available.</p>
      </div>

      <div className="link-grid" role="list">
        {placeholderLinks.map((link) => (
          <a className="btn btn-secondary" key={link.label} href={link.href} role="listitem">
            {link.label}
          </a>
        ))}
      </div>

      <div className="placeholder-targets" aria-hidden="true">
        <span id="placeholder-survey">Survey URL placeholder</span>
        <span id="placeholder-instagram">Instagram URL placeholder</span>
        <span id="placeholder-linkedin">LinkedIn URL placeholder</span>
        <span id="placeholder-email">Email signup URL placeholder</span>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Digital Bloom. All rights reserved.</p>
    </footer>
  )
}

export default Footer
