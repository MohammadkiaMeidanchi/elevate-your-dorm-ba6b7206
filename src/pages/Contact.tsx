import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Instagram, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 py-20 sm:py-28 md:py-32 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 sm:mb-8 text-primary">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl font-body text-foreground/70 mb-10 sm:mb-16 px-2">
            We're here to transform your space
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <a
              href="https://www.instagram.com/dormify.oic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 sm:p-12 luxury-border rounded-lg hover:luxury-shadow transition-all duration-500 hover:scale-105 group"
            >
              <Instagram className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4 transition-colors group-hover:text-gold" />
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-primary">Instagram</h3>
              <p className="text-sm sm:text-base text-foreground/70 font-body">@dormify.oic</p>
            </a>
            
            <a
              href="mailto:dormify.oic@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 sm:p-12 luxury-border rounded-lg hover:luxury-shadow transition-all duration-500 hover:scale-105 group"
            >
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-3 sm:mb-4 transition-colors group-hover:text-gold" />
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 text-primary">Email</h3>
              <p className="text-sm sm:text-base text-foreground/70 font-body break-all">dormify.oic@gmail.com</p>
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
