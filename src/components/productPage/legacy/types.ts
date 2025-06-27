export enum ProductTab {
  FAQ = 'faq',
  SPECS = 'specs',
}

export interface ProductFAQ {
  question: string
  answer: string
}
export interface ProductSpec {
  label: string
  value: string
}

export interface ProductInfoPanelProps {
  productData: {
    id: string
    name: string
    category: string
    description: string
    priceString: string
    price: {
      rental: {
        daily: number
        weekly: number
        monthly: number
      }
      purchase: number
    }
    images: string[]
    features: string[]
    faq: ProductFAQ[]
    specs: ProductSpec[]
    rating: number
    isAvailable: boolean
  }
}
