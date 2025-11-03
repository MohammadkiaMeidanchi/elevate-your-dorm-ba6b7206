import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

const Packages = () => {
  const packages = [
    {
      name: "DORM PIECE",
      price: "From £5.99",
      description: "Perfect for people with less needs and who are looking for something simple. Get up to two of our items individually.",
    },
    {
      name: "DORM DROP",
      price: "From £65.99",
      description: "Need the items? Buy our beautiful bundle that offers a wide variety of items for you to enjoy.",
      featured: true,
    },
    {
      name: "DORM REFORM",
      price: "From £75.99",
      description: "Need the items and the state of the art services? Order our exclusive dorm reform. It even comes with customisable features!",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32">
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
              className={`p-8 text-center transition-all duration-500 hover:scale-105 ${
                pkg.featured
                  ? "luxury-border luxury-shadow bg-gradient-to-b from-primary/5 to-background"
                  : "border-border hover:luxury-border"
              }`}
            >
              <h2 className="text-2xl font-display font-bold mb-4 text-primary">
                {pkg.name}
              </h2>
              <p className="text-3xl font-display font-bold mb-6 text-gradient-gold">
                {pkg.price}
              </p>
              <p className="text-base font-body text-foreground/70 leading-relaxed">
                {pkg.description}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Packages;
