import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Instagram, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-primary">
            Get in Touch
          </h1>
          <p className="text-xl font-body text-foreground/70 mb-16">
            We're here to transform your space
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <a
              href="https://www.instagram.com/dormify.oic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-12 luxury-border rounded-lg hover:luxury-shadow transition-all duration-500 hover:scale-105 group"
            >
              <Instagram className="w-16 h-16 text-primary mb-4 transition-colors group-hover:text-gold" />
              <h3 className="text-2xl font-display font-bold mb-2 text-primary">Instagram</h3>
              <p className="text-foreground/70 font-body">@dormify.oic</p>
            </a>
            
            <a
              href="mailto:dormify.oic@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-12 luxury-border rounded-lg hover:luxury-shadow transition-all duration-500 hover:scale-105 group"
            >
              <Mail className="w-16 h-16 text-primary mb-4 transition-colors group-hover:text-gold" />
              <h3 className="text-2xl font-display font-bold mb-2 text-primary">Email</h3>
              <p className="text-foreground/70 font-body break-all">dormify.oic@gmail.com</p>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
