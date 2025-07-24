import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, TreePine, Waves, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SoundTrack {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  // Note: In a real app, these would be actual audio file URLs
  url: string;
}

const soundTracks: SoundTrack[] = [
  {
    id: "jungle",
    name: "Jungle Ambiance",
    icon: <TreePine className="w-4 h-4" />,
    color: "from-nature-forest to-nature-leaf",
    url: "/sounds/jungle-ambiance.mp3" // Placeholder
  },
  {
    id: "birds",
    name: "Bird Chirps",
    icon: <Music className="w-4 h-4" />,
    color: "from-nature-sky to-nature-sunset",
    url: "/sounds/bird-chirps.mp3" // Placeholder
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    icon: <Waves className="w-4 h-4" />,
    color: "from-nature-sky to-accent",
    url: "/sounds/ocean-waves.mp3" // Placeholder
  },
  {
    id: "mountain",
    name: "Mountain Wind",
    icon: <Mountain className="w-4 h-4" />,
    color: "from-muted to-nature-earth",
    url: "/sounds/mountain-wind.mp3" // Placeholder
  }
];

const AmbientSounds = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = (track: SoundTrack) => {
    // Stop current track
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (currentTrack === track.id) {
      // If same track, stop it
      setCurrentTrack(null);
      return;
    }

    // In a real app, you would load and play the actual audio file
    // For demo purposes, we'll just set the current track
    setCurrentTrack(track.id);
    
    // Simulate audio playback
    console.log(`Playing: ${track.name}`);
    
    // Create a mock audio element for demo
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = isMuted ? 0 : volume;
    
    // In production, you would set audioRef.current.src = track.url
    // and call audioRef.current.play()
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-4 backdrop-blur-lg bg-white/10 border border-white/20 shadow-3d mb-4 min-w-64"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Ambient Sounds</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="p-2"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>

            <div className="space-y-2 mb-4">
              {soundTracks.map((track) => (
                <motion.button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    currentTrack === track.id
                      ? `bg-gradient-to-r ${track.color} text-white shadow-glow`
                      : 'bg-white/10 hover:bg-white/20 text-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-lg ${
                    currentTrack === track.id ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    {track.icon}
                  </div>
                  <span className="text-sm font-medium">{track.name}</span>
                  {currentTrack === track.id && (
                    <motion.div
                      className="ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <VolumeX className="w-4 h-4 text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <Volume2 className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`glass rounded-full p-4 backdrop-blur-md border border-white/20 text-white shadow-3d transition-all duration-300 ${
          currentTrack ? 'bg-gradient-to-r from-nature-leaf to-nature-sky' : 'bg-white/10 hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Music className="w-6 h-6" />
        
        {/* Sound waves animation when playing */}
        {currentTrack && (
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-nature-leaf rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default AmbientSounds;