import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";

// Placeholder Data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Pumping: 5 Key Technology Trends to Watch",
    author: "Dr. Evelyn Reed",
    date: "October 26, 2023",
    excerpt: "From IoT integration to AI-driven predictive maintenance, the world of industrial pumping is on the cusp of a major transformation. Here are the top five trends shaping the future...",
    image: "https://via.placeholder.com/600x400.png?text=Tech+Trends",
    category: "Technology",
  },
  {
    id: 2,
    title: "Choosing the Right Pump: A Guide to Centrifugal vs. Submersible",
    author: "Marcus Chen",
    date: "October 15, 2023",
    excerpt: "Making the right choice between a centrifugal and a submersible pump is crucial for operational efficiency. We break down the key differences, benefits, and ideal applications for each.",
    image: "https://via.placeholder.com/600x400.png?text=Pump+Comparison",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Maximizing Pump Lifespan: A Proactive Maintenance Checklist",
    author: "Aisha Khan",
    date: "September 28, 2023",
    excerpt: "Don't wait for a breakdown. Our comprehensive maintenance checklist helps you maximize the lifespan and performance of your critical pumping equipment.",
    image: "https://via.placeholder.com/600x400.png?text=Maintenance",
    category: "Maintenance",
  },
    {
    id: 4,
    title: "Case Study: How AquaPump Solved a Major Water Treatment Challenge",
    author: "Admin",
    date: "September 10, 2023",
    excerpt: "Discover how a custom-engineered solution from AquaPump helped a municipal water treatment facility increase efficiency by 30% while reducing energy costs.",
    image: "https://via.placeholder.com/600x400.png?text=Case+Study",
    category: "Case Study",
  },
];

const Blog = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-32 bg-card text-center">
        <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The AquaPump Blog
        </motion.h1>
        <motion.p
            className="text-xl max-w-3xl mx-auto text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
          Insights, trends, and expertise in fluid management technology.
        </motion.p>
      </section>

      {/* Blog Grid */}
      <main className="container-fluid mx-auto px-4 py-20">
        <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {blogPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                    <Card className="interactive-card overflow-hidden group h-full flex flex-col">
                        <div className="overflow-hidden">
                            <Link to={`/blog/${post.id}`}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>
                        </div>
                        <CardContent className="p-6 flex-grow flex flex-col">
                            <div>
                                <p className="text-primary font-semibold mb-2">{post.category}</p>
                                <Link to={`/blog/${post.id}`}>
                                    <h2 className="text-2xl font-bold mb-4 line-clamp-2 hover:text-primary transition-colors">{post.title}</h2>
                                </Link>
                                <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
                            </div>
                            <Button asChild variant="outline" className="mt-auto w-fit">
                                <Link to={`/blog/${post.id}`}>
                                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Blog;