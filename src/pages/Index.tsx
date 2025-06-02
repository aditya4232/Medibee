
import { motion } from 'framer-motion';
import { Upload, Brain, Microscope, MessageCircle, Heart, Activity, Search, Scan, Shield, Users, Clock, Star } from 'lucide-react';
import Hero from '@/components/Hero';
import MediBeeChat from '@/components/MediBeeChat';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import DNABackground from '@/components/DNABackground';
import Navigation from '@/components/Navigation';
import SessionActions from '@/components/SessionActions';
import SessionPopup from '@/components/SessionPopup';
import LoadingSpinner from '@/components/LoadingSpinner';
import SessionIndicator from '@/components/SessionIndicator';
import { useSession } from '@/components/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { hasActiveSession, isLoading, triggerSessionStart } = useSession();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading MediBee..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />
      <Navigation />
      <SessionPopup />
      <SessionIndicator />
      <Hero />

      {hasActiveSession && <SessionActions />}

      {/* Quick Access Cards - Show only when user has session */}
      {hasActiveSession && (
        <section className="relative z-10 py-8 sm:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Quick Access</h2>
              <p className="text-base sm:text-lg text-muted-foreground">Jump right into your medical journey</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Dashboard",
                  description: "View your health overview and session data",
                  icon: Activity,
                  color: "text-medical-blue",
                  path: "/dashboard"
                },
                {
                  title: "AI Analysis",
                  description: "Upload and analyze medical reports with AI",
                  icon: Brain,
                  color: "text-medical-purple",
                  path: "/analysis"
                },
                {
                  title: "Reports",
                  description: "Manage your medical records and history",
                  icon: Upload,
                  color: "text-medical-green",
                  path: "/reports"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="glass border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(item.path)}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <item.icon size={24} className="sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Gemini AI integration for comprehensive medical assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Brain,
                title: "AI Medical Analysis",
                description: "Advanced AI interprets your medical reports and provides easy-to-understand explanations",
                color: "text-medical-blue"
              },
              {
                icon: Scan,
                title: "Prescription OCR",
                description: "Upload prescription photos and get instant information about medicines, dosage, and usage",
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
                icon: Shield,
                title: "Secure Storage",
                description: "Your medical data is encrypted and stored securely with Firebase",
                color: "text-medical-green"
              },
              {
                icon: Clock,
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
                className="glass p-6 sm:p-8 rounded-2xl group hover:shadow-glass transition-all duration-300"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 ${feature.color} bg-white/10 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform medical-glow`}>
                  <feature.icon size={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 sm:p-12 rounded-3xl text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Trusted by Healthcare Enthusiasts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-medical-blue mb-2">1000+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Reports Analyzed</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-medical-green mb-2">500+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Active Users</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-medical-purple mb-2">24/7</div>
                <p className="text-muted-foreground text-sm sm:text-base">AI Assistance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass p-8 sm:p-12 rounded-3xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to Transform Your Healthcare?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
              Join thousands of users who trust MediBee for their medical needs
            </p>
            
            {!hasActiveSession ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerSessionStart}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-medical-gradient text-white rounded-xl font-semibold shadow-neon-blue hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Start Your Health Journey
              </motion.button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-medical-gradient text-white rounded-xl font-semibold shadow-neon-blue hover:shadow-lg transition-all text-sm sm:text-base"
                >
                  Go to Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/analysis')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-medical-purple to-medical-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                >
                  Start AI Analysis
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <MediBeeChat />
    </div>
  );
};

export default Index;
