import type { FC } from 'react'
import type { ProductData } from './types'

interface Props {
  productData: ProductData
}

export const ProductStatus: FC<Props> = ({ productData }) => {
  return (
    <div className="product__status">
      <div className="product__status-availability">
        <span className="product__status-indicator">🟢</span>
        <span className="product__status-text">
          {productData.isAvailable ? 'Produkt dostępny' : 'Produkt niedostępny'}
        </span>
      </div>
      <span className="product__status-separator">|</span>
      <div className="product__status-rating">
        <span className="product__status-stars">⭐⭐⭐⭐⭐</span>
      </div>
      <span className="product__status-separator">|</span>
      <div className="product__status-score">
        <span className="product__status-score-value">{productData.rating}</span>
        <span className="product__status-score-max">/5</span>
      </div>
    </div>
  )
}

export const ProductInfoFeatures: FC<Props> = ({ productData }) => {
  return (
    <div className="product__info-features">
      <h1 className="product__title">{productData.name}</h1>

      <div className="product__features">
        {productData.features.map((feature, index) => (
          <div key={index} className="product__feature">
            <span className="product__feature-icon">✓</span>
            <span className="product__feature-text">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
