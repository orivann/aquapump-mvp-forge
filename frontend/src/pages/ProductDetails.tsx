import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, CheckCircle, BarChart2, Loader2 } from "lucide-react";

const ProductDetails = () => {
    const { id } = useParams();
    const productId = Number(id);

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
        enabled: !!productId,
    });

    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (product?.images?.[0]) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    if (isError || !product) {
        return <div className="text-center py-20 text-destructive text-lg">Error: Product not found.</div>;
    }

    return (
        <div className="bg-background">
            {/* Product Header */}
            <header className="py-12 bg-card">
                <div className="container-fluid mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-primary font-semibold mb-2">{product.category}</p>
                        <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
                    </motion.div>
                </div>
            </header>

            <main className="container-fluid mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-4">
                            <img src={mainImage} alt={product.name} className="w-full rounded-lg shadow-lg object-cover aspect-square" />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    className={`w-full rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Info & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <p className="text-lg text-muted-foreground mb-6">{product.description}</p>
                        <Button size="lg" className="w-full md:w-auto btn-primary mb-8">Request a Quote</Button>

                        <Tabs defaultValue="specifications" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="performance">Performance</TabsTrigger>
                                <TabsTrigger value="docs">Documentation</TabsTrigger>
                            </TabsList>
                            <TabsContent value="specifications" className="pt-6">
                                <ul className="space-y-3">
                                    {product.specifications.map(spec => (
                                        <li key={spec.label} className="flex justify-between border-b pb-2">
                                            <span className="font-semibold text-foreground">{spec.label}</span>
                                            <span className="text-muted-foreground">{spec.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="performance" className="pt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5 text-primary"/> Performance Curve</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <img src={product.performanceChart} alt={`${product.name} performance chart`} className="w-full rounded-md" />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="docs" className="pt-6">
                                <div className="space-y-3">
                                    {product.documentation.map(doc => (
                                        <a key={doc.name} href={doc.link} download className="flex items-center p-3 bg-card rounded-md hover:bg-primary/10 transition-colors">
                                            <FileText className="h-6 w-6 text-primary mr-4" />
                                            <span className="font-medium text-foreground">{doc.name}</span>
                                            <Download className="h-5 w-5 text-muted-foreground ml-auto" />
                                        </a>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-8">
                            <h4 className="font-semibold text-lg mb-4">Certifications</h4>
                            <div className="flex flex-wrap gap-4">
                                {product.certifications.map(cert => (
                                    <div key={cert} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        <span className="font-medium">{cert}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;