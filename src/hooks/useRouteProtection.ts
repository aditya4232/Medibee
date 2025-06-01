
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '@/components/SessionProvider';

interface RouteProtectionConfig {
  protectedRoutes: string[];
  publicRoutes: string[];
  loginRedirect: string;
  dashboardRedirect: string;
}

const defaultConfig: RouteProtectionConfig = {
  protectedRoutes: ['/dashboard', '/analysis', '/reports'],
  publicRoutes: ['/', '/privacy'],
  loginRedirect: '/',
  dashboardRedirect: '/dashboard'
};

export const useRouteProtection = (config: Partial<RouteProtectionConfig> = {}) => {
  const { hasActiveSession, isLoading, trackActivity } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  
  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    const currentPath = location.pathname;
    const isProtectedRoute = finalConfig.protectedRoutes.includes(currentPath);
    const isPublicRoute = finalConfig.publicRoutes.includes(currentPath);

    // Track route access attempts
    trackActivity('route_access', {
      path: currentPath,
      hasSession: hasActiveSession,
      isProtected: isProtectedRoute,
      timestamp: new Date().toISOString()
    });

    // If user tries to access protected route without session
    if (isProtectedRoute && !hasActiveSession) {
      console.log(`RouteProtection: Redirecting from protected route ${currentPath} to ${finalConfig.loginRedirect}`);
      navigate(finalConfig.loginRedirect, { replace: true });
      return;
    }

    // If user has session but is on public route, suggest dashboard
    if (hasActiveSession && isPublicRoute && currentPath === '/') {
      // Don't auto-redirect, just track the opportunity
      trackActivity('dashboard_available', {
        currentPath,
        suggestedPath: finalConfig.dashboardRedirect
      });
    }
  }, [hasActiveSession, isLoading, location.pathname, navigate, trackActivity, finalConfig]);

  return {
    hasActiveSession,
    isLoading,
    canAccessRoute: (path: string) => {
      const isProtected = finalConfig.protectedRoutes.includes(path);
      return !isProtected || hasActiveSession;
    }
  };
};
