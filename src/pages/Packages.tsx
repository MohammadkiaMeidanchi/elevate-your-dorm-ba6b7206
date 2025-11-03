import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Packages = () => {
  const packages = [
    {
      name: "DORM PIECE",
      price: "£5.99",
      description: "Perfect for people with less needs and who are looking for something simple. Get up to two of our items individually.",
      features: [
        "Choose up to 2 premium items",
        "Individual selection",
        "Premium quality",
        "Quick delivery",
        "Perfect for minimal needs",
      ],
      featured: false,
    },
    {
      name: "DORM DROP",
      price: "£65.99",
      description: "Need the items? Buy our beautiful bundle that offers a wide variety of items for you to enjoy.",
      features: [
        "Curated bundle collection",
        "Wide variety of premium items",
        "Style-matched aesthetic",
        "Complete room enhancement",
        "Direct delivery to your dorm",
        "Professional packaging",
      ],
      featured: true,
    },
    {
      name: "DORM REFORM",
      price: "£75.99",
      description: "Need the items and the state of the art services? Order our exclusive dorm reform. It even comes with customisable features!",
      features: [
        "Complete luxury transformation",
        "State-of-the-art services",
        "Full customisation options",
        "Personal consultation",
        "Professional installation",
        "Premium item selection",
        "Ongoing support",
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32 flex-1">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-primary">
            Choose Your Experience
          </h1>
          <p className="text-xl font-body text-foreground/70">
            Select the package that matches your vision
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`relative p-8 text-center transition-all duration-500 hover:scale-105 ${
                pkg.featured
                  ? "border-[3px] border-[hsl(var(--gold))] luxury-shadow bg-gradient-to-b from-[hsl(var(--gold)/0.05)] to-background"
                  : "border border-border hover:border-[hsl(var(--gold)/0.3)]"
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold))] to-[hsl(var(--gold-light))] text-charcoal px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 gold-shadow">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}
              
              <h2 className="text-2xl font-display font-bold mb-4 text-charcoal mt-2">
                {pkg.name}
              </h2>
              
              <div className="mb-6">
                <p className="text-sm text-foreground/60 mb-2">From prices as little as</p>
                <p className="text-5xl font-display font-bold text-gradient-gold">
                  {pkg.price}
                </p>
              </div>
              
              <p className="text-base font-body text-foreground/70 leading-relaxed mb-8">
                {pkg.description}
              </p>
              
              <div className="border-t border-border pt-6 mb-8 text-left">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 mb-3">
                    <Check className="w-5 h-5 text-[hsl(var(--gold))] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button
                variant={pkg.featured ? "gold" : "luxury"}
                size="lg"
                className="w-full"
              >
                Select Package
              </Button>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Packages;
