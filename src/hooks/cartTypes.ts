export interface Discount {
  code: string
  value: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  rentalPeriod?: string
  rentalDate?: Date
  isRental: boolean
  imageUrl?: string
  deposit?: number
  discounts?: Discount[]
}

export const getCartItemKey = (item: CartItem): string => {
  return [
    item.id,
    item.isRental,
    item.rentalPeriod,
    item.rentalDate instanceof Date ? item.rentalDate.toISOString() : item.rentalDate,
  ].join('|')
}
