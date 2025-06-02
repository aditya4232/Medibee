
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MedicalDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-amber-50/80 dark:bg-amber-900/20 border-b border-amber-200/50 dark:border-amber-800/30 py-2 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            <span className="font-semibold">Medical Disclaimer:</span> MediBee is for educational purposes only. Always consult qualified healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MedicalDisclaimer;
