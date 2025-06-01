import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from './SessionProvider';
import LoadingSpinner from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Home, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSession?: boolean;
  redirectToHome?: boolean; // Whether to redirect to home or show session prompt on current page
}

const ProtectedRoute = ({ children, requireSession = false, redirectToHome = true }: ProtectedRouteProps) => {
  const { hasActiveSession, isLoading, triggerSessionStart } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If session is required and we don't have one, handle redirect
    if (requireSession && !isLoading && !hasActiveSession) {
      if (redirectToHome) {
        // Redirect to homepage and trigger session popup
        console.log('ProtectedRoute: Redirecting to homepage for session start');
        navigate('/', { replace: true });
        // Small delay to ensure navigation completes before triggering popup
        setTimeout(() => {
          triggerSessionStart();
        }, 100);
      } else {
        // Just trigger session popup on current page
        console.log('ProtectedRoute: Triggering session popup on current page');
        triggerSessionStart();
      }
    }
  }, [hasActiveSession, isLoading, requireSession, triggerSessionStart, navigate, redirectToHome]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking session..." />
      </div>
    );
  }

  // If session is required but not found and we're not redirecting to home, show session prompt
  if (requireSession && !hasActiveSession && !redirectToHome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="glass p-8 rounded-3xl border border-white/20">
            <LogIn className="w-16 h-16 mx-auto mb-6 text-medical-blue" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Session Required</h2>
            <p className="text-muted-foreground mb-8">
              You need an active session to access this page. Start a session to continue your medical journey.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => triggerSessionStart(), 100);
                }}
                className="w-full bg-medical-gradient text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Start Session
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full glass border-white/20"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
