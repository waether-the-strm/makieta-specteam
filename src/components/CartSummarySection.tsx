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
        <h3 className="text-title-section">{title}</h3>
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
      <div className="cart-summary__section-total text-slate-500">
        {/* <span>{isRentalSection ? 'Razem wypożyczenia:' : 'Razem zakupy:'}</span> */}
        <hr className="border-slate-700 flex-1 border-t mr-5 " /> {/* TODO: tailwind hr */}
        <span>{sectionTotal} zł</span>
      </div>
    </div>
  )
}

export default CartSummarySection
