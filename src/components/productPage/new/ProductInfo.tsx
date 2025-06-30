import { Cog, Package } from 'lucide-react'

import { Accordion } from '@ui/accordion'
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card'
import { Separator } from '@ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs'
import { Badge } from '@ui/badge'

import { techSpecs, boxContents } from './data'
import { BadgeVariant } from '@/components/ui/badge-variants'

import { AccordionProductItem, accordionData } from './accordion'

const ProductInfo = () => {
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

                <Accordion
                  type="single"
                  collapsible
                  className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-3 space-y-3 lg:space-y-0"
                >
                  {accordionData.map(item => (
                    <AccordionProductItem
                      key={item.name}
                      name={item.name}
                      title={item.title}
                      Icon={item.Icon}
                      content={item.content}
                    />
                  ))}
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
                      <Badge variant={BadgeVariant.Secondary} className="bg-rose-500 text-white">
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
