import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { MapPin, Mail, Phone, CreditCard, Bitcoin, Clock } from 'lucide-react'
import { CartProvider } from './hooks/useCart'
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
              <footer id="contact-footer" className="footer">
                <div className="footer__container">
                  <div className="footer__content">
                    <h3 className="footer__title">Skontaktuj się z nami</h3>
                    <div className="footer__grid">
                      {/* Formularz */}
                      <div className="footer-form">
                        <input type="text" placeholder="Imię" className="footer-form__input" />
                        <input type="email" placeholder="Email" className="footer-form__input" />
                        <textarea
                          placeholder="Wiadomość"
                          rows={4}
                          className="footer-form__input footer-form__input--textarea"
                        ></textarea>
                        <button type="submit" className="footer-form__submit">
                          Wyślij wiadomość
                        </button>
                      </div>
                      {/* Informacje kontaktowe */}
                      <div className="footer-info">
                        <div className="footer-info__item">
                          <Phone size={18} className="footer-info__icon" />
                          <a href="tel:+48123456789" className="footer-info__link">
                            +48 123 456 789
                          </a>
                        </div>
                        <div className="footer-info__item">
                          <Mail size={18} className="footer-info__icon" />
                          <a href="mailto:contact@specteam.pl" className="footer-info__link">
                            contact@specteam.pl
                          </a>
                        </div>
                        <div className="footer-info__item">
                          <MapPin size={18} className="footer-info__icon" />
                          <span className="footer-info__text">Warszawa, Polska</span>
                        </div>
                        <div className="footer-info__item">
                          <Clock size={18} className="footer-info__icon" />
                          <span className="footer-info__text">Pon-Pt: 9:00 - 18:00</span>
                        </div>
                        {/* Metody płatności */}
                        <div className="footer-payment">
                          <h4 className="footer-payment__title">Akceptujemy</h4>
                          <div className="footer-payment__methods">
                            <div className="footer-payment__method">
                              <CreditCard size={20} className="footer-info__icon" />
                            </div>
                            <div className="footer-payment__method">
                              <Bitcoin size={20} className="footer-info__icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Copyright */}
                  <div className="footer-copyright">
                    <p>© {new Date().getFullYear()} Specteam. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </div>
        <CartNotification />
      </div>
    </CartProvider>
  )
}

export default App
