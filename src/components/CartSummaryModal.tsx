import React, { useEffect, useRef } from 'react'
import { useCart } from '../hooks/useCart'
import { X, Calendar, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CartItem } from '../hooks/useCart'
import { getCartItemKey } from '../hooks/useCart'
import CartSummarySection from './CartSummarySection'

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
                  {rentalItems.length > 0 && (
                    <CartSummarySection
                      title="Wypożyczenie"
                      icon={<Calendar size={16} className="cart-summary__section-icon" />}
                      items={rentalItems}
                      isRentalSection={true}
                      sectionTotal={rentalTotal}
                      onRemove={handleRemoveItem}
                      onQuantityChange={updateItemQuantity}
                      getCartItemKey={getCartItemKey}
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
                      onRemove={handleRemoveItem}
                      onQuantityChange={updateItemQuantity}
                      getCartItemKey={getCartItemKey}
                      getRentalPeriodText={getRentalPeriodText}
                      formatDate={formatDate}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="cart-summary__actions">
              <div className="cart-summary__total">
                <span className="text-label-lg">Suma:</span>
                <span className="text-value-xl-bold">{total} zł</span>
              </div>
              <button
                className="btn-action-primary"
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
