import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You have been logged out successfully" });
    navigate("/");
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b luxury-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-display font-bold text-[hsl(var(--emerald-dark))]">
            Dormify
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-8">
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
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin"
                      className={`cursor-pointer ${
                        isActive("/admin") ? "text-primary font-medium" : "text-foreground/70"
                      }`}
                    >
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                {!user && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/login"
                      className={`cursor-pointer ${
                        isActive("/login") ? "text-primary font-medium" : "text-foreground/70"
                      }`}
                    >
                      Login
                    </Link>
                  </DropdownMenuItem>
                )}
                {user && (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-foreground/70"
                  >
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/packages">
              <button className="bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-charcoal px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-110 gold-shadow whitespace-nowrap">
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
