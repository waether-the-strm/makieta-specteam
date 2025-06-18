import React, { useState, ReactNode } from 'react'
import { CartItem, getCartItemKey } from './cartTypes'
import { CartContext } from './CartContext'

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null)

  const addItem = (newItem: CartItem) => {
    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(
      item =>
        item.id === newItem.id &&
        item.isRental === newItem.isRental &&
        item.rentalPeriod === newItem.rentalPeriod &&
        item.rentalDate?.toDateString() === newItem.rentalDate?.toDateString()
    )

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedItems = [...items]
      updatedItems[existingItemIndex].quantity += newItem.quantity
      setItems(updatedItems)
      setLastAddedItem(updatedItems[existingItemIndex])
    } else {
      // Add new item
      setItems([...items, newItem])
      setLastAddedItem(newItem)
    }

    // Show notification
    setShowNotification(true)

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const removeItem = (key: string) => {
    setItems(items => items.filter(item => getCartItemKey(item) !== key))
  }

  const hideNotification = () => {
    setShowNotification(false)
  }

  const updateItemQuantity = (key: string, quantity: number) => {
    setItems(items =>
      items.map(item => (getCartItemKey(item) === key ? { ...item, quantity } : item))
    )
  }

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemQuantity,
        totalItems,
        showNotification,
        lastAddedItem,
        hideNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
