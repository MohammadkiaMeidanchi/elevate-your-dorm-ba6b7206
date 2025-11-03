import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b luxury-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-gradient-gold">
            Dormify
          </Link>
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-body transition-colors duration-300 ${
                isActive("/") ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-body transition-colors duration-300 ${
                isActive("/about") ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-body transition-colors duration-300 ${
                isActive("/contact") ? "text-primary font-medium" : "text-foreground/70 hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
