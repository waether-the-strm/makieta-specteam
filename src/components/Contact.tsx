import { MapPin, Mail, Bitcoin, CreditCard, Phone, Clock } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <h2 className="contact__title">Contact Us</h2>
        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__info-title">Get in Touch</h3>
            <div className="contact__info-item">
              <Phone className="contact__info-icon" />
              <span>+48 123 456 789</span>
            </div>
            <div className="contact__info-item">
              <Mail className="contact__info-icon" />
              <span>contact@specteam.pl</span>
            </div>
            <div className="contact__info-item">
              <MapPin className="contact__info-icon" />
              <span>Warsaw, Poland</span>
            </div>
            <div className="contact__info-item">
              <Clock className="contact__info-icon" />
              <span>Mon-Fri: 9:00 - 18:00</span>
            </div>
            <div className="contact__payment">
              <h4 className="contact__payment-title">Payment Methods:</h4>
              <div className="contact__payment-icons">
                <CreditCard className="contact__payment-icon" />
                <Bitcoin className="contact__payment-icon" />
              </div>
            </div>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Name" className="contact-form__input" />
            <input type="email" placeholder="Email" className="contact-form__input" />
            <textarea placeholder="Message" rows={4} className="contact-form__input"></textarea>
            <button type="submit" className="contact-form__submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
