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
              className="footer bg-gray-900 text-gray-400 py-16 mt-16"
            >
              <div className="footer__container container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-6 text-gray-100">
                      Skontaktuj się z nami
                    </h3>
                    {/* Placeholder dla formularza */}
                  </div>
                  <div>{/* Placeholder dla informacji kontaktowych */}</div>
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
