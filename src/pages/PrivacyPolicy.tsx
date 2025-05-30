
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Data Collection",
      content: [
        "We collect only essential information needed to provide our medical assistance services.",
        "Medical records and prescriptions you upload are processed securely.",
        "Session data includes device information and location for security purposes.",
        "No personal identifying information is required to use our basic services."
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "All data is encrypted using industry-standard encryption protocols.",
        "Medical information is stored securely in Firebase with end-to-end encryption.",
        "Session data is automatically deleted after 30 days of inactivity.",
        "We implement strict access controls and security monitoring."
      ]
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: [
        "Your medical data is used solely to provide AI-powered health insights.",
        "We do not sell, rent, or share your personal health information.",
        "Anonymized data may be used to improve our AI models (opt-out available).",
        "You have full control over your data and can delete it anytime."
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Right to access all data we have about you.",
        "Right to correct or update your information.",
        "Right to delete your account and all associated data.",
        "Right to export your medical records in standard formats."
      ]
    },
    {
      icon: Globe,
      title: "International Compliance",
      content: [
        "We comply with GDPR regulations for European users.",
        "Indian users are protected under the Digital Personal Data Protection Act.",
        "We follow HIPAA guidelines for medical data protection.",
        "Regular compliance audits ensure ongoing protection standards."
      ]
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />
      
      <div className="relative z-10 pt-24 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-8">
              <Shield className="w-6 h-6 text-medical-blue" />
              <span className="text-sm font-medium text-foreground">
                Your Privacy Matters
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your medical information. 
              Here's how we handle your data with the highest standards of care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="glass border-white/20 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-medical-gradient rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Our Commitment</h2>
                    <p className="text-muted-foreground">Last updated: January 2025</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  MediBee is built with privacy-first principles. We understand that medical information is highly sensitive, 
                  and we've designed our platform to give you complete control over your data while providing the best 
                  possible AI-powered health insights.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-white/20 hover:shadow-glass transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-foreground">
                      <div className="w-10 h-10 bg-medical-blue/20 rounded-lg flex items-center justify-center">
                        <section.icon className="h-5 w-5 text-medical-blue" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-medical-blue rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="glass border-white/20 bg-gradient-to-r from-medical-blue/5 to-medical-purple/5">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Questions About Your Privacy?
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  We're here to help. Contact our privacy team if you have any questions about how we handle your data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:privacy@medibee.ai"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-medical-gradient text-white rounded-xl font-semibold hover:shadow-neon-blue transition-all"
                  >
                    Contact Privacy Team
                  </a>
                  <a
                    href="#data-request"
                    className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/20 text-foreground rounded-xl font-semibold hover:shadow-glass transition-all"
                  >
                    Request Your Data
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
