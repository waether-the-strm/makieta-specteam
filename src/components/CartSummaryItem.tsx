import React from 'react'
import { Trash2 } from 'lucide-react'
import type { CartItem } from '../hooks/useCart'

interface CartSummaryItemProps {
  item: CartItem
  onRemove: (item: CartItem) => void
  onQuantityChange: (key: string, newQty: number) => void
  getCartItemKey: (item: CartItem) => string
  getRentalPeriodText: (period: string, quantity: number) => string
  formatDate: (date: Date | string) => string
  isRentalSection?: boolean
}

const CartSummaryItem: React.FC<CartSummaryItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
  getCartItemKey,
  getRentalPeriodText,
  formatDate,
  isRentalSection = false,
}) => {
  return (
    <li key={getCartItemKey(item)} className="cart-summary__item">
      {/* 1. Nazwa */}
      <div className="cart-summary__item-row cart-summary__item-row--name">
        <span className="cart-summary__item-name">{item.name}</span>
        <button
          className="cart-summary__item-remove"
          title="Usuń z koszyka"
          onClick={() => onRemove(item)}
          tabIndex={0}
        >
          <Trash2 size={18} />
        </button>
      </div>
      {/* 2. Okres/metadane */}
      {isRentalSection ? (
        <div className="cart-summary__item-row cart-summary__item-row--meta">
          <div className="cart-summary__item-period">
            {item.rentalPeriod && (
              <>
                {getRentalPeriodText(item.rentalPeriod, 1)}
                {item.rentalDate && <> od {formatDate(item.rentalDate)}</>}
              </>
            )}
          </div>
        </div>
      ) : null}
      {/* 3. Ilość + kontrolki + cena  */}
      <div className="cart-summary__item-row cart-summary__item-row--qty">
        <div className="cart-summary__item-row-qty-inner">
          <div className="cart-summary__item-row-qty-controls">
            <button
              className="cart-summary__quantity-btn"
              aria-label="Zmniejsz ilość"
              onClick={() => onQuantityChange(getCartItemKey(item), Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              data-testid={`cart-item-qty-decrease-${getCartItemKey(item)}`}
            >
              -
            </button>
            <span className="cart-summary__quantity-value">{item.quantity}</span>
            <button
              className="cart-summary__quantity-btn"
              aria-label="Zwiększ ilość"
              onClick={() =>
                onQuantityChange(getCartItemKey(item), Math.min(10, item.quantity + 1))
              }
              disabled={item.quantity >= 10}
              data-testid={`cart-item-qty-increase-${getCartItemKey(item)}`}
            >
              +
            </button>
            <span className="cart-summary__item-unit">szt.</span>
          </div>
          <div className="cart-summary__item-row-qty-right">
            <div className="cart-summary__item-price">{item.price * item.quantity} zł</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartSummaryItem
