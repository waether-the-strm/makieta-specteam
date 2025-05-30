# Manual Refaktoryzacji CSS: Z BEM + @apply na Klasy Semantyczne

**Cel:** Uproszczenie i ujednolicenie stylów CSS w projekcie poprzez zastąpienie specyficznych dla komponentów klas BEM (np. `.component__element`) używających `@apply` globalnymi, semantycznymi klasami narzędziowymi definiowanymi w `src/index.css` i stosowanymi bezpośrednio w kodzie TSX. Ma to na celu zmniejszenie redundancji, poprawę czytelności i ułatwienie zarządzania stylami.

**Podstawowe Zasady:**

1.  **Globalne Klasy Semantyczne:** Definiujemy reużywalne, semantyczne klasy (np. `.panel-dark`, `.btn-action-primary`, `.text-meta`) w pliku `src/index.css` wewnątrz dyrektywy `@layer components`. Nazwy klas powinny odzwierciedlać ich _znaczenie_ lub _wygląd_, a nie konkretny komponent.
2.  **Bezpośrednie Stosowanie w TSX:** Zamiast używać klas BEM w plikach TSX (np. `<button className="cart-summary__checkout-btn">`), stosujemy bezpośrednio odpowiednie klasy semantyczne (np. `<button className="btn-action-primary">`). Można łączyć klasy semantyczne z innymi klasami Tailwind, jeśli to konieczne.
3.  **Minimalizacja CSS Komponentów:** Pliki CSS specyficzne dla komponentów (np. `src/styles/components/product.css`) powinny zawierać jak najmniej reguł. Idealnie tylko te, które:
    - Są bardzo specyficzne dla danego komponentu i nie nadają się do uogólnienia.
    - Definiują niestandardowe właściwości CSS (np. `text-shadow`, `filter`).
    - Wykorzystują zaawansowane selektory (np. potomków, `:hover` na rodzicu).
    - **Nie powinny zawierać `@apply` z klasami zdefiniowanymi w `@layer components` w `index.css`**, ponieważ powoduje to błędy przetwarzania.

> **Ostrzeżenie:** Próba użycia `@apply` z klasą semantyczną zdefiniowaną w `@layer components` w innym pliku CSS skutkuje błędem PostCSS/Tailwind, np.:
>
>     The `text-meta` class does not exist. If you're sure that `text-meta` exists, make sure that any `@import` statements are being properly processed before Tailwind CSS sees your CSS, as `@apply` can only be used for classes that exist at the time the CSS is processed.
>     Maximum call stack size exceeded

**Proces Refaktoryzacji (Krok po Kroku):**

1.  **Wybierz Komponent:** Wybierz jeden komponent do refaktoryzacji (np. `product`). Skup się na jego pliku CSS (`product.css`) i powiązanych plikach TSX (np. `ProductPage.tsx`, `ProductActions.tsx`, `ProductInfoPanel.tsx`).
2.  **Analiza CSS Komponentu (`product.css`):**
    - Znajdź regułę CSS dla klasy BEM, np. `.product__actions { @apply bg-slate-800 p-6 rounded-lg shadow-lg; position: sticky; ... }`.
    - Zidentyfikuj część stylów zdefiniowaną przez `@apply`.
3.  **Sprawdź Istniejące Klasy Semantyczne (`index.css`):**
    - Otwórz `src/index.css` i przejrzyj klasy zdefiniowane w bloku `@layer components`.
    - Sprawdź, czy istnieje klasa semantyczna, która odpowiada _znaczeniu_ i _stylom_ zidentyfikowanym w `@apply` (np. dla `@apply bg-slate-800 p-6 rounded-lg shadow-lg;` pasuje `.panel-dark`).
