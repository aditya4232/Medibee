// Temporary user data storage utilities
export interface UserData {
  id: string;
  email: string;
  name?: string;
  loginTime: string;
  sessionId: string;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: 'en' | 'hi';
  };
  healthData?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
  };
}

export interface SessionData {
  ipAddress: string;
  location: string;
  timestamp: string;
  sessionId: string;
  userAgent?: string;
}

export const userStorage = {
  // User data methods
  setUser: (userData: UserData) => {
    localStorage.setItem('medibee_user', JSON.stringify(userData));
  },

  getUser: (): UserData | null => {
    const stored = localStorage.getItem('medibee_user');
    return stored ? JSON.parse(stored) : null;
  },

  updateUser: (updates: Partial<UserData>) => {
    const current = userStorage.getUser();
    if (current) {
      const updated = { ...current, ...updates };
      userStorage.setUser(updated);
      return updated;
    }
    return null;
  },

  clearUser: () => {
    localStorage.removeItem('medibee_user');
  },

  // Session data methods
  setSession: (sessionData: SessionData) => {
    localStorage.setItem('medibee_session', JSON.stringify(sessionData));
  },

  getSession: (): SessionData | null => {
    const stored = localStorage.getItem('medibee_session');
    return stored ? JSON.parse(stored) : null;
  },

  clearSession: () => {
    localStorage.removeItem('medibee_session');
  },

  // Health data methods
  updateHealthData: (healthData: UserData['healthData']) => {
    const user = userStorage.getUser();
    if (user) {
      user.healthData = { ...user.healthData, ...healthData };
      userStorage.setUser(user);
    }
  },

  // Temporary storage for uploaded files
  setUploadedFiles: (files: Array<{ name: string; type: string; size: number; timestamp: string }>) => {
    sessionStorage.setItem('medibee_uploaded_files', JSON.stringify(files));
  },

  getUploadedFiles: () => {
    const stored = sessionStorage.getItem('medibee_uploaded_files');
    return stored ? JSON.parse(stored) : [];
  },

  // Clear all temporary data
  clearAllData: () => {
    localStorage.removeItem('medibee_user');
    localStorage.removeItem('medibee_session');
    localStorage.removeItem('medibee_ip_popup_seen');
    sessionStorage.removeItem('medibee_uploaded_files');
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    const user = userStorage.getUser();
    return user !== null;
  },

  // Get session duration
  getSessionDuration: (): number => {
    const session = userStorage.getSession();
    if (session) {
      const startTime = new Date(session.timestamp).getTime();
      const currentTime = new Date().getTime();
      return Math.floor((currentTime - startTime) / 1000 / 60); // in minutes
    }
    return 0;
  }
};

// Auto-cleanup on window close
window.addEventListener('beforeunload', () => {
  // Keep user data but clear session data
  userStorage.clearSession();
  sessionStorage.clear();
});
