import { motion } from "framer-motion";
import { LogoSymbol, LogoText } from "./LogoPaths";

const logoVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 180, x: -210 },
  visible: {
    opacity: 1,
    y: 140,
    x: -210,
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
};

export default function LogoVertical({
  className,
  fill = "#111822",
}: {
  className?: string;
  fill: string;
}) {
  return (
    <motion.svg
      viewBox="-40 -30 270 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={className}
    >
      <motion.g variants={logoVariants}>
        <LogoSymbol fill={fill} />
      </motion.g>
      <motion.g variants={textVariants} x="-100" y="10">
        <LogoText fill={fill} />
      </motion.g>
    </motion.svg>
  );
}
