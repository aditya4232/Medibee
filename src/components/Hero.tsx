
import { motion } from 'framer-motion';
import { Upload, User, Sparkles, Scan } from 'lucide-react';
import { useSession } from './SessionProvider';
import { useNavigate } from 'react-router-dom';
import DNAHeroImage from './DNAHeroImage';

const Hero = () => {
  const { triggerSessionStart, hasActiveSession } = useSession();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (hasActiveSession) {
      navigate('/dashboard');
    } else {
      triggerSessionStart();
    }
  };

  const handleUploadReport = () => {
    if (hasActiveSession) {
      navigate('/dashboard?tab=reports');
    } else {
      triggerSessionStart();
    }
  };

  return (
    <section className="relative z-10 pt-8 pb-20 px-4">
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
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-foreground">
                  Powered by Gemini AI
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Tiny
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
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
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all group"
              >
                <User size={24} className="group-hover:scale-110 transition-transform" />
                {hasActiveSession ? 'Go to Dashboard' : 'Get Started'}
              </motion.button>

              <motion.button
                onClick={handleUploadReport}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 px-8 py-4 glass text-foreground rounded-2xl font-semibold text-lg hover:shadow-lg transition-all group backdrop-blur-xl"
              >
                <Scan size={24} className="group-hover:scale-110 transition-transform" />
                Analyze Prescription
              </motion.button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
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

          {/* Right Content - DNA Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <DNAHeroImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
