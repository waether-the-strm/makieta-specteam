import { Cog, Package } from 'lucide-react'

import { Accordion } from '@ui/accordion'
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card'
import { Separator } from '@ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs'
import { Badge } from '@ui/badge'

import { techSpecs, boxContents } from './data'

import { AccordionProductItem, accordionData } from './accordion'
import { useParams } from 'react-router-dom'

const tabs: { value: string; label: string }[] = [
  { value: 'questions', label: 'Pytania i odpowiedzi' },
  { value: 'specs', label: 'Szczegóły techniczne' },
  { value: 'contents', label: 'Zawartość pudełka' },
]
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const ProductInfo = () => {
  const { categoryId } = useParams()

  return (
    <div className="product-info">
      <div className="product-info__container">
        <Card className="product-info__card">
          <CardHeader className="product-info__header">
            {categoryId && (
              <CardTitle className="product-info__category-title">
                {capitalizeFirstLetter(categoryId)}
              </CardTitle>
            )}
            <div className="product-info__intro">
              <p>
                Mikrosłuchawki douszne Bluetooth zapewniające dyskretną komunikację. Idealne w
                sytuacjach wymagających ukrytego kontaktu audio. Współpracują z telefonami
                komórkowymi i zestawami GSM.
              </p>
            </div>
          </CardHeader>

          <CardContent className="product-info__content">
            <Tabs defaultValue="questions" className="product-info__tabs">
              <div className="product-info__tabs-scroll">
                <TabsList className="product-info__tabs-list">
                  {tabs.map(tab => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="product-info__tab-trigger"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent
                value="questions"
                className="product-info__tab-content product-info__tab-content--questions"
              >
                <div className="product-info__questions-list">
                  <div className="product-info__question-block">
                    <h3 className="product-info__question-title">
                      Jak działają mikrosłuchawki Bluetooth?
                    </h3>
                    <p className="product-info__question-text">
                      Mikrosłuchawki wykorzystują technologię Bluetooth do bezprzewodowej
                      komunikacji z urządzeniem nadawczym. Sygnał jest przekazywany przez pętlę
                      indukcyjną noszoną na szyi, która jest prawie niewidoczna.
                    </p>
                  </div>

                  <Separator className="product-info__separator" />

                  <div className="product-info__question-block">
                    <h3 className="product-info__question-title">
                      Czy mikrosłuchawki są widoczne dla innych osób?
                    </h3>
                    <p className="product-info__question-text">
                      Nasze mikrosłuchawki mają cielisty kolor i są tak małe, że pozostają
                      praktycznie niewidoczne dla osób trzecich, nawet z bliskiej odległości.
                    </p>
                  </div>

                  <Separator className="product-info__separator" />

                  <div className="product-info__question-block">
                    <h3 className="product-info__question-title">
                      Jak długo działają mikrosłuchawki?
                    </h3>
                    <p className="product-info__question-text">
                      Bateria w mikrosłuchawce zapewnia do 6-8 godzin ciągłej pracy. W zestawie
                      otrzymujesz zapasowe baterie.
                    </p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="product-info__accordion">
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

              <TabsContent
                value="specs"
                className="product-info__tab-content product-info__tab-content--specs"
              >
                <div className="product-info__specs-list">
                  <div className="product-info__specs-header">
                    <Cog className="product-info__specs-icon" />
                    <h3 className="product-info__specs-title">Szczegóły techniczne</h3>
                  </div>

                  <div className="product-info__specs-table">
                    {techSpecs.map((spec, index) => (
                      <div key={index} className="product-info__specs-row">
                        <div className="product-info__specs-label">{spec.label}</div>
                        <div className="product-info__specs-value">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="contents"
                className="product-info__tab-content product-info__tab-content--contents"
              >
                <div className="product-info__contents-header">
                  <Package className="product-info__contents-icon" />
                  <h3 className="product-info__contents-title">Zawartość pudełka</h3>
                </div>

                <div className="product-info__contents-list">
                  <div className="product-info__contents-box product-info__contents-box--rental">
                    <div className="product-info__contents-box-header">
                      <h4 className="product-info__contents-box-title">Zawartość - Wynajem</h4>
                      <Badge variant="secondary" className="product-info__contents-badge">
                        Rental
                      </Badge>
                    </div>
                    <ul className="product-info__contents-list-items">
                      {boxContents.rental.map((item, index) => (
                        <li key={index} className="product-info__contents-list-item">
                          <span className="product-info__contents-list-dot">•</span>
                          <span className="product-info__contents-list-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-info__contents-box product-info__contents-box--purchase">
                    <div className="product-info__contents-box-header">
                      <h4 className="product-info__contents-box-title">Zawartość - Zakup</h4>
                      <Badge className="product-info__contents-badge">Purchase</Badge>
                    </div>
                    <ul className="product-info__contents-list-items">
                      {boxContents.purchase.map((item, index) => (
                        <li key={index} className="product-info__contents-list-item">
                          <span className="product-info__contents-list-dot">•</span>
                          <span className="product-info__contents-list-text">{item}</span>
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
