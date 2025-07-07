import { type FC, useState } from 'react'

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
      <label htmlFor="start-date-input" className="rental-period-selector__label">
        Od
      </label>

      <div className="rental-period-selector__field">
        <div className="rental-period-selector__group">
          <button
            className="rental-period-selector__btn rental-period-selector__btn--left"
            aria-label="Poprzedni dzień początkowy"
            onClick={() => handleStartChange(addDays(startDate, -1))}
            tabIndex={0}
            type="button"
          >
            –
          </button>

          <input
            type="date"
            className="rental-period-selector__date-input"
            value={formatDateForInput(startDate)}
            min={formatDateForInput(new Date())}
            onChange={e => handleStartChange(new Date(e.target.value))}
            aria-label="Data początkowa"
            id="start-date-input"
          />
          <button
            className="rental-period-selector__btn rental-period-selector__btn--right"
            aria-label="Następny dzień początkowy"
            onClick={() => handleStartChange(addDays(startDate, 1))}
            tabIndex={0}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <label htmlFor="end-date-input" className="rental-period-selector__label">
        Do
      </label>
      <div className="rental-period-selector__field">
        <div className="rental-period-selector__group">
          <button
            className="rental-period-selector__btn rental-period-selector__btn--left"
            aria-label="Poprzedni dzień końcowy"
            onClick={() => handleEndChange(addDays(endDate, -1))}
            tabIndex={0}
            type="button"
          >
            –
          </button>
          <input
            type="date"
            className="rental-period-selector__date-input"
            value={formatDateForInput(endDate)}
            min={formatDateForInput(startDate)}
            onChange={e => handleEndChange(new Date(e.target.value))}
            aria-label="Data końcowa"
            id="end-date-input"
          />
          <button
            className="rental-period-selector__btn rental-period-selector__btn--right"
            aria-label="Następny dzień końcowy"
            onClick={() => handleEndChange(addDays(endDate, 1))}
            tabIndex={0}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentalPeriodSelector
