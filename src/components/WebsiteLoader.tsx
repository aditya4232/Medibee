
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stethoscope, Pill } from 'lucide-react';

const WebsiteLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing MediBee...');

  useEffect(() => {
    const texts = [
      'Initializing MediBee...',
      'Loading AI Engine...',
      'Preparing Medical Data...',
      'Almost Ready...'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 800);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 z-[100] flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 border-4 border-medical-blue/20 rounded-full"></div>
            <div className="absolute inset-2 border-4 border-medical-purple/30 rounded-full"></div>
            <div className="absolute inset-4 border-4 border-medical-green/40 rounded-full"></div>
            <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-medical-blue" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            MediBee
          </motion.h2>

          <motion.p
            key={loadingText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-8"
          >
            {loadingText}
          </motion.p>

          <div className="flex justify-center gap-4">
            {[Stethoscope, Heart, Pill].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
              >
                <Icon className="w-6 h-6 text-medical-blue" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebsiteLoader;
