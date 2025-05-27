
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
      try {
        const sessionData = JSON.parse(existingSession);
        // Ensure visitedPages is always an array
        if (!Array.isArray(sessionData.visitedPages)) {
          sessionData.visitedPages = [];
        }
        setSession(sessionData);
      } catch (error) {
        console.error('Error parsing session data:', error);
        localStorage.removeItem('medibee_session');
      }
    }
  }, []);

  useEffect(() => {
    // Track visited pages
    if (session) {
      // Ensure visitedPages is an array before spreading
      const currentPages = Array.isArray(session.visitedPages) ? session.visitedPages : [];
      const updatedSession = {
        ...session,
        visitedPages: [...new Set([...currentPages, location.pathname])]
      };
      setSession(updatedSession);
      localStorage.setItem('medibee_session', JSON.stringify(updatedSession));
    }
  }, [location.pathname, session]);

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
