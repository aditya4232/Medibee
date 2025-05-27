
import { motion } from 'framer-motion';
import { Upload, User, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative z-10 pt-20 pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-medical-blue" />
              <span className="text-sm font-medium text-foreground">
                Powered by Gemini AI
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight">
              Your Tiny
              <span className="bg-medical-gradient bg-clip-text text-transparent block">
                Medical Assistant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Simplify medicine usage & medical jargon with AI-powered insights. 
              Get personalized health guidance in simple, understandable language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-medical-gradient text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-neon-blue transition-all group"
            >
              <User size={24} className="group-hover:scale-110 transition-transform" />
              Get Started
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-white rounded-full opacity-60"
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 glass text-foreground rounded-2xl font-semibold text-lg hover:shadow-glass transition-all group"
            >
              <Upload size={24} className="group-hover:scale-110 transition-transform" />
              Upload Report
            </motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              "🩺 Medical OCR",
              "🧬 AI Analysis", 
              "🗣️ Hinglish Support",
              "🔒 Privacy First",
              "📱 PWA Ready"
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground"
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-1/2 left-10 hidden lg:block">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-medical-blue/20 rounded-full flex items-center justify-center glass"
            >
              <span className="text-2xl">💊</span>
            </motion.div>
          </div>
          
          <div className="absolute top-1/3 right-10 hidden lg:block">
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-16 h-16 bg-medical-green/20 rounded-full flex items-center justify-center glass"
            >
              <span className="text-xl">🧬</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
