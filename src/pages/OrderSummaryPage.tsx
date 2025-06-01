import { useCart } from '../hooks/useCart'
import CartSummarySection from '../components/CartSummarySection'
import { Calendar, ShoppingBag } from 'lucide-react'

export default function OrderSummaryPage() {
  const { items } = useCart()

  // Split items into rental and purchase
  const rentalItems = items.filter(item => item.isRental)
  const purchaseItems = items.filter(item => !item.isRental)

  // Calculate totals
  const rentalTotal = rentalItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const purchaseTotal = purchaseItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const getRentalPeriodText = (period: string, quantity: number) => {
    switch (period) {
      case 'daily':
        return quantity === 1 ? '1 dzień' : `${quantity} dni`
      case 'weekly':
        return quantity === 1 ? '1 tydzień' : `${quantity} tygodni`
      case 'monthly':
        return quantity === 1 ? '1 miesiąc' : `${quantity} miesięcy`
      default:
        return period
    }
  }

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <main className="order-summary">
      <div className="container">
        <h1 className="page-title">Podsumowanie zamówienia</h1>
        <div className="order-summary__content">
          {/* Sekcja zamówienia */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>Twoje zamówienie</span>
            </div>
            <div className="order-summary__section-content">
              <div className="order-summary__sections">
                {rentalItems.length > 0 && (
                  <CartSummarySection
                    title="Wypożyczenie"
                    icon={<Calendar size={16} className="cart-summary__section-icon" />}
                    items={rentalItems}
                    isRentalSection={true}
                    sectionTotal={rentalTotal}
                    onRemove={() => {}}
                    onQuantityChange={() => {}}
                    getCartItemKey={item => item.id}
                    getRentalPeriodText={getRentalPeriodText}
                    formatDate={formatDate}
                  />
                )}
                {purchaseItems.length > 0 && (
                  <CartSummarySection
                    title="Zakup"
                    icon={<ShoppingBag size={16} className="cart-summary__section-icon" />}
                    items={purchaseItems}
                    isRentalSection={false}
                    sectionTotal={purchaseTotal}
                    onRemove={() => {}}
                    onQuantityChange={() => {}}
                    getCartItemKey={item => item.id}
                    getRentalPeriodText={getRentalPeriodText}
                    formatDate={formatDate}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sekcja dostawy */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>Dostawa</span>
            </div>
            <div className="order-summary__section-content">
              {/* Opcje dostawy będą dodane w następnym kroku */}
            </div>
          </div>

          {/* Sekcja płatności */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>Płatność</span>
            </div>
            <div className="order-summary__section-content">
              {/* Metody płatności będą dodane w następnym kroku */}
            </div>
          </div>

          {/* Sekcja danych osobowych */}
          <div className="order-summary__section">
            <div className="order-summary__section-header">
              <span>Twoje dane</span>
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
