import './routeRecovery'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import { COMING_SOON_ENABLED } from './config/siteMode.js'

// Local development only: preview the full site without changing the launch flag.
if (
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get('preview') === 'full'
) {
  sessionStorage.setItem('digital-bloom-full-preview', 'true')
}
if (
  import.meta.env.DEV &&
  new URLSearchParams(window.location.search).get('preview') === 'reset'
) {
  sessionStorage.removeItem('digital-bloom-full-preview')
}
const localFullPreview =
  import.meta.env.DEV &&
  sessionStorage.getItem('digital-bloom-full-preview') === 'true'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {COMING_SOON_ENABLED && !localFullPreview ? <ComingSoon /> : <App />}
  </StrictMode>,
)
