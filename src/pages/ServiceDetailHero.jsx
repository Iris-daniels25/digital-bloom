import lotusImage from '../assets/lotusflowerdb.jpeg'
import seniorsImage from '../assets/seniors.jpg'
import { inquiryHref } from './serviceData'
import './ServiceDetails.css'

import { presentations } from './servicePresentation'

function BenefitIcon({ type }) {
  const paths = {
    screen: <><rect x="4" y="5" width="28" height="20" rx="2" /><path d="M2 31h32m-20-6v6m8-6v6" /></>,
    search: <><circle cx="15" cy="15" r="10" /><path d="m23 23 9 9m-17-22v10m-5-5h10" /></>,
    launch: <><path d="M20 6c5-3 10-3 10-3s0 5-3 10L15 25l-7-7L20 6ZM13 13H6l-3 9 6-2m14 3v7l-9 3 2-6M6 28l-3 5 5-3" /><circle cx="23" cy="10" r="2" /></>,
    people: <><circle cx="18" cy="10" r="5" /><path d="M9 31v-8a9 9 0 0 1 18 0v8M5 13a4 4 0 0 0 0 8m26-8a4 4 0 0 1 0 8M2 31v-5m32 5v-5" /></>,
    chat: <><path d="M5 5h26v20H17l-9 7v-7H5V5Z" /><path d="M11 12h14m-14 6h10" /></>,
    check: <><circle cx="18" cy="18" r="14" /><path d="m11 18 5 5 10-11" /></>,
    shield: <><path d="M18 3 31 8v10c0 8-13 15-13 15S5 26 5 18V8l13-5Z" /><path d="m12 17 4 5 9-10" /></>,
    heart: <path d="M18 31 5 18C-4 7 11-1 18 10 25-1 40 7 31 18L18 31Z" />,
  }
  return <svg viewBox="0 0 36 36" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}


export default function ServiceDetailHero({ service }) {
  const presentation = presentations[service.slug]
  const academy = presentation.theme === 'academy'
  return (
    <>
      <header className="service-hero detail-hero">
        <div className="detail-hero-copy">
          <p className="service-eyebrow">{service.title}</p>
          <h1>{presentation.headline}</h1>
          {presentation.tagline && <p className="detail-tagline">{presentation.tagline}</p>}
          <p className="service-lead">
            {academy ? 'Practical, friendly classes to help older adults navigate technology safely and confidently.' : service.intro}
          </p>
          <div className="button-row">
            <a className="button button-primary" href={inquiryHref(service.slug)}>
              {academy ? 'Request a Workshop' : 'Start a Service Inquiry'} <span aria-hidden="true">→</span>
            </a>
            <a className="detail-secondary-link" href="#service-packages">{academy ? 'Learning options & pricing' : 'Explore packages'} <span aria-hidden="true">↓</span></a>
            {academy && <a className="detail-secondary-link" href={inquiryHref(service.slug, 'Interest list')}>Join Interest List <span aria-hidden="true">→</span></a>}
          </div>
        </div>
        <div className="detail-hero-visual">
          <img
            src={academy ? seniorsImage : service.image}
            alt={academy ? 'Older adults and a friendly instructor learning together around a laptop' : service.imageAlt}
            width={academy ? 1440 : service.imageWidth}
            height={academy ? 810 : service.imageHeight}
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </header>
      <ul className="detail-benefits" aria-label={`${service.title} highlights`}>
        {presentation.benefits.map(([icon, title, description]) => (
          <li key={title}>
            <BenefitIcon type={icon} />
            <h2>{title}</h2>
            <p>{description}</p>
          </li>
        ))}
      </ul>
      <img className="detail-lotus" src={lotusImage} alt="" width="600" height="600" loading="lazy" />
    </>
  )
}
