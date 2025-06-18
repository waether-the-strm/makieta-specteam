import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider } from './hooks'
import CartNotification from './components/CartNotification'
import './styles/main.css'
import './styles/components/navbar.css'
import './styles/components/app.css'

const RentalPage = lazy(() => import('./pages/RentalPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const StorePage = lazy(() => import('./pages/StorePage'))
const SupportPage = lazy(() => import('./pages/SupportPage'))
const OrderSummaryPage = lazy(() => import('./pages/OrderSummaryPage'))

function App() {
  return (
    <CartProvider>
      <div id="root">
        <div className="app">
          <main className="app__main">
            <div className="app__layout">
              <Navbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<RentalPage />} />
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/product/:categoryId" element={<ProductPage />} />
                  <Route path="/order-summary" element={<OrderSummaryPage />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </main>
        </div>
        <CartNotification />
      </div>
    </CartProvider>
  )
}

export default App
