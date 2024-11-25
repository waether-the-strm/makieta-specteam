import { motion } from 'framer-motion';
import { LogoSymbol, LogoText } from './LogoPaths';

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
};

interface LogoHorizontalProps {
  className?: string;
  fill: string
}

export default function LogoHorizontal({ className, fill="#111822" }: LogoHorizontalProps) {
  return (
    <motion.svg
      className={className}
      viewBox="-20 -30 500 230"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.g variants={logoVariants}>
        <LogoSymbol fill={fill} />
      </motion.g>
      <motion.g variants={textVariants}>
        <LogoText fill={fill} />
      </motion.g>
    </motion.svg>
  );
}