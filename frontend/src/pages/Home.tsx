import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCarousel from "@/components/ProductCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

const features = [
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Unmatched Performance",
      description: "Our pumps deliver industry-leading flow rates and efficiency, ensuring your operations run at peak capacity."
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Built to Last",
      description: "Constructed with high-grade, corrosion-resistant materials for maximum durability and lifespan."
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Expert Support",
      description: "A dedicated team of engineers is available 24/7 to provide technical assistance and guidance."
    },
    {
        icon: <Award className="w-10 h-10 text-primary" />,
        title: "Certified Quality",
        description: "All products are rigorously tested and certified to meet international standards for safety and quality."
    }
];

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="https://www.shutterstock.com/shutterstock/videos/1090590598/preview/stock-footage-water-pump-in-motion-at-station.mp4"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />
        <motion.div
          className="text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 text-balance"
            variants={itemVariants}
          >
            Engineered for Excellence. <br /> Built for a Better Future.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-white/90"
            variants={itemVariants}
          >
            Discover the next generation of high-performance, sustainable pumping solutions.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button size="lg" asChild className="btn-primary text-lg px-8 py-3 h-auto">
              <Link to="/products">
                Explore Our Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <ProductCarousel />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-card">
        <div className="container-fluid mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose AquaPump?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              We provide more than just pumps; we deliver comprehensive, reliable fluid management solutions.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="flex justify-center items-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-6">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

       {/* CTA Section */}
       <section className="py-24 bg-primary text-primary-foreground">
        <motion.div
          className="container-fluid mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Elevate Your Operations?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Let's discuss your project and find the perfect pumping solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3 h-auto">
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 h-auto border-primary-foreground/50 hover:bg-white/10 hover:text-white">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;