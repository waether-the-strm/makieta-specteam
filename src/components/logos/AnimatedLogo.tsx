import { motion, useTransform, useSpring } from "framer-motion";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { LogoHorizontal } from "./index";

interface AnimatedLogoProps {
  maxScale?: number;
  minScale?: number;
  scrollThreshold?: number;
  logoFill?: string;
}

export default function AnimatedLogo({
  maxScale = 1,
  minScale = 0.8,
  scrollThreshold = 100,
  logoFill,
}: AnimatedLogoProps) {
  const scrollY = useScrollPosition();

  const scale = useTransform(
    useSpring(scrollY, { stiffness: 100, damping: 20 }),
    [0, scrollThreshold],
    [maxScale, minScale]
  );

  return (
    <motion.div style={{ scale }}>
      <LogoHorizontal fill={logoFill || "#fff"} />
    </motion.div>
  );
}
