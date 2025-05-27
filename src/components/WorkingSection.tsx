
import { motion } from 'framer-motion';
import { Upload, Brain, FileText, MessageSquare } from 'lucide-react';

const WorkingSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Medical Data",
      description: "Upload your prescriptions, lab reports, or medical images securely",
      color: "text-medical-blue"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced AI processes and analyzes your medical information",
      color: "text-medical-purple"
    },
    {
      icon: FileText,
      title: "Generate Insights",
      description: "Get easy-to-understand explanations and personalized recommendations",
      color: "text-medical-green"
    },
    {
      icon: MessageSquare,
      title: "Interactive Guidance",
      description: "Chat with MediBee for ongoing support and clarifications",
      color: "text-medical-amber"
    }
  ];

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
            How MediBee Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, secure, and intelligent - transforming complex medical information into actionable insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-medical-blue to-medical-purple opacity-50" />
              )}
              
              <div className="glass p-6 rounded-2xl text-center hover:shadow-glass transition-all duration-300">
                <div className="relative">
                  <div className={`w-16 h-16 ${step.color} bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 medical-glow`}>
                    <step.icon size={28} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-medical-gradient rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingSection;
