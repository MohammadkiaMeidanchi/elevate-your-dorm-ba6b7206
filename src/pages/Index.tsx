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
        <div className="relative z-10 text-center px-6 py-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-cream drop-shadow-2xl">
            Dormify
          </h1>
          
          <p className="text-lg md:text-xl font-body text-cream/95 drop-shadow-lg mb-3 max-w-3xl mx-auto leading-relaxed">
            Where exceptional living meets uncompromising quality. An exclusive experience crafted for those who accept nothing less than perfection.
          </p>
          
          <p className="text-xl md:text-2xl font-display italic text-gradient-gold drop-shadow-lg mb-12">
            Your space, your style, our touch
          </p>
          
          <Button
            variant="gold"
            size="lg"
            onClick={() => navigate("/packages")}
            className="text-base px-12 py-6 h-auto"
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
