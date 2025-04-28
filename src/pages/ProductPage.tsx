import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { categories } from '../data/categories'

import ProductBreadcrumbs from '../components/product/ProductBreadcrumbs'
import ProductGallery from '../components/product/ProductGallery'
import ProductActions from '../components/product/ProductActions'

enum ProductTab {
  FAQ = 'faq',
  SPECS = 'specs',
}

interface ProductPageProps {
  defaultActiveTab?: ProductTab
}

const ProductPage: React.FC<ProductPageProps> = ({ defaultActiveTab }) => {
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
    faq: [],
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

            <div className="product__info-panel">
              <div className="product__description">
                <h2 className="product__description-title">Opis</h2>
                <div className="product__description-content">{productData.description}</div>
              </div>

              <div className="product__tabs">
                <div
                  className="product__tabs-header"
                  role="tablist"
                  aria-label="Informacje o produkcie"
                >
                  {productData.faq.length > 0 && (
                    <button
                      className={`product__tab-button ${
                        activeTab === ProductTab.FAQ ? 'active' : ''
                      }`}
                      onClick={() => setActiveTab(ProductTab.FAQ)}
                      role="tab"
                      aria-selected={activeTab === ProductTab.FAQ}
                      aria-controls="panel-faq"
                      id="tab-faq"
                    >
                      Pytania i odpowiedzi
                    </button>
                  )}
                  <button
                    className={`product__tab-button ${
                      activeTab === ProductTab.SPECS ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(ProductTab.SPECS)}
                    role="tab"
                    aria-selected={activeTab === ProductTab.SPECS}
                    aria-controls="panel-specs"
                    id="tab-specs"
                  >
                    Szczegóły techniczne
                  </button>
                </div>

                <div className="product__tabs-content">
                  {productData.faq.length > 0 && (
                    <div
                      id="panel-faq"
                      role="tabpanel"
                      aria-labelledby="tab-faq"
                      className={activeTab === ProductTab.FAQ ? '' : 'hidden'}
                    >
                      <div className="product__faq">{/* Renderowanie FAQ, jeśli będą dane */}</div>
                    </div>
                  )}
                  <div
                    id="panel-specs"
                    role="tabpanel"
                    aria-labelledby="tab-specs"
                    className={activeTab === ProductTab.SPECS ? '' : 'hidden'}
                  >
                    <div className="product__specs">
                      <table className="product__specs-table">
                        <tbody>
                          {productData.specs.map((spec, index) => (
                            <tr key={index} className="product__specs-row">
                              <td className="product__specs-cell product__specs-label">
                                {spec.label}
                              </td>
                              <td className="product__specs-cell product__specs-value">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
