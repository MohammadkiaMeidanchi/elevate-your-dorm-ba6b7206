import Navigation from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-8 text-primary">
            About Us
          </h1>
          
          <div className="space-y-6 text-lg font-body text-foreground/80 leading-relaxed">
            <p>
              Dormify is a business established by Jonathan Oku, Jeremy Chiege, Arlan Akhmetov, 
              and MohammadKia Meidanchi, with the mission of enhancing student comfort at Oxford 
              International College Brighton.
            </p>
            
            <p>
              Our goal is to transform school dormitories into a home that's away from home, helping 
              students settle in more smoothly — especially those arriving from abroad. By improving 
              the living environment, we aim to boost student morale, which in turn can contribute to 
              stronger academic performance.
            </p>
            
            <p className="font-medium text-primary">
              Room problems? We solve them.
            </p>
            
            <p>
              The target market are students of all kind of all sorts of personalities — you tell us 
              your theme, we adjust. A portion of all profits made by us will be donated to charity.
            </p>
            
            <p>
              Our prices are flexible and vary depending on our customers' demand. With a small extra 
              labour fee, you can have the room of your dreams.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
