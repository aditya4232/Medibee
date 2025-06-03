
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 glass"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using MediBee. By using our service, you agree to these terms.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass border-red-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="w-5 h-5" />
                    Medical Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground">
                    MediBee is an AI-powered educational tool and is NOT a substitute for professional medical advice, 
                    diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions 
                    you may have regarding a medical condition.
                  </p>
                  <p className="text-muted-foreground">
                    Never disregard professional medical advice or delay in seeking it because of something you have 
                    read or learned through MediBee. If you think you may have a medical emergency, call your doctor 
                    or emergency services immediately.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    By accessing and using MediBee, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                  <p>
                    If you do not agree to these terms, you should not use or access our services.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Privacy and Data Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    We collect minimal personal information and use secure, encrypted storage for all data.
                  </p>
                  <p>
                    Session data is collected anonymously to improve our services. You can choose between temporary 
                    guest sessions or permanent Google-authenticated accounts.
                  </p>
                  <p>
                    We do not share your personal medical information with third parties without your explicit consent.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>AI-Generated Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    MediBee uses artificial intelligence to analyze and interpret medical information. While we strive 
                    for accuracy, AI-generated content may not always be 100% accurate.
                  </p>
                  <p>
                    Always verify AI-generated information with qualified healthcare professionals before making any 
                    medical decisions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  <p>
                    If you have any questions about these Terms of Service, please contact us at: 
                    <span className="text-blue-600 dark:text-blue-400 ml-2">support@medibee.ai</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
