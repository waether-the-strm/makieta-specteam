import type { FC } from 'react'

import {
  ProductBreadcrumbs,
  ProductGallery,
  ProductActions,
  LegacyProductInfoPanel,
} from '../components/productPage'

import { useProductData } from '../hooks/useProductData'
import { ProductInfoFeatures } from '../components/productPage/ProductInfoFeatures'

const ProductPage: FC = () => {
  const productData = useProductData()

  return (
    <div className="product">
      {productData ? (
        <div className="product__container">
          <ProductBreadcrumbs category={productData.category} name={productData.name} />

          <div className="product__content">
            <div className="product__left-column">
              <div className="product__gallery-container">
                <div className="product__gallery">
                  <ProductGallery images={productData.images} />
                </div>
              </div>

              <LegacyProductInfoPanel productData={productData} />
            </div>

            <div className="product__right-column">
              <ProductInfoFeatures productData={productData} />
              <ProductActions product={productData} />
            </div>
          </div>
        </div>
      ) : (
        <div className="product__loading">
          <p>Ładowanie danych produktu...</p>
          <a href="/" className="text-blue-500 hover:underline">
            Wróć do oferty
          </a>
        </div>
      )}
    </div>
  )
}

export default ProductPage
