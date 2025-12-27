import { Link } from 'react-router-dom';
import { Home, Store } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="relative inline-block mb-8" style={{ transform: 'rotate(-3deg)' }}>
          <span className="font-display text-[12rem] md:text-[16rem] text-muted/30 leading-none">404</span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-handwritten text-3xl text-accent" style={{ transform: 'rotate(8deg)' }}>lost?</span>
        </div>
        <h1 className="font-display text-2xl md:text-3xl text-foreground mb-4">This path leads nowhere...</h1>
        <p className="font-handwritten text-xl text-muted-foreground mb-8">Perhaps the treasure you seek has moved, or maybe it was just a dream.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display text-base shadow-organic hover:shadow-float hover:scale-105 transition-all duration-300 rounded" style={{ transform: 'rotate(-1deg)' }}>
            <Home className="w-4 h-4" /><span>Return Home</span>
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-foreground font-display text-base shadow-organic hover:shadow-float hover:scale-105 transition-all duration-300 rounded" style={{ transform: 'rotate(1deg)' }}>
            <Store className="w-4 h-4" /><span>Browse Treasures</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;