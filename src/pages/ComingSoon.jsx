import { useEffect, useRef, useState } from 'react'
import styles from './ComingSoon.module.css'
import instagramImage from '../assets/Instagram_Glyph_Gradient.png'
import facebookImage from '../assets/Facebook_Logo_Primary.png'

// Matches the existing community integration without modifying the original App.
const SIGNUP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxKO5y6Y2-REKxyVwzBl93G5HQMDUmh58cRk7xj7oprcAUYWOh0aQQ8t7zWj9EDUdbA/exec'

export default function ComingSoon() {
  const [status, setStatus] = useState('idle')
  const submitting = useRef(false)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Coming Soon | Digital Bloom'
    return () => { document.title = previousTitle }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (submitting.current || form.elements.website.value) return
    submitting.current = true
    setStatus('sending')
    const data = new FormData(form)
    try {
      await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          formType: 'community',
          name: data.get('name'),
          email: data.get('email'),
          audienceType: data.get('audienceType'),
          source: 'Digital Bloom Pre-Launch',
          consent: 'Yes',
          website: '',
        }),
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className={styles.root}>
      <a className={styles.skip} href="#coming-soon-main">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#coming-soon-main" aria-label="Digital Bloom home">Digital<span>Bloom.</span></a>
      </header>

      <main id="coming-soon-main" className={styles.main}>
        <section className={styles.hero} aria-labelledby="coming-soon-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Practical technology. Thoughtful growth.</p>
            <h1 id="coming-soon-heading">Something new<br />is <span>blooming.</span></h1>
            <p className={styles.intro}>Practical technology for beauty professionals and small businesses. We’re building smarter ways to automate repetitive work, improve your digital presence, and help your business grow.</p>
          </div>
        </section>

        <section id="launch-waitlist" className={styles.waitlist} aria-labelledby="waitlist-heading">
          <div className={styles.waitlistCopy}>
            <p className={styles.eyebrow}>Stay in the loop</p>
            <h2 id="waitlist-heading">Be first to see<br />what’s next.</h2>
            <p>Join the Digital Bloom community for launch news, practical resources, and updates on what we’re building.</p>
            <span className={styles.small}>Thoughtful updates. Unsubscribe anytime.</span>
          </div>
          <div>
            <div role="status" aria-live="polite">
              {status === 'sent' && <div className={styles.success}><h3>Thank you for growing with us.</h3><p>Your signup request has been sent. We look forward to sharing what’s blooming.</p></div>}
            </div>
            {status !== 'sent' && <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === 'sending'}>
              <div className={styles.fields}>
                <label htmlFor="launch-name">Name<input id="launch-name" name="name" autoComplete="name" required maxLength={120} /></label>
                <label htmlFor="launch-email">Email address<input id="launch-email" name="email" type="email" autoComplete="email" required maxLength={254} /></label>
              </div>
              <label htmlFor="launch-audience">I’m a…<select id="launch-audience" name="audienceType" defaultValue="" required><option value="" disabled>Select one</option><option>Beauty Professional</option><option>Small Business Owner</option><option>Tech Professional</option><option>Other</option></select></label>
              <label className={styles.consent}><input type="checkbox" name="consentGiven" required /><span>I agree to receive emails from Digital Bloom about launch news, resources, programs, products, events, and technology updates.</span></label>
              <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {status === 'error' && <p className={styles.error} role="alert">Something went wrong. Please try again or email <a href="mailto:support@thedigitalbloom.co">support@thedigitalbloom.co</a>.</p>}
              <button className={styles.primary} type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Join the Waitlist'} <span aria-hidden="true">↗</span></button>
            </form>}
          </div>
        </section>
        <p className={styles.about}>Digital Bloom is a technology education and solutions company that helps beauty professionals and small businesses build digital confidence, simplify operations, and grow through practical technology.</p>
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Digital Bloom.</span>
        <div className={styles.socials}>
          <a href="https://www.instagram.com/thedigitalbloom.hq/" target="_blank" rel="noopener noreferrer" aria-label="Digital Bloom on Instagram"><img src={instagramImage} alt="" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
          <a href="https://www.facebook.com/profile.php?id=61594999706706" target="_blank" rel="noopener noreferrer" aria-label="Digital Bloom on Facebook"><img src={facebookImage} alt="" /><span className={styles.srOnly}> (opens in a new tab)</span></a>
        </div>
      </footer>
    </div>
  )
}
