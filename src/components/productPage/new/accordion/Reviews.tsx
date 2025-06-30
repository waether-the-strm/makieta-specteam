import { type FC, useState } from 'react'

import { Card, CardContent } from '@/components/ui'
import { ChevronUp, ChevronDown, Star } from 'lucide-react'

import { reviews } from '../data'

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < rating ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`}
    />
  ))
}

export const Reviews: FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="space-y-4">
      {reviews.slice(0, showAll ? reviews.length : 3).map((review, index) => (
        <Card key={index} className="bg-slate-600 border-slate-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">{renderStars(review.rating)}</div>
              <span className="font-medium text-rose-400">{review.name}</span>
            </div>
            <p className="text-slate-100 italic whitespace-pre-line">"{review.text}"</p>
          </CardContent>
        </Card>
      ))}
      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium mt-4"
      >
        {showAll ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Pokaż mniej
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Pokaż wszystkie {reviews.length} opinii
          </>
        )}
      </button>
    </div>
  )
}
