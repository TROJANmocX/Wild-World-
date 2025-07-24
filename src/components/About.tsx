import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Award, Shield, Leaf } from "lucide-react";

const About = () => {
  const stats = [
    { number: "50,000+", label: "Animals Rescued", icon: Heart },
    { number: "200+", label: "Species Protected", icon: Shield },
    { number: "1M+", label: "Global Supporters", icon: Users },
    { number: "15", label: "Years of Impact", icon: Award },
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Impact",
      description: "Working across continents to protect wildlife and their habitats through international partnerships."
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every animal deserves love, care, and protection. We treat each rescue with the utmost compassion."
    },
    {
      icon: Leaf,
      title: "Sustainable Future",
      description: "Building a sustainable future where humans and wildlife coexist in harmony for generations to come."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nature-forest to-nature-leaf bg-clip-text text-transparent">
            About Wildlife Care
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over 15 years, we've been at the forefront of wildlife conservation, 
            rescuing animals, protecting habitats, and educating communities worldwide.
          </p>
        </motion.div>

        {/* Mission statement */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-12 mb-16 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-nature-leaf to-nature-sky rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To create a world where wildlife thrives in their natural habitats, free from the threats of 
              extinction, habitat loss, and human conflict. We believe in the power of education, 
              conservation action, and community engagement to make this vision a reality.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-nature-leaf to-nature-sky rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass rounded-2xl p-8 border border-white/20 text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-nature-leaf to-nature-sky rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6">Join Our Mission</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Together, we can make a difference. Whether through donations, volunteering, 
            or simply spreading awareness, every action counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Become a Supporter
            </Button>
            <Button variant="slide" size="xl">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;