import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RentalPage from "./pages/RentalPage";
import { MapPin, Mail, Bitcoin, CreditCard, Phone, Clock } from "lucide-react";

function App() {
  console.log("Rendering App component");
  return (
    <main className="main">
      <div className="layout">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<RentalPage />} />
          </Routes>
        </Suspense>
        <section id="contact" className="contact">
          <div className="container">
            <h2 className="contact__title">Contact Us</h2>
            <div className="contact__grid">
              <div className="contact__info">
                <h3 className="contact__info-title">Get in Touch</h3>
                <div className="contact__info-item">
                  <Phone className="icon" />
                  <span>+48 123 456 789</span>
                </div>
                <div className="contact__info-item">
                  <Mail className="icon" />
                  <span>contact@specteam.pl</span>
                </div>
                <div className="contact__info-item">
                  <MapPin className="icon" />
                  <span>Warsaw, Poland</span>
                </div>
                <div className="contact__info-item">
                  <Clock className="icon" />
                  <span>Mon-Fri: 9:00 - 18:00</span>
                </div>
                <div className="contact__payment">
                  <h4 className="contact__payment-title">Payment Methods:</h4>
                  <CreditCard className="icon" />
                  <Bitcoin className="icon" />
                </div>
              </div>

              <form className="contact-form">
                <input
                  type="text"
                  placeholder="Name"
                  className="contact-form__input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="contact-form__input"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="contact-form__input"
                ></textarea>
                <button className="button contact-button">Send Message</button>
              </form>
            </div>
          </div>
        </section>

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
