const faqs = [
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
];

export default function FAQ() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Często zadawane pytania</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
