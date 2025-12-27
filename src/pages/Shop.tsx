// Shop Page — Irregular masonry of scattered treasures
// Like wandering through a curated flea market

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, searchProducts, getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterTags } from '@/components/FilterTags';
import { Footer } from '@/components/Footer';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', activeCategory);
    }
    setSearchParams(searchParams);
  }, [activeCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = searchQuery
      ? searchProducts(searchQuery)
      : getProductsByCategory(activeCategory);
    
    return result;
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      {/* SEO */}
      <title>Shop — Hasan & Walid</title>
      <meta name="description" content="Browse our collection of handcrafted jewelry, ceramics, prints, textiles, and found objects. Each piece tells a unique story." />

      {/* Header section */}
      <header className="pt-24 pb-12 md:pt-32 md:pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Page title */}
          <div className="text-center mb-12">
            <span className="font-handwritten text-xl text-accent mb-2 block">
              ~ the collection ~
            </span>
            <h1
              className="font-display text-4xl md:text-6xl text-foreground mb-4"
              style={{ transform: 'rotate(-1deg)' }}
            >
              Wander & Discover
            </h1>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Each piece here was made by hands that care deeply. 
              Take your time — the right treasure will find you.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <SearchBar
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                if (value) setActiveCategory('all');
              }}
            />
          </div>

          {/* Filter tags */}
          <FilterTags
            activeCategory={activeCategory}
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              setSearchQuery('');
            }}
          />
        </div>
      </header>

      {/* Products grid — irregular masonry */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <span className="font-handwritten text-2xl text-muted-foreground">
                No treasures found... try another path?
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`
                    ${index % 7 === 0 ? 'lg:col-span-2' : ''}
                    ${index % 11 === 0 ? 'xl:row-span-2' : ''}
                    ${index % 5 === 0 ? 'md:mt-8' : ''}
                    ${index % 3 === 0 ? 'md:-mt-4' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Results count */}
          <div className="mt-16 text-center">
            <span className="font-handwritten text-lg text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'treasure' : 'treasures'} await
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Shop;
