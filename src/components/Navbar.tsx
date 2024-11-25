import { useState } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import AnimatedLogo from './logos/AnimatedLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="w-20">
              <AnimatedLogo
                logoFill="#fffe"
                maxScale={1.5}
                minScale={1}
                scrollThreshold={100}
              />
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#products"
                className="hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Products
              </a>
              <a
                href="#rental"
                className="hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Rental
              </a>
              <a
                href="#store"
                className="hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Store
              </a>
              <a
                href="#support"
                className="hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Support
              </a>
              <a
                href="#contact"
                className="hover:bg-slate-800 px-3 py-2 rounded-md"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Search className="h-5 w-5 cursor-pointer hover:text-slate-300" />
            <ShoppingCart className="h-5 w-5 cursor-pointer hover:text-slate-300" />
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#products"
              className="block hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Products
            </a>
            <a
              href="#rental"
              className="block hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Rental
            </a>
            <a
              href="#store"
              className="block hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Store
            </a>
            <a
              href="#support"
              className="block hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Support
            </a>
            <a
              href="#contact"
              className="block hover:bg-slate-800 px-3 py-2 rounded-md"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
