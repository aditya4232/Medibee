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

// Export useSession hook separately to fix HMR issues
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    // Return a default state instead of throwing an error
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
    // Initialize session state
    const initializeSession = async () => {
      try {
        // Log app initialization
        console.log('MediBee: Initializing session system...');
        
        const existingSessionId = localStorage.getItem('medibee_session_id');

        if (existingSessionId) {
          console.log('MediBee: Found existing session, validating...');
          await loadSession(existingSessionId);
        } else {
          console.log('MediBee: No existing session found');
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        // Log error to Firebase for monitoring
        await logSystemEvent('session_init_error', { error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  // Enhanced page tracking with security monitoring
  useEffect(() => {
    if (session && hasActiveSession && !isLoading && location.pathname !== lastTrackedPage.current) {
      lastTrackedPage.current = location.pathname;

      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const currentPages = Array.isArray(prevSession.visitedPages) ? prevSession.visitedPages : [];

        if (!currentPages.includes(location.pathname)) {
          const updatedSession = {
            ...prevSession,
            visitedPages: [...currentPages, location.pathname],
            lastActivity: new Date().toISOString()
          };

          // Enhanced Firebase logging with security context
          updateSessionInFirebase(updatedSession).catch(console.error);
          
          // Log page access for security monitoring
          logSecurityEvent('page_access', {
            sessionId: prevSession.sessionId,
            path: location.pathname,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
          });

          return updatedSession;
        }

        return prevSession;
      });
    }
  }, [location.pathname, hasActiveSession, isLoading]);

  // System event logging for monitoring
  const logSystemEvent = async (event: string, data: any) => {
    try {
      await setDoc(doc(db, 'system_logs', `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`), {
        event,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    } catch (error) {
      console.error('Failed to log system event:', error);
    }
  };

  // Security event logging
  const logSecurityEvent = async (event: string, data: any) => {
    try {
      await setDoc(doc(db, 'security_logs', `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`), {
        event,
        data,
        timestamp: new Date().toISOString(),
        ip: 'client-side', // IP will be logged server-side in production
        userAgent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const loadSession = async (sessionId: string) => {
    try {
      const sessionDoc = await getDoc(doc(db, 'sessions', sessionId));
      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data() as SessionData;

        // Enhanced session validation with security checks
        const sessionStart = new Date(sessionData.startTime);
        const now = new Date();
        const sessionAge = now.getTime() - sessionStart.getTime();
        const sevenHours = 7 * 60 * 60 * 1000;

        // Check for session tampering
        if (sessionData.sessionId !== sessionId) {
          await logSecurityEvent('session_id_mismatch', { 
            expectedId: sessionId, 
            actualId: sessionData.sessionId 
          });
          localStorage.removeItem('medibee_session_id');
          return;
        }

        // Session expiry logic
        if (sessionAge > sevenHours && !sessionData.userData?.isPermanentUser) {
          await logSystemEvent('session_expired', { 
            sessionId, 
            age: sessionAge, 
            isPermanent: sessionData.userData?.isPermanentUser 
          });
          localStorage.removeItem('medibee_session_id');
          return;
        }

        // Ensure arrays exist
        if (!Array.isArray(sessionData.visitedPages)) {
          sessionData.visitedPages = [];
        }
        if (!Array.isArray(sessionData.userActivities)) {
          sessionData.userActivities = [];
        }

        // Update session activity
        sessionData.lastActivity = new Date().toISOString();

        setSession(sessionData);
        setHasActiveSession(true);

        // Log successful session restoration
        await logSystemEvent('session_restored', {
          sessionId,
          userType: sessionData.userData?.isPermanentUser ? 'permanent' : 'guest',
          duration: sessionAge
        });

        updateSessionInFirebase(sessionData).catch(console.error);
      } else {
        localStorage.removeItem('medibee_session_id');
        await logSystemEvent('session_not_found', { sessionId });
      }
    } catch (error) {
      console.error('Error loading session:', error);
      localStorage.removeItem('medibee_session_id');
      await logSystemEvent('session_load_error', { sessionId, error: error.message });
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
      visitedPages: ['/'],
      userActivities: [{
        timestamp: new Date().toISOString(),
        action: 'session_started',
        page: '/',
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
      // Enhanced session creation with security logging
      await setDoc(doc(db, 'sessions', sessionId), sessionData);
      localStorage.setItem('medibee_session_id', sessionId);
      
      setSession(sessionData);
      setHasActiveSession(true);
      setShowSessionPopup(false);

      // Log session creation
      await logSystemEvent('session_created', {
        sessionId,
        userType: isPermanentUser ? 'permanent' : 'guest',
        device: deviceData,
        location: ipData
      });

      console.log('MediBee: Session created successfully:', sessionId);
    } catch (error) {
      console.error('Error starting session:', error);
      await logSystemEvent('session_creation_error', { error: error.message });
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

      // Use functional update to avoid dependency on session state
      setSession(prevSession => {
        if (!prevSession) return prevSession;

        const updatedActivities = [...(prevSession.userActivities || []), activity];
        const updatedSession = {
          ...prevSession,
          userActivities: updatedActivities,
          lastActivity: new Date().toISOString()
        };

        // Update Firebase asynchronously without waiting
        updateSessionInFirebase(updatedSession).catch(console.error);

        return updatedSession;
      });

      // Enhanced activity logging for AI training data
      if (action.includes('medical') || action.includes('search') || action.includes('upload')) {
        await logSystemEvent('medical_activity', {
          sessionId: session.sessionId,
          action,
          details,
          timestamp: new Date().toISOString()
        });
      }
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
