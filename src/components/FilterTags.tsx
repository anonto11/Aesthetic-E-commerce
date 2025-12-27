// FilterTags — Floating organic filter buttons
// Scattered like thoughts, organized like a collection

import { categories } from '@/lib/products';
import { useState } from 'react';

interface FilterTagsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterTags({ activeCategory, onCategoryChange }: FilterTagsProps) {
  const allCategories = [{ id: 'all', name: 'All Treasures', icon: '✧' }, ...categories];

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
      {allCategories.map((category, index) => {
        const isActive = activeCategory === category.id;
        const rotation = ((index % 5) - 2) * 2;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              relative px-4 py-2 md:px-5 md:py-3
              font-handwritten text-base md:text-lg
              transition-all duration-300 ease-organic
              hover:scale-110
              ${isActive
                ? 'bg-accent text-accent-foreground shadow-float'
                : 'bg-card text-foreground shadow-organic hover:bg-secondary'
              }
            `}
            style={{
              transform: `rotate(${rotation}deg)`,
              borderRadius: '4px 8px 4px 8px',
            }}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{category.name}</span>

            {/* Active indicator */}
            {isActive && (
              <span
                className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-pulse"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
