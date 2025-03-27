import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { MapPin, Mail, Phone, CreditCard, Bitcoin, Clock } from "lucide-react";

// Lazy loading komponentów
const RentalPage = lazy(() => import("./pages/RentalPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const StorePage = lazy(() => import("./pages/StorePage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));

function App() {
  return (
    <div id="root">
      <div className="app flex flex-col min-h-screen">
        <main className="main flex-grow">
          <div className="layout">
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<RentalPage />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>
            </Suspense>
            <footer
              id="contact-footer"
              className="footer bg-gray-900 text-gray-400 py-12 mt-12"
            >
              <div className="footer__container container mx-auto px-4 max-w-4xl">
                <div className="space-y-8">
                  <h3 className="text-xl font-semibold text-gray-100">
                    Skontaktuj się z nami
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Formularz */}
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Imię"
                        className="w-full p-2.5 rounded bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2.5 rounded bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-500"
                      />
                      <textarea
                        placeholder="Wiadomość"
                        rows={4}
                        className="w-full p-2.5 rounded bg-gray-800/50 border border-gray-700/50 text-gray-200 placeholder-gray-500"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-2.5 px-4 rounded hover:bg-pink-700"
                      >
                        Wyślij wiadomość
                      </button>
                    </div>
                    {/* Informacje kontaktowe */}
                    <div>
                      <div className="space-y-4">
                        <div className="contact__info-item flex items-center space-x-3">
                          <Phone size={18} className="text-gray-500" />
                          <a href="tel:+48123456789" className="text-sm">
                            +48 123 456 789
                          </a>
                        </div>
                        <div className="contact__info-item flex items-center space-x-3">
                          <Mail size={18} className="text-gray-500" />
                          <a
                            href="mailto:contact@specteam.pl"
                            className="text-sm"
                          >
                            contact@specteam.pl
                          </a>
                        </div>
                        <div className="contact__info-item flex items-center space-x-3">
                          <MapPin size={18} className="text-gray-500" />
                          <span className="text-sm">Warszawa, Polska</span>
                        </div>
                        <div className="contact__info-item flex items-center space-x-3">
                          <Clock size={18} className="text-gray-500" />
                          <span className="text-sm">Pon-Pt: 9:00 - 18:00</span>
                        </div>
                      </div>
                      {/* Metody płatności */}
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <h4 className="text-sm font-medium mb-3 text-gray-300">
                          Akceptujemy
                        </h4>
                        <div className="flex space-x-3">
                          <div className="p-2 rounded bg-gray-800/30">
                            <CreditCard size={20} className="text-gray-500" />
                          </div>
                          <div className="p-2 rounded bg-gray-800/30">
                            <Bitcoin size={20} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Copyright */}
                <div className="text-center border-t border-gray-800 mt-12 pt-6 text-xs text-gray-500">
                  <p>
                    © {new Date().getFullYear()} Specteam. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
