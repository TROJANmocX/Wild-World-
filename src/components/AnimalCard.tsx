import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share, ExternalLink, Volume2, VolumeX } from "lucide-react";

interface AnimalCardProps {
  name: string;
  species: string;
  image: string;
  description: string;
  status: string;
  index: number;
  onFlip?: () => void;
  isFlipped?: boolean;
  facts?: string[];
  sound?: string;
}

const AnimalCard = ({ 
  name, 
  species, 
  image, 
  description, 
  status, 
  index,
  onFlip,
  isFlipped = false,
  facts = [],
  sound 
}: AnimalCardProps) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playAnimalSound = () => {
    if (sound) {
      // Create audio element and play sound
      const audio = new Audio(sound);
      audio.play().catch(console.error);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'endangered':
        return 'from-red-500 to-red-600';
      case 'vulnerable':
        return 'from-orange-500 to-orange-600';
      case 'adoptable':
        return 'from-nature-leaf to-nature-sky';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsCardFlipped(true)}
      onHoverEnd={() => setIsCardFlipped(false)}
    >
      <motion.div 
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isCardFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="card-3d glass rounded-2xl overflow-hidden shadow-card hover:shadow-3d transition-all duration-500 border border-white/20 backdrop-blur-lg bg-white/10">
            <div className="relative h-64 overflow-hidden">
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Status badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${getStatusColor(status)} backdrop-blur-sm`}>
                {status}
              </div>

              {/* Sound button */}
              {sound && (
                <motion.button
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
                  onClick={playAnimalSound}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </motion.button>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-md">
              <motion.h3
                className="text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {name}
              </motion.h3>
              
              <motion.p
                className="text-nature-leaf font-semibold mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {species}
              </motion.p>
              
              <motion.p
                className="text-muted-foreground text-sm leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {description}
              </motion.p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="badge" 
                  size="sm" 
                  className="text-xs backdrop-blur-md"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  {status === 'Adoptable' ? 'Adopt Me' : 'Save the Species'}
                </Button>
                
                <Button 
                  variant="share" 
                  size="sm"
                  className="text-xs backdrop-blur-md"
                >
                  <Share className="w-3 h-3 mr-1" />
                  Share
                </Button>
                
                <Button 
                  variant="wrap" 
                  size="sm"
                  className="text-xs backdrop-blur-md"
                  onClick={onFlip}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card - Facts */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="card-3d glass rounded-2xl overflow-hidden shadow-card hover:shadow-3d transition-all duration-500 border border-white/20 backdrop-blur-lg bg-gradient-to-br from-nature-forest/20 to-nature-leaf/20 h-full">
            <div className="p-6 h-full flex flex-col justify-center">
              <motion.h3
                className="text-2xl font-bold text-foreground mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Fun Facts About {name}
              </motion.h3>
              
              <div className="space-y-3">
                {facts.length > 0 ? facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-sm text-foreground">{fact}</p>
                  </motion.div>
                )) : (
                  <motion.div
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-foreground">This amazing {species.toLowerCase()} needs our protection!</p>
                  </motion.div>
                )}
              </div>

              {sound && (
                <motion.button
                  className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-nature-leaf/80 text-white hover:bg-nature-leaf backdrop-blur-md"
                  onClick={playAnimalSound}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Volume2 className="w-4 h-4" />
                  Hear {name}'s Sound
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Floating heart animation */}
        <motion.div
          className="absolute top-2 left-2 text-red-500 opacity-0 z-10"
          animate={{
            opacity: [0, 1, 0],
            y: [0, -20, -40],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimalCard;