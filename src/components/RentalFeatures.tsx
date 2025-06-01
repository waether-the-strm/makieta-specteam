import { useState, useEffect, useRef } from 'react'
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
  const [activeIdx, setActiveIdx] = useState(0)
  const [isUserHovering, setIsUserHovering] = useState(false)
  const [visibleDescriptionIdx, setVisibleDescriptionIdx] = useState(0)
  const [fade, setFade] = useState<'in' | 'out'>('in')
  const [isInView, setIsInView] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Automatyczny cykl
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isUserHovering && isInView) {
      intervalRef.current = setInterval(() => {
        setActiveIdx(prev => (prev + 1) % features.length)
      }, 2500)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isUserHovering, isInView])

  // Scroll do aktywnego kafelka na mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth >= 1024) return // tylko mobile/tablet
    const ref = featureRefs.current[activeIdx]
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeIdx])

  // Fade out/in animacja opisu
  useEffect(() => {
    if (activeIdx === visibleDescriptionIdx) return
    setFade('out')
    const timeout = setTimeout(() => {
      setVisibleDescriptionIdx(activeIdx)
      setFade('in')
    }, 200) // czas fade out
    return () => clearTimeout(timeout)
  }, [activeIdx, visibleDescriptionIdx])

  return (
    <div className="hero__features-root" ref={rootRef}>
      <div className="hero__features-background" aria-hidden="true" />
      <div className="hero__features-grid">
        <div className="hero__features-row">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`hero__feature group${i === activeIdx ? ' is-active' : ''}`}
              tabIndex={0}
              ref={el => (featureRefs.current[i] = el)}
              onMouseEnter={() => {
                setActiveIdx(i)
                setIsUserHovering(true)
              }}
              onFocus={() => {
                setActiveIdx(i)
                setIsUserHovering(true)
              }}
              onMouseLeave={() => {
                setIsUserHovering(false)
              }}
              onBlur={() => {
                setIsUserHovering(false)
              }}
            >
              <div className="hero__feature-inner">
                <div className="hero__feature-icon-wrapper">{feature.icon}</div>
                <h3 className="hero__feature-title">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__feature-description-central">
        <div className={`hero__feature-description-central-item fade-${fade}`}>
          {features[visibleDescriptionIdx].description}
        </div>
      </div>
    </div>
  )
}
