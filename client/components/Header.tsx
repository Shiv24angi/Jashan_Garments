import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:shadow-lg transition-shadow">
              JG
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Jashan</h1>
              <p className="text-xs text-muted-foreground leading-none">Garments</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <a
              href="https://www.instagram.com/jashangarments_?igsh=MW14N2xtdzk5OTI2cw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors border border-border rounded-lg hover:bg-secondary/20"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border/40 pt-4">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <a
              href="https://www.instagram.com/jashangarments_?igsh=MW14N2xtdzk5OTI2cw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              Instagram
            </a>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary transition-colors border border-border rounded-lg hover:bg-secondary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
