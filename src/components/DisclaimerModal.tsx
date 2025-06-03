
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] w-[90vw] max-w-md max-h-[85vh]"
          >
            <Card className="glass border-red-500/30 shadow-2xl backdrop-blur-md">
              <CardHeader className="pb-3 text-center">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <CardTitle className="text-lg text-foreground">Medical Disclaimer</CardTitle>
                <p className="text-xs text-muted-foreground">Important Information</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h3 className="font-semibold text-red-700 dark:text-red-300 mb-1 flex items-center gap-1 text-xs">
                      <AlertTriangle size={12} />
                      Not Medical Advice
                    </h3>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      MediBee is NOT a substitute for professional medical care.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1 text-xs">
                      <Shield size={12} />
                      AI-Powered Tool
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Educational information only. Always consult healthcare professionals.
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1 text-xs">
                      <CheckCircle size={12} />
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
        </>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
