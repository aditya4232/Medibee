import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from './SessionProvider';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { hasActiveSession, isLoading } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !hasActiveSession) {
      navigate('/', { replace: true });
    }
  }, [hasActiveSession, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading session..." />
      </div>
    );
  }

  if (!hasActiveSession) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
