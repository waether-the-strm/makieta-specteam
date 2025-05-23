import { motion } from 'framer-motion';
import { LogoSymbol, LogoText } from './LogoPaths';

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const symbolVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};

export default function LogoCentered({ fill = '#111822' }: { fill: string }) {
  return (
    <motion.svg
      viewBox="0 0 422 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={logoVariants}
    >
      <motion.g variants={symbolVariants}>
        <LogoSymbol fill={fill} />
      </motion.g>
      <motion.g variants={textVariants}>
        <LogoText fill={fill} />
      </motion.g>
    </motion.svg>
  );
}
