// ProductCard — Irregular, scattered product display with torn edges and organic shadows
// Each card feels like a polaroid in a scrapbook

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import { Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
  variant?: 'default' | 'featured' | 'compact';
}

export function ProductCard({ product, index, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  // Generate organic rotation and offset based on index
  const rotation = ((index % 5) - 2) * 1.5;
  const offsetY = (index % 3) * 8;
  const scale = variant === 'featured' ? 1.1 : 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      artist: product.artist,
    });
    toast.success(
      <div className="flex items-center gap-2 font-handwritten text-lg">
        <span>✧</span>
        <span>Added to your collection</span>
      </div>
    );
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block relative"
      style={{
        transform: `rotate(${rotation}deg) translateY(${offsetY}px) scale(${scale})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card container */}
      <article
        className={`
          relative bg-card overflow-hidden
          transition-all duration-500 ease-organic
          ${variant === 'featured' ? 'shadow-dramatic' : 'shadow-organic'}
          group-hover:shadow-float group-hover:scale-[1.02] group-hover:-rotate-1
          cursor-browse
        `}
        style={{
          clipPath: variant === 'compact'
            ? 'none'
            : 'polygon(2% 0%, 98% 2%, 100% 97%, 3% 100%)',
          borderRadius: '4px',
        }}
      >
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full h-full object-cover
              transition-all duration-700 ease-smooth
              ${isHovered ? 'scale-110 brightness-105' : 'scale-100'}
            `}
          />
          
          {/* Texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/10 pointer-events-none" />
          
          {/* Floating handwritten label */}
          <div
            className={`
              absolute top-3 left-3 px-3 py-1
              bg-background/90 backdrop-blur-sm
              font-handwritten text-base text-muted-foreground
              transition-all duration-300
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
            `}
            style={{ transform: `rotate(-3deg) ${isHovered ? 'translateY(0)' : 'translateY(8px)'}` }}
          >
            by {product.artist}
          </div>

          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className={`
              absolute bottom-3 right-3
              w-10 h-10 rounded-full
              bg-accent text-accent-foreground
              shadow-float
              flex items-center justify-center
              transition-all duration-300 ease-bounce
              hover:scale-110 hover:bg-gold
              ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            aria-label="Quick add to cart"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Rating badge */}
          {product.rating >= 4.8 && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-gold/90 text-gold-foreground rounded-full text-sm font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-display text-lg text-card-foreground leading-tight">
            {product.name}
          </h3>
          
          <p className="font-handwritten text-base text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="font-display text-xl text-accent">
              ${product.price}
            </span>
            <span className="font-handwritten text-sm text-muted-foreground capitalize">
              {product.category.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Decorative corner */}
        <div
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent/20"
          style={{
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </article>

      {/* Scattered ink splatter decoration */}
      {variant === 'featured' && (
        <div
          className="absolute -z-10 w-32 h-32 opacity-10 pointer-events-none"
          style={{
            top: '20%',
            left: '-10%',
            background: `radial-gradient(ellipse at center, hsl(var(--accent)) 0%, transparent 70%)`,
            transform: `rotate(${rotation * 2}deg)`,
          }}
        />
      )}
    </Link>
  );
}
