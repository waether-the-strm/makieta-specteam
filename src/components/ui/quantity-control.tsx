import React from 'react'

interface QuantityControlProps {
  value: React.ReactNode
  onDecrease: () => void
  onIncrease: () => void
  onValueClick?: () => void
  decreaseDisabled?: boolean
  increaseDisabled?: boolean
  decreaseLabel?: string
  increaseLabel?: string
  valueClassName?: string
  children?: React.ReactNode
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  value,
  onDecrease,
  onIncrease,
  onValueClick,
  decreaseDisabled = false,
  increaseDisabled = false,
  decreaseLabel = 'Zmniejsz',
  increaseLabel = 'Zwiększ',
  valueClassName = '',
  children,
}) => {
  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-control__button"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={decreaseLabel}
      >
        -
      </button>
      <div
        className={`quantity-control__value ${valueClassName}`}
        onClick={onValueClick}
        tabIndex={onValueClick ? 0 : undefined}
        role={onValueClick ? 'button' : undefined}
      >
        {value}
        {children}
      </div>
      <button
        type="button"
        className="quantity-control__button"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={increaseLabel}
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
