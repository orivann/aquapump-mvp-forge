import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "AquaPump's solutions have revolutionized our water management systems. Their efficiency and reliability are truly unmatched in the industry.",
    author: "John Doe",
    company: "Global PetroCorp",
    image: "https://via.placeholder.com/100x100.png?text=JD",
  },
  {
    quote: "The reliability and low maintenance of AquaPump products have saved us thousands in operational costs. It's a fantastic return on investment.",
    author: "Jane Smith",
    company: "Greenfield Agriculture",
    image: "https://via.placeholder.com/100x100.png?text=JS",
  },
  {
    quote: "From consultation to installation, the AquaPump team provided exceptional service and expertise. A seamless experience from start to finish.",
    author: "Samuel Lee",
    company: "City Waterworks Dept.",
    image: "https://via.placeholder.com/100x100.png?text=SL",
  },
  {
    quote: "The durability of these pumps in harsh conditions is incredible. We push them to the limit, and they never fail.",
    author: "Maria Garcia",
    company: "Bedrock Mining Co.",
    image: "https://via.placeholder.com/100x100.png?text=MG",
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container-fluid mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">Trusted by Industry Leaders</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            See what our clients have to say about our products and services.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="bg-background interactive-card h-full">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-24 h-24 rounded-full mb-6 border-4 border-primary/20"
                      />
                      <p className="text-lg text-muted-foreground mb-6 flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className="mt-auto">
                        <p className="font-bold text-xl text-foreground">{testimonial.author}</p>
                        <p className="text-primary font-medium">{testimonial.company}</p>
                      </div>
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

export default TestimonialsCarousel;