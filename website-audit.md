# Digital Bloom Website Audit

Audit date: October 26, 2026

## Scope and verification

Inspected the React/Vite project, routing, navigation, homepage, service sections, styles, signup forms, and deployment configuration. This audit does not authorize implementation or deployment.

No project files were changed during the inspection. Lint passed. No forms were submitted. The live domain could not be retrieved through the browsing tool, so these findings describe the repository; live rendering and backend delivery remain unverified. No production build was run during this audit.

## Current structure and available pages

The project uses React 19, Vite, JavaScript, and custom CSS. Most completed-site components, navigation, service data, product listings, and forms live in `src/App.jsx`. Global styling lives in `src/index.css` and `src/App.css`.

**Coming-soon mode is currently enabled** through `COMING_SOON_ENABLED` in `src/config/siteMode.js`. In `src/main.jsx`, this setting renders `src/pages/ComingSoon.jsx` instead of the completed application, taking precedence over all completed-site routes.

| Page or experience | Address | Repository behavior |
| --- | --- | --- |
| Coming-soon page | `/` | Currently enabled |
| Completed homepage | `/` with coming-soon mode disabled | Built and retained |
| Digital Bloom Shop | `/#shop` | Separate rendered view in the completed application |
| SkinSense waitlist | `/#skinsense-waitlist` | Separate rendered view in the completed application |
| Privacy Policy | `/privacy` | Custom path handling in the completed application |
| Terms of Use | `/terms` | Custom path handling in the completed application |

The completed homepage contains:

- Cinematic hero with exploration CTA and external Beauty + AI Survey link.
- “What We Do” carousel covering Digital Education, Business Technology Solutions, and Digital Products & Tools.
- Beauty-professional feature and technology pain points.
- SkinSense showcase.
- Community signup section.
- Shared navigation and footer with email and legal links.

The shop includes category filters, expandable product details, Payhip links, and six visible offers: The Beauty Pro Digital Checkup, Beauty Business Tech Consultation, Beauty Pro One-Page Website, Starter, Built for You, and Managed for You. Two placeholder products are explicitly hidden.

The completed-site navigation includes What We Do, For Beauty Pros, Beauty + AI Survey, Shop, SkinSense Waitlist, Contact, and a Join the Community CTA.

## What should be preserved

Preserve the dark backgrounds, pink accents, typography, script “bloom” treatment, imagery, spacing, buttons, and existing responsive layouts.

Also preserve:

- Beauty-professional content and survey.
- SkinSense showcase and separate waitlist.
- Shop products, pricing, purchase links, filters, and expandable details.
- Existing automation offers and digital resources.
- Community signup, consent fields, honeypots, and error states.
- Legal pages, email links, metadata, and accessibility features.
- Coming-soon switch until a separate launch decision is approved.

The existing three service themes contain useful offerings. Introduce the four main categories while retaining existing education, automation, and digital-product content in supporting copy and the shop.

## Recommended introduction of the four categories

Reuse the existing “What We Do” section and carousel styling, expanding it to four cards with individual “Learn more” links. Keep `#what-we-do` working so existing links remain valid.

| Main category | Recommended scope |
| --- | --- |
| Website Design & Development | Template-based and custom-coded websites, repairs, redesigns, audits, and maintenance |
| Virtual Meeting & Webinar Support | Technical facilitation, webinar support, and virtual administrative assistance |
| Creator & Streamer Support | Live stream moderation for Facebook Live, TikTok LIVE, Instagram Live, YouTube Live, Twitch, and Kick. Exclude Discord. |
| Senior Digital Safety Academy | Lead with **Stay Safe on Your Smartphone** as the flagship workshop |

Use one “Services” entry in navigation, leading to the existing overview, rather than adding four long top-level labels. Each category can have a dedicated page using the existing header, footer, colors, and components.

Keep workshop pricing, schedules, registration details, and new service rates unspecified until supplied or approved. Do not change existing pricing.

## Routing assessment

