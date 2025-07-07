import { AccordionItem, AccordionTrigger, AccordionContent } from '@ui/accordion'
import { AccordionProductData } from './data'

export const AccordionProductItem = ({ name, title, Icon, content }: AccordionProductData) => (
  <AccordionItem value={name} className="product-accordion__item">
    <AccordionTrigger className="product-accordion__trigger">
      <div className="product-accordion__row">
        <Icon className="product-accordion__icon" />
        <span className="product-accordion__title">{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="product-accordion__content">{content}</AccordionContent>
  </AccordionItem>
)
