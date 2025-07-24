import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Grid, List } from "lucide-react";
import AnimalCard from "./AnimalCard";

// Import images
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import dogImage from "@/assets/dog.jpg";
import pandaImage from "@/assets/panda.jpg";
import polarBearImage from "@/assets/polar-bear.jpg";

const animals = [
  {
    name: "Raja",
    species: "Bengal Tiger",
    image: tigerImage,
    description: "Raja is a magnificent Bengal tiger who needs our protection. Help us preserve his habitat and ensure his species survives for future generations.",
    status: "Endangered",
    facts: [
      "Tigers are the largest wild cats in the world",
      "Each tiger's stripes are unique, like human fingerprints",
      "They can leap up to 10 meters horizontally"
    ],
    sound: "/sounds/tiger-roar.mp3"
  },
  {
    name: "Kesi",
    species: "African Elephant",
    image: elephantImage,
    description: "Kesi is part of a family of elephants roaming the African savanna. Support conservation efforts to protect these gentle giants from poaching.",
    status: "Vulnerable",
    facts: [
      "Elephants can remember other elephants they haven't seen for decades",
      "They use infrasound to communicate over long distances",
      "Baby elephants suck their trunks like human babies suck thumbs"
    ],
    sound: "/sounds/elephant-trumpet.mp3"
  },
  {
    name: "Buddy",
    species: "Golden Retriever",
    image: dogImage,
    description: "Buddy is a loving companion looking for a forever home. He's great with kids and other pets, and ready to bring joy to your family.",
    status: "Adoptable",
    facts: [
      "Dogs have been human companions for over 15,000 years",
      "Golden Retrievers were originally bred for hunting waterfowl",
      "They can understand up to 250 words and gestures"
    ],
    sound: "/sounds/dog-bark.mp3"
  },
  {
    name: "Bao",
    species: "Giant Panda",
    image: pandaImage,
    description: "Bao represents the success of conservation efforts. Help us continue protecting bamboo forests and supporting panda rehabilitation programs.",
    status: "Vulnerable",
    facts: [
      "Pandas spend 14 hours a day eating bamboo",
      "They have a 'pseudo thumb' to help grip bamboo",
      "Newborn pandas are about the size of a stick of butter"
    ],
    sound: "/sounds/panda-vocalization.mp3"
  },
  {
    name: "Arctic",
    species: "Polar Bear",
    image: polarBearImage,
    description: "Arctic and his family face the challenges of climate change. Support efforts to preserve the Arctic ice and protect polar bear habitats.",
    status: "Endangered",
    facts: [
      "Polar bears can swim for days without resting",
      "Their black skin absorbs heat from the sun",
      "They have an incredible sense of smell, detecting seals 20 miles away"
    ],
    sound: "/sounds/polar-bear-growl.mp3"
  },
];

const AnimalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % animals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="awareness" className="py-20 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nature-forest to-nature-leaf bg-clip-text text-transparent">
            Meet Our Animals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each animal has a story, each species needs our help. Discover how you can make a difference.
          </p>
        </motion.div>

        {/* View toggle */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-xl p-1 border border-white/20">
            <Button
              variant={viewMode === 'carousel' ? 'badge' : 'wrap'}
              size="sm"
              onClick={() => setViewMode('carousel')}
              className="rounded-lg"
            >
              <List className="w-4 h-4 mr-2" />
              Carousel
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'badge' : 'wrap'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-lg ml-1"
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="flex"
                animate={{ x: -currentIndex * 100 + '%' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {animals.map((animal, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <AnimalCard {...animal} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="wrap"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="wrap"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {animals.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-nature-leaf scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {animals.map((animal, index) => (
              <AnimalCard key={index} {...animal} index={index} />
            ))}
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button variant="slide" size="xl" className="group">
            <span>Donate Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤️
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimalCarousel;