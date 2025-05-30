
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UserActivity {
  timestamp: string;
  action: string;
  page: string;
  details?: any;
}

interface SessionData {
  sessionId: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  startTime: string;
  visitedPages: string[];
  userActivities: UserActivity[];
  userData: {
    medicalRecords: any[];
    searchHistory: string[];
    userName?: string;
    preferences?: any;
  };
  isActive: boolean;
  lastActivity: string;
}

interface SessionContextType {
  session: SessionData | null;
  hasActiveSession: boolean;
  startSession: (ipData: any, deviceData: any, userName?: string) => Promise<void>;
  updateUserData: (data: any) => Promise<void>;
  addMedicalRecord: (record: any) => Promise<void>;
  addSearchQuery: (query: string) => Promise<void>;
  trackActivity: (action: string, details?: any) => Promise<void>;
  endSession: () => void;
  shareSession: () => string;
  updateUserName: (name: string) => Promise<void>;
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
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for existing session
    const existingSessionId = localStorage.getItem('medibee_session_id');
    if (existingSessionId) {
      loadSession(existingSessionId);
    }
  }, []);

  useEffect(() => {
    // Track page visits and user activity
    if (session && hasActiveSession) {
      const currentPages = Array.isArray(session.visitedPages) ? session.visitedPages : [];
      const updatedSession = {
        ...session,
        visitedPages: [...new Set([...currentPages, location.pathname])],
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      updateSessionInFirebase(updatedSession);
      
      // Track page visit activity
      trackActivity('page_visit', { pathname: location.pathname });
    }
  }, [location.pathname, session, hasActiveSession]);

  const loadSession = async (sessionId: string) => {
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data() as SessionData;
        if (!Array.isArray(sessionData.visitedPages)) {
          sessionData.visitedPages = [];
        }
        if (!Array.isArray(sessionData.userActivities)) {
          sessionData.userActivities = [];
        }
        setSession(sessionData);
        setHasActiveSession(true);
      } else {
        localStorage.removeItem('medibee_session_id');
      }
    } catch (error) {
      console.error('Error loading session:', error);
      localStorage.removeItem('medibee_session_id');
    }
  };

  const startSession = async (ipData: any, deviceData: any, userName?: string) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const sessionData: SessionData = {
      sessionId,
      ipAddress: ipData.ip,
      location: ipData.location,
      deviceInfo: `${deviceData.type} - ${deviceData.browser}`,
      startTime: new Date().toISOString(),
      visitedPages: ['/'],
      userActivities: [{
        timestamp: new Date().toISOString(),
        action: 'session_started',
        page: '/',
        details: { userName: userName || 'Guest User' }
      }],
      userData: {
        medicalRecords: [],
        searchHistory: [],
        userName: userName || 'Guest User',
        preferences: {}
      },
      isActive: true,
      lastActivity: new Date().toISOString()
    };

    try {
      const sessionForFirebase = {
        ...sessionData
      };
      
      await setDoc(doc(db, 'sessions', sessionId), sessionForFirebase);
      localStorage.setItem('medibee_session_id', sessionId);
      setSession(sessionData);
      setHasActiveSession(true);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const updateSessionInFirebase = async (sessionData: SessionData) => {
    try {
      await updateDoc(doc(db, 'sessions', sessionData.sessionId), {
        ...sessionData,
        lastActivity: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const trackActivity = async (action: string, details?: any) => {
    if (session) {
      const activity: UserActivity = {
        timestamp: new Date().toISOString(),
        action,
        page: location.pathname,
        details
      };
      
      const updatedActivities = [...(session.userActivities || []), activity];
      const updatedSession = {
        ...session,
        userActivities: updatedActivities,
        lastActivity: new Date().toISOString()
      };
      
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
    }
  };

  const updateUserData = async (data: any) => {
    if (session) {
      const updatedSession = {
        ...session,
        userData: { ...session.userData, ...data },
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
      await trackActivity('user_data_updated', data);
    }
  };

  const addMedicalRecord = async (record: any) => {
    if (session) {
      const updatedRecords = [...session.userData.medicalRecords, { 
        ...record, 
        id: Date.now(), 
        timestamp: new Date().toISOString() 
      }];
      const updatedSession = {
        ...session,
        userData: { ...session.userData, medicalRecords: updatedRecords },
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
      await trackActivity('medical_record_added', record);
    }
  };

  const addSearchQuery = async (query: string) => {
    if (session) {
      const updatedHistory = [...session.userData.searchHistory, query];
      const updatedSession = {
        ...session,
        userData: { ...session.userData, searchHistory: updatedHistory },
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
      await trackActivity('search_performed', { query });
    }
  };

  const updateUserName = async (name: string) => {
    if (session) {
      const updatedSession = {
        ...session,
        userData: { ...session.userData, userName: name },
        lastActivity: new Date().toISOString()
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
      await trackActivity('username_updated', { name });
    }
  };

  const endSession = () => {
    if (session) {
      trackActivity('session_ended');
    }
    localStorage.removeItem('medibee_session_id');
    setSession(null);
    setHasActiveSession(false);
    navigate('/');
  };

  const shareSession = () => {
    if (session) {
      const sessionLink = `${window.location.origin}?session=${session.sessionId}`;
      navigator.clipboard.writeText(sessionLink);
      trackActivity('session_shared');
      return sessionLink;
    }
    return '';
  };

  return (
    <SessionContext.Provider value={{
      session,
      hasActiveSession,
      startSession,
      updateUserData,
      addMedicalRecord,
      addSearchQuery,
      trackActivity,
      endSession,
      shareSession,
      updateUserName
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
