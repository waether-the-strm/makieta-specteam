import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Kompletnie wyłączamy hydrację w trybie deweloperskim
const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

// Używamy bezpiecznego dostępu do BASE_URL
const baseUrl = typeof import.meta !== 'undefined' ? import.meta.env.BASE_URL || '/' : '/'

// W trybie deweloperskim całkowicie rezygnujemy z hydracji
if (import.meta.env.DEV) {
  rootElement.innerHTML = ''
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter
        basename={baseUrl}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
} else {
  // W produkcji używamy standardowej hydracji
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <BrowserRouter
        basename={baseUrl}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
