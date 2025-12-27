// Navigation — Floating morphing orb that expands into fragmented links
// Unconventional navigation for an unconventional shop

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/lib/cartStore';
import { X, ShoppingBag, Sparkles, Store, Info, Home } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/shop', label: 'Shop', icon: Store },
    { to: '/cart', label: `Cart${itemCount > 0 ? ` (${itemCount})` : ''}`, icon: ShoppingBag },
  ];

  return (
    <>
      {/* Main navigation orb */}
      <nav className="fixed top-6 right-6 z-supreme">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative w-14 h-14 rounded-full
            bg-primary text-primary-foreground
            shadow-dramatic
            transition-all duration-500 ease-organic
            hover:scale-110 hover:shadow-glow
            ${isOpen ? 'rotate-180 bg-accent' : ''}
            ${isScrolled ? 'scale-90' : ''}
          `}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6 animate-pulse" />
            )}
          </span>
          
          {/* Cart indicator */}
          {!isOpen && itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-crimson text-crimson-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
              {itemCount}
            </span>
          )}
        </button>

        {/* Expanded navigation */}
        <div
          className={`
            absolute top-full right-0 mt-4
            transition-all duration-500 ease-organic
            ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          <div className="relative">
            {/* Background blob */}
            <div className="absolute inset-0 -m-4 bg-card/95 backdrop-blur-md rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-morph-blob shadow-dramatic" />
            
            {/* Links */}
            <ul className="relative flex flex-col gap-2 p-4">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                
                return (
                  <li
                    key={link.to}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    className={isOpen ? 'animate-fade-slide-up' : ''}
                  >
                    <Link
                      to={link.to}
                      className={`
                        flex items-center gap-3 px-4 py-3
                        font-handwritten text-xl
                        rounded-lg transition-all duration-300
                        hover:bg-accent/20 hover:translate-x-2
                        ${isActive ? 'text-accent font-bold' : 'text-foreground'}
                      `}
                      style={{ transform: `rotate(${(index - 1) * 1.5}deg)` }}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-overlay animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Logo / Brand */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-supreme group"
      >
        <div className="flex flex-col">
          <span className="font-display text-xl md:text-2xl text-foreground tracking-tight group-hover:text-accent transition-colors">
            Hasan
          </span>
          <span className="font-handwritten text-lg md:text-xl text-muted-foreground -mt-1 group-hover:text-accent/70 transition-colors">
            & anonto
          </span>
        </div>
      </Link>
    </>
  );
}
