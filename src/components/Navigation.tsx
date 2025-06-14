
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Stethoscope, User, BarChart3, FileText, Activity, Mail, FileCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession } from './SessionProvider';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { hasActiveSession, triggerSessionStart } = useSession();

  const navItems = [
    { name: 'Home', path: '/', icon: Heart },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Terms', path: '/terms', icon: FileCheck },
    { name: 'Privacy', path: '/privacy', icon: Stethoscope },
    { name: 'About Developer', path: '/about-developer', icon: User },
  ];

  const protectedItems = hasActiveSession ? [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Analysis', path: '/analysis', icon: Activity },
    { name: 'Reports', path: '/reports', icon: FileText },
  ] : [];

  const allItems = [...navItems, ...protectedItems];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-8 left-0 right-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">MediBee</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.slice(0, 3).map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ y: -2 }}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-foreground hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              {hasActiveSession && protectedItems.map((item) => (
                <motion.button
                  key={item.path}
                  whileHover={{ y: -2 }}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-foreground hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}

              {!hasActiveSession && (
                <Button
                  onClick={triggerSessionStart}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-4 py-2 rounded-lg font-medium"
                >
                  Get Started
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/20"
            >
              <div className="px-4 py-4 space-y-2">
                {allItems.map((item) => (
                  <motion.button
                    key={item.path}
                    whileHover={{ x: 4 }}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-foreground hover:bg-white/10'
                    }`}
                  >
                    {item.icon && <item.icon size={16} />}
                    {item.name}
                  </motion.button>
                ))}

                {!hasActiveSession && (
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="pt-2 border-t border-white/20"
                  >
                    <Button
                      onClick={() => {
                        triggerSessionStart();
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white py-3 rounded-lg font-medium"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer to prevent content from hiding under fixed nav and disclaimer */}
      <div className="h-32"></div>
    </>
  );
};

export default Navigation;
