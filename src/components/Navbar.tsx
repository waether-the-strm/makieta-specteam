import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import AnimatedLogo from "./logos/AnimatedLogo";
import { motion } from "framer-motion";

const menuVariants = {
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
  visible: {
    opacity: 1,
    display: "flex",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const closeButtonVariants = {
  hidden: { opacity: 0, rotate: -90 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const links = [
    { href: "#products", label: "Products" },
    { href: "#rental", label: "Rental" },
    { href: "#store", label: "Store" },
    { href: "#support", label: "Support" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="navbar navbar--fixed">
      <div className="container">
        <div className="navbar__content">
          <div className="navbar__logo">
            <a href="/" className="navbar__logo-link">
              <AnimatedLogo
                logoFill="#fff"
                minScale={0.9}
                maxScale={1.3}
                scrollThreshold={100}
              />
            </a>
          </div>

          <div className="navbar__menu">
            <div className="navbar__links">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="navbar__link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="navbar__actions">
            <Search className="nav-icon" />
            <ShoppingCart className="nav-icon" />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar__mobile-button md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <motion.div
        className="navbar__mobile-overlay"
        variants={menuVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      >
        <motion.button
          className="navbar__mobile-close"
          onClick={() => setIsOpen(false)}
          variants={closeButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <X className="navbar__mobile-close-icon" />
        </motion.button>

        <motion.div
          className="navbar__mobile-content"
          variants={contentVariants}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
        >
          <div className="navbar__mobile-links">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="navbar__mobile-link"
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.div
            className="navbar__mobile-actions"
            variants={itemVariants}
          >
            <Search className="nav-icon" />
            <ShoppingCart className="nav-icon" />
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
}
