import { type FC, useState } from 'react'
import { Separator } from '@radix-ui/react-separator'
import { ChevronUp, ChevronDown } from 'lucide-react'

import { questions } from '../data'

export const Questions: FC = () => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="space-y-6">
      {questions.slice(0, showAll ? questions.length : 3).map((item, index) => (
        <div key={index} className="space-y-3">
          <div className="border-l-4 border-rose-500 pl-4 py-2">
            <div className="font-medium text-rose-400 mb-2">{item.q}</div>
            <div className="text-slate-100">{item.a}</div>
          </div>
          {index < (showAll ? questions.length - 1 : 2) && <Separator className="bg-slate-600" />}
        </div>
      ))}
      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium mt-6"
      >
        {showAll ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Pokaż mniej
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Pokaż wszystkie {questions.length} pytań
          </>
        )}
      </button>
    </div>
  )
}
