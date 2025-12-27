// Footer — Artistic closure with asymmetric layout and hand-drawn social icons
// A quiet ending to the experience

import { Link } from 'react-router-dom';
import { Mail, Instagram, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Diagonal top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-16 bg-background"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 40%)',
        }}
      />

      <div className="container mx-auto px-6 relative pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1" style={{ transform: 'rotate(-1deg)' }}>
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl">Hasan</span>
              <span className="font-handwritten text-xl ml-1 text-accent">& Walid</span>
            </Link>
            <p className="font-body text-primary-foreground/70 text-sm max-w-xs">
              A curated collection of artisanal treasures, 
              each carrying the soul of its maker.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1 md:text-center">
            <span className="font-handwritten text-lg text-accent mb-4 block">
              quick paths
            </span>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                Shop All
              </Link>
              <Link to="/cart" className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                Your Cart
              </Link>
            </nav>
          </div>

          {/* Social / contact */}
          <div className="md:col-span-1 md:text-right">
            <span className="font-handwritten text-lg text-accent mb-4 block">
              stay connected
            </span>
            <div className="flex gap-4 md:justify-end">
              <a
                href="#"
                className="
                  w-10 h-10 rounded-full bg-primary-foreground/10
                  flex items-center justify-center
                  hover:bg-accent hover:text-accent-foreground
                  transition-all duration-300
                  hover:scale-110 hover:rotate-12
                "
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="
                  w-10 h-10 rounded-full bg-primary-foreground/10
                  flex items-center justify-center
                  hover:bg-accent hover:text-accent-foreground
                  transition-all duration-300
                  hover:scale-110 hover:-rotate-12
                "
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p className="font-handwritten text-base" style={{ transform: 'rotate(-2deg)' }}>
              © {currentYear} Hasan & Walid
            </p>
            <p className="flex items-center gap-2 font-body">
              Developed by <Heart className="w-3 h-3 text-crimson animate-pulse" /> Walid Islam Anonto
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom flourish */}
      <svg
        className="absolute bottom-0 left-0 w-full h-8 text-primary-foreground/5"
        viewBox="0 0 1200 30"
        preserveAspectRatio="none"
      >
        <path
          d="M0,15 Q150,5 300,15 T600,15 T900,15 T1200,15"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </footer>
  );
}
