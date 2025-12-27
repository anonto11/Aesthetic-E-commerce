// CategoryPortals — Illustrated irregular icons leading to different collections
// Whimsical navigation between the different corners of the shop

import { Link } from 'react-router-dom';
import { categories } from '@/lib/products';
import { useState } from 'react';

export function CategoryPortals() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Custom illustrations/shapes for each category
  const categoryStyles: Record<string, { bg: string; rotate: number; shape: string }> = {
    jewelry: {
      bg: 'bg-gradient-to-br from-gold/20 to-accent/10',
      rotate: -3,
      shape: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
    },
    ceramics: {
      bg: 'bg-gradient-to-br from-muted/30 to-secondary/20',
      rotate: 2,
      shape: 'ellipse(50% 45% at 50% 50%)',
    },
    prints: {
      bg: 'bg-gradient-to-br from-indigo/15 to-muted/20',
      rotate: -2,
      shape: 'polygon(5% 5%, 95% 0%, 100% 100%, 0% 95%)',
    },
    textiles: {
      bg: 'bg-gradient-to-br from-crimson/10 to-accent/10',
      rotate: 4,
      shape: 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
    },
    'found-objects': {
      bg: 'bg-gradient-to-br from-accent/20 to-gold/10',
      rotate: -4,
      shape: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    },
  };

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,20 Q25,10 50,20 T100,20" stroke="currentColor" fill="none" strokeWidth="0.2" />
          <path d="M0,50 Q25,40 50,50 T100,50" stroke="currentColor" fill="none" strokeWidth="0.2" />
          <path d="M0,80 Q25,70 50,80 T100,80" stroke="currentColor" fill="none" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-xl text-accent mb-2 block">
            follow your curiosity
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Wander the Collection
          </h2>
        </div>

        {/* Category grid - scattered layout */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const style = categoryStyles[category.id];
            const isHovered = hoveredCategory === category.id;

            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  transform: `rotate(${style.rotate}deg) translateY(${(index % 3) * 10}px)`,
                }}
              >
                <div
                  className={`
                    relative w-36 h-36 md:w-44 md:h-44
                    ${style.bg}
                    flex flex-col items-center justify-center
                    transition-all duration-500 ease-organic
                    shadow-organic
                    ${isHovered ? 'shadow-float scale-110' : ''}
                  `}
                  style={{
                    clipPath: style.shape,
                  }}
                >
                  {/* Category icon */}
                  <span
                    className={`
                      text-4xl md:text-5xl mb-2
                      transition-all duration-300
                      ${isHovered ? 'scale-125 text-accent' : 'text-foreground/60'}
                    `}
                  >
                    {category.icon}
                  </span>

                  {/* Category name */}
                  <span
                    className={`
                      font-display text-sm md:text-base text-center px-2
                      transition-colors duration-300
                      ${isHovered ? 'text-accent' : 'text-foreground'}
                    `}
                  >
                    {category.name}
                  </span>

                  {/* Hover reveal */}
                  <span
                    className={`
                      absolute bottom-4 font-handwritten text-xs text-muted-foreground
                      transition-all duration-300
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}
                  >
                    explore →
                  </span>
                </div>

                {/* Decorative dot */}
                <div
                  className={`
                    absolute -top-2 -right-2 w-3 h-3 rounded-full bg-accent
                    transition-all duration-300
                    ${isHovered ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}
                  `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
