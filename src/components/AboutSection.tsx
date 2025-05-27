
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About MediBee
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your tiny but powerful medical assistant that simplifies healthcare through AI-powered insights, 
            making medical information accessible to everyone in India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: "Healthcare for All",
              description: "Breaking down barriers to quality healthcare information for every Indian citizen",
              color: "text-medical-red"
            },
            {
              icon: Shield,
              title: "Privacy First",
              description: "Your health data is protected with blockchain-based decentralized sessions",
              color: "text-medical-blue"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Get instant analysis of your medical reports and prescriptions using advanced AI",
              color: "text-medical-amber"
            },
            {
              icon: Users,
              title: "Community Driven",
              description: "Built by Indians, for Indians - understanding our unique healthcare challenges",
              color: "text-medical-green"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl hover:shadow-glass transition-all duration-300"
            >
              <div className={`w-12 h-12 ${item.color} bg-white/10 rounded-xl flex items-center justify-center mb-4 medical-glow`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
