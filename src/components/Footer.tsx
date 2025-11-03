import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[hsl(var(--emerald-dark))] to-[hsl(var(--charcoal))] text-cream">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Dormify<span className="text-gradient-gold">.</span>
          </h2>
          <p className="text-lg font-body text-cream/90 max-w-3xl mx-auto mb-4">
            Transforming student living into luxury experiences. Comfort, personalization, and excellence for achievers.
          </p>
          <p className="text-xl font-display italic text-gradient-gold">
            Your space, your style, our touch
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <a
            href="https://www.instagram.com/dormify.oic"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:dormify.oic@gmail.com"
            className="w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-8 mb-8 pb-8 border-b border-cream/20">
          <Link
            to="/about"
            className="text-cream/80 hover:text-gold transition-colors duration-300 font-body"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-cream/80 hover:text-gold transition-colors duration-300 font-body"
          >
            Contact
          </Link>
          <Link
            to="/packages"
            className="text-cream/80 hover:text-gold transition-colors duration-300 font-body"
          >
            Order
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-cream/60 font-body">
            © 2025 Dormify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
