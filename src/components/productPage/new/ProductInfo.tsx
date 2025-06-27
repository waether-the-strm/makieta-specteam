import { useState } from 'react'

import {
  Star,
  ChevronDown,
  ChevronUp,
  Lock,
  Mic,
  Settings,
  Factory,
  Shield,
  HelpCircle,
  MessageCircle,
  Cog,
  Package,
} from 'lucide-react'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ui/accordion'
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card'
import { Separator } from '@ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs'
import { Badge } from '@ui/badge'

import { questions, reviews, techSpecs, boxContents } from './data'

const ProductInfo = () => {
  const [showAllQuestions, setShowAllQuestions] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-rose-400 text-rose-400' : 'text-slate-400'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-6">
            <CardTitle className="text-3xl font-merriweather font-bold text-white">Opis</CardTitle>
            <div className="text-slate-100 leading-relaxed space-y-4">
              <p>
                Mikrosłuchawki douszne Bluetooth zapewniające dyskretną komunikację. Idealne w
                sytuacjach wymagających ukrytego kontaktu audio. Współpracują z telefonami
                komórkowymi i zestawami GSM.
              </p>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <Tabs defaultValue="questions" className="w-full">
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList className="flex w-max min-w-full h-16 p-1 bg-slate-700 border border-slate-600 mb-8">
                  <TabsTrigger
                    value="questions"
                    className="flex-1 min-w-[200px] text-base font-medium text-slate-100 data-[state=active]:bg-rose-500 data-[state=active]:text-white h-full px-6 rounded-md"
                  >
                    PYTANIA I ODPOWIEDZI
                  </TabsTrigger>
                  <TabsTrigger
                    value="specs"
                    className="flex-1 min-w-[200px] text-base font-medium text-slate-100 data-[state=active]:bg-slate-600 data-[state=active]:text-white h-full px-6 rounded-md"
                  >
                    SZCZEGÓŁY TECHNICZNE
                  </TabsTrigger>
                  <TabsTrigger
                    value="contents"
                    className="flex-1 min-w-[200px] text-base font-medium text-slate-100 data-[state=active]:bg-slate-600 data-[state=active]:text-white h-full px-6 rounded-md"
                  >
                    ZAWARTOŚĆ PUDEŁKA
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="questions" className="space-y-8 mt-0">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-bold text-white">
                      Jak działają mikrosłuchawki Bluetooth?
                    </h3>
                    <p className="text-slate-100 leading-relaxed">
                      Mikrosłuchawki wykorzystują technologię Bluetooth do bezprzewodowej
                      komunikacji z urządzeniem nadawczym. Sygnał jest przekazywany przez pętlę
                      indukcyjną noszoną na szyi, która jest prawie niewidoczna.
                    </p>
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-bold text-white">
                      Czy mikrosłuchawki są widoczne dla innych osób?
                    </h3>
                    <p className="text-slate-100 leading-relaxed">
                      Nasze mikrosłuchawki mają cielisty kolor i są tak małe, że pozostają
                      praktycznie niewidoczne dla osób trzecich, nawet z bliskiej odległości.
                    </p>
                  </div>

                  <Separator className="bg-slate-700" />

                  <div className="space-y-6">
                    <h3 className="text-xl font-merriweather font-bold text-white">
                      Jak długo działają mikrosłuchawki?
                    </h3>
                    <p className="text-slate-100 leading-relaxed">
                      Bateria w mikrosłuchawce zapewnia do 6-8 godzin ciągłej pracy. W zestawie
                      otrzymujesz zapasowe baterie.
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-0">
                  <AccordionItem value="access" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <Lock className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Hasła i dostępy</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <p className="text-slate-100">
                        Hasło do serwisu podajemy przy zakupie lub wynajmie urządzenia. Każdy
                        użytkownik otrzymuje unikalne hasło, które działa przez cały okres najmu.
                      </p>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="voice" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <Mic className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Łączność głosowa</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <p className="text-slate-100">
                        Łączność "głosowa" odbywa się w dwie strony przez telefon z użyciem
                        superminiaturowej mikrosłuchawki oraz ukrytego mikrofonu. Słuchawka łączy
                        się z telefonem za pomocą specjalnej pętli Bluetooth zakładanej pod ubranie.
                      </p>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="mounting" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <Settings className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Mocowanie</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <div className="text-slate-100 space-y-2">
                        <p>
                          Kamerę można założyć na nadgarstek lub umieścić na wysokości mostka pod
                          koszulą. Obiektyw-guzik należy przełożyć przez otwór w koszuli.
                        </p>
                        <p>
                          Pętlę indukcyjną należy założyć na szyję pod ubraniem. Pętla posiada
                          wbudowany mikrofon, który działa przez materiał.
                        </p>
                        <p>
                          Telefon należy schować do kieszeni lub torby znajdującej się nie dalej niż
                          kilka metrów od nas.
                        </p>
                      </div>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="manufacturer" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <Factory className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Producent</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <div className="text-slate-100 space-y-4">
                        <p>
                          Ten zestaw jest naszym autorskim rozwiązaniem łączącym w sobie
                          niezawodność z wysoką jakością obrazu. Co więcej, nie polegamy na
                          zewnętrznych serwisach czy chińskich serwerach, dzięki czemu możemy
                          zagwarantować stabilność usługi i rozszerzać ją o nowe funkcjonalności.
                        </p>
                        <p>
                          Prezentowana konstrukcja sprawdza się już od ponad 6 lat i do tej pory
                          notujemy niezawodność na poziomie niemal 100%! Śmiemy twierdzić iż jest to
                          najlepszy zestaw tego typu na rynku i może to potwierdzić wielu naszych
                          zadowolonych klientów ;)
                        </p>
                      </div>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="security" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <Shield className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Bezpieczeństwo</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <ul className="space-y-2 text-slate-100">
                        <li>• Szyfrowane połączenie</li>
                        <li>• Nie przechowujemy zdjęć na serwerze</li>
                        <li>• Dostęp tylko po podaniu unikalnego dla każdego wypożyczenia hasła</li>
                        <li>
                          • Serwer jest w użyciu od 2017 roku i do tej pory nie zawiódł nawet razu
                        </li>
                        <li>
                          • Cały system jest stworzony przez naszą firmę, ciągle rozwijany i
                          utrzymywany w zgodzie z najnowszymi standardami
                        </li>
                      </ul>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="faq" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6  hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <HelpCircle className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Często zadawane pytania</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <div className="space-y-6">
                        {questions
                          .slice(0, showAllQuestions ? questions.length : 3)
                          .map((item, index) => (
                            <div key={index} className="space-y-3">
                              <div className="border-l-4 border-rose-500 pl-4 py-2">
                                <div className="font-medium text-rose-400 mb-2">{item.q}</div>
                                <div className="text-slate-100">{item.a}</div>
                              </div>
                              {index < (showAllQuestions ? questions.length - 1 : 2) && (
                                <Separator className="bg-slate-600" />
                              )}
                            </div>
                          ))}

                        <button
                          onClick={() => setShowAllQuestions(!showAllQuestions)}
                          className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium mt-6"
                        >
                          {showAllQuestions ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Pokaż mniej
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Pokaż wszystkie {questions.length} pytań
                            </>
                          )}
                        </button>
                      </div>
                    </AccordionContent>
                    <Separator className="bg-slate-700" />
                  </AccordionItem>

                  <AccordionItem value="reviews" className="border-0">
                    <AccordionTrigger className="text-lg font-semibold py-6 hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <span className="flex-1 text-left">Opinie użytkowników</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6">
                      <div className="space-y-4">
                        {reviews
                          .slice(0, showAllReviews ? reviews.length : 3)
                          .map((review, index) => (
                            <Card key={index} className="bg-slate-600 border-slate-500">
                              <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="flex gap-1">{renderStars(review.rating)}</div>
                                  <span className="font-medium text-rose-400">{review.name}</span>
                                </div>
                                <p className="text-slate-100 italic whitespace-pre-line">
                                  "{review.text}"
                                </p>
                              </CardContent>
                            </Card>
                          ))}

                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium mt-4"
                        >
                          {showAllReviews ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Pokaż mniej
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Pokaż wszystkie {reviews.length} opinii
                            </>
                          )}
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="specs" className="space-y-8 mt-0">
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Cog className="w-6 h-6 text-rose-400" />
                    <h3 className="text-xl font-merriweather font-bold text-white">
                      Szczegóły techniczne
                    </h3>
                  </div>

                  <div className="grid gap-4">
                    {techSpecs.map((spec, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-slate-600 last:border-0"
                      >
                        <div className="font-medium text-slate-200">{spec.label}</div>
                        <div className="md:col-span-2 whitespace-pre-line text-slate-100">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contents" className="space-y-8 mt-0">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-rose-400" />
                  <h3 className="text-xl font-merriweather font-bold text-white">
                    Zawartość pudełka
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="font-merriweather font-bold text-white">
                        Zawartość - Wynajem
                      </h4>
                      <Badge variant="secondary" className="bg-rose-500 text-white">
                        Rental
                      </Badge>
                    </div>
                    <ul className="space-y-3">
                      {boxContents.rental.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-100">
                          <span className="text-rose-400 mt-1 text-sm">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                    <div className="flex items-center gap-2 mb-4">
                      <h4 className="font-merriweather font-bold text-white">Zawartość - Zakup</h4>
                      <Badge className="bg-rose-500 text-white">Purchase</Badge>
                    </div>
                    <ul className="space-y-3">
                      {boxContents.purchase.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-slate-100">
                          <span className="text-rose-400 mt-1 text-sm">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductInfo
