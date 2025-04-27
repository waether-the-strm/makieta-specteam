import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

// Use hydrateRoot for SSR hydration
ReactDOM.hydrateRoot(
  rootElement,
  // Remove StrictMode wrapper for testing
  // <React.StrictMode>
  <BrowserRouter
    basename={import.meta.env.BASE_URL || '/'}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </BrowserRouter>
  // </React.StrictMode>
)
