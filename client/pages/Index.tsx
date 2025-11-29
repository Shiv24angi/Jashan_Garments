import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { FEATURED_PRODUCTS } from "@/data/products";
import HeroBanner from "@/components/HeroBanner";

export default function Index() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-card/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Featured Collection
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              New Arrivals
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of the finest garments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={addItem}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Style?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Explore our complete collection and find the perfect garment for every occasion
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
