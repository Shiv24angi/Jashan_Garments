import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id);

  const availableColors = useMemo(
    () => Array.from(new Set(product?.variants.map((v) => v.color) || [])),
    [product]
  );

  const availableSizes = useMemo(() => {
    if (!selectedColor) return [];
    return Array.from(
      new Set(
        product?.variants
          .filter((v) => v.color === selectedColor)
          .map((v) => v.size) || []
      )
    );
  }, [product, selectedColor]);

  const availableMaterials = useMemo(() => {
    if (!selectedColor || !selectedSize) return [];
    return Array.from(
      new Set(
        product?.variants
          .filter((v) => v.color === selectedColor && v.size === selectedSize)
          .map((v) => v.material) || []
      )
    );
  }, [product, selectedColor, selectedSize]);

  const selectedVariant = useMemo(() => {
    if (!product || !selectedColor || !selectedSize) return null;

    const matchingVariants = product.variants.filter(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    if (matchingVariants.length === 0) return null;

    if (selectedMaterial) {
      return matchingVariants.find((v) => v.material === selectedMaterial) || null;
    }

    return matchingVariants[0];
  }, [product, selectedColor, selectedSize, selectedMaterial]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2 bg-secondary text-background rounded-lg hover:shadow-lg transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select color and size");
      return;
    }

    if (!selectedVariant) {
      alert("This variant is not available");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: selectedVariant.sku,
        name: product.name,
        price: product.price,
        image: product.name,
      });
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Section */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square bg-gradient-to-br from-card to-background rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <p className="text-6xl font-bold text-muted-foreground">
                  {product.name.charAt(0)}
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {product.name}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-start space-y-6">
            {/* Category and Title */}
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="pt-4 border-t border-border">
              <p className="text-3xl font-bold text-secondary">₹{product.price}</p>
              <p className="text-sm text-muted-foreground mt-2">
                All variants have the same price
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  {product.description.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className={paragraph.startsWith('Material:') || paragraph.startsWith('Design:') || paragraph.startsWith('Wash') ? 'text-sm' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selection */}
            <div className="space-y-6 pt-4 border-t border-border">
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Color
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize(null);
                        setSelectedMaterial(null);
                      }}
                      className={`py-2 px-3 rounded border-2 transition-all text-sm font-medium ${
                        selectedColor === color
                          ? "border-secondary bg-secondary/20 text-secondary"
                          : "border-border text-foreground hover:border-secondary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              {selectedColor && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Size
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSelectedMaterial(null);
                        }}
                        className={`py-2 px-3 rounded border-2 transition-all text-sm font-medium ${
                          selectedSize === size
                            ? "border-secondary bg-secondary/20 text-secondary"
                            : "border-border text-foreground hover:border-secondary/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Material Selection */}
              {selectedSize && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Material
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableMaterials.map((material) => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(material)}
                        className={`py-2 px-3 rounded border-2 transition-all text-sm font-medium ${
                          selectedMaterial === material
                            ? "border-secondary bg-secondary/20 text-secondary"
                            : "border-border text-foreground hover:border-secondary/50"
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Variant Details */}
              {selectedVariant && (
                <div className="p-4 bg-card rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">SKU:</span>{" "}
                    {selectedVariant.sku}
                  </p>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold text-foreground">
                  Quantity
                </label>
                <div className="flex items-center gap-3 border border-border rounded-lg p-2 bg-input">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-secondary/30 rounded transition-colors"
                    disabled={quantity === 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-secondary/30 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  !selectedColor || !selectedSize
                    ? "bg-border text-muted-foreground cursor-not-allowed opacity-50"
                    : isAdded
                      ? "bg-secondary text-background"
                      : "bg-secondary text-background hover:shadow-lg hover:scale-105"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </span>
              </button>
            </div>

            {/* All Variants Summary */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Available Variants
              </h3>
              <p className="text-sm text-muted-foreground">
                This product is available in {availableColors.length} color
                {availableColors.length !== 1 ? "s" : ""} with multiple sizes and materials.
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-secondary hover:text-secondary/80">
                  View all variants
                </summary>
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="text-xs text-muted-foreground bg-input p-2 rounded border border-border"
                    >
                      <p>
                        <span className="font-medium">{variant.color}</span> •{" "}
                        <span className="font-medium">{variant.size}</span> •{" "}
                        {variant.material}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
