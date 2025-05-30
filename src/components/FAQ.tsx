import { faqs, FAQ as FAQType } from '../data/faqs'

interface FAQProps {
  items?: FAQType[]
}

export default function FAQ({ items = faqs }: FAQProps) {
  return (
    <section className="faq">
      <h2 className="section-title">Często zadawane pytania</h2>
      <div className="faq__list">
        <div className="faq__spacer" aria-hidden="true"></div>
        {items.map((faq, index) => (
          <div key={index} className="card faq__item">
            <h3 className="faq__question">{faq.question}</h3>
            <p className="faq__answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
