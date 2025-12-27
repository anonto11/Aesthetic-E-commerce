// FeaturedSection — Asymmetric showcase of curated treasures
// Diagonal splits and overlapping layers for visual intrigue

import { getFeaturedProducts } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FeaturedSection() {
  const featured = getFeaturedProducts();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-secondary/30">
      {/* Diagonal background split */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 50%, hsl(var(--secondary)) 50%, hsl(var(--secondary)) 100%)`,
        }}
      />

      {/* Decorative ink splatter */}
      <div
        className="absolute top-20 left-10 w-64 h-64 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--accent)) 0%, transparent 70%)`,
          transform: 'rotate(-15deg)',
        }}
      />

      <div className="relative container mx-auto px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <span className="font-handwritten text-xl text-accent mb-2 block">
            carefully selected
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4" style={{ transform: 'rotate(-1deg)' }}>
            Treasures Worth Keeping
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-lg">
            Each piece in this collection carries a story — of the artist who made it, 
            the materials that shaped it, and the moment it was waiting to become yours.
          </p>
        </div>

        {/* Featured products grid - irregular masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className={`
                ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                ${index === 2 ? 'sm:mt-12' : ''}
                ${index === 3 ? 'lg:-mt-8' : ''}
              `}
            >
              <ProductCard
                product={product}
                index={index}
                variant={index === 0 ? 'featured' : 'default'}
              />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-16 text-center">
          <Link
            to="/shop"
            className="
              inline-flex items-center gap-3 group
              font-display text-xl text-foreground
              hover:text-accent transition-colors
            "
          >
            <span>Explore the Full Collection</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <p className="font-handwritten text-muted-foreground mt-2">
            ~ 20+ unique pieces await ~
          </p>
        </div>
      </div>
    </section>
  );
}
