// Homepage — Immersive entrance to the cabinet of curiosities
// A dreamlike collage that invites exploration

import { Hero } from '@/components/Hero';
import { FeaturedSection } from '@/components/FeaturedSection';
import { CategoryPortals } from '@/components/CategoryPortals';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative">
      {/* SEO */}
      <title>Hasan & Walid — Artisanal Treasures</title>
      <meta name="description" content="A curated collection of handcrafted jewelry, sculptural ceramics, abstract prints, vintage textiles, and found-object art pieces. Each treasure carries the soul of its maker." />
      
      {/* Immersive hero collage */}
      <Hero />
      
      {/* Featured treasures with asymmetric layout */}
      <FeaturedSection />
      
      {/* Category navigation portals */}
      <CategoryPortals />
      
      {/* Artistic footer */}
      <Footer />
    </main>
  );
};

export default Index;
