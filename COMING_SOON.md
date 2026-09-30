# Temporary pre-launch page

The temporary page is active when `COMING_SOON_ENABLED` in `src/config/siteMode.js` is `true`.

To restore the completed website, change that one setting to `false`, then run the usual build. `src/main.jsx` renders the original App in its original StrictMode wrapper. No routes, files, assets, or content need to be reconstructed. There are no preview URLs or environment settings.

The standalone page lives in `src/pages/ComingSoon.jsx`; its CSS Module is isolated from the completed site. Existing global styles and the original App remain unchanged.

The waitlist uses the existing Google Apps Script community signup endpoint and payload schema, with source `Digital Bloom Pre-Launch`. Like the existing form, the endpoint uses `no-cors`, so the browser cannot inspect server acceptance. The acknowledgement therefore reports that the request was sent, rather than claiming a confirmed subscription. Verify receipt in the connected system before launch; no real signup was submitted during implementation.

The second CTA uses the existing `hello@thedigitalbloom.co` email, as confirmed by the user. Footer Instagram and Facebook links use the URLs supplied by the user. No discovery-booking URL exists in the repository.

Validation baseline: clean working tree; existing production build passed. Working-tree SHA-256 hashes of all 28 tracked files were recorded in `/private/tmp/digital-bloom-prelaunch-baseline.json` before editing. Only `src/main.jsx` is expected to differ.

Completed validation: production builds passed with the setting both true and false; lint passed. All 27 other tracked files matched their working-tree baseline hashes after implementation. The final setting is true. Browser rendering and live backend receipt were not tested in this session.
