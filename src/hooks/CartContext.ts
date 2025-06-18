import { createContext } from 'react'
import type { CartItem } from './cartTypes'

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

export const CartContext = createContext<CartContextType | undefined>(undefined)
