import React from 'react'

export default function OrderSummaryPage() {
  return (
    <main className="order-summary">
      <div className="container">
        <h1 className="page-title">Podsumowanie zamówienia</h1>
        <div className="order-summary__content">
          {/* Sekcja zamówienia */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>🛒 Twoje zamówienie</span>
            </div>
            <div className="order-summary__section-content">
              {/* Tabela produktów będzie dodana w następnym kroku */}
            </div>
          </div>

          {/* Sekcja dostawy */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>🚚 Dostawa</span>
            </div>
            <div className="order-summary__section-content">
              {/* Opcje dostawy będą dodane w następnym kroku */}
            </div>
          </div>

          {/* Sekcja płatności */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>💰 Płatność</span>
            </div>
            <div className="order-summary__section-content">
              {/* Metody płatności będą dodane w następnym kroku */}
            </div>
          </div>

          {/* Sekcja danych osobowych */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>🤵 Twoje dane</span>
            </div>
            <div className="order-summary__section-content">
              {/* Formularz danych będzie dodany w następnym kroku */}
            </div>
          </div>

          {/* Przycisk podsumowania */}
          <div className="order-summary__actions">
            <button className="btn-action-primary" disabled>
              Przejdź do podsumowania
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
