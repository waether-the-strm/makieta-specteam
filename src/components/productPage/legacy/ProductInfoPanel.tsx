import { type FC, useState } from 'react'
import { ProductFAQ, ProductInfoPanelProps, ProductSpec, ProductTab } from '.'

/**
 * UWAGA: Komponent legacy! Zachowano na czas przejściowy migracji na nowy ProductInfo.
 */
export const ProductInfoPanel: FC<ProductInfoPanelProps> = ({ productData }) => {
  const [activeTab, setActiveTab] = useState<ProductTab>(ProductTab.SPECS)

  return (
    <div className="product__info-panel">
      <div className="product__description">
        <h2 className="product__description-title">Opis</h2>
        <div className="product__description-content">{productData.description}</div>
      </div>

      <div className="product__tabs">
        <div className="product__tabs-header" role="tablist" aria-label="Informacje o produkcie">
          {productData.faq.length > 0 && (
            <button
              className={`tab-button relative z-10 w-1/2 ${
                activeTab === ProductTab.FAQ ? 'tab-button--active' : 'tab-button--inactive'
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
            className={`tab-button relative z-10 w-1/2 ${
              activeTab === ProductTab.SPECS ? 'tab-button--active' : 'tab-button--inactive'
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
              <div className="product__faq">
                {productData.faq.map((faqItem: ProductFAQ, index: number) => (
                  <div key={index} className="product__faq-item">
                    <h3 className="product__faq-question">{faqItem.question}</h3>
                    <p className="product__faq-answer">{faqItem.answer}</p>
                  </div>
                ))}
              </div>
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
                  {productData.specs.map((spec: ProductSpec, index: number) => (
                    <tr key={index} className="product__specs-row">
                      <td className="product__specs-cell product__specs-label product__specs-label--light">
                        {spec.label}
                      </td>
                      <td className="product__specs-cell product__specs-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
