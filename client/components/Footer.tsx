import { Phone, MapPin, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-background font-bold text-lg">
                JG
              </div>
              <div>
                <h3 className="font-bold text-foreground">Jashan Garments</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium quality garments crafted with care.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+919253327741"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  +91 9253327741
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Kurukshetra, Haryana
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-secondary flex-shrink-0" />
                <a
                  href="https://www.instagram.com/jashangarments_?igsh=MW14N2xtdzk5OTI2cw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  @jashangarments_
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-muted-foreground hover:text-secondary transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="/cart" className="text-muted-foreground hover:text-secondary transition-colors">
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Jashan Garments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
