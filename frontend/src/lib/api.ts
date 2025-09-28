// --- MOCK API / CMS DATA ---
// In a real application, this data would be fetched from a headless CMS like Strapi, Sanity, or a custom backend.

// --- PRODUCTS ---
const allProducts = [
  {
    id: 1,
    name: "Aqua-Prime 3000",
    category: "Centrifugal",
    image: "https://via.placeholder.com/400x300.png?text=Aqua-Prime+3000",
    images: [
      "https://via.placeholder.com/800x600.png?text=Main+View",
      "https://via.placeholder.com/800x600.png?text=Side+View",
      "https://via.placeholder.com/800x600.png?text=In+Context",
    ],
    description: "High-efficiency pump for industrial water transfer. Built for reliability and performance.",
    flowRate: 300,
    pressure: 150,
    specifications: [
        { label: "Flow Rate", value: "Up to 300 GPM" },
        { label: "Max Pressure", value: "150 PSI" },
        { label: "Material", value: "316 Stainless Steel" },
        { label: "Motor", value: "15 HP, TEFC" },
        { label: "Inlet/Outlet", value: "3\" / 2.5\" Flanged" },
    ],
    performanceChart: "https://via.placeholder.com/600x400.png?text=Performance+Curve",
    documentation: [
        { name: "Technical Datasheet", link: "#" },
        { name: "Installation Manual", link: "#" },
        { name: "3D CAD Model (.step)", link: "#" },
    ],
    certifications: ["ISO 9001", "CE", "ANSI/NSF 61"]
  },
  // Add other products...
];

export const getProducts = async () => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 200));
  return allProducts;
};

export const getProductById = async (id: number) => {
  await new Promise(res => setTimeout(res, 200));
  return allProducts.find(p => p.id === id);
};


// --- BLOG ---
const blogPosts = [
    {
        id: 1,
        title: "The Future of Pumping: 5 Key Technology Trends to Watch",
        author: "Dr. Evelyn Reed",
        date: "October 26, 2023",
        excerpt: "From IoT integration to AI-driven predictive maintenance, the world of industrial pumping is on the cusp of a major transformation...",
        image: "https://via.placeholder.com/1200x600.png?text=Tech+Trends",
        category: "Technology",
        content: "<p>The industrial pumping sector... is on the verge of a significant technological leap.</p><h3>1. IoT and Smart Pump Technology</h3><p>...</p>" // Truncated for brevity
    },
    // ... other blog posts
];

export const getBlogPosts = async () => {
  await new Promise(res => setTimeout(res, 200));
  return blogPosts;
};

export const getBlogPostById = async (id: number) => {
  await new Promise(res => setTimeout(res, 200));
  return blogPosts.find(p => p.id === id);
};


// --- OTHER PAGE DATA ---
export const getAboutPageData = async () => {
    await new Promise(res => setTimeout(res, 200));
    return {
        teamMembers: [
            { name: "Dr. Evelyn Reed", title: "Founder & CEO", image: "https://via.placeholder.com/200x200.png?text=ER", bio: "..." },
            // ... other members
        ],
        timelineEvents: [
            { year: "1998", event: "AquaPump is founded..." },
            // ... other events
        ],
    };
};

// ... Add more data-fetching functions as needed for other pages