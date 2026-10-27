# Digital Bloom

## Contact and service inquiries

The shared Contact/service inquiry form posts to Formspree. The public endpoint
`VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xjyywkkn` is provided in `.env.example`;
copy it to a local `.env` before starting development. The endpoint is also
explicitly set in the Pages build workflow. No secret or
production settings change is required. Restart Vite after changing an environment
value; Vite embeds this value at build time. Keep private credentials out of `VITE_*`.

To perform one real test after approval, run `npm run dev`, open
`http://localhost:5173/contact?preview=full`, and enter your own name/email plus a
message clearly marked “Development test — no service requested.” Optionally
select Phone and supply your own phone number to check that conditional field.
Click **Send Inquiry** once, wait for the confirmation, and verify the entry and
all submitted fields in the Formspree dashboard/notification inbox. A displayed
success confirms API acceptance, not inbox delivery. If a network error occurs,
check Formspree before retrying to avoid a duplicate after an ambiguous response.
To check package context, enter the form through a service/package inquiry link
in the same development preview. Do not submit any payment or booking.

The full preview works only with `npm run dev`, not `npm run preview`. Keep
`COMING_SOON_ENABLED = true`; no deployment is needed to test locally. Automated
tests mock inquiry requests and never send real inquiries. The full website audit
remains deferred.

Run `npm test` for the mocked Chromium tests. On a fresh machine, first run
`npm ci` and `npx playwright install chromium` (or `npx playwright install --with-deps chromium`
if browser system dependencies are missing).

Digital Bloom is a technology education and solutions company that helps beauty professionals and small businesses build digital confidence, simplify operations, and grow through practical technology.

This repository contains the public-facing Digital Bloom website, including the main landing page, Digital Bloom Shop, SkinSense waitlist experience, product and service integrations, and supporting legal pages.

## About Digital Bloom

Digital Bloom exists to make technology feel practical, approachable, and useful for real businesses.

The company focuses on helping beauty professionals and small businesses understand and use tools such as:

- Artificial intelligence
- Automation
- Digital business systems
- Cybersecurity and digital safety
- Online business tools
- Digital education
- Technology services and resources

Digital Bloom combines education, technology solutions, and digital products to help business owners make more confident technology decisions without unnecessary complexity.

## Current Website Features

The website currently includes:

- Responsive Digital Bloom landing page
- Dark editorial visual design
- Full-width cinematic hero section
- Responsive navigation
- “What We Do” service carousel
- Digital Confidence for Beauty Professionals section
- Beauty-business technology pain points
- SkinSense product showcase
- Dedicated SkinSense waitlist experience
- Digital Bloom Shop
- Product category filtering
- Payhip commerce integration
- Community signup interface
- Privacy Policy page
- Terms of Use page
- Custom Digital Bloom branding
- Responsive product cards
- Accessible form labels and focus states
- Reduced-motion support
- SEO and social metadata
- GitHub Pages deployment preparation
- Custom domain support

## Tech Stack

Digital Bloom is intentionally built with a lightweight technology stack that is easy to maintain and expand.

- React
- Vite
- JavaScript
- HTML5
- Custom CSS
- Git
- GitHub
- GitHub Pages

The project does not currently rely on Tailwind CSS, Bootstrap, Material UI, or other large UI frameworks.

## Design System

The Digital Bloom website uses a dark, editorial visual direction designed to combine technology, creativity, beauty, and entrepreneurship.

### Current visual direction

- Near-black and charcoal backgrounds
- White and off-white typography
- Vivid pink accent color
- Minimal border radius
- Editorial layouts
- Strong horizontal compositions
- Responsive carousel and product layouts
- High-contrast interface elements

The primary typography uses a clean modern sans-serif system.

Selected uses of the word **bloom** may use a script-style treatment as a brand accent.

## Brand Assets

The current Digital Bloom logo is located at:

```text
src/assets/digital-bloom-logo.png
```

The original transparent logo is used throughout the shared site navigation with its aspect ratio preserved and `object-fit: contain`. A restrained pale-pink translucent backing improves contrast against dark backgrounds without modifying or recoloring the source asset.

The Digital Bloom flower-mark favicon is located at:

```text
public/favicon.svg
```

The favicon is referenced by `index.html` and is included in production builds.
