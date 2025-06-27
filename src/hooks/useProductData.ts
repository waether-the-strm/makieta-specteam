import { useParams } from 'react-router-dom'

import { type ProductData } from '../components/productPage'
import { getFaqsForCategory } from '../data/faqs'
import { categories } from '../data/categories'

const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

export const useProductData: () => ProductData | undefined = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  const category = categories.find(cat => cat.title.toLowerCase() === categoryId?.toLowerCase())
  if (!category) return undefined

  const dailyPrice = parsePrice(category.price)

  return {
    id: category.title.toLowerCase(),
    name: category.title,
    category: category.title,
    description: category.description || 'Brak opisu.',
    priceString: category.price,
    price: {
      rental: {
        daily: dailyPrice,
        weekly: dailyPrice * 5,
        monthly: dailyPrice * 15,
      },
      purchase: dailyPrice * 30,
    },
    images: category.images || [],
    features: [`Główna cecha: ${category.subtitle}`],
    faq: getFaqsForCategory(category.title),
    specs: category.specs || [],
    rating: 4.5,
    isAvailable: !category.price.includes('brak'),
  }
}
