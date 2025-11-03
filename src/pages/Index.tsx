import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-luxury-dorm.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Luxury dormitory interior with emerald green accents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-background/95" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6 py-32">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-primary-foreground">
            Dormify
          </h1>
          <p className="text-xl md:text-2xl font-display italic text-primary-foreground/90 mb-4">
            Your Space, Your Style, Our Touch
          </p>
          <p className="text-lg md:text-xl font-body text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Elevating student living into a luxury experience
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
    </div>
  );
};

export default Index;
