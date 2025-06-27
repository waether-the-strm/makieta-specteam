import { ProductFAQ, ProductSpec } from './legacy'

interface ProductPrice {
  rental: {
    daily: number
    weekly: number
    monthly: number
  }
  purchase: number
}

export interface ProductData {
  id: string
  name: string
  category: string
  description: string
  priceString: string
  price: ProductPrice
  images: string[]
  features: string[]
  faq: ProductFAQ[]
  specs: ProductSpec[]
  rating: number
  isAvailable: boolean
}
