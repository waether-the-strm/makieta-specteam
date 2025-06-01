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
  showRemoveInline?: boolean
}

const CartSummaryItem: React.FC<CartSummaryItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
  getCartItemKey,
  getRentalPeriodText,
  formatDate,
  isRentalSection = false,
  showRemoveInline = false,
}) => {
  return (
    <li key={getCartItemKey(item)} className="cart-summary__item">
      {/* 1. Nazwa i szczegóły */}
      <div className="cart-summary__item-row cart-summary__item-row--name">
        <div className="cart-summary__item-name-columns">
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-summary__item-thumbnail"
              width={48}
              height={48}
            />
          )}
          <div className="cart-summary__item-title-details">
            <span className="text-label-lg">{item.name}</span>
            {isRentalSection && item.rentalPeriod && (
              <div className="cart-summary__item-meta text-meta">
                {getRentalPeriodText(item.rentalPeriod, 1)}
                {item.rentalDate && <> od {formatDate(item.rentalDate)}</>}
              </div>
            )}
          </div>
        </div>
        {/* Ikona kosza w prawym górnym rogu, jeśli showRemoveInline === false */}
        {!showRemoveInline && (
          <button
            className="cart-summary__item-remove cart-summary__item-remove--absolute"
            title="Usuń z koszyka"
            onClick={() => onRemove(item)}
            tabIndex={0}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
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
            {/* Ikona kosza inline, jeśli showRemoveInline === true */}
            {showRemoveInline && (
              <button
                className="cart-summary__item-remove cart-summary__item-remove--inline"
                title="Usuń z koszyka"
                onClick={() => onRemove(item)}
                tabIndex={0}
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartSummaryItem
