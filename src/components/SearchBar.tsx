// SearchBar — Artistically styled search with organic edges
// Feels like writing a note rather than typing in a box

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "search the collection..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`
        relative group
        transition-all duration-300 ease-organic
        ${isFocused ? 'scale-[1.02]' : ''}
      `}
      style={{ transform: `rotate(${isFocused ? -0.5 : -1}deg)` }}
    >
      {/* Background shape */}
      <div
        className={`
          absolute inset-0 bg-card shadow-organic
          transition-all duration-300
          ${isFocused ? 'shadow-float bg-background' : ''}
        `}
        style={{
          clipPath: 'polygon(0% 5%, 2% 0%, 98% 2%, 100% 8%, 100% 95%, 97% 100%, 3% 98%, 0% 92%)',
        }}
      />

      {/* Input wrapper */}
      <div className="relative flex items-center">
        <Search
          className={`
            absolute left-4 w-5 h-5
            transition-colors duration-300
            ${isFocused ? 'text-accent' : 'text-muted-foreground'}
          `}
        />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full py-4 pl-12 pr-12
            bg-transparent
            font-handwritten text-lg text-foreground
            placeholder:text-muted-foreground/60
            focus:outline-none
          "
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="
              absolute right-4
              w-6 h-6 rounded-full
              bg-muted hover:bg-accent
              flex items-center justify-center
              transition-colors duration-300
            "
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Decorative underline */}
      <svg
        className={`
          absolute -bottom-2 left-4 right-4 h-3
          text-accent transition-opacity duration-300
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `}
        viewBox="0 0 200 10"
        preserveAspectRatio="none"
      >
        <path
          d="M0,5 Q50,0 100,5 T200,5"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
