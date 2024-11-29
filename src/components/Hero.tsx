import RentalFeatures from "./RentalFeatures";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__background">
        <div className="hero__background-image">
          <img
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80"
            alt="Security Background"
            className="hero__image"
          />
        </div>
        <div className="hero-content">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">
                Wypożyczalnia Sprzętu Detektywistycznego
              </h1>
              <p className="hero__subtitle">
                Profesjonalny sprzęt dostępny od zaraz
              </p>
              <div className="hero__buttons">
                <a
                  href="#categories"
                  className="button primary w-full md:w-auto"
                >
                  Zobacz nasz sprzęt
                </a>
                <a
                  href="#contact"
                  className="button secondary w-full md:w-auto"
                >
                  Skontaktuj się z nami
                </a>
              </div>
            </div>
          </div>
          <div className="hero__features">
            <RentalFeatures />
          </div>
        </div>
      </div>
    </header>
  );
}
