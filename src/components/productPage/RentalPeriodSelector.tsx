import { type FC, useState } from 'react'
import QuantityControl from '../ui/quantity-control'

interface RentalPeriodSelectorProps {
  from: Date
  to: Date
  onChange: (from: Date, to: Date) => void
}

export const RentalPeriodSelector: FC<RentalPeriodSelectorProps> = ({ from, to, onChange }) => {
  const [startDate, setStartDate] = useState(from)
  const [endDate, setEndDate] = useState(to)

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
        <label className="rental-period-selector__label" htmlFor="start-date-input">
          Od
        </label>
        <QuantityControl
          value={
            <>
              <input
                type="date"
                className="rental-period-selector__date-input"
                value={formatDateForInput(startDate)}
                min={formatDateForInput(new Date())}
                max={formatDateForInput(endDate)}
                onChange={e => {
                  const newDate = new Date(e.target.value)
                  handleStartChange(newDate)
                }}
                aria-label="Data początkowa wypożyczenia"
                tabIndex={0}
                id="start-date-input"
              />
            </>
          }
          onDecrease={() => handleStartChange(addDays(startDate, -1))}
          onIncrease={() => handleStartChange(addDays(startDate, 1))}
          decreaseLabel="Poprzedni dzień"
          increaseLabel="Następny dzień"
          valueClassName="quantity-control__value--date"
        />
      </div>

      <div className="rental-period-selector__field">
        <label className="rental-period-selector__label" htmlFor="end-date-input">
          Do
        </label>
        <QuantityControl
          value={
            <>
              <input
                type="date"
                className="rental-period-selector__date-input"
                value={formatDateForInput(endDate)}
                min={formatDateForInput(startDate)}
                onChange={e => {
                  const newDate = new Date(e.target.value)
                  handleEndChange(newDate)
                }}
                aria-label="Data końcowa wypożyczenia"
                tabIndex={0}
                id="end-date-input"
              />
            </>
          }
          onDecrease={() => handleEndChange(addDays(endDate, -1))}
          onIncrease={() => handleEndChange(addDays(endDate, 1))}
          decreaseLabel="Poprzedni dzień"
          increaseLabel="Następny dzień"
          valueClassName="quantity-control__value--date"
        />
      </div>
    </div>
  )
}

export default RentalPeriodSelector
