import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.addScope('email');
googleProvider.addScope('profile');

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  lastLogin: string;
  isPermanentUser: boolean;
  medicalRecords: any[];
  searchHistory: string[];
  preferences: any;
}

/**
 * Sign in with Google
 */
export const signInWithGoogle = async (): Promise<UserData | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    if (user) {
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || undefined,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isPermanentUser: true,
        medicalRecords: [],
        searchHistory: [],
        preferences: {}
      };

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(doc(db, 'users', user.uid), userData);
      } else {
        // Update last login
        await setDoc(doc(db, 'users', user.uid), {
          ...userDoc.data(),
          lastLogin: new Date().toISOString()
        }, { merge: true });
      }

      return userData;
    }
    
    return null;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Sign out user
 */
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Get user data from Firestore
 */
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Update user data in Firestore
 */
export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export { auth };
