import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import AnimateWrapper from '@/components/ui/AnimateWrapper';

export default function Home() {
  return (
     <AnimateWrapper>
      <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gold mb-8">Featured Instruments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
     </AnimateWrapper>
   
  );
}