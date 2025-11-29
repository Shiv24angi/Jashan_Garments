import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  onAddToCart?: (product: { id: string; name: string; price: number; image: string }) => void;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  onAddToCart,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAddToCart?.({ id, name, price, image });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link to={`/products/${id}`} className="group block">
      <div className="relative overflow-hidden bg-card rounded-lg aspect-square mb-4 flex items-center justify-center border border-border">
        <div className="w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-2xl font-bold text-muted-foreground">{name.charAt(0)}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="space-y-2">
        {category && (
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">
            {category}
          </p>
        )}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-secondary">₹{price}</p>
          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all duration-300 ${
              isAdded
                ? "bg-secondary text-background"
                : "bg-border hover:bg-secondary text-foreground hover:text-background"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
