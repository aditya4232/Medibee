
import { motion } from 'framer-motion';
import { Upload, Brain, Microscope, MessageCircle, Heart, Activity, Search, Scan } from 'lucide-react';
import Hero from '@/components/Hero';
import HealthMetrics from '@/components/HealthMetrics';
import MediBeeChat from '@/components/MediBeeChat';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import DNABackground from '@/components/DNABackground';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import MedicalHurdlesIndia from '@/components/MedicalHurdlesIndia';
import WorkingSection from '@/components/WorkingSection';
import AimSection from '@/components/AimSection';
import AboutProject from '@/components/AboutProject';
import AboutDeveloper from '@/components/AboutDeveloper';
import SessionActions from '@/components/SessionActions';
import SessionPopup from '@/components/SessionPopup';
import SessionIndicator from '@/components/SessionIndicator';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import { useSession } from '@/components/SessionProvider';

const Index = () => {
  const { hasActiveSession } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />
      <SessionPopup />
      <SessionIndicator />
      <Hero />

      {/* Show session actions only when user has active session */}
      {hasActiveSession && <SessionActions />}

      {/* Only show static content when no active session */}
      {!hasActiveSession && (
        <>
          <AboutSection />
          <WorkingSection />
          <AimSection />
          <MedicalHurdlesIndia />
          <AboutProject />
          <AboutDeveloper />
          <MedicalDisclaimer />
        </>
      )}

      {/* Show health metrics only with active session and data */}
      {hasActiveSession && (
        <section className="relative z-10 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Your Health Dashboard
              </h2>
              <p className="text-xl text-muted-foreground">
                AI-powered insights from your medical data
              </p>
            </motion.div>
            
            <HealthMetrics />
          </div>
        </section>
      )}

      {/* Features Section - Always show */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Gemini AI integration for comprehensive medical assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Medical Analysis",
                description: "Advanced AI interprets your medical reports and provides easy-to-understand explanations",
                color: "text-medical-blue"
              },
              {
                icon: Microscope,
                title: "Image Recognition",
                description: "Upload medicine photos and get instant information about usage, dosage, and effects",
                color: "text-medical-green"
              },
              {
                icon: MessageCircle,
                title: "Hinglish Support",
                description: "Get medical guidance in both English and Hinglish for better understanding",
                color: "text-medical-purple"
              },
              {
                icon: Heart,
                title: "Health Monitoring",
                description: "Track vital signs and health metrics with personalized recommendations",
                color: "text-medical-amber"
              },
              {
                icon: Upload,
                title: "Secure Storage",
                description: "Your medical data is encrypted and stored securely with Firebase",
                color: "text-medical-green"
              },
              {
                icon: Activity,
                title: "Real-time Insights",
                description: "Get instant analysis and alerts for any concerning health patterns",
                color: "text-medical-red"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-8 rounded-2xl group hover:shadow-glass transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.color} bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform medical-glow`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust MediBee for their medical needs
            </p>
            {!hasActiveSession && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-medical-gradient text-white rounded-xl font-semibold shadow-neon-blue hover:shadow-lg transition-all"
              >
                Start Your Health Journey
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      <MediBeeChat />
    </div>
  );
};

export default Index;
