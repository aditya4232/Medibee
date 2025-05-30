
import { motion } from 'framer-motion';
import { Upload, User, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative z-10 pt-20 pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full mb-8 backdrop-blur-xl">
                <Sparkles className="w-5 h-5 text-medical-blue" />
                <span className="text-sm font-medium text-foreground">
                  Powered by Gemini AI
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
                Your Tiny
                <span className="bg-medical-gradient bg-clip-text text-transparent block">
                  Medical Assistant
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Simplify medicine usage & medical jargon with AI-powered insights. 
                Get personalized health guidance in simple, understandable language.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
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
                className="flex items-center gap-3 px-8 py-4 glass text-foreground rounded-2xl font-semibold text-lg hover:shadow-glass transition-all group backdrop-blur-xl"
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
              className="flex flex-wrap justify-center lg:justify-start gap-4"
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
                  className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground backdrop-blur-xl"
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - DNA Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-96 rounded-3xl glass backdrop-blur-xl overflow-hidden">
              {/* DNA Helix Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative w-64 h-64"
                >
                  {/* DNA Strands */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      animate={{
                        rotateY: [0, 360],
                        rotateX: [0, 180]
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                      }}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full absolute bg-gradient-to-r ${
                          i % 4 === 0 ? 'from-medical-blue to-medical-purple' :
                          i % 4 === 1 ? 'from-medical-green to-medical-blue' :
                          i % 4 === 2 ? 'from-medical-purple to-medical-amber' :
                          'from-medical-amber to-medical-green'
                        } shadow-lg`}
                        style={{
                          top: `${20 + (i * 30)}px`,
                          left: `${50 + Math.cos(i * 0.5) * 80}px`,
                        }}
                      />
                    </motion.div>
                  ))}
                  
                  {/* Central Core */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center shadow-neon-blue">
                      <span className="text-2xl">🧬</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating Medical Icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-12 h-12 bg-medical-blue/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
              >
                <span className="text-xl">💊</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-medical-green/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
              >
                <span className="text-xl">🩺</span>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-8 w-10 h-10 bg-medical-purple/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
              >
                <span className="text-lg">🔬</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
