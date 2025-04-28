export interface FAQ {
  question: string
  answer: string
  categories?: string[] // Opcjonalne pole dla określenia kategorii, do których należy FAQ
}

// Ogólne FAQ dla całej strony
export const faqs: FAQ[] = [
  {
    question: 'W czym się specjalizujemy?',
    answer:
      'Najbardziej skupiamy się na środkach do niewidocznej dla osób trzecich łączności audio-video. Opracowaliśmy w tym celu własny system Kamer GSM, które już od wielu lat cieszą się dużą popularnością. Oprócz tego wypożyczamy także wszelkiego rodzaju rejestratory dźwięku i obrazu, lokalizaotry GPS a także detektory podsłuchów.',
  },
  {
    question: 'Czego nie robimy?',
    answer:
      'Nie wypożyczamy rzeczy niebezpiecznych czy trudnych w obsłudze, takich jak zagłuszacze fal radiowych czy mikrofony laserowe. Nie zajmujemy się także usługami typu śledzenie osób czy zakładanie podsłuchów w domach. Każdy nasz sprzęt można z łatwością obsłużyć samodzielnie i zwyczajnie pomoc technika nie jest konieczna.',
  },
  {
    question: 'Dlaczego mamy tak niewiele produktów w ofercie?',
    answer:
      'Dobór odpowiedniego sprzętu do zadania jest trudniejszy, niżby się mogło wydawać, dlatego uprościliśmy naszą ofertę do minimum. Każdy zestaw dobierany jest indywidualnie do potrzeb każdego klienta, a ta strona ma charakter jedynie poglądowy.',
  },
]

// FAQ dla konkretnych kategorii produktów
export const productFaqs: FAQ[] = [
  // Mikrokamery
  {
    question: 'Jak działa kamera GSM?',
    answer:
      'Kamera GSM wykorzystuje sieć komórkową do przesyłania obrazu na dowolną odległość. Podgląd jest dostępny przez przeglądarkę internetową, nie wymaga instalowania aplikacji.',
    categories: ['Mikrokamery'],
  },
  {
    question: 'Czy kamery GSM są wykrywalne?',
    answer:
      'Nasze kamery GSM cechują się kompletną niewykrywalnością. Są świetnie zamaskowane w elementach codziennego użytku, takich jak guziki koszuli.',
    categories: ['Mikrokamery'],
  },
  {
    question: 'Jak długo działa kamera na baterii?',
    answer:
      'Nasze kamery GSM działają do 4 godzin na jednym ładowaniu, co jest wystarczające dla większości zastosowań.',
    categories: ['Mikrokamery'],
  },
  // Mikrosłuchawki
  {
    question: 'Jak działają mikrosłuchawki Bluetooth?',
    answer:
      'Mikrosłuchawki wykorzystują technologię Bluetooth do bezprzewodowej komunikacji z urządzeniem nadawczym. Sygnał jest przekazywany przez pętlę indukcyjną noszoną na szyi, która jest prawie niewidoczna.',
    categories: ['Mikrosłuchawki'],
  },
  {
    question: 'Czy mikrosłuchawki są widoczne dla innych osób?',
    answer:
      'Nasze mikrosłuchawki mają cielisty kolor i są tak małe, że pozostają praktycznie niewidoczne dla osób trzecich, nawet z bliskiej odległości.',
    categories: ['Mikrosłuchawki'],
  },
  {
    question: 'Jak długo działają mikrosłuchawki?',
    answer:
      'Mikrosłuchawki działają do 3 godzin na jednym ładowaniu, co jest optymalnym czasem dla większości zastosowań.',
    categories: ['Mikrosłuchawki'],
  },
  // Detektory
  {
    question: 'Jak wykryć podsłuch lub kamerę w pomieszczeniu?',
    answer:
      'Nasze detektory pozwalają na szybkie i skuteczne wykrycie urządzeń szpiegujących. Skanują szerokie spektrum częstotliwości (1 MHz - 8 GHz) i wykrywają różne rodzaje sygnałów: analogowe, cyfrowe, GSM, WiFi i Bluetooth.',
    categories: ['Detektory'],
  },
  {
    question: 'Czy detektor wykrywa kamery bezprzewodowe?',
    answer:
      'Tak, nasze detektory wykrywają kamery bezprzewodowe, które emitują sygnały radiowe. W przypadku kamer przewodowych lub pasywnych oferujemy również detektory optyczne.',
    categories: ['Detektory'],
  },
  // Lokalizatory GPS
  {
    question: 'Jak długo działa lokalizator GPS na baterii?',
    answer:
      'Nasze lokalizatory GPS mogą działać do kilku tygodni na jednym ładowaniu, w zależności od wybranego trybu pracy (ciągły lub inteligentny z oszczędzaniem energii).',
    categories: ['Lokalizatory GPS'],
  },
  {
    question: 'Jak często lokalizator aktualizuje pozycję?',
    answer:
      'Standardowo lokalizator podaje pozycję co 10 sekund, ale częstotliwość można dostosować do indywidualnych potrzeb.',
    categories: ['Lokalizatory GPS'],
  },
  {
    question: 'Czy lokalizator wymaga dostępu do internetu?',
    answer:
      'Lokalizator ma wbudowaną kartę SIM i samodzielnie łączy się z internetem. Użytkownik potrzebuje dostępu do internetu tylko do przeglądania lokalizacji na platformie online lub w aplikacji mobilnej.',
    categories: ['Lokalizatory GPS'],
  },
  // Rejestratory
  {
    question: 'Czy rejestratory są łatwe w obsłudze?',
    answer:
      'Tak, nasze rejestratory są bardzo proste w obsłudze - zwykle wymagają tylko jednego przycisku do uruchomienia i zatrzymania nagrywania.',
    categories: ['Rejestratory'],
  },
  {
    question: 'Jaką jakość nagrań oferują rejestratory?',
    answer:
      'Nasze rejestratory audio oferują wysoką jakość dźwięku w formacie WAV, a rejestratory wideo nagrywają w formacie AVI. Jakość jest wystarczająca do rejestracji rozmów i spotkań w celach dokumentacyjnych.',
    categories: ['Rejestratory'],
  },
  // Podsłuchy
  {
    question: 'Jaka jest różnica między podsłuchem kwarcowym a GSM?',
    answer:
      'Podsłuch kwarcowy ma ograniczony zasięg transmisji (do około kilometra), ale jest trudniejszy do wykrycia. Podsłuch GSM ma nieograniczony zasięg (działa w zasięgu sieci komórkowej), ale emituje więcej sygnałów radiowych, które można wykryć specjalistycznym sprzętem.',
    categories: ['Podsłuchy'],
  },
]

// Funkcja helper do pobierania FAQ dla konkretnej kategorii
export const getFaqsForCategory = (categoryName: string): FAQ[] => {
  const categorySpecificFaqs = productFaqs.filter(faq => faq.categories?.includes(categoryName))

  // Łączymy ogólne FAQ i FAQ specyficzne dla kategorii
  return [...categorySpecificFaqs, ...faqs]
}
