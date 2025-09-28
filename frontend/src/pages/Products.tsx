import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ListFilter, Search, ArrowRight, X, Loader2 } from "lucide-react";

const Products = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // TODO: Implement actual filtering logic based on the fetched data
  const filteredProducts = products || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const FilterSidebar = () => (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-full w-80 bg-card p-6 z-50 overflow-y-auto"
    >
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsFilterSidebarOpen(false)}>
            <X className="h-6 w-6" />
            </Button>
        </div>
        <div className="space-y-8">
            <div>
            <h4 className="font-semibold mb-4">Category</h4>
            <div className="space-y-2">
                {["Centrifugal", "Submersible", "Solar", "Slurry", "Dosing"].map((cat) => (
                <div key={cat} className="flex items-center">
                    <Checkbox id={`cat-${cat}`} />
                    <label htmlFor={`cat-${cat}`} className="ml-2 text-sm">
                    {cat}
                    </label>
                </div>
                ))}
            </div>
            </div>
            <div>
            <h4 className="font-semibold mb-4">Flow Rate (GPM)</h4>
            <Slider defaultValue={[250]} max={1000} step={50} />
            </div>
            <div>
            <h4 className="font-semibold mb-4">Pressure (PSI)</h4>
            <Slider defaultValue={[150]} max={500} step={25} />
            </div>
            <Button className="w-full btn-primary">Apply Filters</Button>
        </div>
    </motion.div>
  );

  const renderProductGrid = () => {
    if (isLoading) {
      return (
        <div className="text-center py-20 col-span-full">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading Products...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center py-20 col-span-full bg-destructive/10 text-destructive rounded-lg">
          <p className="text-lg font-semibold">Error fetching products.</p>
          <p>Please try again later.</p>
        </div>
      );
    }

    return filteredProducts.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
            <Card className="interactive-card overflow-hidden group h-full flex flex-col">
            <div className="overflow-hidden">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-primary font-semibold mb-4">{product.category}</p>
                <p className="text-muted-foreground mb-6 flex-grow">{product.description}</p>
                <Button asChild className="mt-auto w-full btn-primary">
                <Link to={`/products/${product.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                </Button>
            </CardContent>
            </Card>
        </motion.div>
    ));
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Our Products
        </motion.h1>
        <motion.p
          className="text-xl max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Explore our wide range of high-performance pumps, engineered for reliability and efficiency across all industries.
        </motion.p>
      </section>

      {/* Main Content */}
      <main className="container-fluid mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => setIsFilterSidebarOpen(true)}>
            <ListFilter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <div className="w-full max-w-sm relative">
            <Input placeholder="Search products..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {renderProductGrid()}
        </motion.div>
      </main>

      {/* Filter Sidebar */}
      {isFilterSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFilterSidebarOpen(false)}
          />
          <FilterSidebar />
        </>
      )}
    </div>
  );
};

export default Products;