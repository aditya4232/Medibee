import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';

interface UseSessionRedirectOptions {
  requireSession?: boolean;
  redirectToHome?: boolean;
  allowedPaths?: string[];
}

/**
 * Custom hook for handling session-based redirects
 * @param options Configuration options for redirect behavior
 */
export const useSessionRedirect = (options: UseSessionRedirectOptions = {}) => {
  const {
    requireSession = false,
    redirectToHome = true,
    allowedPaths = ['/']
  } = options;

  const { hasActiveSession, isLoading, triggerSessionStart } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    // If session is required but not present
    if (requireSession && !hasActiveSession) {
      if (redirectToHome) {
        console.log('useSessionRedirect: Redirecting to homepage for session start');
        navigate('/', { replace: true });
        setTimeout(() => triggerSessionStart(), 100);
      } else {
        console.log('useSessionRedirect: Triggering session popup');
        triggerSessionStart();
      }
      return;
    }

    // If user has session but is on a non-allowed path, redirect to dashboard
    if (hasActiveSession && !allowedPaths.includes(location.pathname)) {
      const protectedPaths = ['/dashboard', '/analysis', '/reports'];
      if (!protectedPaths.includes(location.pathname)) {
        console.log('useSessionRedirect: User has session, redirecting to dashboard');
        navigate('/dashboard', { replace: true });
      }
    }
  }, [
    hasActiveSession,
    isLoading,
    requireSession,
    redirectToHome,
    location.pathname,
    allowedPaths,
    navigate,
    triggerSessionStart
  ]);

  return {
    hasActiveSession,
    isLoading,
    shouldShowContent: !requireSession || hasActiveSession
  };
};

/**
 * Hook specifically for protected routes that require a session
 */
export const useProtectedRoute = () => {
  return useSessionRedirect({
    requireSession: true,
    redirectToHome: true
  });
};

/**
 * Hook for public routes that should redirect to dashboard if user has session
 */
export const usePublicRoute = () => {
  return useSessionRedirect({
    requireSession: false,
    redirectToHome: false,
    allowedPaths: ['/']
  });
};
