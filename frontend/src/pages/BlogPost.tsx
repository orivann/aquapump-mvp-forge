import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";

// Placeholder Data
const blogPosts = [
    {
        id: 1,
        title: "The Future of Pumping: 5 Key Technology Trends to Watch",
        author: "Dr. Evelyn Reed",
        date: "October 26, 2023",
        image: "https://via.placeholder.com/1200x600.png?text=Tech+Trends",
        category: "Technology",
        content: `
            <p>The industrial pumping sector, a cornerstone of modern manufacturing and infrastructure, is on the verge of a significant technological leap. As industries demand greater efficiency, reliability, and sustainability, pump technology is evolving at an unprecedented pace. Here are the five key trends that are shaping the future of fluid management.</p>

            <h3 class="text-2xl font-bold my-4">1. IoT and Smart Pump Technology</h3>
            <p>The Internet of Things (IoT) is no longer a buzzword; it's a reality. Smart pumps equipped with sensors can monitor their own performance in real-time, tracking variables like pressure, flow rate, temperature, and vibration. This data is invaluable for optimizing performance and enabling predictive maintenance.</p>

            <h3 class="text-2xl font-bold my-4">2. AI-Driven Predictive Maintenance</h3>
            <p>Artificial Intelligence (AI) takes the data from smart pumps and turns it into actionable insights. AI algorithms can predict potential failures before they happen, allowing for scheduled maintenance that minimizes downtime and prevents costly catastrophic failures. This is a game-changer for critical applications.</p>

            <h3 class="text-2xl font-bold my-4">3. Energy Efficiency and Sustainability</h3>
            <p>With rising energy costs and increasing environmental regulations, energy efficiency is paramount. The next generation of pumps features advanced hydraulic designs, variable frequency drives (VFDs), and high-efficiency motors to reduce energy consumption by up to 50%.</p>

            <h3 class="text-2xl font-bold my-4">4. Advanced Materials and 3D Printing</h3>
            <p>New composite materials and alloys are making pumps lighter, stronger, and more resistant to corrosion and abrasion. Furthermore, 3D printing (additive manufacturing) is allowing for the creation of complex, highly optimized pump geometries that were previously impossible to manufacture, boosting efficiency even further.</p>

            <h3 class="text-2xl font-bold my-4">5. Decentralized and Modular Systems</h3>
            <p>The trend towards modular and decentralized pumping systems allows for greater flexibility and scalability. Instead of a single large pump, multiple smaller, intelligent pumps can work in concert, adapting to changing demands and providing redundancy. This approach improves overall system resilience and efficiency.</p>

            <p class="mt-8">At AquaPump, we are at the forefront of these innovations, integrating these technologies into our product lines to deliver solutions that are not just powerful, but also intelligent and sustainable. The future of pumping is here, and it's smarter than ever.</p>
        `
    },
    // ... other blog posts
];

const BlogPost = () => {
    const { id } = useParams();
    // In a real app, you'd fetch post data based on the ID.
    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) {
        return <div className="text-center py-20">Blog post not found.</div>;
    }

    return (
        <div className="bg-background">
            {/* Post Header */}
            <header className="relative py-24 md:py-40 text-white text-center overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                <motion.div
                    className="container-fluid mx-auto px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-primary font-semibold mb-4">{post.category}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto text-balance">{post.title}</h1>
                    <div className="flex items-center justify-center text-lg text-white/80 space-x-6">
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* Post Content */}
            <main className="py-20">
                <div className="container-fluid mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Share Section */}
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl font-bold mb-4">Share this Post</h3>
                            <div className="flex justify-center space-x-4">
                                <Button variant="outline" size="icon"><Twitter className="h-5 w-5" /></Button>
                                <Button variant="outline" size="icon"><Linkedin className="h-5 w-5" /></Button>
                                <Button variant="outline" size="icon"><Facebook className="h-5 w-5" /></Button>
                            </div>
                        </div>

                        {/* Back to Blog Button */}
                        <div className="mt-16 text-center">
                            <Button asChild variant="default">
                                <Link to="/blog">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Blog
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BlogPost;