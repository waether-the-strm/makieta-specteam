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
          className="fixed bottom-4 right-4 max-w-xs w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        >
          <div className="px-4 py-3 bg-rose-600 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart size={18} className="mr-2" />
              <span className="font-medium">Dodano do koszyka</span>
            </div>
            <button
              onClick={hideNotification}
              className="text-white hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4">
            <div className="font-medium text-white mb-1">{lastAddedItem.name}</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>Ilość: {lastAddedItem.quantity}</div>
              {lastAddedItem.isRental && (
                <>
                  <div>Okres: {rentalPeriodLabel}</div>
                  {lastAddedItem.rentalDate && (
                    <div>Od: {formatDate(lastAddedItem.rentalDate)}</div>
                  )}
                </>
              )}
              <div className="font-medium text-white pt-1">Cena: {lastAddedItem.price} zł</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartNotification
