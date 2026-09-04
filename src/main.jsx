import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

Sentry.init({
  dsn: "https://1cbb1642eb4d011d2c4a766f466c19c1@o4511978138435584.ingest.de.sentry.io/4512029930094672",
  dataCollection: {
    // userInfo: false,
    // httpBodies: []
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
