import { HeartHandshake, Shield, Phone, Truck, Clock } from 'lucide-react'

const features = [
  {
    icon: <HeartHandshake className="hero__feature-icon" />,
    title: 'BEZ UMOWY BEZ DOKUMENTÓW',
    description:
      'Nie potrzebujemy pisemnej umowy ani kopii dokumentów. Naszego sprzętu i tak nie da się ukraść ;)',
  },
  {
    icon: <Shield className="hero__feature-icon" />,
    title: 'UBEZPIECZENIE OD USZKODZEŃ',
    description: 'Nie martw się jeśli coś popsujesz - nic za to nie grozi :)',
  },
  {
    icon: <Phone className="hero__feature-icon" />,
    title: 'WSPARCIE SPECJALISTÓW',
    description: 'Zawsze służymy pomocą',
  },
  {
    icon: <Truck className="hero__feature-icon" />,
    title: 'PRZESYŁKA W 24H',
    description: 'Paczki wysyłamy codziennie około godziny 13:00',
  },
  {
    icon: <Clock className="hero__feature-icon" />,
    title: 'MINIMUM 3 DNI W CENIE',
    description:
      'Każdy sprzęt wypożyczamy na co najmniej 3 dni. Twoje dobre przygotowanie do "zadania" jest dla nas ważne',
  },
]

export default function RentalFeatures() {
  return (
    <div className="hero__features-root">
      <div className="hero__features-background" aria-hidden="true" />
      <div className="hero__features-grid">
        <div className="hero__features-row">
          {features.map((feature, i) => (
            <div key={feature.title} className="hero__feature group">
              {i > 0 && <div className="hero__feature-separator" aria-hidden="true" />}
              <div className="hero__feature-icon-wrapper">{feature.icon}</div>
              <h3 className="hero__feature-title">{feature.title}</h3>
              <p className="hero__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
