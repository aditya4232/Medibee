
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, FileText, Brain, Menu, X, Settings, Shield } from 'lucide-react';
import { useSession } from './SessionProvider';
import SessionSettings from './SessionSettings';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const { session } = useSession();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/analysis', label: 'Analysis', icon: Brain },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass mx-4 mt-4 rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-medical-gradient rounded-xl flex items-center justify-center shadow-neon-blue">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MediBee</h1>
              <p className="text-sm text-muted-foreground">Your Medical Assistant</p>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all backdrop-blur-sm ${
                    isActive 
                      ? 'bg-medical-blue/20 text-medical-blue border border-medical-blue/30' 
                      : 'text-foreground hover:text-medical-blue hover:bg-white/10 border border-transparent hover:border-white/20'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {session && (
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-foreground hover:text-medical-blue transition-colors rounded-lg hover:bg-white/10"
              >
                <Settings size={20} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-medical-blue transition-colors rounded-lg hover:bg-white/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 p-4 backdrop-blur-xl bg-white/5 dark:bg-black/5"
          >
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-medical-blue/20 text-medical-blue border border-medical-blue/30' 
                        : 'text-foreground hover:text-medical-blue hover:bg-white/10 border border-transparent hover:border-white/20'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {session && (
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-foreground hover:text-medical-blue hover:bg-white/10 w-full"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      {showSettings && <SessionSettings onClose={() => setShowSettings(false)} />}
    </>
  );
};

export default Navigation;
