import { useEffect } from 'react';
import { motionValue } from 'framer-motion';

export function useScrollPosition() {
  const scrollY = motionValue(0);
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);
  
  return scrollY;
}
