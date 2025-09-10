import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Shield, Cpu } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-50/90">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32" style={{ backgroundImage: "url('/src/assets/industrial-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            AquaPump Industries
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Leading provider of industrial pumping solutions with over 25 years of experience. We engineer reliability for your most demanding applications.
          </p>
          <Button size="lg" variant="industrial" className="text-lg">
            Request a Quote
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-industrial-dark">
              Engineered for Performance and Reliability
            </h2>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
              Our pumps are designed to meet the highest standards of quality and efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-industrial-blue-light rounded-full p-3 w-max mb-2">
                  <CheckCircle className="h-8 w-8 text-industrial-blue" />
                </div>
                <CardTitle className="text-industrial-dark">Unmatched Durability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Built with high-grade materials to withstand the harshest industrial environments.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-industrial-blue-light rounded-full p-3 w-max mb-2">
                  <Zap className="h-8 w-8 text-industrial-blue" />
                </div>
                <CardTitle className="text-industrial-dark">Peak Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimized hydraulic design for maximum performance and minimal energy consumption.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-industrial-blue-light rounded-full p-3 w-max mb-2">
                  <Shield className="h-8 w-8 text-industrial-blue" />
                </div>
                <CardTitle className="text-industrial-dark">Low Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Engineered for easy servicing, reducing downtime and operational costs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-industrial-blue-light rounded-full p-3 w-max mb-2">
                  <Cpu className="h-8 w-8 text-industrial-blue" />
                </div>
                <CardTitle className="text-industrial-dark">Smart Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced monitoring and control options for seamless system integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-industrial-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to find the perfect pump for your needs?
          </h2>
          <p className="text-lg text-blue-200 mt-2 mb-6">
            Our experts are here to help you select the right solution and provide a detailed quote.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="industrial">
              Get a Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-industrial-dark">
              Explore Our Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;