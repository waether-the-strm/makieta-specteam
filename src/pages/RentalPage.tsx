import { Search } from "lucide-react";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    title: "Mikrokamery",
    subtitle: "Łączność na egzaminy i nie tylko",
    price: "już od 200zł / dzień",
    image: "https://specteam.pl/img/product_categories/cat_cam.jpg",
  },
  {
    title: "Mikrosłuchawki",
    subtitle: "Niezauważalny kontakt przez telefon",
    price: "już od 83zł / dzień",
    image: "https://specteam.pl/img/product_categories/cat_ms.jpg",
  },
  {
    title: "Detektory",
    subtitle: "Wykrywanie podsłuchów",
    price: "już od 50zł / dzień",
    image: "https://specteam.pl/img/product_categories/cat_det.jpg",
  },
  {
    title: "Lokalizatory GPS",
    subtitle: "Śledzenie pozycji na odległość",
    price: "już od 50zł / dzień",
    image: "https://specteam.pl/img/product_categories/cat_lok.jpg",
  },
  {
    title: "Rejestratory",
    subtitle: "Nagrywanie dźwięku i obrazu z ukrycia",
    price: "już od 50zł / dzień",
    image: "https://specteam.pl/img/product_categories/cat_rej.jpg",
  },
  {
    title: "Podsłuchy",
    subtitle: "Mikrofony bezprzewodowe",
    price: "⚠️ brak produktów",
    image: "https://specteam.pl/img/product_categories/cat_pod.jpg",
  },
];

export default function RentalPage() {
  return (
    <>
      <Hero />

      <section className="container">
        <div className="search">
          <Search className="icon search__icon" />
          <input
            type="text"
            placeholder="Szukaj produktu..."
            className="search__input"
          />
        </div>

        <div className="products">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              subtitle={category.subtitle}
              price={category.price}
              image={category.image}
            />
          ))}
        </div>
      </section>

      <div className="container">
        <section className="about">
          <h2 className="section-title">O nas</h2>
          <div className="about__content">
            <p className="about__text">
              Musimy przyznać – działamy w sposób nietypowy. I nie chodzi tu
              tylko o to, że wypożyczamy i budujemy zaawansowane, kosztowne
              urządzenia szpiegowskie, ale o to, że w tym wszystkim odnajdujemy
              prawdziwą pasję i radość.
            </p>
            <p className="about__text">
              Nasze podejście do rynku również odbiega od normy. Zamiast
              tradycyjnego biura korzystamy z sieci agentów terenowych.
              Rezygnujemy z umów najmu i wysokich kaucji (co nie wynika z braku
              zaufania – większość naszych urządzeń automatycznie dezaktywuje
              się po określonym czasie).
            </p>
          </div>
        </section>
      </div>

      <FAQ />
    </>
  );
}
