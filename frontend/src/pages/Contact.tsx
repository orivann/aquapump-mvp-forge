import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

// Placeholder Data
const contactPoints = [
  { icon: <Mail className="w-8 h-8 text-primary" />, title: "General Inquiries", detail: "info@aquapump.com" },
  { icon: <Phone className="w-8 h-8 text-primary" />, title: "Sales Department", detail: "+1 (555) 123-4567" },
  { icon: <MapPin className="w-8 h-8 text-primary" />, title: "Headquarters", detail: "123 Industrial Blvd, Dallas, TX" },
];

const faqItems = [
  {
    question: "What is the warranty on AquaPump products?",
    answer: "All AquaPump products come with a standard 2-year manufacturer's warranty covering defects in materials and workmanship. Extended warranty options are available at the time of purchase.",
  },
  {
    question: "Do you offer custom-engineered solutions?",
    answer: "Yes, we specialize in custom solutions. Our engineering team can work with you to design a pump or a complete system tailored to your specific application, materials, and performance requirements.",
  },
  {
    question: "What are your lead times for standard products?",
    answer: "Lead times for standard products typically range from 2 to 4 weeks. For time-sensitive orders, please contact our sales department to discuss expedited options.",
  },
    {
    question: "How can I get technical support or documentation?",
    answer: "Technical datasheets, installation manuals, and CAD models are available for download on each product's detail page. For further assistance, our technical support team is available 24/7 via phone or email.",
  },
];

const Contact = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle form submission to a backend here.
        setFormSubmitted(true);
    };

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7 }
    };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-primary text-center text-primary-foreground">
        <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Get in Touch
        </motion.h1>
        <motion.p
            className="text-xl max-w-3xl mx-auto text-primary-foreground/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
          We're here to help. Whether you have a question about our products, need a quote, or require technical support, our team is ready to assist you.
        </motion.p>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20">
        <div className="container-fluid mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div className="bg-card p-8 rounded-xl shadow-lg" {...fadeIn}>
              <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
              <p className="text-muted-foreground mb-8">Our team will get back to you within one business day.</p>

              {formSubmitted ? (
                <div className="text-center py-12">
                    <Send className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                    <p className="text-muted-foreground">Your message has been sent successfully. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input placeholder="Your Name" required />
                    <Input type="email" placeholder="Your Email" required />
                  </div>
                  <Input placeholder="Subject" required />
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Reason for Inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Your Message" rows={6} required />
                  <Button type="submit" size="lg" className="w-full btn-primary">
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Details */}
            <motion.div className="space-y-8" {...fadeIn} transition={{...fadeIn.transition, delay: 0.2}}>
                {contactPoints.map(point => (
                    <div key={point.title} className="flex items-start">
                        <div className="flex-shrink-0 h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                            {point.icon}
                        </div>
                        <div className="ml-6">
                            <h3 className="text-2xl font-bold">{point.title}</h3>
                            <p className="text-lg text-muted-foreground">{point.detail}</p>
                        </div>
                    </div>
                ))}
                <div className="pt-8">
                    <h3 className="text-2xl font-bold mb-4">Our Headquarters</h3>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">[Interactive Map Placeholder]</p>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card">
        <div className="container-fluid mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-12" {...fadeIn}>
            Frequently Asked Questions
          </motion.h2>
          <motion.div className="max-w-3xl mx-auto" {...fadeIn}>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;