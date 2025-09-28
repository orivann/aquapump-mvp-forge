import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

// Placeholder data - this would eventually come from a CMS
const products = [
  {
    name: "Aqua-Prime 3000",
    category: "Industrial Centrifugal Pump",
    image: "https://via.placeholder.com/400x300.png?text=Aqua-Prime+3000",
    link: "/products/aqua-prime-3000",
  },
  {
    name: "Sub-Zero 500X",
    category: "Submersible Drainage Pump",
    image: "https://via.placeholder.com/400x300.png?text=Sub-Zero+500X",
    link: "/products/sub-zero-500x",
  },
  {
    name: "Eco-Stream Solar",
    category: "Solar-Powered Irrigation Pump",
    image: "https://via.placeholder.com/400x300.png?text=Eco-Stream+Solar",
    link: "/products/eco-stream-solar",
  },
  {
    name: "Hydro-Titan 9",
    category: "Heavy-Duty Slurry Pump",
    image: "https://via.placeholder.com/400x300.png?text=Hydro-Titan+9",
    link: "/products/hydro-titan-9",
  },
  {
    name: "Chem-Guard Pro",
    category: "Chemical-Resistant Dosing Pump",
    image: "https://via.placeholder.com/400x300.png?text=Chem-Guard+Pro",
    link: "/products/chem-guard-pro",
  },
];

const ProductCarousel = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-fluid mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">Our Flagship Products</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            A glimpse into our most popular and innovative pump technologies.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="interactive-card overflow-hidden group h-full">
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-2xl font-bold">{product.name}</h3>
                        <p className="text-muted-foreground mt-2">{product.category}</p>
                      </div>
                      <Button asChild variant="outline" className="mt-6 w-full">
                        <Link to={product.link}>
                          View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;