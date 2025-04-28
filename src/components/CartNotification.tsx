import React from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../hooks/useCart'

const CartNotification: React.FC = () => {
  const { showNotification, lastAddedItem, hideNotification } = useCart()

  if (!lastAddedItem) return null

  const rentalPeriodLabel =
    lastAddedItem.rentalPeriod === 'daily'
      ? '1 dzień'
      : lastAddedItem.rentalPeriod === 'weekly'
        ? '7 dni'
        : '30 dni'

  const formatDate = (date?: Date) => {
    if (!date) return ''
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          className="cart-notification"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        >
          <div className="cart-notification__header">
            <div className="cart-notification__header-content">
              <ShoppingCart size={18} className="cart-notification__header-icon" />
              <span className="cart-notification__header-title">Dodano do koszyka</span>
            </div>
            <button onClick={hideNotification} className="cart-notification__close">
              <X size={18} />
            </button>
          </div>
          <div className="cart-notification__body">
            <div className="cart-notification__item-name">{lastAddedItem.name}</div>
            <div className="cart-notification__item-details">
              <div>Ilość: {lastAddedItem.quantity}</div>
              {lastAddedItem.isRental && (
                <>
                  <div>Okres: {rentalPeriodLabel}</div>
                  {lastAddedItem.rentalDate && (
                    <div>Od: {formatDate(lastAddedItem.rentalDate)}</div>
                  )}
                </>
              )}
              <div className="cart-notification__item-price">Cena: {lastAddedItem.price} zł</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartNotification
