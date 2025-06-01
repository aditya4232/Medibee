
import { useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from './SessionProvider';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SessionGuardProps {
  children: ReactNode;
  requireSession?: boolean;
  allowedPaths?: string[];
}

const SessionGuard = ({ 
  children, 
  requireSession = true, 
  allowedPaths = ['/'] 
}: SessionGuardProps) => {
  const { hasActiveSession, isLoading, triggerSessionStart } = useSession();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`SessionGuard: Access attempt to ${location.pathname}, session: ${hasActiveSession}`);
    
    if (!isLoading && requireSession && !hasActiveSession) {
      console.warn(`Unauthorized access attempt to ${location.pathname}`);
      
      if (!allowedPaths.includes(location.pathname)) {
        navigate('/', { replace: true });
      }
    }
  }, [hasActiveSession, isLoading, location.pathname, requireSession, allowedPaths, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Securing your session..." />
      </div>
    );
  }

  if (requireSession && !hasActiveSession && !allowedPaths.includes(location.pathname)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <Card className="glass border-white/20 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Session Required
              </h2>
              
              <p className="text-muted-foreground mb-6">
                This page requires an active medical session for your safety and privacy. 
                Please start a session to continue.
              </p>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Medical data requires secure session handling
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    navigate('/');
                    setTimeout(triggerSessionStart, 100);
                  }}
                  className="w-full bg-medical-gradient hover:opacity-90 text-white"
                >
                  Start Medical Session
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full glass border-white/20"
                >
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SessionGuard;
