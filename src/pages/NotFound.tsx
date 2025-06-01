
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DNABackground from '@/components/DNABackground';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DNABackground />
      <ThemeSwitcher />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="glass border-white/20 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-medical-blue to-medical-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              
              <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Page Not Found
              </h2>
              
              <p className="text-muted-foreground mb-8">
                The medical page you're looking for seems to have gone for a checkup. 
                Let's get you back to safety!
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/')}
                  className="w-full bg-medical-gradient hover:opacity-90 text-white"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Button>
                
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full glass border-white/20"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>

                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="w-full glass border-white/20"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Visit Dashboard
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-muted-foreground">
                  Need help? Our medical assistant is always available on the homepage.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
