import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ComingSoon from './pages/ComingSoon.jsx'
import { COMING_SOON_ENABLED } from './config/siteMode.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {COMING_SOON_ENABLED ? <ComingSoon /> : <App />}
  </StrictMode>,
)
