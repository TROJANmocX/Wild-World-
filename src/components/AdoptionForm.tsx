import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Sparkles, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

// Import animal images
import dogImage from "@/assets/dog.jpg";
import tigerImage from "@/assets/tiger.jpg";
import elephantImage from "@/assets/elephant.jpg";
import pandaImage from "@/assets/panda.jpg";
import polarBearImage from "@/assets/polar-bear.jpg";

interface Animal {
  id: string;
  name: string;
  species: string;
  image: string;
  description: string;
}

const adoptableAnimals: Animal[] = [
  {
    id: "buddy",
    name: "Buddy",
    species: "Golden Retriever",
    image: dogImage,
    description: "A friendly companion looking for a loving home"
  },
  {
    id: "raja",
    name: "Raja",
    species: "Bengal Tiger",
    image: tigerImage,
    description: "Majestic tiger under our wildlife protection program"
  },
  {
    id: "ganesha",
    name: "Ganesha",
    species: "Asian Elephant",
    image: elephantImage,
    description: "Gentle giant needing conservation support"
  },
  {
    id: "bamboo",
    name: "Bamboo",
    species: "Giant Panda",
    image: pandaImage,
    description: "Adorable panda supporting species recovery"
  },
  {
    id: "arctic",
    name: "Arctic",
    species: "Polar Bear",
    image: polarBearImage,
    description: "Arctic guardian fighting climate change"
  }
];

const AdoptionForm = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [adopterName, setAdopterName] = useState("");
  const [isAdopted, setIsAdopted] = useState(false);
  const [adoptedAnimal, setAdoptedAnimal] = useState<Animal | null>(null);

  const handleAdoption = () => {
    if (selectedAnimal && adopterName.trim()) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']
      });

      setAdoptedAnimal(selectedAnimal);
      setIsAdopted(true);

      // Reset form after celebration
      setTimeout(() => {
        setIsAdopted(false);
        setSelectedAnimal(null);
        setAdopterName("");
        setAdoptedAnimal(null);
      }, 5000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-nature-sky/10 via-background to-nature-leaf/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Adopt a
            <span className="bg-gradient-to-r from-nature-sunset to-nature-gold bg-clip-text text-transparent"> Wildlife Friend</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our conservation efforts by symbolically adopting an animal and supporting their protection
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-8 backdrop-blur-lg bg-white/10 border border-white/20 shadow-3d">
          <AnimatePresence mode="wait">
            {!isAdopted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Animal Selection */}
                  <div>
                    <Label className="text-lg font-semibold text-foreground mb-4 block">
                      Choose Your Wildlife Friend
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {adoptableAnimals.map((animal) => (
                        <motion.div
                          key={animal.id}
                          className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            selectedAnimal?.id === animal.id
                              ? 'border-nature-leaf shadow-glow scale-105'
                              : 'border-white/30 hover:border-white/50'
                          }`}
                          onClick={() => setSelectedAnimal(animal)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="relative">
                            <img
                              src={animal.image}
                              alt={animal.name}
                              className="w-full h-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-2 left-2">
                              <p className="text-white text-sm font-semibold">{animal.name}</p>
                              <p className="text-white/80 text-xs">{animal.species}</p>
                            </div>
                            {selectedAnimal?.id === animal.id && (
                              <motion.div
                                className="absolute top-2 right-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <CheckCircle className="w-5 h-5 text-nature-leaf fill-current" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {selectedAnimal && (
                      <motion.div
                        className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-foreground font-semibold mb-2">{selectedAnimal.name}</h3>
                        <p className="text-muted-foreground text-sm">{selectedAnimal.description}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Adopter Information */}
                  <div>
                    <Label htmlFor="adopterName" className="text-lg font-semibold text-foreground mb-4 block">
                      Your Name
                    </Label>
                    <Input
                      id="adopterName"
                      value={adopterName}
                      onChange={(e) => setAdopterName(e.target.value)}
                      placeholder="Enter your name"
                      className="mb-6 bg-white/10 backdrop-blur-sm border-white/30 text-foreground placeholder:text-muted-foreground"
                    />

                    <div className="space-y-4 mb-6">
                      <div className="p-4 rounded-xl bg-nature-leaf/10 border border-nature-leaf/30">
                        <h4 className="text-foreground font-semibold mb-2 flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-nature-leaf" />
                          What You'll Get
                        </h4>
                        <ul className="text-muted-foreground text-sm space-y-1">
                          <li>• Digital adoption certificate</li>
                          <li>• Monthly conservation updates</li>
                          <li>• Photo updates of your adopted animal</li>
                          <li>• Supporting wildlife protection</li>
                        </ul>
                      </div>
                    </div>

                    <Button
                      onClick={handleAdoption}
                      disabled={!selectedAnimal || !adopterName.trim()}
                      variant="hero"
                      size="lg"
                      className="w-full"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Complete Adoption
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-6"
                >
                  <Sparkles className="w-16 h-16 text-nature-gold mx-auto mb-4" />
                </motion.div>

                <motion.h3
                  className="text-3xl font-bold text-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Congratulations, {adopterName}!
                </motion.h3>

                <motion.p
                  className="text-xl text-nature-leaf font-semibold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  You've successfully adopted {adoptedAnimal?.name}!
                </motion.p>

                <motion.div
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-nature-leaf to-nature-sky text-white font-semibold shadow-glow"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Wildlife Protector Badge
                </motion.div>

                <motion.p
                  className="text-muted-foreground mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Thank you for supporting wildlife conservation!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AdoptionForm;