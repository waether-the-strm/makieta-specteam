import { useState } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import AnimatedLogo from "./logos/AnimatedLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              <a href="#products" className="navbar__link">
                Products
              </a>
              <a href="#rental" className="navbar__link">
                Rental
              </a>
              <a href="#store" className="navbar__link">
                Store
              </a>
              <a href="#support" className="navbar__link">
                Support
              </a>
              <a href="#contact" className="navbar__link">
                Contact
              </a>
            </div>
          </div>

          <div className="navbar__actions">
            <Search className="navbar__icon" />
            <ShoppingCart className="navbar__icon" />
          </div>

          <div className="navbar__mobile-menu">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar__mobile-button"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
