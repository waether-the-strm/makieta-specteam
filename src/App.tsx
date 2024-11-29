import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy loading komponentów
const RentalPage = lazy(() => import("./pages/RentalPage"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <div id="root">
      <div className="app">
        <main className="main">
          <div className="layout">
            <Navbar />
            <Suspense fallback={<div>Ładowanie...</div>}>
              <Routes>
                <Route path="/" element={<RentalPage />} />
              </Routes>
            </Suspense>
            <Suspense fallback={<div>Ładowanie...</div>}>
              <Contact />
            </Suspense>
            <footer className="footer">
              <div className="footer__container">
                <p>© 2024 Specteam. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
