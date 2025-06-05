
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const DisclaimerModal = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  useEffect(() => {
    // Check if user has seen disclaimer today
    const lastSeen = localStorage.getItem('medibee-disclaimer-seen');
    const today = new Date().toDateString();
    
    if (lastSeen !== today) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    if (acceptedTerms && acceptedDisclaimer) {
      const today = new Date().toDateString();
      localStorage.setItem('medibee-disclaimer-seen', today);
      setShowDisclaimer(false);
    }
  };

  const canAccept = acceptedTerms && acceptedDisclaimer;

  return (
    <AnimatePresence>
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm"
          >
            <Card className="bg-white/95 dark:bg-slate-900/95 border-red-500/30 shadow-2xl">
              <CardHeader className="pb-3 text-center">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <CardTitle className="text-base text-foreground">Medical Disclaimer</CardTitle>
                <p className="text-xs text-muted-foreground">Important Information</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h3 className="font-semibold text-red-700 dark:text-red-300 mb-1 flex items-center gap-1 text-xs">
                      <AlertTriangle size={10} />
                      Not Medical Advice
                    </h3>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      MediBee is NOT a substitute for professional medical care.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1 text-xs">
                      <Shield size={10} />
                      AI-Powered Tool
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Educational information only. Always consult healthcare professionals.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1 text-xs">
                      <CheckCircle size={10} />
                      Privacy & Data
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Anonymous session data collected to improve services.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                    />
                    <label htmlFor="terms" className="text-xs text-foreground leading-relaxed">
                      I understand this is for educational purposes only.
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="disclaimer"
                      checked={acceptedDisclaimer}
                      onCheckedChange={(checked) => setAcceptedDisclaimer(checked === true)}
                    />
                    <label htmlFor="disclaimer" className="text-xs text-foreground leading-relaxed">
                      I agree to terms of service and privacy policy.
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleAccept}
                  disabled={!canAccept}
                  className={`w-full py-2 font-semibold text-sm ${
                    canAccept 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg' 
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {canAccept ? 'I Understand & Agree' : 'Please Accept Both Terms'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
