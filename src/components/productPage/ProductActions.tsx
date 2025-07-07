import { type FC, useState } from 'react'
import { CartItem, Discount, useCart } from '../../hooks'
import RentalPeriodSelector from './RentalPeriodSelector'
import QuantityControl from '../ui/quantity-control'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion'
import { PercentSquare } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: {
    rental: {
      daily: number
      weekly: number
      monthly: number
      [key: string]: number
    }
    purchase: number
  }
  isAvailable: boolean
  images: string[]
  deposit?: number
}

interface ProductActionsProps {
  product: Product
}

const DISCOUNTS = [
  {
    id: 'bitcoin',
    label: '19zł zniżki za płatność w Bitcoin',
    value: 19,
    tooltip: 'Płać Bitcoinem, a otrzymasz rabat.',
  },
  {
    id: 'repeat',
    label: '13zł zniżki za ponowne zakupy',
    value: 13,
    tooltip: 'Rabaty dla powracających klientów.',
  },
  {
    id: 'selftraining',
    label: '8zł zniżki za samodzielne szkolenie',
    value: 8,
    tooltip: 'Zniżka za samodzielne szkolenie.',
  },
]

export const ProductActions: FC<ProductActionsProps> = ({ product }) => {
  const [isRental, setIsRental] = useState(true)
  const [quantity, setQuantity] = useState<number | ''>(1)
  // Nowe stany dla zakresu dat
  const [rentalFrom, setRentalFrom] = useState<Date>(new Date())
  const [rentalTo, setRentalTo] = useState<Date>(new Date())
  const [appliedDiscounts, setAppliedDiscounts] = useState<Discount[]>([])
  const [discountCode, setDiscountCode] = useState('')
  const { addItem } = useCart()

  // Kaucja (jeśli nie ma w produkcie, domyślnie 300 zł)
  const deposit = product.deposit ?? 300

  // Suma rabatów z checkboxów
  const discountsValue = DISCOUNTS.reduce(
    (sum, d) => (appliedDiscounts.some(discount => discount.code === d.id) ? sum + d.value : sum),
    0
  )
  // Przykładowa obsługa kodu rabatowego (możesz rozwinąć logikę)
  const codeDiscountValue = discountCode === 'EXTRA10' ? 10 : 0

  // Przykładowa logika: cena = liczba dni * cena za dzień (możesz rozwinąć wg potrzeb)
  const getDays = (from: Date, to: Date) =>
    Math.max(1, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1)
  const rentalDays = getDays(rentalFrom, rentalTo)
  const basePrice = isRental ? product.price.rental.daily * rentalDays : product.price.purchase
  const originalPrice = basePrice * (typeof quantity === 'number' ? quantity : 1)
  const totalDiscount = discountsValue + codeDiscountValue
  const finalPrice = Math.max(0, originalPrice - totalDiscount)

  // Format helper
  const formatPrice = (value: number) => `${value} zł`

  // handleAddToCart korzysta teraz z finalPrice
  const handleAddToCart = () => {
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      quantity: typeof quantity === 'number' ? quantity : 1,
      imageUrl: product.images[0],
      isRental,
      rentalPeriod: isRental ? `${rentalDays}` : undefined,
      rentalDate: isRental ? rentalFrom : undefined,
      deposit: isRental ? deposit : undefined,
      discounts: appliedDiscounts,
    }
    addItem(item)
  }

  // Obsługa zmiany ilości
  const handleQuantityChange = (delta: number) => {
    if (typeof quantity !== 'number') return
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  // Obsługa wpisywania liczby lub pustej wartości
  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setQuantity('')
    } else {
      const num = parseInt(value)
      if (!isNaN(num) && num >= 1 && num <= 10) {
        setQuantity(num)
      }
    }
  }

  // Po blur, jeśli quantity==="", ustaw na 1
  const handleQuantityInputBlur = () => {
    if (quantity === '') {
      setQuantity(1)
    }
  }

  return (
    <div className="panel-dark product__actions">
      <div className="product__actions-tabs">
        <button
          className={`product__actions-tab ${isRental ? 'product__actions-tab--active' : ''}`}
          type="button"
          onClick={() => setIsRental(true)}
        >
          Wypożyczenie
        </button>
        <button
          className={`product__actions-tab ${!isRental ? 'product__actions-tab--active' : ''}`}
          type="button"
          onClick={() => setIsRental(false)}
        >
          Zakup
        </button>
      </div>

      <form
        className="product__form"
        onSubmit={e => {
          e.preventDefault()
          handleAddToCart()
        }}
      >
        {isRental && (
          <div className="product__form-row product__form-row--rental-period">
            <RentalPeriodSelector
              from={rentalFrom}
              to={rentalTo}
              onChange={(from, to) => {
                setRentalFrom(from)
                setRentalTo(to)
              }}
            />
          </div>
        )}

        <div className="product__form-row product__form-row--quantity">
          <label className="product__form-label" htmlFor="quantity-input">
            Ilość
          </label>
          <div className="product__quantity-wrapper">
            <QuantityControl
              value={
                <input
                  id="quantity-input"
                  name="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity === '' ? '' : String(quantity)}
                  onChange={handleQuantityInputChange}
                  onBlur={handleQuantityInputBlur}
                  className="quantity-control__value--number custom-quantity-input"
                  aria-label="Ilość produktu"
                  autoComplete="off"
                />
              }
              onDecrease={() => handleQuantityChange(-1)}
              onIncrease={() => handleQuantityChange(1)}
              decreaseDisabled={typeof quantity !== 'number' || quantity <= 1}
              increaseDisabled={typeof quantity !== 'number' || quantity >= 10}
              decreaseLabel="Zmniejsz ilość"
              increaseLabel="Zwiększ ilość"
            />
            {typeof quantity === 'number' && quantity >= 3 && (
              <span className="product__quantity-discount">10% zniżki</span>
            )}
          </div>
        </div>

        {/* Sekcja rabatów w akordeonie */}
        <Accordion type="single" collapsible defaultValue="">
          <AccordionItem value="discounts" className="product-accordion__item">
            <AccordionTrigger className="product-accordion__trigger">
              <div className="product-accordion__row">
                <PercentSquare className="product-accordion__icon text-rose-400" />
                <span className="product-accordion__title">Rabaty</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="product-accordion__content">
              <div className="product__discounts">
                {DISCOUNTS.map(discount => (
                  <label className="product__discount" key={discount.id} title={discount.tooltip}>
                    <input
                      type="checkbox"
                      id={`discount-${discount.id}`}
                      name={`discount-${discount.id}`}
                      className="product__discount-checkbox"
                      checked={appliedDiscounts.some(d => d.code === discount.id)}
                      onChange={() =>
                        setAppliedDiscounts(d => [
                          ...d,
                          { code: discount.id, value: discount.value },
                        ])
                      }
                    />
                    <span>{discount.label}</span>
                    <span className="product__discount-info">ℹ️</span>
                  </label>
                ))}
                <input
                  id="discount-code"
                  name="discount-code"
                  className="product__discount-code"
                  type="text"
                  placeholder="Dodatkowy kod rabatowy"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                />
                {codeDiscountValue > 0 && (
                  <span className="product__discount-code-info">
                    Kod aktywny: -{codeDiscountValue} zł
                  </span>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="product__form-row product__form-row--summary">
          <div className="product__summary-group">
            <div className="product__summary">
              <div className="product__summary-main product__summary-main--vertical">
                <div className="product__summary-row">
                  <span className="product__summary-label">
                    Suma {isRental && `(za ${rentalDays} dni)`}:
                  </span>
                  <div className="product__summary-prices">
                    {totalDiscount > 0 && (
                      <span className="product__summary-price-original">
                        {formatPrice(originalPrice)}
                      </span>
                    )}
                    <span className="product__summary-price">{formatPrice(finalPrice)}</span>
                  </div>
                </div>
                {isRental && deposit > 0 && (
                  <div className="product__summary-row product__summary-row--deposit">
                    <span className="product__summary-deposit">+ {deposit} zł kaucji zwrotnej</span>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="product__button product__button--compact">
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </form>

      <div className="product__info-bottom" role="complementary" aria-label="Informacje dodatkowe">
        <div className="product__info-bottom-row">
          <span className="product__info-bottom-row-icon" aria-hidden="true">
            🚚
          </span>
          <span className="product__info-bottom-row-text">Dostawa od 1zł w 24h</span>
        </div>
        <div className="product__info-bottom-row">
          <span className="product__info-bottom-row-icon" aria-hidden="true">
            👨‍💻
          </span>
          <span className="product__info-bottom-row-text">Pomoc techniczna 24/7</span>
        </div>
      </div>
    </div>
  )
}
