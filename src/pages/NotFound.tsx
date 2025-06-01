import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { Home, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Navigation from '@/components/Navigation';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
            className="text-center"
          >
            <Card className="glass border-white/20 p-12">
              <CardContent className="space-y-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="w-24 h-24 bg-medical-gradient rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <AlertTriangle className="w-12 h-12 text-white" />
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-foreground">404</h1>
                    <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    onClick={() => navigate('/')}
                    className="bg-medical-gradient hover:opacity-90 text-white px-8 py-3"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>

                  <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="glass border-white/20 px-8 py-3"
                  >
                    Go Back
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-muted-foreground"
                >
                  <p>Attempted to access: <code className="bg-white/10 px-2 py-1 rounded">{location.pathname}</code></p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
