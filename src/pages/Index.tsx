import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-luxury-dorm.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden flex-1">
        {/* Background Image with Dark Overlay for Contrast */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury dormitory interior with emerald green accents"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0" 
            style={{ background: 'var(--gradient-hero-overlay)' }}
          />
        </div>
        
        {/* Content with High Contrast */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-20 sm:py-32">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 text-cream drop-shadow-2xl">
            Dormify
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl font-body text-cream/95 drop-shadow-lg mb-2 sm:mb-3 max-w-3xl mx-auto leading-relaxed px-2">
            Where exceptional living meets uncompromising quality. An exclusive experience crafted for those who accept nothing less than perfection.
          </p>
          
          <p className="text-lg sm:text-xl md:text-2xl font-display italic text-gradient-gold drop-shadow-lg mb-8 sm:mb-12 px-2">
            Your space, your style, our touch
          </p>
          
          <Button
            variant="gold"
            size="lg"
            onClick={() => navigate("/packages")}
            className="text-sm sm:text-base px-8 sm:px-12 py-4 sm:py-6 h-auto"
          >
            Join Waitlist
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
