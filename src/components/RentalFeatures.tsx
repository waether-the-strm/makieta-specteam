import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Shield, Truck, Clock, HeartHandshake, Phone } from 'lucide-react';

const features = [
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: 'BEZ UMOWY BEZ DOKUMENTÓW',
    description:
      'Nie potrzebujemy pisemnej umowy ani kopii dokumentów. Naszego sprzętu i tak nie da się ukraść ;)',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'UBEZPIECZENIE OD USZKODZEŃ',
    description: 'Nie martw się jeśli coś popsujesz - nic za to nie grozi :)',
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: 'WSPARCIE SPECJALISTÓW',
    description: 'Zawsze służymy pomocą',
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'PRZESYŁKA W 24H',
    description: 'Paczki wysyłamy codziennie około godziny 13:00',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'MINIMUM 3 DNI W CENIE',
    description:
      "Każdy sprzęt wypożyczamy na co najmniej 3 dni. Twoje dobre przygotowanie do 'zadania' jest dla nas ważne",
  },
];

export default function RentalFeatures() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const totalWidth = carouselRef.current.scrollWidth;

      setContainerWidth(totalWidth);
    }
  }, []);

  useEffect(() => {
    const autoplay = setInterval(() => {
      const currentX = x.get();
      const nextX = currentX - 1;

      controls.start({
        x: nextX,
        transition: { duration: 0.016, ease: 'linear' },
      });
    }, 24);

    return () => clearInterval(autoplay);
  }, [x, controls]);

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (Math.abs(latest) >= containerWidth / 2) {
        x.set(-50);
      }
    });

    return () => unsubscribe();
  }, [x, containerWidth]);

  return (
    <div className="py-12 relative">
      <motion.div
        ref={carouselRef}
        className="flex gap-8"
        style={{ x }}
        animate={controls}
      >
        {[...features, ...features].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-slate-600/10 border border-slate-500/20 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl hover:opacity-100 transition-all min-w-[300px] flex flex-col"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-slate-300">{feature.icon}</div>
              <h3 className="font-bold text-lg">{feature.title}</h3>
            </div>
            <p className="text-blue-300 grow content-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
