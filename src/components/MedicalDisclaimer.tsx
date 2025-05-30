
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MedicalDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="glass border-amber-200/50 bg-amber-50/10 dark:bg-amber-900/10">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Important Medical Disclaimer
                </h3>
                <p className="text-lg text-muted-foreground">
                  Please read this carefully before using MediBee
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Stethoscope className="h-5 w-5 text-medical-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Not a Medical Professional</h4>
                    <p className="text-sm text-muted-foreground">
                      MediBee is an AI assistant that provides educational information only. 
                      It is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-medical-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Always Consult a Doctor</h4>
                    <p className="text-sm text-muted-foreground">
                      Always seek advice from qualified healthcare professionals for any medical 
                      concerns. Never ignore professional medical advice because of information from MediBee.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Emergency Situations</h4>
                    <p className="text-sm text-muted-foreground">
                      In case of medical emergencies, contact your local emergency services 
                      immediately. Do not rely on MediBee for emergency medical assistance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-medical-purple mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Information Accuracy</h4>
                    <p className="text-sm text-muted-foreground">
                      While we strive for accuracy, medical information can change rapidly. 
                      Always verify information with healthcare professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-medical-blue/10 to-medical-purple/10 rounded-lg p-6 border border-white/20">
              <h4 className="font-semibold text-foreground mb-3 text-center">
                🇮🇳 For Users in India
              </h4>
              <p className="text-sm text-muted-foreground text-center">
                MediBee is designed to help Indian users understand medical information in simple terms, 
                including Hinglish explanations. However, always consult with registered medical practitioners 
                licensed in India for proper medical advice and treatment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default MedicalDisclaimer;
