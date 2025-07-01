import type { FC } from 'react'
import type { ProductData } from './types'

interface Props {
  productData: ProductData
}

export const ProductStatus: FC<Props> = ({ productData }) => {
  return (
    <div className="flex flex-row items-center gap-4 bg-slate-500/5 rounded-xl px-6 py-3 mb-8 shadow-sm border border-slate-500/10">
      <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
        <span className="text-lg">🟢</span>
        <span>{productData.isAvailable ? 'Produkt dostępny' : 'Produkt niedostępny'}</span>
      </div>
      <span className="mx-2 text-gray-500">|</span>
      <div className="flex items-center gap-2 text-yellow-400 text-base">
        <span className="product__rating-stars text-lg">⭐⭐⭐⭐⭐</span>
      </div>
      <span className="mx-2 text-gray-500">|</span>
      <div className="flex items-center gap-1 text-gray-200 text-sm">
        <span className="product__rating-score font-semibold">{productData.rating}</span>
        <span className="opacity-70">/5</span>
      </div>
    </div>
  )
}

export const ProductInfoFeatures: FC<Props> = ({ productData }) => {
  return (
    <div className="product__info-features py-6">
      <h1 className="product__title text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
        {productData.name}
      </h1>

      <div className="product__features w-full max-w-xl mt-2">
        {productData.features.map((feature, index) => (
          <div
            key={index}
            className="product__feature flex items-center gap-2 text-base text-gray-200 mb-1"
          >
            <span className="product__feature-icon text-pink-500">✓</span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
