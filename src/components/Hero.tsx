// Hero — Immersive collage with overlapping images, textures, and poetic fragments
// A dreamlike entrance to the cabinet of curiosities

import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '@/lib/products';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animated letter reveal for the title
  const title = "Hasan & Walid";
  const subtitle = "a cabinet of curiosities";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background texture layers */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, hsl(var(--indigo) / 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Floating product images - parallax layers */}
      {featuredProducts.map((product, index) => {
        const positions = [
          { top: '10%', left: '5%', size: 'w-48 h-64', rotate: -8, depth: 2 },
          { top: '60%', left: '8%', size: 'w-40 h-52', rotate: 5, depth: 1.5 },
          { top: '15%', right: '10%', size: 'w-44 h-56', rotate: 6, depth: 2.5 },
          { top: '55%', right: '5%', size: 'w-52 h-68', rotate: -4, depth: 1.8 },
        ];
        const pos = positions[index];
        const parallaxX = mousePosition.x * pos.depth;
        const parallaxY = mousePosition.y * pos.depth;

        return (
          <div
            key={product.id}
            className={`
              absolute ${pos.size} hidden lg:block
              transition-transform duration-300 ease-smooth
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `rotate(${pos.rotate}deg) translate(${parallaxX}px, ${parallaxY}px)`,
              transitionDelay: `${index * 0.2}s`,
            }}
          >
            <div className="relative w-full h-full shadow-dramatic overflow-hidden torn-edge">
              <img
                src={product.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              
              {/* Handwritten annotation */}
              <span
                className="absolute bottom-4 left-4 font-handwritten text-background text-lg"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                {product.artist}
              </span>
            </div>
          </div>
        );
      })}

      {/* Central content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Main title with letter animation */}
        <h1 className="mb-6">
          <span className="block font-display text-5xl sm:text-7xl md:text-8xl text-foreground tracking-tight">
            {title.split('').map((letter, i) => (
              <span
                key={i}
                className={`inline-block ${isLoaded ? 'animate-letter-reveal' : 'opacity-0'}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationFillMode: 'forwards',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            font-handwritten text-2xl sm:text-3xl md:text-4xl text-muted-foreground
            mb-12 transition-all duration-1000 delay-700
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          ~ {subtitle} ~
        </p>

        {/* Poetic fragment */}
        <div
          className={`
            max-w-xl mx-auto mb-12 p-6 bg-card/50 backdrop-blur-sm
            rounded-lg shadow-organic
            transition-all duration-1000 delay-1000
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
          style={{ transform: `rotate(-1deg) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        >
          <p className="font-display text-lg md:text-xl text-foreground/80 italic leading-relaxed">
            "Each piece whispers of hands that shaped it, 
            of the quiet hours and wild imaginings 
            that brought it into being."
          </p>
          <span className="block font-handwritten text-accent mt-4 text-lg">
            — discovered among the fragments
          </span>
        </div>

        {/* CTA Buttons */}
        <div
          className={`
            flex flex-col sm:flex-row gap-4 justify-center items-center
            transition-all duration-1000 delay-1200
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <Link
            to="/shop"
            className="
              group relative inline-flex items-center gap-3
              px-8 py-4 bg-primary text-primary-foreground
              font-display text-lg rounded-lg
              shadow-dramatic hover:shadow-glow
              transition-all duration-300 ease-organic
              hover:scale-105 hover:-rotate-1
            "
          >
            <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            <span>Enter the Collection</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/shop"
            className="
              font-handwritten text-xl text-muted-foreground
              hover:text-accent transition-colors
              underline underline-offset-4 decoration-dotted
            "
          >
            or wander freely →
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="font-handwritten text-sm">scroll to discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
      </div>

      {/* Corner decorations */}
      <svg className="absolute top-0 left-0 w-32 h-32 text-accent/10" viewBox="0 0 100 100">
        <path d="M0,50 Q25,25 50,0" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M0,70 Q35,35 70,0" stroke="currentColor" strokeWidth="0.3" fill="none" />
      </svg>
      
      <svg className="absolute bottom-0 right-0 w-32 h-32 text-accent/10" viewBox="0 0 100 100">
        <path d="M100,50 Q75,75 50,100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <path d="M100,30 Q65,65 30,100" stroke="currentColor" strokeWidth="0.3" fill="none" />
      </svg>
    </section>
  );
}
