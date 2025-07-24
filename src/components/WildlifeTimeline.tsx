import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, TreePine, Shield, Heart } from "lucide-react";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1973,
    title: "Project Tiger",
    description: "India launched Project Tiger to protect Bengal tigers from extinction, establishing 9 tiger reserves.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-orange-500 to-red-500"
  },
  {
    year: 1982,
    title: "Save the Jungle Initiative",
    description: "Global movement to preserve rainforests and protect endangered species habitats worldwide.",
    icon: <TreePine className="w-6 h-6" />,
    color: "from-nature-forest to-nature-leaf"
  },
  {
    year: 1993,
    title: "Convention on Biological Diversity",
    description: "International treaty aimed at conserving biological diversity and sustainable use of components.",
    icon: <Heart className="w-6 h-6" />,
    color: "from-nature-sky to-nature-sunset"
  },
  {
    year: 2010,
    title: "Global Tiger Recovery Program",
    description: "13 tiger range countries committed to doubling wild tiger numbers by 2022.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-nature-sunset to-nature-gold"
  },
  {
    year: 2015,
    title: "Paris Climate Agreement",
    description: "Global commitment to limit warming and protect wildlife through habitat preservation.",
    icon: <TreePine className="w-6 h-6" />,
    color: "from-nature-leaf to-nature-sky"
  }
];

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center mb-12"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-nature-leaf to-nature-sky opacity-30" />
      
      {/* Content */}
      <div className={`flex w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="w-5/12">
          {index % 2 === 0 && (
            <motion.div
              className="glass rounded-2xl p-6 mr-8 backdrop-blur-lg bg-white/10 border border-white/20"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${event.color} mb-4`}>
                <Calendar className="w-4 h-4 mr-2" />
                {event.year}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
            </motion.div>
          )}
        </div>

        {/* Center icon */}
        <div className="flex items-center justify-center w-2/12">
          <motion.div
            className={`glass rounded-full p-4 backdrop-blur-md bg-gradient-to-r ${event.color} text-white shadow-3d z-10`}
            initial={{ scale: 0, rotate: 180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            {event.icon}
          </motion.div>
        </div>

        <div className="w-5/12">
          {index % 2 === 1 && (
            <motion.div
              className="glass rounded-2xl p-6 ml-8 backdrop-blur-lg bg-white/10 border border-white/20"
              whileHover={{ scale: 1.05, rotateY: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${event.color} mb-4`}>
                <Calendar className="w-4 h-4 mr-2" />
                {event.year}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WildlifeTimeline = () => {
  const [titleRef, titleInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-nature-forest/5">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Conservation
            <span className="bg-gradient-to-r from-nature-leaf to-nature-sky bg-clip-text text-transparent"> Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the milestones in wildlife conservation history that have shaped our efforts to protect endangered species
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WildlifeTimeline;