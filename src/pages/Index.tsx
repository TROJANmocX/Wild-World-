import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnimalCarousel from "@/components/AnimalCarousel";
import WildlifeTimeline from "@/components/WildlifeTimeline";
import AdoptionForm from "@/components/AdoptionForm";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientSounds from "@/components/AmbientSounds";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <AnimalCarousel />
        <WildlifeTimeline />
        <AdoptionForm />
        <Gallery />
        <About />
        <Contact />
      </motion.main>
      
      <Footer />
      <AmbientSounds />
    </div>
  );
};

export default Index;
