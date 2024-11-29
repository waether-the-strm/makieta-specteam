import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import RentalPage from "./pages/RentalPage";

function App() {
  return (
    <main className="main">
      <div className="layout">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<RentalPage />} />
          </Routes>
        </Suspense>
        <Contact />
        <footer className="footer">
          <div className="footer__container">
            <p>© 2024 Specteam. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
