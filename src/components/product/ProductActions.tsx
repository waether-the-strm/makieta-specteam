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
      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            isRental ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
          onClick={() => setIsRental(true)}
        >
          Wypożyczenie
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            !isRental ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
          onClick={() => setIsRental(false)}
        >
          Zakup
        </button>
      </div>

      {isRental && (
        <>
          <div className="mb-6">
            <label className="block text-slate-300 mb-2">Okres wypożyczenia</label>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={rentalPeriod}
                onChange={e => setRentalPeriod(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
              >
                {rentalOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label} ({option.price} zł)
                  </option>
                ))}
              </select>

              <div className="relative w-full">
                <label className="block text-slate-300 mb-2">Data wypożyczenia</label>
                <div className="relative">
                  <input
                    type="date"
                    min={formatDateForInput(today)}
                    value={formatDateForInput(rentalDate)}
                    onChange={e => setRentalDate(new Date(e.target.value))}
                    className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none"
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mb-6">
        <label className="block text-slate-300 mb-2">Ilość</label>
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

      <div className="flex items-center justify-between mb-6">
        <span className="text-slate-300">Suma:</span>
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

      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-slate-400">
          <span role="img" aria-label="delivery">
            🚚
          </span>
          <span>Dostawa od 1zł w 24h</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
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
