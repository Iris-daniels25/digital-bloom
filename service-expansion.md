# Digital Bloom service expansion

Implementation branch: `feature/service-expansion`. No deployment or push performed. `COMING_SOON_ENABLED` remains `true`.

## Pages and navigation

Added `/services` with three commercial service cards and a separate full-width Senior Digital Safety Academy feature. Each dedicated page has a hero, offerings, package pricing, FAQ, and email-based inquiry form:

- `/services/website-design-development`
- `/services/virtual-meeting-webinar-support`
- `/services/creator-streamer-support`
- `/services/senior-digital-safety-academy`

Navigation: Home, Services, Senior Digital Safety Academy, SkinSense, Beauty + AI Survey, Contact, and For Beauty Pros. Join the Community remains a separate CTA. Contact opens the service inquiry section rather than newsletter signup.

The homepage keeps its hero, imagery, survey, beauty-professional content, SkinSense, community signup, animations, and footer. Its existing service carousel now links to the three commercial services, followed by a distinct Academy feature. The Academy page features Stay Safe on Your Smartphone, the supplied tagline, STOP. VERIFY. PROTECT., proposed courses, and coming-soon messaging without invented class dates or active enrollment.

The original shop component and all product data and Payhip URLs remain in `src/App.jsx`. They are absent from public rendering. Old `/#shop` bookmarks resolve to Services. Other existing homepage hash links, SkinSense waitlist, and legal routes remain available in the full-site preview.

## Pricing implemented

All prices and package limits are defined in `src/pages/serviceData.js`.

| Offering | Prices |
| --- | --- |
| Template websites | Bloom Starter $249; Bloom Business $699; Bloom Growth $1,199 |
| Custom-coded websites | Custom Starter $499; Custom Business $1,299; Custom Growth $2,499+ |
| Website care and repairs | Health Check $49; Quick Website Fix $75+; Website Refresh $199+; Full Website Redesign $499+; Bloom Care $49/month |
| Website extras | Template pages from $100; custom pages from $200; booking integrations from $75; additional work from $35/hour when applicable |
| Live support | Meeting Essentials $65; Webinar Pro $125; Virtual Event Plus $249 |
| Recurring live support | Meeting Partner $229/month; Webinar Partner $449/month; Organization Partner $799+/month |
| Virtual administration | Admin On-Demand $40/hour, two-hour minimum; Admin Essentials $175/month; Admin Partner $325/month; Business Operations Partner $600/month |
| Combined operations | Bloom Virtual Operations $399/month |
| Event add-ons | Extra support $45/hour; extra 30-minute rehearsal $25; registration form $49; invitation/reminder setup $49; attendance report only $25; basic recording trimming from $45 |
| Stream moderation | Starter Mod $35; Dedicated Mod $85; Creator Partner $299/month |
| Creator extras | Additional moderation $30/hour; chatbot commands $35; moderation rules $35; link-in-bio webpage $99; portfolio website $249 |
| Academy | Individual 90-minute class $49/person; four-course series $149/person; private coaching $45/hour; group workshop up to ten participants $299; community organization workshop $399+ |

Website package page counts, revisions, estimated delivery windows, included baseline features, separate third-party costs, 50/50 build payment terms, and 30-day delivered-work bug fixes follow the supplied specification. Original archived product prices remain unchanged.

## Website Health Check promotion

The Website Design & Development card on `/services` links directly to `#website-health-check` on the website page. The full promotion appears immediately after custom-coded website pricing and before Repairs, Redesigns & Maintenance.

It includes the $49 audit scope, all supplied credit conditions, and the example: $699 website minus $49 audit credit leaves $650 to pay toward the project; including the audit, total paid is $699. The CTA opens the inquiry form with Website Health Check preselected. The form includes an optional existing website URL. No payment or confirmed booking is implied.

## Inquiry delivery and remaining configuration

Service inquiries are separate from community signup. Visitors select a category and package, enter contact details, optional phone and website URL, project details, and preferred contact method. The form prepares a `mailto:` draft addressed to `hello@thedigitalbloom.co`. The visitor must open and send it using an email application. Editing the form clears an outdated draft.

Nothing is posted by the inquiry form. There is no invented endpoint, payment collection, booking confirmation, or automatic interest-list subscription. If an email application is unavailable, visitors are instructed to email directly.

Remaining configuration:

- Connect and verify a service-inquiry backend if automatic website delivery is desired.
- Configure payment and booking services before adding checkout or confirmed-booking functionality.
- Set up an Academy interest-list system if automatic enrollment in that list is desired.
- Supply real course dates before publishing a schedule or active enrollment.
- Verify receipt in the existing Google Apps Script signup backend; automated browser checks use intercepted requests, not real subscriptions.
- The referenced visual mockup and additional previously defined package features were not supplied in the repository or conversation. The implementation uses the supplied structure, features, and existing project branding.

