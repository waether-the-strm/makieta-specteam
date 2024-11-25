import { useState } from "react";
import { Search } from "lucide-react";

import CategoryCard from "../components/CategoryCard";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";

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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 pt-16 overflow-hidden">
      <Hero />
      <div
        id="devices"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Szukaj produktu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">O nas</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Musimy przyznać – działamy w sposób nietypowy. I nie chodzi tu
              tylko o to, że wypożyczamy i budujemy zaawansowane, kosztowne
              urządzenia szpiegowskie, ale o to, że w tym wszystkim odnajdujemy
              prawdziwą pasję i radość.
            </p>
            <p className="text-gray-600">
              Nasze podejście do rynku również odbiega od normy. Zamiast
              tradycyjnego biura korzystamy z sieci agentów terenowych.
              Rezygnujemy z umów najmu i wysokich kaucji (co nie wynika z braku
              zaufania – większość naszych urządzeń automatycznie dezaktywuje
              się po określonym czasie).
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </div>
  );
}
