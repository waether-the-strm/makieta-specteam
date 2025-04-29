import React from 'react'
import type { CartItem } from '../hooks/useCart'
import CartSummaryItem from './CartSummaryItem'

interface CartSummarySectionProps {
  title: string
  icon: React.ReactNode
  items: CartItem[]
  isRentalSection?: boolean
  sectionTotal: number
  onRemove: (item: CartItem) => void
  onQuantityChange: (key: string, newQty: number) => void
  getCartItemKey: (item: CartItem) => string
  getRentalPeriodText: (period: string, quantity: number) => string
  formatDate: (date: Date | string) => string
}

const CartSummarySection: React.FC<CartSummarySectionProps> = ({
  title,
  icon,
  items,
  isRentalSection = false,
  sectionTotal,
  onRemove,
  onQuantityChange,
  getCartItemKey,
  getRentalPeriodText,
  formatDate,
}) => {
  return (
    <div className="cart-summary__section">
      <div className="cart-summary__section-header">
        {icon}
        <h3 className="cart-summary__section-title">{title}</h3>
      </div>
      <ul className="cart-summary__items">
        {items.map(item => (
          <CartSummaryItem
            key={getCartItemKey(item)}
            item={item}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
            getCartItemKey={getCartItemKey}
            getRentalPeriodText={getRentalPeriodText}
            formatDate={formatDate}
            isRentalSection={isRentalSection}
          />
        ))}
      </ul>
      <div className="cart-summary__section-total">
        <span>{isRentalSection ? 'Razem wypożyczenia:' : 'Razem zakupy:'}</span>
        <span>{sectionTotal} zł</span>
      </div>
    </div>
  )
}

export default CartSummarySection
