
import { motion } from 'framer-motion';
import { Target, Globe, Users, Zap } from 'lucide-react';

const AimSection = () => {
  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Democratizing healthcare through technology, making quality medical guidance accessible to every Indian
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-medical-blue/20 rounded-full flex items-center justify-center">
                <Target className="text-medical-blue" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To bridge the healthcare gap in India by providing free, AI-powered medical assistance that 
              simplifies complex medical information and makes healthcare guidance accessible to everyone, 
              regardless of their location or economic status.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-medical-purple/20 rounded-full flex items-center justify-center">
                <Globe className="text-medical-purple" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A future where every person in India has access to reliable medical guidance at their fingertips, 
              where language and literacy barriers don't prevent access to healthcare, and where technology 
              empowers individuals to make informed health decisions.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "1 Billion+",
              subtitle: "Lives to Impact",
              description: "Reaching every corner of India with quality healthcare guidance"
            },
            {
              icon: Globe,
              title: "22+",
              subtitle: "Languages Supported",
              description: "Breaking language barriers for inclusive healthcare"
            },
            {
              icon: Zap,
              title: "24/7",
              subtitle: "Always Available",
              description: "Round-the-clock medical assistance when you need it most"
            }
          ].map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center glass p-6 rounded-2xl"
            >
              <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <goal.icon className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{goal.title}</div>
              <div className="text-lg font-semibold text-medical-blue mb-3">{goal.subtitle}</div>
              <p className="text-muted-foreground text-sm">{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AimSection;
