import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  rentalPeriod?: string
  rentalDate?: Date
  isRental: boolean
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (key: string) => void
  updateItemQuantity: (key: string, quantity: number) => void
  totalItems: number
  showNotification: boolean
  lastAddedItem: CartItem | null
  hideNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

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

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const getCartItemKey = (item: CartItem): string => {
  return [
    item.id,
    item.isRental,
    item.rentalPeriod,
    item.rentalDate instanceof Date ? item.rentalDate.toISOString() : item.rentalDate,
  ].join('|')
}
