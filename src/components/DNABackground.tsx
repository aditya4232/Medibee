
import { motion } from 'framer-motion';

const DNABackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* DNA Helix Animation */}
      <div className="absolute top-1/4 left-1/4 opacity-20 dark:opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path
              d="M20,50 Q30,30 40,50 T60,50 T80,50"
              stroke="url(#dnaGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M20,50 Q30,70 40,50 T60,50 T80,50"
              stroke="url(#dnaGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
            {/* Connection lines */}
            {[25, 35, 45, 55, 65, 75].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="50"
                x2={x}
                y2="50"
                stroke="url(#dnaGradient)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Floating Molecules */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full opacity-30 ${
            i % 3 === 0 ? 'bg-medical-blue' : 
            i % 3 === 1 ? 'bg-medical-green' : 'bg-medical-purple'
          }`}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 8)}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-medical-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-medical-green/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-medical-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default DNABackground;
