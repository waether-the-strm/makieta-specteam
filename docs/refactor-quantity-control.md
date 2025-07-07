# Refaktoryzacja komponentów kontrolki ilości i dat

## Cel refaktoryzacji

Eliminacja duplikacji kodu i niespójności w stylowaniu między komponentami kontrolki ilości i wyboru dat.

## Problemy przed refaktoryzacją

1. **Duplikacja kodu** - identyczne przyciski +/- w `ProductActions` i `RentalPeriodSelector`
2. **Niespójność stylowania** - `RentalPeriodSelector` używał klas `product__quantity` zamiast dedykowanych klas BEM
3. **Trudność w utrzymaniu** - zmiany w stylowaniu wymagały modyfikacji w wielu miejscach

## Rozwiązanie

### 1. Utworzenie uniwersalnego komponentu `QuantityControl`

**Lokalizacja:** `src/components/ui/quantity-control.tsx`

**Funkcjonalności:**

- Uniwersalne przyciski +/- z konfigurowalnymi labelami
- Elastyczna wartość środkowa (może być tekst, input, lub dowolny React node)
- Obsługa kliknięć na wartość (dla kalendarza)
- Responsywność
- Pełna dostępność (ARIA labels)

**Interfejs:**

```typescript
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
```

### 2. Dedykowane style BEM

**Lokalizacja:** `src/styles/components/quantity-control.css`

**Klasy:**

- `.quantity-control` - główny kontener
- `.quantity-control__button` - przyciski +/-
- `.quantity-control__value` - wartość środkowa
- `.quantity-control__value--date` - modyfikator dla dat
- `.quantity-control__value--number` - modyfikator dla liczb

### 3. Refaktoryzacja `RentalPeriodSelector`

**Zmiany:**

- Użycie uniwersalnego komponentu `QuantityControl`
- Dedykowane klasy BEM: `rental-period-selector`, `rental-period-selector__field`, etc.
- Usunięcie duplikacji kodu przycisków +/-

### 4. Refaktoryzacja `ProductActions`

**Zmiany:**

- Użycie uniwersalnego komponentu `QuantityControl` dla kontrolki ilości
- Zachowanie funkcjonalności zniżki ilościowej
- Wrapper `.product__quantity-wrapper` dla lepszej organizacji

## Korzyści

### 1. Eliminacja duplikacji

- Jeden komponent dla wszystkich kontrolek +/-/wartość
- Spójne zachowanie i stylowanie

### 2. Lepsze BEM

- Dedykowane klasy dla każdego komponentu
- Jasna hierarchia i odpowiedzialności

### 3. Łatwiejsze utrzymanie

- Zmiany w jednym miejscu wpływają na wszystkie kontrolki
- Mniej kodu do testowania

### 4. Lepsza dostępność

- Spójne ARIA labels
- Jednolita obsługa klawiatury

## Struktura plików

```sh
src/
├── components/
│   ├── ui/
│   │   └── quantity-control.tsx          # Uniwersalny komponent
│   └── productPage/
│       ├── ProductActions.tsx            # Używa QuantityControl
│       └── RentalPeriodSelector.tsx      # Używa QuantityControl
└── styles/
    └── components/
        ├── quantity-control.css          # Style dla uniwersalnego komponentu
        ├── rental-period-selector.css    # Dedykowane style dla dat
        └── product.css                   # Usunięte stare style
```

## Testowanie

### TypeScript

```bash
npm run typecheck
```

### ESLint

```bash
npm run lint
```

### Wizualne

- Sprawdzenie responsywności na różnych rozmiarach ekranu
- Weryfikacja działania kalendarza
- Testowanie dostępności (klawiatura, screen reader)

## Przyszłe ulepszenia

1. **Testy jednostkowe** - dodanie testów dla `QuantityControl`
2. **Animacje** - płynne przejścia przy zmianach wartości
3. **Więcej modyfikatorów** - np. dla różnych rozmiarów
4. **Theme support** - obsługa różnych motywów kolorystycznych
