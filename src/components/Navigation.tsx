import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b luxury-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-display font-bold text-[hsl(var(--emerald-dark))]">
            Dormify
          </Link>
          
          <div className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-body text-foreground/70 hover:text-primary transition-colors duration-300 outline-none">
                Menu
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-border z-[100]">
                <DropdownMenuItem asChild>
                  <Link
                    to="/"
                    className={`cursor-pointer ${
                      isActive("/") ? "text-primary font-medium" : "text-foreground/70"
                    }`}
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/about"
                    className={`cursor-pointer ${
                      isActive("/about") ? "text-primary font-medium" : "text-foreground/70"
                    }`}
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/contact"
                    className={`cursor-pointer ${
                      isActive("/contact") ? "text-primary font-medium" : "text-foreground/70"
                    }`}
                  >
                    Contact
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/packages">
              <button className="bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-charcoal px-6 py-2 rounded-md font-semibold transition-all duration-300 hover:scale-110 gold-shadow">
                Join Waitlist
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
