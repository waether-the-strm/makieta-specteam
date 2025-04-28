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
        className="fixed inset-0 z-40 bg-black/40 transition-opacity animate-fadeIn"
        aria-hidden="true"
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-full w-full max-w-[400px] bg-slate-800 shadow-2xl border-l border-slate-700 flex flex-col animate-cartDrawerDrawer sm:w-[400px] sm:max-w-full"
        style={{ minWidth: 320 }}
        role="dialog"
        aria-modal="true"
        data-testid="cart-summary-modal"
      >
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
          onClick={onClose}
          aria-label="Zamknij koszyk"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white px-6 pt-6">Twój koszyk</h2>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {items.length === 0 ? (
            <p className="text-slate-300">Koszyk jest pusty.</p>
          ) : (
            <ul className="divide-y divide-slate-700 mb-4">
              {items.map(item => (
                <li key={item.id} className="py-2 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-rose-400 font-bold">{item.price * item.quantity} zł</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400 mt-1">
                    <span>
                      Ilość: <span className="text-white font-semibold">{item.quantity}</span>
                    </span>
                    <span>
                      Typ:{' '}
                      <span className="text-white font-semibold">
                        {item.isRental ? 'Wypożyczenie' : 'Zakup'}
                      </span>
                    </span>
                    {item.isRental && item.rentalPeriod && (
                      <span>
                        Okres: <span className="text-white font-semibold">{item.rentalPeriod}</span>
                      </span>
                    )}
                    {item.isRental && item.rentalDate && (
                      <span>
                        Data:{' '}
                        <span className="text-white font-semibold">
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
          )}
          <div className="flex justify-between items-center mt-4">
            <span className="text-slate-300">Suma:</span>
            <span className="text-white text-xl font-bold">{total} zł</span>
          </div>
        </div>
        <div className="px-6 pb-6 flex flex-col gap-2">
          <button
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-medium"
            disabled={items.length === 0}
            onClick={() => {
              /* przejście do kasy */
            }}
          >
            Przejdź do kasy
          </button>
          <a href="/cart" className="w-full text-center text-rose-400 hover:underline text-sm">
            Zobacz pełny koszyk
          </a>
        </div>
      </div>
    </>
  )
}

export default CartSummaryDrawer