## Local full-site preview with Coming Soon enabled

1. From the project root, run `npm run dev -- --host 0.0.0.0`.
2. Open the local or forwarded URL printed by Vite, adding `/?preview=full`. For example: `http://localhost:5173/?preview=full`.
3. Browse service pages and existing pages in that same browser tab. A session-storage preference retains the preview across navigation and refreshes.
4. To restore the coming-soon view in that tab, open `/?preview=reset` on the same server. A fresh independent browser session also starts with Coming Soon.

This override works only with the Vite development server (`import.meta.env.DEV`). `npm run preview` serves the production build and continues to show Coming Soon; adding `?preview=full` cannot bypass the production launch setting. Use the port Vite actually prints if 5173 is occupied. No configuration flag edits are required.

In GitHub Codespaces, use the Ports panel to open the forwarded development port in your browser, then append `/?preview=full` to that URL. The current forwarded development port is 5174; port 5173 is not forwarded. A localhost link refers to the device where the browser is running and is not a portable preview link. Vite explicitly allows this Codespace's exact forwarded hostnames on ports 5173 and 5174, derived from the Codespaces environment variables. Other hostnames are not broadly allowed. Port 4173 serves the production preview and intentionally continues to show Coming Soon.

## Changed files

| File | Change |
| --- | --- |
| `src/App.jsx` | Navigation, service carousel, Academy feature, archived shop routing, page metadata, mobile focus handling, reduced-motion carousel behavior, and accurate signup acknowledgements |
| `src/App.css` | Earlier mobile-navigation breakpoint for readable expanded navigation; existing content breakpoints retained |
| `src/main.jsx` | Development-only full-site preview and route recovery import |
| `src/routeRecovery.js` | Recognized GitHub Pages route recovery with query/hash preservation, plus legacy shop bookmark handling |
| `public/404.html` | Allowlisted fallback for all five service paths and both legal routes |
| `vite.config.js` | Allow this Codespace's exact development-preview hostnames on ports 5173 and 5174 |
| `src/pages/serviceData.js` | Service descriptions, supplied package data and pricing, extras, inquiry links |
| `src/pages/ServicePages.jsx` | Overview, four service page bodies, promotion, FAQ, Academy feature, and email inquiry UI |
| `src/pages/Services.css` | Existing-theme service styling, responsive layouts, senior-friendly text, focus states, and reduced motion |
| `service-expansion.md` | This implementation report and preview instructions |

`website-audit.md` is the pre-existing untracked audit file and is preserved. Deployment workflow, dependencies, original assets, legal content, Coming Soon component, and launch setting are unchanged.

## Validation

Completed checks:

- `npm run lint` passed with no warnings.
- `npm run build` passed.
- `git diff --check` passed.
- Chromium exercised ten page/route views at seven widths (320, 390, 768, 820, 1024, 1280, and 1440 pixels): 70 checks with no horizontal document overflow, one main heading per view, and no visible archived shop or automation packages.
- Inspected desktop audit-promotion and mobile Services/Academy screenshots.
- Verified the overview promotion link, promotion placement between custom pricing and repairs, Health Check preselection, optional website URL validation, and email draft content. No inquiry email was sent.
- Verified the Academy interest CTA selects Interest list without claiming enrollment.
- Simulated GitHub Pages serving `public/404.html` for a direct service URL; verified route recovery, preserved package query and inquiry hash, refresh, and legal-route recovery.
- Verified the legacy Shop bookmark resolves to Services and its inquiry CTA works.
- Verified mobile menu initial focus, keyboard focus cycling, Escape close, and reduced-motion scrolling behavior.
- Intercepted all three existing signup forms (community, SkinSense, and pre-launch) to verify frontend submission behavior without real subscriptions. Also checked required-field validation and a simulated network failure with no false success acknowledgement.
- Confirmed no browser runtime errors in the completed regression run.
- Confirmed a production preview remains on Coming Soon at root and service paths even with `?preview=full`.
- Checked the Codespaces port list: development port 5174 is forwarded, while 5173 is not. Verified the external port-5174 URL in Chromium, clicked through GitHub's one-time Continue notice, and confirmed the full homepage and Services navigation render correctly.
- Compared original shop product data and all Payhip URLs against Git HEAD; they are unchanged. The launch-setting file also matches Git HEAD exactly.

Browser checks used temporary Playwright tooling; no project dependencies or lockfiles were changed. Backend receipt and actual email-client delivery were not tested. No production deployment is part of this work.
