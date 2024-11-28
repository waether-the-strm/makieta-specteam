import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export default function ProductCard({
  title,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img src={image} alt={title} className="product-card__image" />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{price}</span>
          <button className="product-card__button">
            <span>Zobacz więcej</span>
            <ArrowRight className="product-card__button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
