import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, Filter } from "lucide-react";

// Import images
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import dogImage from "@/assets/dog.jpg";
import pandaImage from "@/assets/panda.jpg";
import polarBearImage from "@/assets/polar-bear.jpg";

const galleryItems = [
  {
    id: 1,
    image: tigerImage,
    title: "Bengal Tiger",
    category: "Wild",
    description: "Majestic tigers in their natural habitat"
  },
  {
    id: 2,
    image: elephantImage,
    title: "African Elephant",
    category: "Wild",
    description: "Gentle giants of the savanna"
  },
  {
    id: 3,
    image: dogImage,
    title: "Golden Retriever",
    category: "Domestic",
    description: "Loving companions seeking homes"
  },
  {
    id: 4,
    image: pandaImage,
    title: "Giant Panda",
    category: "Conservation",
    description: "Success stories in wildlife protection"
  },
  {
    id: 5,
    image: polarBearImage,
    title: "Polar Bear",
    category: "Wild",
    description: "Arctic wildlife facing climate challenges"
  },
  {
    id: 6,
    image: tigerImage,
    title: "Wildlife Sanctuary",
    category: "Conservation",
    description: "Protected spaces for endangered species"
  },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ["All", "Wild", "Domestic", "Conservation"];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nature-forest to-nature-leaf bg-clip-text text-transparent">
            Wildlife Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the beauty and diversity of wildlife through our curated collection of images.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-xl p-2 border border-white/20 flex flex-wrap gap-2">
            <Filter className="w-5 h-5 text-nature-leaf my-auto mx-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "badge" : "wrap"}
                size="sm"
                onClick={() => setFilter(category)}
                className="rounded-lg"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl glass border border-white/20 cursor-pointer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{item.description}</p>
                  <span className="inline-block px-2 py-1 bg-nature-leaf/20 text-nature-sky text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button variant="slide" size="lg">
            View More Photos
          </Button>
        </motion.div>
      </div>

      {/* Modal for selected image (simplified) */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems.find(item => item.id === selectedImage)?.image}
              alt="Enlarged view"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;