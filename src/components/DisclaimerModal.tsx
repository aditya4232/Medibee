
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[10000] p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <Card className="glass border-red-500/30 shadow-2xl backdrop-blur-md">
                <CardHeader className="pb-4 text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl text-foreground">Medical Disclaimer</CardTitle>
                  <p className="text-sm text-muted-foreground">Important Information Before You Continue</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} />
                        Not a Medical Professional
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400">
                        MediBee is NOT a substitute for professional medical advice, diagnosis, or treatment. 
                        Always consult with qualified healthcare professionals for medical concerns.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                        <Shield size={16} />
                        AI-Powered Assistance
                      </h3>
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        Our AI provides educational information only. Results may not be 100% accurate. 
                        Verify all information with healthcare professionals.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Privacy & Data
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        We collect anonymous session data to improve our services. 
                        No personal medical information is permanently stored without your consent.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Emergency Situations:</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're experiencing a medical emergency, immediately contact emergency services (108 in India, 911 in US) 
                        or visit the nearest hospital. Do not rely on MediBee for emergency medical guidance.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                      />
                      <label htmlFor="terms" className="text-sm text-foreground leading-relaxed">
                        I understand that MediBee is for educational purposes only and is not a substitute for professional medical advice.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="disclaimer"
                        checked={acceptedDisclaimer}
                        onCheckedChange={(checked) => setAcceptedDisclaimer(checked === true)}
                      />
                      <label htmlFor="disclaimer" className="text-sm text-foreground leading-relaxed">
                        I agree to the terms of service and privacy policy, and consent to anonymous data collection for service improvement.
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleAccept}
                    disabled={!canAccept}
                    className={`w-full py-3 font-semibold ${
                      canAccept 
                        ? 'bg-medical-gradient hover:shadow-lg' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canAccept ? 'I Understand & Agree' : 'Please Accept Both Terms'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    This disclaimer will be shown once per day for your safety.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
