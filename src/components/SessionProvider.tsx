
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SessionData {
  sessionId: string;
  ipAddress: string;
  deviceInfo: string;
  location: string;
  startTime: string;
  visitedPages: string[];
  userData: {
    medicalRecords: any[];
    searchHistory: string[];
    userName?: string;
  };
  isActive: boolean;
}

interface SessionContextType {
  session: SessionData | null;
  hasActiveSession: boolean;
  startSession: (ipData: any, deviceData: any) => Promise<void>;
  updateUserData: (data: any) => Promise<void>;
  addMedicalRecord: (record: any) => Promise<void>;
  addSearchQuery: (query: string) => Promise<void>;
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
    // Track visited pages only if session exists
    if (session && hasActiveSession) {
      const currentPages = Array.isArray(session.visitedPages) ? session.visitedPages : [];
      const updatedSession = {
        ...session,
        visitedPages: [...new Set([...currentPages, location.pathname])]
      };
      setSession(updatedSession);
      updateSessionInFirebase(updatedSession);
    }
  }, [location.pathname, session, hasActiveSession]);

  const loadSession = async (sessionId: string) => {
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data() as SessionData;
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

  const startSession = async (ipData: any, deviceData: any) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const sessionData: SessionData = {
      sessionId,
      ipAddress: ipData.ip,
      location: ipData.location,
      deviceInfo: `${deviceData.type} - ${deviceData.browser}`,
      startTime: new Date().toISOString(),
      visitedPages: ['/'],
      userData: {
        medicalRecords: [],
        searchHistory: []
      },
      isActive: true
    };

    try {
      await setDoc(doc(db, 'sessions', sessionId), sessionData);
      localStorage.setItem('medibee_session_id', sessionId);
      setSession(sessionData);
      setHasActiveSession(true);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const updateSessionInFirebase = async (sessionData: SessionData) => {
    try {
      await updateDoc(doc(db, 'sessions', sessionData.sessionId), sessionData);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  };

  const updateUserData = async (data: any) => {
    if (session) {
      const updatedSession = {
        ...session,
        userData: { ...session.userData, ...data }
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
    }
  };

  const addMedicalRecord = async (record: any) => {
    if (session) {
      const updatedRecords = [...session.userData.medicalRecords, { ...record, id: Date.now(), timestamp: new Date().toISOString() }];
      const updatedSession = {
        ...session,
        userData: { ...session.userData, medicalRecords: updatedRecords }
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
    }
  };

  const addSearchQuery = async (query: string) => {
    if (session) {
      const updatedHistory = [...session.userData.searchHistory, query];
      const updatedSession = {
        ...session,
        userData: { ...session.userData, searchHistory: updatedHistory }
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
    }
  };

  const updateUserName = async (name: string) => {
    if (session) {
      const updatedSession = {
        ...session,
        userData: { ...session.userData, userName: name }
      };
      setSession(updatedSession);
      await updateSessionInFirebase(updatedSession);
    }
  };

  const endSession = () => {
    localStorage.removeItem('medibee_session_id');
    setSession(null);
    setHasActiveSession(false);
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

  return (
    <SessionContext.Provider value={{
      session,
      hasActiveSession,
      startSession,
      updateUserData,
      addMedicalRecord,
      addSearchQuery,
      endSession,
      shareSession,
      updateUserName
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
