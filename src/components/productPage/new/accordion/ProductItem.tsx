import { AccordionItem, AccordionTrigger, AccordionContent } from '@ui/accordion'
import { AccordionProductData } from './data'

const ACCORDION_ITEM_CLASS = 'border-0 bg-slate-700/20 rounded-lg transition-colors p-1'
const ACCORDION_TRIGGER_CLASS =
  'text-lg font-semibold p-4 hover:no-underline text-white hover:bg-slate-900/20 rounded-md'
const ACCORDION_ICON_CLASS = 'w-5 h-5 text-rose-400'
const ACCORDION_CONTENT_CLASS = 'px-4 py-6'

export const AccordionProductItem = ({ name, title, Icon, content }: AccordionProductData) => (
  <AccordionItem value={name} className={ACCORDION_ITEM_CLASS}>
    <AccordionTrigger className={ACCORDION_TRIGGER_CLASS}>
      <div className="flex items-center gap-3 w-full">
        <Icon className={ACCORDION_ICON_CLASS} />
        <span className="flex-1 text-left">{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className={ACCORDION_CONTENT_CLASS}>{content}</AccordionContent>
  </AccordionItem>
)
