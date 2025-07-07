import { type FC, useState } from 'react'

import { Card, CardContent } from '@/components/ui'
import { ChevronUp, ChevronDown, Star } from 'lucide-react'

import { reviews } from '../data'

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`product-reviews__star${i < rating ? ' product-reviews__star--filled' : ' product-reviews__star--empty'}`}
    />
  ))
}

export const Reviews: FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="product-reviews">
      {reviews.slice(0, showAll ? reviews.length : 3).map((review, index) => (
        <Card key={index} className="product-reviews__card">
          <CardContent className="product-reviews__content">
            <div className="product-reviews__header">
              <div className="product-reviews__stars">{renderStars(review.rating)}</div>
              <span className="product-reviews__name">{review.name}</span>
            </div>
            <p className="product-reviews__text">"{review.text}"</p>
          </CardContent>
        </Card>
      ))}
      <button onClick={() => setShowAll(!showAll)} className="product-reviews__toggle">
        {showAll ? (
          <>
            <ChevronUp className="product-reviews__icon" />
            Pokaż mniej
          </>
        ) : (
          <>
            <ChevronDown className="product-reviews__icon" />
            Pokaż wszystkie {reviews.length} opinii
          </>
        )}
      </button>
    </div>
  )
}
