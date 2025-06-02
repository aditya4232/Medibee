
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/20 dark:bg-gray-800/20 z-[60]">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 shadow-sm"
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ 
          duration: 0.1, 
          ease: "easeOut"
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
