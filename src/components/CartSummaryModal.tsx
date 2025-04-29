import React, { useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { X, Trash2, Calendar, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CartItem } from '../hooks/useCart'
import { getCartItemKey } from '../hooks/useCart'

interface CartSummaryDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Define motion variants for the drawer fade/scale animation
const drawerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Start slightly scaled down
  },
  visible: {
    opacity: 1,
    scale: 1, // Scale up to full size
    transition: {
      duration: 0.25, // Adjust duration as needed
      ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95, // Scale down on exit
    transition: {
      duration: 0.2, // Faster exit
      ease: [0.4, 0, 1, 1], // Different ease for exit
    },
  },
}

const CartSummaryDrawer: React.FC<CartSummaryDrawerProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateItemQuantity } = useCart()
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

  // Podział elementów na wypożyczenia i zakupy
  const rentalItems = items.filter(item => item.isRental)
  const purchaseItems = items.filter(item => !item.isRental)

  // Obliczenie sum dla poszczególnych sekcji i sumy całkowitej
  const rentalTotal = rentalItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const purchaseTotal = purchaseItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = rentalTotal + purchaseTotal

  // Format daty w czytelny sposób
  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    return String(date)
  }

  // Funkcja pomocnicza do określenia odpowiedniego tekstu dla okresu wypożyczenia
  const getRentalPeriodText = (period: string, quantity: number) => {
    if (period === 'daily') return quantity === 1 ? '1 dzień' : `${quantity} dni`
    if (period === 'weekly') return quantity === 1 ? '1 tydzień' : `${quantity} tygodni`
    if (period === 'monthly') return quantity === 1 ? '1 miesiąc' : `${quantity} miesięcy`
    return period
  }

  // 2. Popraw funkcję removeItem, aby przyjmowała pełny klucz pozycji
  const handleRemoveItem = (item: CartItem) => {
    // Usuwamy po wszystkich właściwościach, nie tylko id
    removeItem(getCartItemKey(item))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="cart-summary__overlay cart-summary__overlay--fade-in"
            aria-hidden="true"
            data-testid="cart-summary-overlay"
            onClick={onClose}
          />
          {/* Drawer - Animate with Framer Motion (Scale/Fade) */}
          <motion.div
            ref={drawerRef}
            className="cart-summary cart-summary--drawer"
            role="dialog"
            aria-modal="true"
            data-testid="cart-summary-modal"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
                <div className="cart-summary__sections">
                  {/* SEKCJA WYPOŻYCZENIA */}
                  {rentalItems.length > 0 && (
                    <div className="cart-summary__section">
                      <div className="cart-summary__section-header">
                        <Calendar size={16} className="cart-summary__section-icon" />
                        <h3 className="cart-summary__section-title">Wypożyczenie</h3>
                      </div>
                      <ul className="cart-summary__items">
                        {rentalItems.map(item => (
                          <li key={getCartItemKey(item)} className="cart-summary__item">
                            {/* Kosz w prawym górnym rogu */}
                            <button
                              className="cart-summary__item-remove cart-summary__item-remove--corner"
                              title="Usuń z koszyka"
                              onClick={() => handleRemoveItem(item)}
                              tabIndex={0}
                            >
                              <Trash2 size={18} />
                            </button>
                            {/* 1. Nazwa */}
                            <div className="cart-summary__item-row cart-summary__item-row--name">
                              <span className="cart-summary__item-name">{item.name}</span>
                            </div>
                            {/* 2. Ilość + kontrolki */}
                            <div className="cart-summary__item-row cart-summary__item-row--qty">
                              <div className="cart-summary__item-row-qty-inner">
                                <div className="cart-summary__item-row-qty-controls">
                                  <button
                                    className="cart-summary__quantity-btn"
                                    aria-label="Zmniejsz ilość"
                                    onClick={() =>
                                      updateItemQuantity(
                                        getCartItemKey(item),
                                        Math.max(1, item.quantity - 1)
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    data-testid={`cart-item-qty-decrease-${getCartItemKey(item)}`}
                                  >
                                    -
                                  </button>
                                  <span className="cart-summary__quantity-value">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="cart-summary__quantity-btn"
                                    aria-label="Zwiększ ilość"
                                    onClick={() =>
                                      updateItemQuantity(
                                        getCartItemKey(item),
                                        Math.min(10, item.quantity + 1)
                                      )
                                    }
                                    disabled={item.quantity >= 10}
                                    data-testid={`cart-item-qty-increase-${getCartItemKey(item)}`}
                                  >
                                    +
                                  </button>
                                  <span className="cart-summary__item-unit">szt.</span>
                                </div>
                                <div className="cart-summary__item-price">
                                  {item.price * item.quantity} zł
                                </div>
                              </div>
                            </div>
                            {/* 3. Okres */}
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
                          </li>
                        ))}
                      </ul>
                      <div className="cart-summary__section-total">
                        <span>Razem wypożyczenia:</span>
                        <span>{rentalTotal} zł</span>
                      </div>
                    </div>
                  )}

                  {/* SEKCJA ZAKUPY */}
                  {purchaseItems.length > 0 && (
                    <div className="cart-summary__section">
                      <div className="cart-summary__section-header">
                        <ShoppingBag size={16} className="cart-summary__section-icon" />
                        <h3 className="cart-summary__section-title">Zakup</h3>
                      </div>
                      <ul className="cart-summary__items">
                        {purchaseItems.map(item => (
                          <li key={getCartItemKey(item)} className="cart-summary__item">
                            {/* Kosz w prawym górnym rogu */}
                            <button
                              className="cart-summary__item-remove cart-summary__item-remove--corner"
                              title="Usuń z koszyka"
                              onClick={() => handleRemoveItem(item)}
                              tabIndex={0}
                            >
                              <Trash2 size={18} />
                            </button>
                            {/* 1. Nazwa */}
                            <div className="cart-summary__item-row cart-summary__item-row--name">
                              <span className="cart-summary__item-name">{item.name}</span>
                            </div>
                            {/* 2. Ilość + kontrolki */}
                            <div className="cart-summary__item-row cart-summary__item-row--qty">
                              <div className="cart-summary__item-row-qty-inner">
                                <div className="cart-summary__item-row-qty-controls">
                                  <button
                                    className="cart-summary__quantity-btn"
                                    aria-label="Zmniejsz ilość"
                                    onClick={() =>
                                      updateItemQuantity(
                                        getCartItemKey(item),
                                        Math.max(1, item.quantity - 1)
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    data-testid={`cart-item-qty-decrease-${getCartItemKey(item)}`}
                                  >
                                    -
                                  </button>
                                  <span className="cart-summary__quantity-value">
                                    {item.quantity}
                                  </span>
                                  <button
                                    className="cart-summary__quantity-btn"
                                    aria-label="Zwiększ ilość"
                                    onClick={() =>
                                      updateItemQuantity(
                                        getCartItemKey(item),
                                        Math.min(10, item.quantity + 1)
                                      )
                                    }
                                    disabled={item.quantity >= 10}
                                    data-testid={`cart-item-qty-increase-${getCartItemKey(item)}`}
                                  >
                                    +
                                  </button>
                                  <span className="cart-summary__item-unit">szt.</span>
                                </div>
                                <div className="cart-summary__item-price">
                                  {item.price * item.quantity} zł
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="cart-summary__section-total">
                        <span>Razem zakupy:</span>
                        <span>{purchaseTotal} zł</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="cart-summary__actions">
              <div className="cart-summary__total">
                <span className="cart-summary__total-label">Suma:</span>
                <span className="cart-summary__total-value">{total} zł</span>
              </div>
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
              <a
                href="/cart"
                className="cart-summary__full-link"
                data-testid="cart-summary-full-link"
              >
                Zobacz pełny koszyk
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartSummaryDrawer
