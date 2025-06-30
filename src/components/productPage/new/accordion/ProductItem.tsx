import { AccordionItem, AccordionTrigger, AccordionContent } from '@ui/accordion'
import { AccordionProductData } from './data'

export const AccordionProductItem = ({ name, title, Icon, content }: AccordionProductData) => (
  <AccordionItem value={name} className="border-0">
    <AccordionTrigger className="text-lg font-semibold py-6 hover:no-underline text-white border-0 hover:bg-slate-700/50 rounded-lg px-4 transition-colors">
      <div className="flex items-center gap-3 w-full">
        <Icon className="w-5 h-5 text-rose-400" />
        <span className="flex-1 text-left">{title}</span>
      </div>
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-6">{content}</AccordionContent>
  </AccordionItem>
)
