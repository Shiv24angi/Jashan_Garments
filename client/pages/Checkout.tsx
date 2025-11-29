import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total } = useCart();
  const [step, setStep] = useState<"cart-review" | "payment" | "success">("cart-review");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
    } else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateShippingInfo = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill in all shipping details");
      return false;
    }
    return true;
  };

  const validateCardInfo = () => {
    if (!cardData.cardNumber || !cardData.cardName || !cardData.expiry || !cardData.cvv) {
      alert("Please fill in all card details");
      return false;
    }
    if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Card number must be 16 digits");
      return false;
    }
    if (cardData.cvv.length !== 3) {
      alert("CVV must be 3 digits");
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateShippingInfo()) {
      setStep("payment");
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      // Simulate Razorpay payment
      setIsProcessing(true);
      setTimeout(() => {
        const mockOrderId = "ORD-" + Date.now();
        setOrderId(mockOrderId);
        setIsProcessing(false);
        setStep("success");
      }, 2000);
    } else {
      if (validateCardInfo()) {
        setIsProcessing(true);
        setTimeout(() => {
          const mockOrderId = "ORD-" + Date.now();
          setOrderId(mockOrderId);
          setIsProcessing(false);
          setStep("success");
        }, 2000);
      }
    }
  };

  const calculateTotalWithShipping = () => {
    const shipping = items.length > 0 ? 100 : 0;
    return total + shipping;
  };

  if (items.length === 0 && step === "cart-review") {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items to proceed with checkout</p>
          <Button
            onClick={() => navigate("/shop")}
            className="bg-secondary text-background hover:shadow-lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Progress Steps */}
        <div className="mb-8 flex justify-between items-center">
          {["cart-review", "payment", "success"].map((stepName, index) => (
            <div key={stepName} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  step === stepName
                    ? "bg-primary text-primary-foreground"
                    : (["cart-review", "payment", "success"].indexOf(step) > index
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-muted-foreground")
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    ["cart-review", "payment", "success"].indexOf(step) > index
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Cart Review Step */}
        {step === "cart-review" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Information</h2>
              <div className="bg-card rounded-lg p-6 space-y-4 border border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pin Code"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 h-fit sticky top-4 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6 border-b border-border pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">₹100</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-2">
                  <span className="text-foreground">Total:</span>
                  <span className="text-secondary">₹{calculateTotalWithShipping().toLocaleString()}</span>
                </div>
              </div>
              <Button
                onClick={handleProceedToPayment}
                className="w-full bg-secondary text-background hover:shadow-lg"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>
              <div className="bg-card rounded-lg p-6 space-y-6 border border-border">
                {/* Razorpay Option */}
                <label className="flex items-start p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary/5 transition-colors"
                  style={{ borderColor: paymentMethod === "razorpay" ? "var(--primary)" : "" }}>
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 w-4 h-4 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-foreground mb-1">Razorpay</div>
                    <div className="text-sm text-muted-foreground">
                      Pay securely using UPI, Cards, Net Banking, or Wallets
                    </div>
                  </div>
                </label>

                {/* Card Option */}
                <label className="flex items-start p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-secondary/5 transition-colors"
                  style={{ borderColor: paymentMethod === "card" ? "var(--primary)" : "" }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 w-4 h-4 cursor-pointer"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-foreground mb-1">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">
                      Enter your card details for direct payment
                    </div>
                  </div>
                </label>

                {/* Card Details Form */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-border">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      maxLength={19}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-secondary font-mono placeholder-muted-foreground"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Card Holder Name"
                      value={cardData.cardName}
                      onChange={handleCardChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-secondary placeholder-muted-foreground"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        maxLength={5}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-secondary font-mono placeholder-muted-foreground"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        maxLength={3}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-secondary font-mono placeholder-muted-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* Razorpay Info */}
                {paymentMethod === "razorpay" && (
                  <div className="p-4 bg-secondary/20 rounded-lg space-y-2 border border-secondary/30">
                    <div className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Secure Payment Gateway</p>
                        <p className="text-xs text-muted-foreground mt-1">You'll be redirected to Razorpay's secure payment gateway</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-lg p-6 h-fit sticky top-4 border border-border">
              <h3 className="text-xl font-bold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6 border-b border-border pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-foreground font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-foreground">₹100</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-2">
                  <span className="text-foreground">Total:</span>
                  <span className="text-secondary">₹{calculateTotalWithShipping().toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-secondary text-background hover:shadow-lg"
                >
                  {isProcessing ? "Processing..." : `Pay ₹${calculateTotalWithShipping()}`}
                </Button>
                <Button
                  onClick={() => setStep("cart-review")}
                  variant="outline"
                  className="w-full"
                >
                  Back to Shipping
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === "success" && (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-card rounded-lg p-8 space-y-6 border border-border">
              <CheckCircle className="w-16 h-16 mx-auto text-secondary" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground">Thank you for your purchase</p>
              </div>
              <div className="p-4 bg-input rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-bold text-foreground">{orderId}</p>
              </div>
              <div className="p-4 bg-secondary/20 rounded-lg space-y-2 border border-secondary/30">
                <p className="text-sm font-semibold text-foreground">Order Amount</p>
                <p className="text-2xl font-bold text-secondary">₹{calculateTotalWithShipping().toLocaleString()}</p>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Confirmation email sent to <span className="font-semibold text-foreground">{formData.email}</span></p>
                <p>You can track your order using the order ID above</p>
              </div>
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-secondary text-background hover:shadow-lg"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
