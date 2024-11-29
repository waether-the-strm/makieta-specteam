import { faqs } from "../data/faqs";

export default function FAQ() {
  return (
    <section className="faq">
      <h2 className="section-title">Często zadawane pytania</h2>
      <div className="faq__list">
        {faqs.map((faq, index) => (
          <div key={index} className="card faq__item">
            <h3 className="faq__question">{faq.question}</h3>
            <p className="faq__answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
