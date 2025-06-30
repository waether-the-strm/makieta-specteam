import { ReactNode } from 'react'
import {
  Factory,
  HelpCircle,
  type LucideIcon,
  Lock,
  MessageCircle,
  Mic,
  Settings,
  Shield,
} from 'lucide-react'

import { Questions, Reviews } from '.'

export interface AccordionProductData {
  name: string
  title: string
  Icon: LucideIcon
  content: ReactNode
}

export const accordionData: AccordionProductData[] = [
  {
    name: 'access',
    title: 'Hasła i dostępy',
    Icon: Lock,
    content: (
      <p className="text-slate-100">
        Hasło do serwisu podajemy przy zakupie lub wynajmie urządzenia. Każdy użytkownik otrzymuje
        unikalne hasło, które działa przez cały okres najmu.
      </p>
    ),
  },
  {
    name: 'voice',
    title: 'Łączność głosowa',
    Icon: Mic,
    content: (
      <p className="text-slate-100">
        Łączność "głosowa" odbywa się w dwie strony przez telefon z użyciem superminiaturowej
        mikrosłuchawki oraz ukrytego mikrofonu. Słuchawka łączy się z telefonem za pomocą specjalnej
        pętli Bluetooth zakładanej pod ubranie.
      </p>
    ),
  },
  {
    name: 'mounting',
    title: 'Mocowanie',
    Icon: Settings,
    content: (
      <div className="text-slate-100 space-y-2">
        <p>
          Kamerę można założyć na nadgarstek lub umieścić na wysokości mostka pod koszulą.
          Obiektyw-guzik należy przełożyć przez otwór w koszuli.
        </p>
        <p>
          Pętlę indukcyjną należy założyć na szyję pod ubraniem. Pętla posiada wbudowany mikrofon,
          który działa przez materiał.
        </p>
        <p>
          Telefon należy schować do kieszeni lub torby znajdującej się nie dalej niż kilka metrów od
          nas.
        </p>
      </div>
    ),
  },
  {
    name: 'manufacturer',
    title: 'Producent',
    Icon: Factory,
    content: (
      <div className="text-slate-100 space-y-4">
        <p>
          Ten zestaw jest naszym autorskim rozwiązaniem łączącym w sobie niezawodność z wysoką
          jakością obrazu. Co więcej, nie polegamy na zewnętrznych serwisach czy chińskich
          serwerach, dzięki czemu możemy zagwarantować stabilność usługi i rozszerzać ją o nowe
          funkcjonalności.
        </p>
        <p>
          Prezentowana konstrukcja sprawdza się już od ponad 6 lat i do tej pory notujemy
          niezawodność na poziomie niemal 100%! Śmiemy twierdzić iż jest to najlepszy zestaw tego
          typu na rynku i może to potwierdzić wielu naszych zadowolonych klientów ;)
        </p>
      </div>
    ),
  },
  {
    name: 'security',
    title: 'Bezpieczeństwo',
    Icon: Shield,
    content: (
      <ul className="space-y-2 text-slate-100">
        <li>Szyfrowane połączenie</li>
        <li>Nie przechowujemy zdjęć na serwerze</li>
        <li>Dostęp tylko po podaniu unikalnego dla każdego wypożyczenia hasła</li>
        <li>Serwer jest w użyciu od 2017 roku i do tej pory nie zawiódł nawet razu</li>
        <li>
          Cały system jest stworzony przez naszą firmę, ciągle rozwijany i utrzymywany w zgodzie z
          najnowszymi standardami
        </li>
      </ul>
    ),
  },
  {
    name: 'faq',
    title: 'Często zadawane pytania',
    Icon: HelpCircle,
    content: <Questions />,
  },
  {
    name: 'reviews',
    title: 'Opinie użytkowników',
    Icon: MessageCircle,
    content: <Reviews />,
  },
]
