import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, Search } from 'lucide-react'
import AnimatedLogo from './logos/AnimatedLogo'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const menuVariants = {
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
  visible: {
    opacity: 1,
    display: 'flex',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

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
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

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
}

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
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
    }
  }, [isOpen])

  const links = [
    { href: '/#products', label: 'Products' },
    { href: '/#rental', label: 'Rental' },
    { href: '/store', label: 'Store' },
    { href: '/support', label: 'Support' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <nav className="navbar navbar--fixed">
      <div className="container">
        <div className="navbar__content">
          <Link to="/" className="navbar__logo">
            <AnimatedLogo logoFill="#fff" minScale={0.9} maxScale={1.3} scrollThreshold={100} />
          </Link>

          <div className="navbar__menu">
            <div className="navbar__links">
              {links.map(link => (
                <Link key={link.href} to={link.href} className="navbar__link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="navbar__actions">
            <Search className="navbar__icon" />
            <div className="relative">
              <ShoppingCart className="navbar__icon" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="navbar__mobile-button md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <motion.div
        className="navbar__mobile-overlay"
        variants={menuVariants}
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
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
          animate={isOpen ? 'visible' : 'hidden'}
        >
          <div className="navbar__mobile-links">
            {links.map(link => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  to={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="navbar__mobile-actions" variants={itemVariants}>
            <Search className="navbar__icon" />
            <div className="relative">
              <ShoppingCart className="navbar__icon" />
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  )
}
