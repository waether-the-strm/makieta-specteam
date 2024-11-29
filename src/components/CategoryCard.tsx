import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

export default function CategoryCard({
  title,
  subtitle,
  price,
  image,
  imageWidth,
  imageHeight,
}: CategoryCardProps) {
  const titleId = `product-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <article className="product-card group">
      <a href="#" className="block h-full" aria-labelledby={titleId}>
        <figure className="product-card__image-container">
          <img
            src={image}
            alt=""
            className="product-card__image"
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
          />
          <div
            className="product-card__image-overlay"
            role="presentation"
          ></div>
        </figure>
        <div className="product-card__content">
          <header>
            <h3 className="product-card__title" id={titleId}>
              {title}
            </h3>
            <p className="product-card__description">{subtitle}</p>
          </header>
          <footer className="product-card__footer">
            <p className="product-card__price">
              <span className="sr-only">Cena:</span>
              {price}
            </p>
            <span className="product-card__button" aria-hidden="true">
              <span>Zobacz więcej</span>
              <ArrowRight className="product-card__button-icon" />
            </span>
          </footer>
        </div>
      </a>
    </article>
  );
}
