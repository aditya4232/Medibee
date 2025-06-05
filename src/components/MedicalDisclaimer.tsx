
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const MedicalDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-amber-100/95 dark:bg-amber-900/95 border-b border-amber-300 dark:border-amber-700 py-1 px-4 shadow-lg"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
            <span className="font-semibold">Medical Disclaimer:</span> 
            <span className="hidden sm:inline"> MediBee is for educational purposes only. Always consult qualified healthcare professionals.</span>
            <span className="sm:hidden"> Educational purposes only. Consult professionals.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalDisclaimer;
