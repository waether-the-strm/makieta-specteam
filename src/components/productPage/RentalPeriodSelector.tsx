import React, { useState } from 'react'
import { Calendar } from 'lucide-react'

interface RentalPeriodSelectorProps {
  from: Date
  to: Date
  onChange: (from: Date, to: Date) => void
}

export const RentalPeriodSelector: React.FC<RentalPeriodSelectorProps> = ({
  from,
  to,
  onChange,
}) => {
  const [startDate, setStartDate] = useState(from)
  const [endDate, setEndDate] = useState(to)
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const handleStartChange = (date: Date) => {
    setStartDate(date)
    if (date > endDate) setEndDate(date)
    onChange(date, date > endDate ? date : endDate)
  }

  const handleEndChange = (date: Date) => {
    setEndDate(date)
    if (date < startDate) setStartDate(date)
    onChange(date < startDate ? date : startDate, date)
  }

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="product__form-label">Wypożyczenie od</label>
      <div className="product__quantity w-full">
        <button
          type="button"
          className="product__quantity-button"
          style={{ flex: 'none' }}
          onClick={() => handleStartChange(addDays(startDate, -1))}
          aria-label="Poprzedni dzień"
        >
          -
        </button>
        <div
          className="product__quantity-value flex items-center justify-center gap-2 cursor-pointer select-none min-w-[8.5rem]"
          tabIndex={0}
          role="button"
          onClick={() => setShowStartPicker(true)}
        >
          {startDate.toLocaleDateString('pl-PL')}
          <Calendar className="ml-2 text-slate-400" size={20} />
          {showStartPicker && (
            <input
              type="date"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white rounded p-2 z-10 shadow-lg"
              value={formatDateForInput(startDate)}
              min={formatDateForInput(new Date())}
              max={formatDateForInput(endDate)}
              autoFocus
              onBlur={() => setShowStartPicker(false)}
              onChange={e => {
                const newDate = new Date(e.target.value)
                handleStartChange(newDate)
                setShowStartPicker(false)
              }}
              data-testid="start-date-input"
              style={{ minWidth: 120 }}
            />
          )}
        </div>
        <button
          type="button"
          className="product__quantity-button"
          style={{ flex: 'none' }}
          onClick={() => handleStartChange(addDays(startDate, 1))}
          aria-label="Następny dzień"
        >
          +
        </button>
      </div>
      <label className="product__form-label mt-4">Wypożyczenie do</label>
      <div className="product__quantity w-full">
        <button
          type="button"
          className="product__quantity-button"
          style={{ flex: 'none' }}
          onClick={() => handleEndChange(addDays(endDate, -1))}
          aria-label="Poprzedni dzień"
        >
          -
        </button>
        <div
          className="product__quantity-value flex items-center justify-center gap-2 cursor-pointer select-none min-w-[8.5rem]"
          tabIndex={0}
          role="button"
          onClick={() => setShowEndPicker(true)}
        >
          {endDate.toLocaleDateString('pl-PL')}
          <Calendar className="ml-2 text-slate-400" size={20} />
          {showEndPicker && (
            <input
              type="date"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white rounded p-2 z-10 shadow-lg"
              value={formatDateForInput(endDate)}
              min={formatDateForInput(startDate)}
              autoFocus
              onBlur={() => setShowEndPicker(false)}
              onChange={e => {
                const newDate = new Date(e.target.value)
                handleEndChange(newDate)
                setShowEndPicker(false)
              }}
              data-testid="end-date-input"
              style={{ minWidth: 120 }}
            />
          )}
        </div>
        <button
          type="button"
          className="product__quantity-button"
          style={{ flex: 'none' }}
          onClick={() => handleEndChange(addDays(endDate, 1))}
          aria-label="Następny dzień"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default RentalPeriodSelector
