import type { FC } from 'react'

import { ProductBreadcrumbs, ProductGallery, ProductActions } from '../components/productPage'

import { useProductData } from '../hooks/useProductData'
import { ProductInfoFeatures, ProductStatus } from '../components/productPage/ProductInfoFeatures'
import ProductInfo from '@/components/productPage/new/ProductInfo'
import { useIsMobile } from '../hooks/useMobile'

const ProductPage: FC = () => {
  const productData = useProductData()
  const isMobile = useIsMobile()

  return (
    <div className="product">
      {productData ? (
        <div className="product__container">
          <ProductBreadcrumbs category={productData.category} name={productData.name} />

          <div className="product__content">
            <div className="product__left-column">
              <ProductInfoFeatures productData={productData} />
              {isMobile && <ProductStatus productData={productData} />}
              <div className="product__gallery-container">
                <div className="product__gallery">
                  <ProductGallery images={productData.images} />
                </div>
              </div>

              {/* <LegacyProductInfoPanel productData={productData} /> */}
              <ProductInfo />
            </div>

            <div className="product__right-column">
              {!isMobile && <ProductStatus productData={productData} />}
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
