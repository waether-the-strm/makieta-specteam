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
}

interface ProductActionsProps {
  product: Product
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [isRental, setIsRental] = useState(true)
  const [rentalPeriod, setRentalPeriod] = useState('daily')
  const [quantity, setQuantity] = useState(1)
  const [rentalDate, setRentalDate] = useState<Date>(new Date())
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

  const getPrice = () => {
    if (isRental) {
      return product.price.rental[rentalPeriod] * quantity
    }
    return product.price.purchase * quantity
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: getPrice(),
      quantity,
      isRental,
      ...(isRental && {
        rentalPeriod,
        rentalDate,
      }),
    })
  }

  // Ustaw minimalną datę jako dzisiaj
  const today = new Date()
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="product__actions">
      <div className="product__actions-tabs">
        <button
          className={`product__actions-tab ${isRental ? 'product__actions-tab--active' : 'product__actions-tab--inactive'}`}
          onClick={() => setIsRental(true)}
        >
          Wypożyczenie
        </button>
        <button
          className={`product__actions-tab ${!isRental ? 'product__actions-tab--active' : 'product__actions-tab--inactive'}`}
          onClick={() => setIsRental(false)}
        >
          Zakup
        </button>
      </div>

      {isRental && (
        <div className="product__rental-form product__rental-form--two-columns">
          <div className="product__rental-field">
            <label className="product__rental-label">Okres wypożyczenia</label>
            <select
              value={rentalPeriod}
              onChange={e => setRentalPeriod(e.target.value)}
              className="product__rental-select"
            >
              {rentalOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label} ({option.price} zł)
                </option>
              ))}
            </select>
          </div>

          <div className="product__rental-field">
            <label className="product__rental-label">Data wypożyczenia</label>
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

      <div className="product__quantity-container">
        <label className="product__rental-label">Ilość</label>
        <div className="product__quantity">
          <button
            className="product__quantity-button"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="product__quantity-value">{quantity}</span>
          <button
            className="product__quantity-button"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      <div className="product__summary">
        <span className="product__summary-label">Suma:</span>
        <span className="product__price">{getPrice()} zł</span>
      </div>

      <button
        className={`product__button ${
          product.isAvailable ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-600 cursor-not-allowed'
        }`}
        disabled={!product.isAvailable}
        onClick={handleAddToCart}
      >
        Dodaj do koszyka
      </button>

      <div className="product__info-bottom">
        <div className="product__info-bottom-row">
          <span role="img" aria-label="delivery">
            🚚
          </span>
          <span>Dostawa od 1zł w 24h</span>
        </div>
        <div className="product__info-bottom-row">
          <span role="img" aria-label="support">
            👨‍💻
          </span>
          <span>Pomoc techniczna 24/7</span>
        </div>
      </div>
    </div>
  )
}

export default ProductActions
