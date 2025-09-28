import { motion } from "framer-motion";
import { Users, Target, Eye, Award, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Placeholder Data
const teamMembers = [
  {
    name: "Dr. Evelyn Reed",
    title: "Founder & CEO",
    image: "https://via.placeholder.com/200x200.png?text=ER",
    bio: "With over 30 years in fluid dynamics, Dr. Reed's vision drives our innovation.",
  },
  {
    name: "Marcus Chen",
    title: "Chief Engineer",
    image: "https://via.placeholder.com/200x200.png?text=MC",
    bio: "Marcus leads our product development, turning complex challenges into reliable solutions.",
  },
  {
    name: "Aisha Khan",
    title: "Head of Operations",
    image: "https://via.placeholder.com/200x200.png?text=AK",
    bio: "Aisha ensures that our manufacturing and quality standards are second to none.",
  },
];

const timelineEvents = [
  { year: "1998", event: "AquaPump is founded with a mission to revolutionize industrial pumping." },
  { year: "2005", event: "Introduced the first generation of smart, energy-efficient pumps." },
  { year: "2012", event: "Expanded operations globally, opening our first international office." },
  { year: "2020", event: "Launched our award-winning Eco-Stream solar-powered pump series." },
  { year: "Today", event: "Leading the industry in sustainable and intelligent fluid management." },
];

const values = [
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Innovation", description: "We constantly push the boundaries of what's possible in fluid dynamics."},
    { icon: <Shield className="w-8 h-8 text-primary" />, title: "Reliability", description: "Our products are built to last, performing in the most demanding environments."},
    { icon: <Users className="w-8 h-8 text-primary" />, title: "Partnership", description: "We work with our clients to find the best solutions for their unique needs."}
]

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.7 }
    }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-32 text-center text-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <img src="https://via.placeholder.com/1920x1080.png?text=Our+Workshop" alt="AquaPump Workshop" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
        </div>
        <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Pioneering Fluid Technology
        </motion.h1>
        <motion.p
            className="text-xl max-w-3xl mx-auto text-white/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
          For over two decades, AquaPump has been the driving force behind industrial efficiency and sustainability.
        </motion.p>
      </section>

      {/* Mission and Vision */}
      <section className="py-20">
        <div className="container-fluid mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-bold mb-6">Our Purpose</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Target className="w-12 h-12 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">To engineer and deliver the world's most reliable and efficient pumping solutions, empowering industries to operate sustainably and productively.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Eye className="w-12 h-12 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">To create a future where intelligent fluid management solves global water and energy challenges, building a better planet for generations to come.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
                <img src="https://via.placeholder.com/800x600.png?text=Sustainable+Tech" alt="Sustainable Technology" className="rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-card">
        <div className="container-fluid mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" {...fadeIn}>Our Journey</motion.h2>
          <div className="relative">
            {/* The timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-border"></div>

            {timelineEvents.map((item, index) => (
              <motion.div
                key={index}
                className="relative mb-12 flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                  <p className="text-primary font-bold text-2xl mb-1">{item.year}</p>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-card"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
          <div className="container-fluid mx-auto px-4">
              <motion.h2 className="text-4xl font-bold text-center mb-16" {...fadeIn}>Our Core Values</motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                  {values.map((value, i) => (
                      <motion.div key={value.title} className="text-center" {...fadeIn} transition={{duration: 0.7, delay: i * 0.1}}>
                          <div className="flex justify-center items-center h-20 w-20 rounded-full bg-primary/10 mx-auto mb-6">
                              {value.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                          <p className="text-muted-foreground max-w-xs mx-auto">{value.description}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>


      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="container-fluid mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" {...fadeIn}>Meet Our Leadership</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div key={member.name} {...fadeIn} transition={{duration: 0.7, delay: i * 0.15}}>
                <div className="text-center group">
                  <div className="relative inline-block">
                    <img src={member.image} alt={member.name} className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-transparent group-hover:border-primary transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.title}</p>
                  <p className="text-muted-foreground max-w-xs mx-auto">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <motion.div className="container-fluid mx-auto px-4 text-center" {...fadeIn}>
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We're always looking for passionate individuals to help us build the future of fluid management.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3 h-auto">
            <Link to="/careers">View Open Positions</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;