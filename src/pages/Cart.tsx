// Cart Page — Theatrical display of collected treasures
// Like opening a vintage drawer full of curiosities

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cartStore';
import { Footer } from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (id: string, name: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
      toast.success(
        <span className="font-handwritten text-lg">
          {name} returned to the shelf ✧
        </span>
      );
    }, 400);
  };

  const handleCheckout = () => {
    toast.success(
      <div className="flex flex-col gap-2">
        <span className="font-display text-lg">Fuck You for wandering with us!</span>
        <span className="font-handwritten text-muted-foreground">
          Fuck You this is only demo ! ✧
        </span>
      </div>,
      { duration: 5000 }
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* SEO */}
      <title>Your Collection — Hasan & Walid</title>
      <meta name="description" content="Review your curated collection of artisanal treasures." />

      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <header className="text-center mb-16">
          <span className="font-handwritten text-xl text-accent mb-2 block">
            ~ your treasures ~
          </span>
          <h1
            className="font-display text-4xl md:text-5xl text-foreground mb-4"
            style={{ transform: 'rotate(-1deg)' }}
          >
            The Collection So Far
          </h1>
          <p className="font-body text-muted-foreground">
            {items.length === 0
              ? 'Your collection awaits its first treasure...'
              : `${items.length} ${items.length === 1 ? 'curiosity' : 'curiosities'} gathered`
            }
          </p>
        </header>

        {items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <div
              className="inline-block p-8 bg-card shadow-organic"
              style={{
                transform: 'rotate(-2deg)',
                borderRadius: '4px 8px 4px 8px',
              }}
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-handwritten text-xl text-muted-foreground mb-6">
                Your treasure drawer is empty
              </p>
              <Link
                to="/shop"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 bg-primary text-primary-foreground
                  font-display text-base shadow-float
                  hover:scale-105 transition-transform
                "
                style={{ borderRadius: '4px' }}
              >
                <span>Begin Collecting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items list — scattered pile */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => {
                const rotation = ((index % 5) - 2) * 1.5;
                const isRemoving = removingId === item.id;

                return (
                  <article
                    key={item.id}
                    className={`
                      relative flex gap-4 md:gap-6 p-4 md:p-6
                      bg-card shadow-organic
                      transition-all duration-500 ease-organic
                      ${isRemoving ? 'opacity-0 scale-95 -translate-x-8' : 'opacity-100'}
                    `}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      borderRadius: '4px 8px 4px 8px',
                    }}
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-24 h-32 md:w-32 md:h-40 overflow-hidden shadow-organic"
                      style={{
                        transform: 'rotate(-3deg)',
                        clipPath: 'polygon(3% 0%, 100% 2%, 97% 100%, 0% 97%)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display text-lg md:text-xl text-foreground hover:text-accent transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="font-handwritten text-base text-muted-foreground mt-1">
                        by {item.artist}
                      </p>
                      <p className="font-display text-xl text-accent mt-2">
                        ${item.price}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-accent/20 rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-display text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-accent/20 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="
                            flex items-center gap-1 px-3 py-1
                            font-handwritten text-sm text-muted-foreground
                            hover:text-crimson transition-colors
                          "
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right">
                      <span className="font-display text-lg text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className="absolute -top-1 -left-1 w-4 h-4 bg-accent/30"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                    />
                  </article>
                );
              })}

              {/* Clear all */}
              {items.length > 1 && (
                <button
                  onClick={() => {
                    clear();
                    toast.success(
                      <span className="font-handwritten text-lg">
                        All treasures returned to the wild ✧
                      </span>
                    );
                  }}
                  className="font-handwritten text-base text-muted-foreground hover:text-crimson transition-colors"
                >
                  ← clear all treasures
                </button>
              )}
            </div>

            {/* Summary — vintage receipt style */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-32 p-6 md:p-8 bg-card shadow-dramatic"
                style={{
                  transform: 'rotate(1deg)',
                  borderRadius: '4px',
                }}
              >
                <h2 className="font-handwritten text-2xl text-foreground mb-6 pb-4 border-b border-border">
                  ~ the tally ~
                </h2>

                {/* Items summary */}
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-body text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-display text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-baseline">
                    <span className="font-handwritten text-xl text-foreground">subtotal:</span>
                    <span className="font-display text-2xl text-accent">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="font-handwritten text-sm text-muted-foreground mt-2">
                    * shipping calculated at checkout
                  </p>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="
                    w-full mt-8 py-4 px-6
                    bg-primary text-primary-foreground
                    font-display text-lg
                    shadow-float hover:shadow-glow
                    transition-all duration-300
                    hover:scale-[1.02]
                    flex items-center justify-center gap-3
                    group
                  "
                  style={{ borderRadius: '4px' }}
                >
                  <span>Proceed to Checkout</span>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                </button>

                {/* Continue shopping */}
                <Link
                  to="/shop"
                  className="
                    block text-center mt-4
                    font-handwritten text-base text-muted-foreground
                    hover:text-accent transition-colors
                  "
                >
                  ← continue wandering
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Cart;