The application supports multiple views, but dedicated service paths are not implemented yet. There is no routing library. The app manually reads hash values for Shop and SkinSense and recognizes only `/privacy` and `/terms` as page paths.

Recommended service URLs:

- `/services/website-design-development`
- `/services/virtual-meeting-webinar-support`
- `/services/creator-streamer-support`
- `/services/senior-digital-safety-academy`

These require extending route handling and the hosting fallback together. `public/404.html` recognizes only the two legal paths; direct visits or refreshes on new service paths would otherwise fail on GitHub Pages. Existing hash URLs should remain supported.

## Navigation, responsiveness, and form findings

### Navigation

- “Contact” leads to `#community`, which is a newsletter signup rather than a service inquiry form. The form has no message or service-interest field. A contact email link exists in the completed-site footer.
- Coming-soon visitors lack visible email and legal links. Its footer contains social links but not the completed site’s email, Privacy, or Terms links.
- Navigation active states can become stale because ordinary section hash changes do not reliably trigger a React render.
- The mobile menu includes Escape handling and scroll locking, but opening it does not move focus into it or contain keyboard focus.

### Responsiveness and motion

- Responsive foundations exist: the main site switches navigation at 800px and stacks major sections on smaller screens.
- Six navigation links plus a CTA may become crowded just above the mobile breakpoint; browser verification is needed.
- Long new service headings need checking, particularly with the carousel’s narrow heading width.
- Reduced-motion support is partial. Reveal animations are covered, but global smooth scrolling and explicitly smooth carousel movement remain enabled.

These are source-level findings, not confirmed visual failures. Desktop and mobile browser rendering were not tested during this audit.

### Signup and contact forms

- The coming-soon, community, and SkinSense signup forms send requests to a Google Apps Script endpoint using `no-cors`.
- The browser cannot inspect server acceptance. The full-site community and SkinSense forms claim successful enrollment after the request resolves, although delivery is unconfirmed.
- The coming-soon form uses the more accurate acknowledgement that the signup request has been sent.
- Existing forms include required fields, email validation, consent checkboxes, honeypots, submission states, and error handling.
- Backend receipt remains unverified; no real signup was submitted.
- A dedicated service inquiry method is needed for the expanded offerings. Keep inquiries distinct from marketing signup.

### Metadata

- Shop and SkinSense share generic metadata.
- New service pages need individual titles and descriptions.
- Social metadata is currently static.

## Deployment configuration

`vite.config.js` uses the React plugin and a root base path (`/`).

`.github/workflows/deploy.yml` installs dependencies with `npm ci`, builds with `npm run build`, uploads `dist`, and deploys to GitHub Pages. The workflow uses Node.js 22 and runs on pushes to `main` or manual dispatch.

`public/CNAME` configures `thedigitalbloom.co` as the custom domain. `public/404.html` provides the limited legal-route fallback described above.

**A future push to `main` can automatically trigger deployment.** Keep implementation on a separate branch and do not push changes to `main` or run deployment without approval.

## Recommended implementation plan

1. Record existing page, pricing, link, and visual baselines; work on a separate branch.
2. Extract shared page layout and route handling from `src/App.jsx` without changing appearance.
3. Add the four service routes and extend GitHub Pages fallback handling, preserving existing URLs.
4. Update “What We Do” to the four approved categories using its current styling while retaining existing offerings elsewhere.
5. Build the four service pages, featuring **Stay Safe on Your Smartphone** on the Academy page.
6. Connect each service CTA to an approved inquiry method; retain community signup separately.
7. Address navigation state, mobile keyboard behavior, signup acknowledgement wording, and page metadata.
8. Verify mobile and desktop layouts, direct URLs, refreshes, browser history, existing purchase links, and form states; run lint and a production build.
9. Present the changes for review. Keep coming-soon mode and deployment unchanged until explicitly approved.

## Approval boundary

Implementation remains paused pending user approval. Do not redesign the site, remove existing features, change pricing, disable coming-soon mode, or deploy as part of this audit.
