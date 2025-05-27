
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SessionData {
  sessionId: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  startTime: string;
  visitedPages: string[];
  userData: any;
  isActive: boolean;
}

interface SessionContextType {
  session: SessionData | null;
  updateUserData: (data: any) => void;
  endSession: () => void;
  shareSession: () => string;
  saveSessionWithGoogle: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load existing session or create new one
    const existingSession = localStorage.getItem('medibee_session');
    if (existingSession) {
      const sessionData = JSON.parse(existingSession);
      setSession(sessionData);
    }
  }, []);

  useEffect(() => {
    // Track visited pages
    if (session) {
      const updatedSession = {
        ...session,
        visitedPages: [...new Set([...session.visitedPages, location.pathname])]
      };
      setSession(updatedSession);
      localStorage.setItem('medibee_session', JSON.stringify(updatedSession));
    }
  }, [location.pathname]);

  const updateUserData = (data: any) => {
    if (session) {
      const updatedSession = {
        ...session,
        userData: { ...session.userData, ...data }
      };
      setSession(updatedSession);
      localStorage.setItem('medibee_session', JSON.stringify(updatedSession));
    }
  };

  const endSession = () => {
    localStorage.removeItem('medibee_session');
    sessionStorage.clear();
    setSession(null);
    navigate('/');
  };

  const shareSession = () => {
    if (session) {
      const sessionLink = `${window.location.origin}?session=${session.sessionId}`;
      navigator.clipboard.writeText(sessionLink);
      return sessionLink;
    }
    return '';
  };

  const saveSessionWithGoogle = () => {
    // Implement Google OAuth integration
    console.log('Save session with Google');
  };

  return (
    <SessionContext.Provider value={{
      session,
      updateUserData,
      endSession,
      shareSession,
      saveSessionWithGoogle
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
