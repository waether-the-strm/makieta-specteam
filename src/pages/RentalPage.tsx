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

      <section className="container" id="categories">
        <div className="search">
          <Search className="icon search__icon" />
          <input type="text" placeholder="Szukaj produktu..." className="search__input" />
        </div>

        <div className="products">
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

      <section className="about section">
        <div className="container">
          <h2 className="section-title ml-60 text-slate-100 sr-only">O nas</h2>
          <div className="about__content">
            <LogoVertical fill="#c5cbd6" className="about__logo" />
            <p className="about__text">
              Musimy przyznać – działamy w sposób nietypowy. I nie chodzi tu tylko o to, że
              wypożyczamy i budujemy zaawansowane, kosztowne urządzenia szpiegowskie, ale o to, że w
              tym wszystkim odnajdujemy prawdziwą pasję i radość.
            </p>
            <p className="about__text">
              Nasze podejście do rynku również odbiega od normy. Zamiast tradycyjnego biura
              korzystamy z sieci agentów terenowych. Rezygnujemy z umów najmu i wysokich kaucji (co
              nie wynika z braku zaufania – większość naszych urządzeń automatycznie dezaktywuje się
              po określonym czasie).
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <FAQ />
      </div>
    </>
  )
}
