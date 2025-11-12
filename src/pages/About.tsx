import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 text-center text-primary">
            About Us
          </h1>
          
          <div className="space-y-8 text-lg font-body leading-relaxed">
            <p className="text-foreground/80">
              Dormify is a business established by{" "}
              <span className="font-semibold text-gradient-gold">Jonathan Oku</span>,{" "}
              <span className="font-semibold text-gradient-gold">Jeremy Chiege</span>,{" "}
              <span className="font-semibold text-gradient-gold">Arlan Akhmetov</span>, and{" "}
              <span className="font-semibold text-gradient-gold">MohammadKia Meidanchi</span>, 
              with the mission of enhancing student comfort at{" "}
              <span className="font-medium text-primary">Oxford International College Brighton</span>.
            </p>
            
            <p className="text-foreground/80">
              Our goal is to transform school dormitories into a home that's away from home, helping 
              students settle in more smoothly — especially those arriving from abroad. By improving 
              the living environment, we aim to boost student morale, which in turn can contribute to 
              stronger academic performance.
            </p>
            
            <div className="text-center py-8">
              <p className="text-2xl font-display font-semibold text-primary italic">
                Room problems? We solve them.
              </p>
            </div>
            
            <p className="text-foreground/80">
              The target market are students of all kind of all sorts of personalities — you tell us 
              your theme, we adjust. A portion of all profits made by us will be donated to charity.
            </p>
            
            <p className="text-foreground/80">
              Our prices are flexible and vary depending on our customers' demand. With a small extra 
              labour fee, you can have the room of your dreams.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
