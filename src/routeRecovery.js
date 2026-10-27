import { serviceCatalog } from './pages/serviceData'

// GitHub Pages cannot rewrite nested paths. Recover only recognized app routes.
const allowed = new Set([
  '/privacy',
  '/terms',
  '/contact',
  '/services',
  ...serviceCatalog.map((service) => `/services/${service.slug}`),
])
const params = new URLSearchParams(window.location.search)
const route = params.get('route')
if (route) {
  const recovered = new URL(route, window.location.origin)
  if (
    recovered.origin === window.location.origin &&
    allowed.has(recovered.pathname)
  ) {
    window.history.replaceState(
      {},
      '',
      `${recovered.pathname}${recovered.search}${recovered.hash}`,
    )
  }
}

// Keep old Shop bookmarks useful while keeping the archived shop private.
if (window.location.pathname === '/' && window.location.hash === '#shop') {
  window.history.replaceState({}, '', `/services${window.location.search}`)
}
