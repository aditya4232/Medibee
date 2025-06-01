
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
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
    isPermanentUser?: boolean;
    email?: string;
    displayName?: string;
  };
  isActive: boolean;
  lastActivity: string;
}

interface SessionContextType {
  session: SessionData | null;
  hasActiveSession: boolean;
  showSessionPopup: boolean;
  triggerSessionStart: () => void;
  startSession: (ipData: any, deviceData: any, userName?: string) => Promise<void>;
  updateUserData: (data: any) => Promise<void>;
  addMedicalRecord: (record: any) => Promise<void>;
  addSearchQuery: (query: string) => Promise<void>;
  trackActivity: (action: string, details?: any) => Promise<void>;
  endSession: () => void;
  shareSession: () => string;
  updateUserName: (name: string) => Promise<void>;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    return {
      session: null,
      hasActiveSession: false,
      showSessionPopup: false,
      triggerSessionStart: () => {},
      startSession: async () => {},
      updateUserData: async () => {},
      addMedicalRecord: async () => {},
      addSearchQuery: async () => {},
      trackActivity: async () => {},
      endSession: () => {},
      shareSession: () => '',
      updateUserName: async () => {},
      isLoading: true
    };
  }
  return context;
}

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastTrackedPage = useRef<string>('');

  const triggerSessionStart = () => {
    if (!hasActiveSession) {
      setShowSessionPopup(true);
    }
  };

  useEffect(() => {
    const initializeSession = async () => {
      try {
        console.log('MediBee: Initializing session system...');
        
        const existingSessionId = localStorage.getItem('medibee_session_id');

        if (existingSessionId) {
          console.log('MediBee: Found existing session, validating...');
          await loadSession(existingSessionId);
        } else {
          console.log('MediBee: No existing session found');
          // Show popup automatically on homepage if no session
          if (location.pathname === '/') {
            setTimeout(() => {
              setShowSessionPopup(true);
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, [location.pathname]);

  const loadSession = async (sessionId: string) => {
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data() as SessionData;

        const sessionStart = new Date(sessionData.startTime);
        const now = new Date();
        const sessionAge = now.getTime() - sessionStart.getTime();
        const sevenHours = 7 * 60 * 60 * 1000;

        if (sessionData.sessionId !== sessionId) {
          localStorage.removeItem('medibee_session_id');
          return;
        }

        if (sessionAge > sevenHours && !sessionData.userData?.isPermanentUser) {
          localStorage.removeItem('medibee_session_id');
          return;
        }

        if (!Array.isArray(sessionData.visitedPages)) {
          sessionData.visitedPages = [];
        }
        if (!Array.isArray(sessionData.userActivities)) {
          sessionData.userActivities = [];
        }

        sessionData.lastActivity = new Date().toISOString();

        setSession(sessionData);
        setHasActiveSession(true);

        updateSessionInFirebase(sessionData).catch(console.error);
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
    const isPermanentUser = userName?.includes('@') || false;
    
    const sessionData: SessionData = {
      sessionId,
      ipAddress: ipData.ip,
      location: ipData.location,
      deviceInfo: `${deviceData.type} - ${deviceData.browser}`,
      startTime: new Date().toISOString(),
      visitedPages: [location.pathname],
      userActivities: [{
        timestamp: new Date().toISOString(),
        action: 'session_started',
        page: location.pathname,
        details: { 
          userName: userName || 'Guest User',
          userType: isPermanentUser ? 'permanent' : 'guest',
          device: deviceData,
          location: ipData
        }
      }],
      userData: {
        medicalRecords: [],
        searchHistory: [],
        userName: userName || 'Guest User',
        preferences: {},
        isPermanentUser
      },
      isActive: true,
      lastActivity: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'sessions', sessionId), sessionData);
      localStorage.setItem('medibee_session_id', sessionId);
      
      setSession(sessionData);
      setHasActiveSession(true);
      setShowSessionPopup(false);

      console.log('MediBee: Session created successfully:', sessionId);
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
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

      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedActivities = [...(prevSession.userActivities || []), activity];
        const updatedSession = {
          ...prevSession,
          userActivities: updatedActivities,
          lastActivity: new Date().toISOString()
        };

        updateSessionInFirebase(updatedSession).catch(console.error);
        return updatedSession;
      });
    }
  };

  const updateUserData = async (data: any) => {
    if (session) {
      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedSession = {
          ...prevSession,
          userData: { ...prevSession.userData, ...data },
          lastActivity: new Date().toISOString()
        };

        updateSessionInFirebase(updatedSession).catch(console.error);
        return updatedSession;
      });

      await trackActivity('user_data_updated', data);
    }
  };

  const addMedicalRecord = async (record: any) => {
    if (session) {
      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedRecords = [...prevSession.userData.medicalRecords, {
          ...record,
          id: Date.now(),
          timestamp: new Date().toISOString()
        }];
        const updatedSession = {
          ...prevSession,
          userData: { ...prevSession.userData, medicalRecords: updatedRecords },
          lastActivity: new Date().toISOString()
        };

        updateSessionInFirebase(updatedSession).catch(console.error);
        return updatedSession;
      });

      await trackActivity('medical_record_added', record);
    }
  };

  const addSearchQuery = async (query: string) => {
    if (session) {
      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedHistory = [...prevSession.userData.searchHistory, query];
        const updatedSession = {
          ...prevSession,
          userData: { ...prevSession.userData, searchHistory: updatedHistory },
          lastActivity: new Date().toISOString()
        };

        updateSessionInFirebase(updatedSession).catch(console.error);
        return updatedSession;
      });

      await trackActivity('search_performed', { query });
    }
  };

  const updateUserName = async (name: string) => {
    if (session) {
      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedSession = {
          ...prevSession,
          userData: { ...prevSession.userData, userName: name },
          lastActivity: new Date().toISOString()
        };

        updateSessionInFirebase(updatedSession).catch(console.error);
        return updatedSession;
      });

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
      showSessionPopup,
      triggerSessionStart,
      startSession,
      updateUserData,
      addMedicalRecord,
      addSearchQuery,
      trackActivity,
      endSession,
      shareSession,
      updateUserName,
      isLoading
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
