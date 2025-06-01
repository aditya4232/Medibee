
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />

      <div className="relative z-10 pt-24 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 mx-auto mb-4 text-medical-blue" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Your privacy and data security are our top priorities
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-6 h-6 text-medical-blue" />
                  Data Protection & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  MediBee is committed to protecting your personal health information. We use industry-standard encryption and security measures to safeguard your data.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></span>
                    All medical data is encrypted both in transit and at rest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></span>
                    Firebase Firestore provides enterprise-grade security
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0"></span>
                    Session data is automatically purged after 24 hours for guest users
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-medical-green" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Session Information</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• IP address and location</li>
                      <li>• Device and browser information</li>
                      <li>• Session duration and activity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Medical Data</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Uploaded medical documents</li>
                      <li>• AI analysis results</li>
                      <li>• Search and interaction history</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-medical-purple" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Your information is used solely to provide and improve our medical assistance services:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-purple rounded-full mt-2 flex-shrink-0"></span>
                    Provide personalized AI-powered medical analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-purple rounded-full mt-2 flex-shrink-0"></span>
                    Improve our AI models through anonymized data patterns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-purple rounded-full mt-2 flex-shrink-0"></span>
                    Ensure platform security and prevent misuse
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-medical-purple rounded-full mt-2 flex-shrink-0"></span>
                    Provide technical support and troubleshooting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-medical-amber" />
                  Your Rights & Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You have complete control over your data:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg glass border border-white/10">
                    <h4 className="font-semibold text-foreground mb-2">Guest Users</h4>
                    <p className="text-sm text-muted-foreground">
                      Data automatically deleted after 24 hours. No permanent storage without consent.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg glass border border-white/10">
                    <h4 className="font-semibold text-foreground mb-2">Registered Users</h4>
                    <p className="text-sm text-muted-foreground">
                      Full control to export, modify, or delete all personal data at any time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-medical-red" />
                  Data Sharing & Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ We DO NOT share your medical data
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your personal medical information is never sold, shared, or disclosed to third parties without your explicit consent.
                  </p>
                </div>
                <p className="text-muted-foreground text-sm">
                  We only use trusted partners for essential services (Firebase for hosting, Gemini AI for analysis) 
                  who comply with strict data protection standards and medical privacy regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Contact & Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this privacy policy or your data, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-medical-gradient hover:opacity-90 text-white"
                  >
                    Return to Homepage
                  </Button>
                  <Button variant="outline" className="glass border-white/20">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-muted-foreground">
              Last updated: June 1, 2025 | MediBee Privacy Policy v2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
