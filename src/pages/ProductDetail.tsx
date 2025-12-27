// Product Detail — Immersive narrative experience for each treasure
// Asymmetric split with floating text blocks and interactive elements

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '@/lib/products';
import { useCart } from '@/lib/cartStore';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Plus, Minus, Star, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="font-handwritten text-3xl text-muted-foreground">
            This treasure has wandered elsewhere...
          </span>
          <div className="mt-6">
            <Link to="/shop" className="font-display text-accent hover:underline">
              ← Return to the collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        artist: product.artist,
      }, quantity);
      
      toast.success(
        <div className="flex flex-col gap-1">
          <span className="font-display text-base">{product.name}</span>
          <span className="font-handwritten text-muted-foreground">
            ✧ Added to your collection
          </span>
        </div>
      );
      
      setIsAdding(false);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* SEO */}
      <title>{product.name} — Hasan & Walid</title>
      <meta name="description" content={product.description} />

      {/* Back navigation */}
      <div className="fixed top-24 left-6 z-elevated">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center gap-2 px-4 py-2
            bg-card/90 backdrop-blur-sm shadow-organic
            font-handwritten text-lg text-foreground
            hover:text-accent transition-colors
            rounded-lg
          "
          style={{ transform: 'rotate(-2deg)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back</span>
        </button>
      </div>

      {/* Main content - asymmetric split */}
      <div className="container mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: Image gallery */}
          <div className="relative">
            {/* Main image */}
            <div
              className="relative aspect-[4/5] overflow-hidden shadow-dramatic"
              style={{
                transform: `rotate(-2deg) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
                clipPath: 'polygon(2% 0%, 98% 3%, 100% 97%, 0% 100%)',
              }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent pointer-events-none" />

              {/* Rating badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-2 bg-background/90 backdrop-blur-sm rounded-lg shadow-organic">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="font-display text-sm">{product.rating}</span>
                <span className="font-handwritten text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-6 justify-center">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      w-16 h-20 overflow-hidden shadow-organic
                      transition-all duration-300
                      ${selectedImage === index ? 'ring-2 ring-accent scale-110' : 'opacity-60 hover:opacity-100'}
                    `}
                    style={{
                      transform: `rotate(${(index - 0.5) * 4}deg)`,
                      borderRadius: '4px',
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Floating handwritten note */}
            <div
              className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-8 lg:bottom-20 p-4 bg-card shadow-float max-w-[200px]"
              style={{
                transform: `rotate(3deg) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
                borderRadius: '2px',
              }}
            >
              <span className="font-handwritten text-base text-muted-foreground leading-relaxed block">
                "{product.backstory.slice(0, 100)}..."
              </span>
              <span className="font-handwritten text-sm text-accent block mt-2">
                — {product.artist}
              </span>
            </div>
          </div>

          {/* Right: Product info - scattered floating blocks */}
          <div className="relative lg:pt-12 space-y-8">
            {/* Artist tag */}
            <div style={{ transform: 'rotate(1deg)' }}>
              <span className="font-handwritten text-xl text-accent">
                crafted by {product.artist}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl text-foreground leading-tight"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4" style={{ transform: 'rotate(0.5deg)' }}>
              <span className="font-display text-3xl text-accent">${product.price}</span>
              <span className="font-handwritten text-muted-foreground capitalize">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Description */}
            <div
              className="p-6 bg-card/50 shadow-organic"
              style={{
                transform: 'rotate(-0.5deg)',
                borderRadius: '4px 8px 4px 8px',
              }}
            >
              <p className="font-body text-lg text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Backstory */}
            <div className="space-y-2" style={{ transform: 'rotate(1deg)' }}>
              <span className="font-handwritten text-lg text-accent block">the story:</span>
              <p className="font-body text-muted-foreground leading-relaxed">
                {product.backstory}
              </p>
            </div>

            {/* Materials & Dimensions */}
            <div className="flex flex-wrap gap-6" style={{ transform: 'rotate(-0.5deg)' }}>
              <div>
                <span className="font-handwritten text-base text-accent block mb-1">materials:</span>
                <span className="font-body text-sm text-muted-foreground">
                  {product.materials.join(', ')}
                </span>
              </div>
              <div>
                <span className="font-handwritten text-base text-accent block mb-1">dimensions:</span>
                <span className="font-body text-sm text-muted-foreground">
                  {product.dimensions}
                </span>
              </div>
            </div>

            {/* Quantity & Add to cart */}
            <div className="pt-4 space-y-6">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="font-handwritten text-lg text-foreground">quantity:</span>
                <div className="flex items-center gap-2 bg-card shadow-organic rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-accent/20 rounded transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-display text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-accent/20 rounded transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  relative w-full py-4 px-8
                  bg-primary text-primary-foreground
                  font-display text-lg
                  shadow-dramatic
                  transition-all duration-500 ease-organic
                  hover:shadow-glow hover:scale-[1.02]
                  disabled:opacity-70
                  overflow-hidden
                  group
                `}
                style={{
                  transform: 'rotate(-1deg)',
                  borderRadius: '4px',
                }}
              >
                {/* Ripple effect */}
                {isAdding && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-4 h-4 bg-accent rounded-full animate-ripple" />
                  </span>
                )}
                
                <span className={`flex items-center justify-center gap-3 transition-opacity ${isAdding ? 'opacity-0' : 'opacity-100'}`}>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Collection</span>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                </span>
                
                {isAdding && (
                  <span className="absolute inset-0 flex items-center justify-center font-handwritten text-xl">
                    ✧ collecting... ✧
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button
                className="
                  flex items-center justify-center gap-2 w-full py-3
                  font-handwritten text-lg text-muted-foreground
                  hover:text-crimson transition-colors
                  group
                "
              >
                <Heart className="w-5 h-5 group-hover:fill-crimson transition-all" />
                <span>save for later</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductDetail;
