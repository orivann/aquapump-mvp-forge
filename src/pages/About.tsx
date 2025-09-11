import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Building, Zap, Target, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-industrial text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About AquaPump Industries
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              A new force in industrial pumping solutions, backed by a legacy of excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-industrial-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-industrial-grey">
                <p>
                  AquaPump Industries is a new, dynamic company focused on delivering state-of-the-art industrial pumping solutions. While we are a new entity, our foundations are deep and robust.
                </p>
                <p>
                  We are a proud subsidiary of <a href="http://www.aquatech.co.il" target="_blank" rel="noopener noreferrer" className="text-industrial-blue hover:underline">AQUATECH</a>, a family-owned leader in water treatment and purification systems since 1993. This heritage provides us with unparalleled expertise and a commitment to quality that is woven into the fabric of our operations.
                </p>
                <p>
                  Our mission is to leverage this legacy to innovate and provide powerful, efficient, and reliable pumps for a wide range of industries, including manufacturing, agriculture, and construction. We are here to build the future of industrial pumping.
                </p>
              </div>
            </div>
            
            <div className="bg-industrial-blue-light rounded-lg p-8">
              <h3 className="text-2xl font-bold text-industrial-dark mb-4">Our Vision</h3>
              <div className="flex items-start mb-4">
                <Target className="w-6 h-6 text-industrial-blue mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-industrial-dark mb-2">Our Mission</h4>
                  <p className="text-industrial-grey">
                    To provide reliable, efficient, and innovative pumping solutions that keep industries running smoothly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Eye className="w-6 h-6 text-industrial-blue mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-industrial-dark mb-2">Our Goal</h4>
                  <p className="text-industrial-grey">
                    To become a trusted partner for industrial pumping solutions, recognized for our technical expertise and quality products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-industrial-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Let's build the future together. Contact us to learn more about our products and services.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;