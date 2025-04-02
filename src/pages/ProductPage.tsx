import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductBreadcrumbs from "../components/product/ProductBreadcrumbs";
import ProductGallery from "../components/product/ProductGallery";
import ProductActions from "../components/product/ProductActions";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: {
    rental: {
      daily: number;
      weekly: number;
      monthly: number;
    };
    purchase: number;
  };
  images: string[];
  features: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  specs: Array<{
    label: string;
    value: string;
  }>;
  rating: number;
  isAvailable: boolean;
}

// Przykładowe dane produktu do testów
const mockProduct: Product = {
  id: "1",
  name: "Lokalizator GPS",
  category: "Lokalizatory GPS",
  description: "Profesjonalny lokalizator GPS z długim czasem pracy.",
  price: {
    rental: {
      daily: 50,
      weekly: 300,
      monthly: 1000,
    },
    purchase: 2500,
  },
  images: [
    "https://www.specteam.pl/products/gps/pics/lok4.jpg", // 1173x766
    "https://www.specteam.pl/products/gps/pics/lok1.jpg", // 565x442
    "https://www.specteam.pl/products/gps/pics/lok2.jpg", // 700x525
    "https://www.specteam.pl/products/gps/pics/lok3.jpg", // 650x548
    "https://www.specteam.pl/products/gps/pics/1.jpg", // 400x372
    "https://www.specteam.pl/products/gps/pics/2.jpg", // 292x387
    "https://www.specteam.pl/products/gps/pics/3.jpg", // 300x397
  ],
  features: [
    "Kilka miesięcy pracy na jednym ładowaniu",
    "Podgląd w aplikacji w dołączonym telefonie",
    "Precyzyjne ustalanie pozycji z dokładnością GPS",
    "Gotowy telefon w zestawie (z kartą sim i pakietem danych)",
    "Bardzo długi czas pracy - nawet do kilku tygodni",
    "Bardzo małe rozmiary nadajnika",
    "Zerowy koszt eksploatacji: brak abonamentu itp opłat.",
  ],
  faq: [
    {
      question: "Co muszę mieć swojego aby korzystać z zestawu?",
      answer:
        "Kompletnie nic. W zestawie znajduje się telefon sparowany z lokalizatorem.",
    },
    {
      question: "Jaki zasięg ma nadajnik?",
      answer: "Działa w całej Polsce",
    },
    {
      question: "Jak długo działa nadajnik?",
      answer:
        "Nawet do kilku tygodni. Osobiście to testowaliśmy w różnych warunkach.",
    },
    {
      question: "Gdzie w samochodzie najlepiej ukryć nadajnik?",
      answer:
        "W takim miejscu, w którym będzie miał zasięg GSM i GPS. Schowek na okulary przy lusterku jest idealnym miejscem. Schowek po stronie pasażera również powinien się sprawdzić w większości samochodów. Inne punkty są zależne od konstrukcji auta i zasięgu sieci w okolicy.",
    },
  ],
  specs: [
    { label: "Wymiary lokalizatora", value: "97 x 24 x 31 mm" },
    { label: "Czas pracy", value: "do kilku tygodni" },
    { label: "Karta sim w lokalizatorze", value: "tak" },
    { label: "Karta sim w telefonie", value: "tak" },
    { label: "Częstość podawania pozycji", value: "10 sekund" },
    { label: "Wskaźnik stanu baterii", value: "procentowy" },
    { label: "Mikrofon", value: "brak" },
    { label: "Zapis historii", value: "tak" },
    {
      label: "Telefon",
      value: 'Redmi 4X, rozmiar: 140 x 70 x 9 mm (ekran 5")',
    },
  ],
  rating: 4.92,
  isAvailable: true,
};

const ProductPage: React.FC = () => {
  const product = mockProduct;
  const [activeTab, setActiveTab] = useState<"specs" | "faq">("specs");

  return (
    <div className="product">
      <div className="product__container">
        <ProductBreadcrumbs category={product.category} name={product.name} />

        <div className="product__content">
          {/* Lewa kolumna - galeria i treść tekstowa */}
          <div className="product__left-column">
            {/* Galeria na górze */}
            <div className="product__gallery-container">
              <div className="product__gallery">
                <ProductGallery images={product.images} />
              </div>
            </div>

            {/* Panel informacyjny - opis i zakładki */}
            <div className="product__info-panel">
              {/* Opis */}
              <div className="product__description">
                <h2 className="product__description-title">Opis</h2>
                <div className="product__description-content">
                  {product.description}
                </div>
              </div>

              <div className="product__tabs-divider"></div>

              {/* Zakładki - Szczegóły Techniczne i FAQ */}
              <div className="product__tabs">
                <div
                  className="product__tabs-header"
                  role="tablist"
                  aria-label="Informacje o produkcie"
                >
                  <button
                    className={`product__tab-button ${
                      activeTab === "specs" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("specs")}
                    role="tab"
                    aria-selected={activeTab === "specs"}
                    aria-controls="panel-specs"
                    id="tab-specs"
                  >
                    Szczegóły techniczne
                  </button>
                  <button
                    className={`product__tab-button ${
                      activeTab === "faq" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("faq")}
                    role="tab"
                    aria-selected={activeTab === "faq"}
                    aria-controls="panel-faq"
                    id="tab-faq"
                  >
                    Pytania i odpowiedzi
                  </button>
                </div>

                <div className="product__tabs-content">
                  {/* Specyfikacje */}
                  <div
                    id="panel-specs"
                    role="tabpanel"
                    aria-labelledby="tab-specs"
                    className={activeTab === "specs" ? "" : "hidden"}
                  >
                    <div className="product__specs">
                      <table className="product__specs-table">
                        <tbody>
                          {product.specs.map((spec, index) => (
                            <tr key={index} className="product__specs-row">
                              <td className="product__specs-cell product__specs-label">
                                {spec.label}
                              </td>
                              <td className="product__specs-cell product__specs-value">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div
                    id="panel-faq"
                    role="tabpanel"
                    aria-labelledby="tab-faq"
                    className={activeTab === "faq" ? "" : "hidden"}
                  >
                    <div className="product__faq">
                      {product.faq.map((item, index) => (
                        <div key={index} className="product__faq-item">
                          <div className="product__faq-question">
                            {item.question}
                          </div>
                          <div className="product__faq-answer">
                            {item.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - nagłówek, cechy i panel akcji */}
          <div className="product__right-column">
            {/* Informacje podstawowe o produkcie i lista cech w jednym kontenerze */}
            <div className="product__info-features">
              {/* Informacje podstawowe o produkcie */}
              <h1 className="product__title">{product.name}</h1>

              <div className="product__availability">
                <span>🟢 Produkt dostępny</span>
              </div>

              <div className="product__rating">
                <span className="product__rating-stars">⭐⭐⭐⭐⭐</span>
                <span className="product__rating-score">
                  {product.rating}/5
                </span>
              </div>

              {/* Lista cech produktu */}
              <div className="product__features">
                {product.features.map((feature, index) => (
                  <div key={index} className="product__feature">
                    <span className="product__feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel akcji będzie przyklejał się przy przewijaniu */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
