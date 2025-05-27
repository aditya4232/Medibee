
import { motion } from 'framer-motion';
import { Code, Database, Shield, Smartphone } from 'lucide-react';

const AboutProject = () => {
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
            About This Project
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A cutting-edge Progressive Web Application built with modern technologies to revolutionize healthcare accessibility
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Technology Stack</h3>
            <div className="space-y-4">
              {[
                { tech: "React + TypeScript", desc: "Modern frontend framework for scalable UI" },
                { tech: "Gemini AI", desc: "Advanced AI for medical analysis and insights" },
                { tech: "Blockchain Sessions", desc: "Decentralized, secure session management" },
                { tech: "PWA Ready", desc: "Installable, offline-capable mobile experience" },
                { tech: "Tailwind CSS", desc: "Responsive, modern styling framework" },
                { tech: "Framer Motion", desc: "Smooth animations and interactions" }
              ].map((item, index) => (
                <div key={item.tech} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-medical-blue rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-foreground">{item.tech}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Key Features</h3>
            <div className="space-y-4">
              {[
                { feature: "AI-Powered Analysis", desc: "Intelligent medical report interpretation" },
                { feature: "Hinglish Support", desc: "Natural language processing in local context" },
                { feature: "Privacy-First", desc: "Zero data storage, complete user privacy" },
                { feature: "Real-time Insights", desc: "Instant medical guidance and recommendations" },
                { feature: "Mobile Optimized", desc: "Seamless experience across all devices" },
                { feature: "Offline Capable", desc: "Works even with limited internet connectivity" }
              ].map((item, index) => (
                <div key={item.feature} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-medical-green rounded-full mt-2" />
                  <div>
                    <div className="font-semibold text-foreground">{item.feature}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Code, title: "Open Source", desc: "Built with transparency and community in mind" },
            { icon: Database, title: "Privacy-First", desc: "No permanent data storage, your privacy protected" },
            { icon: Shield, title: "Secure", desc: "Blockchain-based sessions for maximum security" },
            { icon: Smartphone, title: "Mobile-First", desc: "Designed primarily for smartphone users" }
          ].map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-medical-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <principle.icon className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{principle.title}</h4>
              <p className="text-sm text-muted-foreground">{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
