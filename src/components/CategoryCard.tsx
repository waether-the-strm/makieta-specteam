import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  price: string;
  image: string;
}

export default function CategoryCard({
  title,
  subtitle,
  price,
  image,
}: CategoryCardProps) {
  return (
    <article className="product-card group">
      <figure className="product-card__image-container">
        <img src={image} alt={title} className="product-card__image" />
        <div className="product-card__image-overlay" role="presentation"></div>
      </figure>
      <div className="product-card__content">
        <header>
          <h3 className="product-card__title">{title}</h3>
          <p className="product-card__description">{subtitle}</p>
        </header>
        <footer className="product-card__footer">
          <p className="product-card__price">
            <span className="sr-only">Cena:</span>
            {price}
          </p>
          <button
            className="product-card__button"
            aria-label="Zobacz więcej o produkcie"
          >
            <span>Zobacz więcej</span>
            <ArrowRight
              className="product-card__button-icon"
              aria-hidden="true"
            />
          </button>
        </footer>
      </div>
    </article>
  );
}
