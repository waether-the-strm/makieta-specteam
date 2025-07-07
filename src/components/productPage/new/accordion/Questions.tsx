import { type FC, useState } from 'react'
import { Separator } from '@radix-ui/react-separator'
import { ChevronUp, ChevronDown } from 'lucide-react'

import { questions } from '../data'

export const Questions: FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="product-questions">
      {questions.slice(0, showAll ? questions.length : 3).map((item, index) => (
        <div key={index} className="product-questions__item">
          <div className="product-questions__box">
            <div className="product-questions__question">{item.q}</div>
            <div className="product-questions__answer">{item.a}</div>
          </div>
          {index < (showAll ? questions.length - 1 : 2) && (
            <Separator className="product-questions__separator" />
          )}
        </div>
      ))}
      <button onClick={() => setShowAll(!showAll)} className="product-questions__toggle">
        {showAll ? (
          <>
            <ChevronUp className="product-questions__icon" />
            Pokaż mniej
          </>
        ) : (
          <>
            <ChevronDown className="product-questions__icon" />
            Pokaż wszystkie {questions.length} pytań
          </>
        )}
      </button>
    </div>
  )
}
