import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  const total = getTotal();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Add some items to get started
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border border-border rounded-lg hover:border-secondary transition-colors bg-card"
                >
                  <div className="w-24 h-24 bg-input rounded flex-shrink-0 flex items-center justify-center border border-border">
                    <div className="text-3xl font-bold text-muted-foreground">
                      {item.name.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-lg font-bold text-primary">₹{item.price}</p>
                    <p className="text-sm text-muted-foreground">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 border border-border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-secondary transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-secondary transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-20 space-y-4">
              <h3 className="text-xl font-bold text-foreground">Order Summary</h3>

              <div className="space-y-2 text-sm border-b border-border pb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-foreground">TBD</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-secondary">₹{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-6 py-3 bg-secondary text-background font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Secure payment powered by Razorpay
              </p>

              <Link
                to="/shop"
                className="block w-full px-6 py-3 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/20 text-center transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
