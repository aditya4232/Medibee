
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">M</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">MediBee</h3>
                  <p className="text-sm text-muted-foreground">Your Medical Assistant</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Simplifying medicine usage and medical jargon with AI-powered insights. 
                Get personalized health guidance in simple, understandable language.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <div className="space-y-2">
                <a href="/" className="block text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                  Home
                </a>
                <a href="/dashboard" className="block text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                  Dashboard
                </a>
                <a href="/analysis" className="block text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                  AI Analysis
                </a>
                <a href="/reports" className="block text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                  Medical Reports
                </a>
                <a href="/privacy" className="block text-sm text-muted-foreground hover:text-medical-blue transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Developer Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-medical-blue" />
                  <span className="text-sm text-muted-foreground">adityashenvi@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/adityashenvi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href="https://twitter.com/adityashenvi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href="https://linkedin.com/in/adityashenvi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-medical-blue transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 animate-pulse" />
                <span>by Aditya Shenvi</span>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2025 MediBee. All rights reserved.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
