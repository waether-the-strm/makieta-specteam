import React, { useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { X } from 'lucide-react'

interface CartSummaryDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CartSummaryDrawer: React.FC<CartSummaryDrawerProps> = ({ isOpen, onClose }) => {
  const { items } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Zamknięcie ESC
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Zamknięcie kliknięciem poza drawerem
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-summary__overlay cart-summary__overlay--fade-in"
        aria-hidden="true"
        data-testid="cart-summary-overlay"
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="cart-summary cart-summary--drawer cart-summary--slide-in"
        style={{ minWidth: 320 }}
        role="dialog"
        aria-modal="true"
        data-testid="cart-summary-modal"
      >
        <button
          className="cart-summary__close"
          onClick={onClose}
          aria-label="Zamknij koszyk"
          data-testid="cart-summary-close"
        >
          <X className="cart-summary__close-icon" />
        </button>
        <h2 className="cart-summary__title">Twój koszyk</h2>
        <div className="cart-summary__content">
          {items.length === 0 ? (
            <div className="cart-summary__empty">
              <div className="cart-summary__empty-icon" aria-hidden="true">
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="cart-summary__empty-svg"
                >
                  <circle cx="12" cy="19" r="1.5" />
                  <circle cx="7" cy="19" r="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2H21l-2.5 9H7.1l-.6-3H19"
                  />
                </svg>
              </div>
              <div className="cart-summary__empty-title">Twój koszyk jest pusty</div>
              <div className="cart-summary__empty-desc">
                Dodaj coś do koszyka, aby rozpocząć zamówienie!
              </div>
            </div>
          ) : (
            <>
              <ul className="cart-summary__list">
                {items.map(item => (
                  <li key={item.id} className="cart-summary__item">
                    <div className="cart-summary__item-row">
                      <span className="cart-summary__item-name">{item.name}</span>
                      <span className="cart-summary__item-price">
                        {item.price * item.quantity} zł
                      </span>
                    </div>
                    <div className="cart-summary__item-details">
                      <span>
                        Ilość: <span className="cart-summary__item-quantity">{item.quantity}</span>
                      </span>
                      <span>
                        Typ:{' '}
                        <span className="cart-summary__item-type">
                          {item.isRental ? 'Wypożyczenie' : 'Zakup'}
                        </span>
                      </span>
                      {item.isRental && item.rentalPeriod && (
                        <span>
                          Okres:{' '}
                          <span className="cart-summary__item-period">{item.rentalPeriod}</span>
                        </span>
                      )}
                      {item.isRental && item.rentalDate && (
                        <span>
                          Data:{' '}
                          <span className="cart-summary__item-date">
                            {item.rentalDate instanceof Date
                              ? item.rentalDate.toLocaleDateString()
                              : String(item.rentalDate)}
                          </span>
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary__total-row">
                <span className="cart-summary__total-label">Suma:</span>
                <span className="cart-summary__total-value">{total} zł</span>
              </div>
            </>
          )}
        </div>
        <div className="cart-summary__actions">
          <button
            className="cart-summary__checkout-btn"
            disabled={items.length === 0}
            onClick={() => {
              /* przejście do kasy */
            }}
            data-testid="cart-summary-checkout"
          >
            Przejdź do kasy
          </button>
          <a href="/cart" className="cart-summary__full-link" data-testid="cart-summary-full-link">
            Zobacz pełny koszyk
          </a>
        </div>
      </div>
    </>
  )
}

export default CartSummaryDrawer
