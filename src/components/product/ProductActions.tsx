import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import { Calendar } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: {
    rental: {
      daily: number
      weekly: number
      monthly: number
      [key: string]: number
    }
    purchase: number
  }
  isAvailable: boolean
  images: string[]
  deposit?: number
}

interface ProductActionsProps {
  product: Product
}

const DISCOUNTS = [
  {
    id: 'bitcoin',
    label: '19zł zniżki za płatność w Bitcoin',
    value: 19,
    tooltip: 'Płać Bitcoinem, a otrzymasz rabat.',
  },
  {
    id: 'repeat',
    label: '13zł zniżki za ponowne zakupy',
    value: 13,
    tooltip: 'Rabaty dla powracających klientów.',
  },
  {
    id: 'selftraining',
    label: '8zł zniżki za samodzielne szkolenie',
    value: 8,
    tooltip: 'Zniżka za samodzielne szkolenie.',
  },
]

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [isRental, setIsRental] = useState(true)
  const [rentalPeriod, setRentalPeriod] = useState('daily')
  const [quantity, setQuantity] = useState(1)
  const [rentalDate, setRentalDate] = useState<Date>(new Date())
  const [appliedDiscounts, setAppliedDiscounts] = useState<{ [key: string]: boolean }>({})
  const [discountCode, setDiscountCode] = useState('')
  const { addItem } = useCart()

  // Mapowanie okresów wypożyczenia na ich polskie etykiety i wartości
  const rentalOptions = [
    { id: 'daily', label: '1 dzień', price: product.price.rental.daily },
    { id: 'weekly', label: '7 dni', price: product.price.rental.weekly },
    { id: 'monthly', label: '30 dni', price: product.price.rental.monthly },
  ]

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  // Suma rabatów z checkboxów
  const discountsValue = DISCOUNTS.reduce(
    (sum, d) => (appliedDiscounts[d.id] ? sum + d.value : sum),
    0
  )

  // Przykładowa obsługa kodu rabatowego (możesz rozwinąć logikę)
  const codeDiscountValue = discountCode === 'EXTRA10' ? 10 : 0

  // Kaucja (jeśli nie ma w produkcie, domyślnie 300 zł)
  const deposit = product.deposit ?? 300

  // Obliczenia cen
  const basePrice = isRental ? product.price.rental[rentalPeriod] : product.price.purchase
  const originalPrice = basePrice * quantity
  const totalDiscount = discountsValue + codeDiscountValue
  const finalPrice = Math.max(0, originalPrice - totalDiscount)

  // Formatowanie daty dla inputu
  const today = new Date()

  // Format helper
  const formatPrice = (value: number) => `${value} zł`

  // handleAddToCart korzysta teraz z finalPrice
  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity,
      image: product.images[0],
      isRental,
      rentalPeriod: isRental ? rentalPeriod : undefined,
      rentalDate: isRental ? rentalDate : undefined,
      deposit: isRental ? deposit : undefined,
      discounts: appliedDiscounts,
    }
    addItem(item)
  }

  // Ustaw minimalną datę jako dzisiaj
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="panel-dark product__actions">
      <div className="product__actions-tabs">
        <button
          className={`product__actions-tab ${isRental ? 'product__actions-tab--active' : ''}`}
          type="button"
          onClick={() => setIsRental(true)}
        >
          Wypożyczenie
        </button>
        <button
          className={`product__actions-tab ${!isRental ? 'product__actions-tab--active' : ''}`}
          type="button"
          onClick={() => setIsRental(false)}
        >
          Zakup
        </button>
      </div>

      <form
        className="product__form"
        onSubmit={e => {
          e.preventDefault()
          handleAddToCart()
        }}
      >
        {isRental && (
          <div className="product__form-row product__form-row--dates">
            <div className="product__form-field">
              <label className="product__form-label">Okres wypożyczenia</label>
              <select
                value={rentalPeriod}
                onChange={e => setRentalPeriod(e.target.value)}
                className="product__form-input"
              >
                {rentalOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label} ({option.price} zł)
                  </option>
                ))}
              </select>
            </div>
            <div className="product__form-field">
              <label className="product__form-label">Data wypożyczenia</label>
              <div className="product__rental-date-field">
                <input
                  type="date"
                  min={formatDateForInput(today)}
                  value={formatDateForInput(rentalDate)}
                  onChange={e => setRentalDate(new Date(e.target.value))}
                  className="product__rental-date-input"
                />
                <Calendar className="product__rental-date-icon" size={20} />
              </div>
            </div>
          </div>
        )}

        <div className="product__form-row product__form-row--quantity">
          <label className="product__form-label">Ilość</label>
          <div className="product__quantity">
            <button
              className="product__quantity-button"
              type="button"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="product__quantity-value">{quantity}</span>
            {/* Przykładowa zniżka ilościowa */}
            {quantity >= 3 && <span className="product__quantity-discount">10% zniżki</span>}
            <button
              className="product__quantity-button"
              type="button"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              +
            </button>
          </div>
        </div>

        <div className="product__form-row product__form-row--discounts">
          <label className="product__form-label">Rabaty</label>
          <div className="product__discounts">
            {DISCOUNTS.map(discount => (
              <label className="product__discount" key={discount.id} title={discount.tooltip}>
                <input
                  type="checkbox"
                  className="product__discount-checkbox"
                  checked={!!appliedDiscounts[discount.id]}
                  onChange={e =>
                    setAppliedDiscounts(d => ({ ...d, [discount.id]: e.target.checked }))
                  }
                />
                <span>{discount.label}</span>
                <span className="product__discount-info">ℹ️</span>
              </label>
            ))}
            <input
              className="product__discount-code"
              type="text"
              placeholder="Dodatkowy kod rabatowy"
              value={discountCode}
              onChange={e => setDiscountCode(e.target.value)}
            />
            {codeDiscountValue > 0 && (
              <span className="product__discount-code-info">
                Kod aktywny: -{codeDiscountValue} zł
              </span>
            )}
          </div>
        </div>

        <div className="product__form-row product__form-row--summary">
          <div className="product__summary-group">
            <div className="product__summary">
              <div className="product__summary-main">
                <span className="product__summary-label">
                  Suma{' '}
                  {isRental &&
                    `(za ${rentalPeriod === 'daily' ? '1 dzień' : rentalPeriod === 'weekly' ? '7 dni' : '30 dni'})`}
                  :
                </span>
                <div className="flex items-baseline gap-2">
                  {totalDiscount > 0 && (
                    <span className="product__summary-price-original">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  <span className="product__summary-price">{formatPrice(finalPrice)}</span>
                </div>
              </div>
              {isRental && deposit > 0 && (
                <div className="product__summary-footer">
                  <span className="product__summary-deposit">+ {deposit} zł kaucji zwrotnej</span>
                </div>
              )}
            </div>
            <button type="submit" className="product__button">
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </form>

      <div className="product__info-bottom">
        <div className="product__info-bottom-row">
          <span className="product__info-bottom-row-icon">🚚</span>
          <span className="product__info-bottom-row-text">Dostawa od 1zł w 24h</span>
        </div>
        <div className="product__info-bottom-row">
          <span className="product__info-bottom-row-icon">👨‍💻</span>
          <span className="product__info-bottom-row-text">Pomoc techniczna 24/7</span>
        </div>
      </div>
    </div>
  )
}

export default ProductActions
