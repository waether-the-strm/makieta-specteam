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
                <button className="button primary">Zobacz nasz sprzęt</button>
                <button className="button outline">
                  Skontaktuj się z nami
                </button>
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
