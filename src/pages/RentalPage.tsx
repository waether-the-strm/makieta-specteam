import { Search } from 'lucide-react'
import Hero from '../components/Hero'
import CategoryCard from '../components/CategoryCard'
import LogoVertical from '../components/logos/LogoVertical'
import FAQ from '../components/FAQ'
import { categories } from '../data/categories'

export default function RentalPage() {
  return (
    <>
      <Hero />

      <section className="rental-page__categories" id="categories">
        <div className="rental-page__category-header">
          <h2 className="rental-page__category-title">Nasz sprzęt</h2>
          <div className="rental-page__category-subtitle">
            <span>Wybierz kategorię poniżej lub</span>
            <span className="rental-page__search-wrapper">
              <Search className="rental-page__search-icon" />
              <input
                type="text"
                placeholder="skorzystaj z wyszukiwarki…"
                className="rental-page__search-input"
              />
            </span>
          </div>
        </div>

        <div className="rental-page__products">
          {categories.map(category => (
            <CategoryCard
              key={category.title}
              title={category.title}
              subtitle={category.subtitle}
              price={category.price}
              image={category.images && category.images.length > 0 ? category.images[0] : ''}
              imageWidth={category.imageWidth}
              imageHeight={category.imageHeight}
            />
          ))}
        </div>
      </section>

      <section className="rental-page__about">
        <div className="rental-page__about-container">
          <h2 className="rental-page__about-title">O nas</h2>
          <div className="rental-page__about-content">
            <LogoVertical fill="#c5cbd6" className="rental-page__about-logo" />
            <p className="rental-page__about-text">
              Musimy przyznać – działamy w sposób nietypowy. I nie chodzi tu tylko o to, że
              wypożyczamy i budujemy zaawansowane, kosztowne urządzenia szpiegowskie, ale o to, że w
              tym wszystkim odnajdujemy prawdziwą pasję i radość.
            </p>
            <p className="rental-page__about-text">
              Nasze podejście do rynku również odbiega od normy. Zamiast tradycyjnego biura
              korzystamy z sieci agentów terenowych. Rezygnujemy z umów najmu i wysokich kaucji (co
              nie wynika z braku zaufania – większość naszych urządzeń automatycznie dezaktywuje się
              po określonym czasie).
            </p>
          </div>
        </div>
      </section>

      <div className="rental-page__faq-container">
        <FAQ />
      </div>
    </>
  )
}
