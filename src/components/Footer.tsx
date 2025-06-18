import { MapPin, Mail, Phone, CreditCard, Bitcoin, Clock } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="contact-footer" className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <h3 className="footer__title">Skontaktuj się z nami</h3>
          <div className="footer__grid">
            <form className="footer-form" onSubmit={e => e.preventDefault()}>
              <input
                id="footer-name"
                name="name"
                type="text"
                placeholder="Imię"
                className="footer-form__input"
                aria-label="Imię"
                autoComplete="given-name"
              />
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Email"
                className="footer-form__input"
                aria-label="Email"
                autoComplete="email"
              />
              <textarea
                id="footer-message"
                name="message"
                placeholder="Wiadomość"
                rows={4}
                className="footer-form__input footer-form__input--textarea"
                aria-label="Wiadomość"
                autoComplete="off"
              ></textarea>
              <button type="submit" className="footer-form__submit">
                Wyślij wiadomość
              </button>
            </form>
            <div className="footer-info">
              <div className="footer-info__item">
                <Phone size={18} className="footer-info__icon" aria-hidden="true" />
                <a href="tel:+48123456789" className="footer-info__link">
                  +48 123 456 789
                </a>
              </div>
              <div className="footer-info__item">
                <Mail size={18} className="footer-info__icon" aria-hidden="true" />
                <a href="mailto:contact@specteam.pl" className="footer-info__link">
                  contact@specteam.pl
                </a>
              </div>
              <div className="footer-info__item">
                <MapPin size={18} className="footer-info__icon" aria-hidden="true" />
                <span className="footer-info__text">Warszawa, Polska</span>
              </div>
              <div className="footer-info__item">
                <Clock size={18} className="footer-info__icon" aria-hidden="true" />
                <span className="footer-info__text">Pon-Pt: 9:00 - 18:00</span>
              </div>
              <div className="footer-payment">
                <h4 className="footer-payment__title">Akceptujemy</h4>
                <div className="footer-payment__methods">
                  <div className="footer-payment__method">
                    <CreditCard size={20} className="footer-info__icon" aria-hidden="true" />
                  </div>
                  <div className="footer-payment__method">
                    <Bitcoin size={20} className="footer-info__icon" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Specteam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
