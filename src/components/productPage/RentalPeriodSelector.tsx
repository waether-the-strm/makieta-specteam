import React, { useState } from 'react'
import { Calendar } from 'lucide-react'
import QuantityControl from '../ui/quantity-control'

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
    <div className="rental-period-selector">
      <div className="rental-period-selector__field">
        <label className="rental-period-selector__label">Wypożyczenie od</label>
        <QuantityControl
          value={
            <>
              {startDate.toLocaleDateString('pl-PL')}
              <Calendar className="rental-period-selector__icon" size={20} />
            </>
          }
          onDecrease={() => handleStartChange(addDays(startDate, -1))}
          onIncrease={() => handleStartChange(addDays(startDate, 1))}
          onValueClick={() => setShowStartPicker(true)}
          decreaseLabel="Poprzedni dzień"
          increaseLabel="Następny dzień"
          valueClassName="quantity-control__value--date"
        >
          {showStartPicker && (
            <input
              type="date"
              className="rental-period-selector__date-input"
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
            />
          )}
        </QuantityControl>
      </div>

      <div className="rental-period-selector__field">
        <label className="rental-period-selector__label">Wypożyczenie do</label>
        <QuantityControl
          value={
            <>
              {endDate.toLocaleDateString('pl-PL')}
              <Calendar className="rental-period-selector__icon" size={20} />
            </>
          }
          onDecrease={() => handleEndChange(addDays(endDate, -1))}
          onIncrease={() => handleEndChange(addDays(endDate, 1))}
          onValueClick={() => setShowEndPicker(true)}
          decreaseLabel="Poprzedni dzień"
          increaseLabel="Następny dzień"
          valueClassName="quantity-control__value--date"
        >
          {showEndPicker && (
            <input
              type="date"
              className="rental-period-selector__date-input"
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
            />
          )}
        </QuantityControl>
      </div>
    </div>
  )
}

export default RentalPeriodSelector