4.  **Jeśli Klasa Semantyczna Istnieje:**
    - **Znajdź Element w TSX:** Odszukaj w plikach TSX komponentu element HTML/React, który używa refaktoryzowanej klasy BEM (np. znajdź `<div className="product__actions ...">`).
    - **Zaktualizuj `className` w TSX:** Zamień klasę BEM na klasę semantyczną. Jeśli klasa BEM zawierała dodatkowe style niepokryte przez `@apply` (jak `position: sticky` w przykładzie `.product__actions`), lub jeśli klasa semantyczna nie pokrywa 100% stylów z `@apply`, zachowaj oryginalną klasę BEM _obok_ klasy semantycznej lub dodaj brakujące klasy Tailwind bezpośrednio.
      - Przykład: `<div className="panel-dark product__actions">` (jeśli `.product__actions` nadal zawiera unikalne style jak `position: sticky`).
      - Lub jeśli `.product__actions` staje się całkowicie zbędne: `<div className="panel-dark sticky top-[78px] z-10 w-full mt-6">` (przenosząc style sticky jako klasy Tailwind). Wybór zależy od złożoności.
    - **Wyczyść CSS Komponentu:** W pliku `product.css` usuń lub zakomentuj _całą_ regułę dla klasy BEM, jeśli stała się zbędna, lub usuń tylko część `@apply`, jeśli klasa BEM nadal jest potrzebna dla specyficznych stylów.
5.  **Jeśli Klasa Semantyczna NIE Istnieje (lub nie pasuje):**
    - **Oceń Potrzebę:** Zastanów się, czy dany zestaw stylów `@apply` jest na tyle powszechny w projekcie, że warto stworzyć dla niego nową klasę semantyczną.
    - **Jeśli TAK:**
      - Dodaj nową klasę w `src/index.css` w bloku `@layer components`, np. `.input-dark { @apply ... }`. Użyj opisowej, semantycznej nazwy.
      - Wróć do kroku 4 (Znajdź Element w TSX) i użyj nowo utworzonej klasy.
      - **Jeśli nie jesteś pewien, czy warto dodać nową klasę semantyczną, zgłoś propozycję do zespołu lub dodaj ją do backlogu/refaktoryzacji.**
    - **Jeśli NIE:** Pozostaw oryginalną regułę z klasą BEM i `@apply` (używając tylko podstawowych klas Tailwind) w pliku CSS komponentu bez zmian. Nie wszystko musi być klasą semantyczną.
6.  **Testuj:** Po każdej zmianie (szczególnie po modyfikacji TSX i CSS) sprawdź wizualnie w przeglądarce, czy wygląd komponentu pozostał niezmieniony. Sprawdź konsolę deweloperską pod kątem błędów. **Jeśli projekt posiada testy automatyczne, uruchom je komendą `npm test -- --watch` i upewnij się, że wszystkie przechodzą.**
7.  **Commit:** Po pomyślnej refaktoryzacji jednego lub kilku powiązanych elementów/komponentów, zrób commit.
8.  **Usuń nieużywane klasy BEM:** Po zakończeniu refaktoryzacji danego komponentu przejrzyj projekt pod kątem nieużywanych już klas BEM i usuń je z kodu oraz CSS.

**Wskazówki:**

- **Pracuj Inkrementalnie:** Refaktoryzuj jeden komponent lub nawet jedną grupę stylów na raz.
- **Testuj Często:** Unikniesz trudnych do znalezienia błędów regresji.
- **Nazewnictwo:** Staraj się używać spójnych i opisowych nazw dla klas semantycznych.
- **Nie na Siłę:** Jeśli styl jest unikalny dla jednego miejsca, pozostawienie go w CSS komponentu z `@apply` (używając tylko podstawowych klas Tailwind) jest akceptowalne.
- **Komunikacja:** Jeśli nie jesteś pewien, czy stworzyć nową klasę semantyczną, skonsultuj się z zespołem lub zgłoś propozycję do backlogu/refaktoryzacji.
- **Usuwaj nieużywane klasy:** Po refaktoryzacji regularnie przeglądaj i usuwaj nieużywane klasy BEM.

**Gdzie Znaleźć Istniejące Klasy Semantyczne:**

Przejrzyj plik `src/index.css`, sekcję wewnątrz `@layer components { ... }`.

## Tabela Refaktoryzacji (Przykłady z `product.css`)

