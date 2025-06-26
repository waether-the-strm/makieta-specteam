import { type FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categories } from '../data/categories'
import { getFaqsForCategory } from '../data/faqs'

import {
  ProductBreadcrumbs,
  ProductGallery,
  ProductActions,
  ProductTab,
  LegacyProductInfoPanel,
} from '../components/productPage'

interface ProductPageProps {
  defaultActiveTab?: ProductTab
}

const ProductPage: FC<ProductPageProps> = ({ defaultActiveTab }) => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const category = categories.find(cat => cat.title.toLowerCase() === categoryId?.toLowerCase())

  const [activeTab, setActiveTab] = useState<ProductTab>(defaultActiveTab || ProductTab.SPECS)

  if (!category) {
    return <div>Kategoria produktu nie została znaleziona.</div>
  }

  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/\d+/)
    return match ? parseInt(match[0], 10) : 0
  }

  const dailyPrice = parsePrice(category.price)

  const productData = {
    id: category.title.toLowerCase(),
    name: category.title,
    category: category.title,
    description: category.description || 'Brak opisu.',
    priceString: category.price,
    price: {
      rental: {
        daily: dailyPrice,
        weekly: dailyPrice * 5,
        monthly: dailyPrice * 15,
      },
      purchase: dailyPrice * 30,
    },
    images: category.images || [],
    features: [`Główna cecha: ${category.subtitle}`],
    faq: getFaqsForCategory(category.title),
    specs: category.specs || [],
    rating: 4.5,
    isAvailable: !category.price.includes('brak'),
  }

  return (
    <div className="product">
      <div className="product__container">
        <ProductBreadcrumbs category={productData.category} name={productData.name} />

        <div className="product__content">
          <div className="product__left-column">
            <div className="product__gallery-container">
              <div className="product__gallery">
                <ProductGallery images={productData.images} />
              </div>
            </div>

            <LegacyProductInfoPanel
              productData={productData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="product__right-column">
            <div className="product__info-features">
              <h1 className="product__title">{productData.name}</h1>

              <div className="product__availability">
                <span>
                  {productData.isAvailable ? '🟢 Produkt dostępny' : '🔴 Produkt niedostępny'}
                </span>
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

            <ProductActions product={productData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
