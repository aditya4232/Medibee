
import { motion } from 'framer-motion';

const DNAHeroImage = () => {
  return (
    <div className="relative w-full h-96 lg:h-[500px] rounded-3xl glass backdrop-blur-xl overflow-hidden">
      {/* Central DNA Helix */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative w-80 h-80"
        >
          {/* DNA Double Helix SVG */}
          <svg viewBox="0 0 200 300" className="w-full h-full">
            <defs>
              <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="dnaGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            
            {/* Left strand */}
            <motion.path
              d="M50,20 Q30,60 50,100 T50,180 Q30,220 50,260"
              stroke="url(#dnaGradient1)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Right strand */}
            <motion.path
              d="M150,20 Q170,60 150,100 T150,180 Q170,220 150,260"
              stroke="url(#dnaGradient2)"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
            
            {/* Base pairs */}
            {[...Array(12)].map((_, i) => {
              const y = 30 + i * 20;
              const phase = (i * Math.PI) / 6;
              const leftX = 50 + 20 * Math.sin(phase);
              const rightX = 150 - 20 * Math.sin(phase);
              
              return (
                <motion.line
                  key={i}
                  x1={leftX}
                  y1={y}
                  x2={rightX}
                  y2={y}
                  stroke={i % 2 === 0 ? "#3B82F6" : "#10B981"}
                  strokeWidth="3"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Floating Molecules */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full opacity-60 ${
            i % 4 === 0 ? 'bg-blue-500' : 
            i % 4 === 1 ? 'bg-green-500' : 
            i % 4 === 2 ? 'bg-purple-500' : 'bg-amber-500'
          }`}
          style={{
            left: `${10 + (i * 10)}%`,
            top: `${20 + (i * 8)}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Medical Icons */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-8 w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
      >
        <span className="text-2xl">💊</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-8 left-8 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
      >
        <span className="text-2xl">🔬</span>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-8 w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center glass backdrop-blur-xl"
      >
        <span className="text-xl">🧬</span>
      </motion.div>

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/3 right-12 w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center glass backdrop-blur-xl"
      >
        <span className="text-xl">🩺</span>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default DNAHeroImage;