| Plik CSS      | Klasa BEM do Refaktoryzacji       | Część `@apply` do zastąpienia                    | Proponowana Klasa Semantyczna (`index.css`)              | Akcja w TSX                                                                                                                 | Akcja w CSS Komponentu                            |
| :------------ | :-------------------------------- | :----------------------------------------------- | :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| `product.css` | `.product__info`                  | `bg-slate-800 p-6 rounded-lg shadow-lg`          | `.panel-dark`                                            | _Nie znaleziono użycia w TSX_                                                                                               | _Reguła usunięta/zakomentowana_                   |
| `product.css` | `.product__actions`               | `bg-slate-800 p-6 rounded-lg shadow-lg`          | `.panel-dark`                                            | Znajdź element z `className="product__actions"` i zmień na `className="panel-dark product__actions"`                        | Usuń tylko `@apply` z `.product__actions`         |
| `product.css` | `.product__breadcrumbs`           | `text-sm text-slate-400`                         | `.text-meta-light`                                       | Znajdź element z `className="product__breadcrumbs"` i zmień na `className="text-meta-light mb-8"`                           | Usuń/zakomentuj `.product__breadcrumbs`           |
| `product.css` | `.product__rental-label`          | `block text-slate-300` + `mb-2`                  | `.text-meta` (`text-sm text-slate-300`)                  | Znajdź element z `className="product__rental-label"` i zmień na `className="block text-meta mb-2"`                          | _Reguła usunięta/zakomentowana_                   |
| `product.css` | `.product__summary-label`         | `text-slate-300`                                 | `.text-meta`                                             | Znajdź element z `className="product__summary-label"` i zmień na `className="text-meta"`                                    | Usuń/zakomentuj `.product__summary-label`         |
| `product.css` | `.product__price-rental`          | `text-sm text-slate-400`                         | `.text-meta-light`                                       | _Nie znaleziono użycia w TSX_                                                                                               | _Reguła usunięta/zakomentowana_                   |
| `product.css` | `.product__info-bottom`           | `text-sm text-slate-400`                         | `.text-meta-light`                                       | Znajdź element z `className="product__info-bottom"` i zmień na `className="text-meta-light space-y-2"`                      | Usuń/zakomentuj `.product__info-bottom`           |
| `product.css` | `.product__specs-label`           | `text-slate-400`                                 | `.text-meta-light`                                       | Znajdź element z `className="product__specs-label"` i zmień na `className="text-meta-light font-normal ..."`                | Usuń tylko `@apply` z `.product__specs-label`     |
| `product.css` | `.product__tab-button`            | `py-4 px-6 transition-colors text-center ...`    | `.tab-button`                                            | Znajdź element z `className="product__tab-button"` i zmień na `className="tab-button"`                                      | Usuń/zakomentuj `.product__tab-button`            |
| `product.css` | `.product__actions-tab--inactive` | `bg-slate-700 text-slate-300 hover:bg-slate-600` | `.tab-button--inactive`                                  | Znajdź element z `className="... product__actions-tab--inactive"` i zmień na `className="... tab-button--inactive"`         | Usuń/zakomentuj `.product__actions-tab--inactive` |
| `product.css` | `.product__actions-tab--active`   | `bg-rose-600 text-white`                         | _Istniejąca: `.tab-button--active` (tylko `text-white`)_ | Znajdź element z `className="... product__actions-tab--active"` i zmień na `className="... tab-button--active bg-rose-600"` | Usuń/zakomentuj `.product__actions-tab--active`   |
| `product.css` | `.product__price`                 | `text-2xl font-bold text-white`                  | `.text-value-xl-bold` (jest `text-xl`)                   | Znajdź element z `className="product__price"` i zmień na `className="text-value-xl-bold text-2xl"`                          | Usuń/zakomentuj `.product__price`                 |
| `product.css` | `.product__quantity-value`        | `text-lg font-medium text-white`                 | `.text-label-lg`                                         | Znajdź element z `className="product__quantity-value"` i zmień na `className="text-label-lg"`                               | _Reguła usunięta/zakomentowana_                   |
| `product.css` | `.product__info-bottom-row`       | `flex items-center gap-2 text-slate-400`         | `.text-meta-light` (`text-sm ...`)                       | Znajdź element z `className="product__info-bottom-row"` i zmień na `className="text-meta-light flex items-center gap-2"`    | _Reguła usunięta/zakomentowana_                   |

_(Uwaga: Ta tabela jest przykładowa, pełna refaktoryzacja może wymagać analizy innych plików i potencjalnie stworzenia dodatkowych klas semantycznych)_
