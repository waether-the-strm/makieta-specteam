import type { FC } from 'react'
import type { ProductData } from './types'

interface Props {
  productData: ProductData
}

export const ProductInfoFeatures: FC<Props> = ({ productData }) => {
  return (
    <div className="product__info-features">
      <h1 className="product__title">{productData.name}</h1>

      <div className="product__availability">
        <span>{productData.isAvailable ? '🟢 Produkt dostępny' : '🔴 Produkt niedostępny'}</span>
      </div>

      <div className="product__rating">
        <span className="product__rating-stars">⭐⭐⭐⭐⭐</span>
        <span className="product__rating-score">{productData.rating}/5</span>
      </div>

      <div className="product__features">
        {productData.features.map((feature, index) => (
          <div key={index} className="product__feature">
            <span className="product__feature-icon">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
