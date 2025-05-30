import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Test Firebase connection by writing and reading a test document
 */
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test writing to Firestore
    const testData = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'Firebase connection test'
    };
    
    const docRef = await addDoc(collection(db, 'test'), testData);
    console.log('✅ Successfully wrote test document with ID:', docRef.id);
    
    // Test reading from Firestore
    const querySnapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Successfully read from Firestore. Document count:', querySnapshot.size);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

/**
 * Test session storage functionality
 */
export const testSessionStorage = async (): Promise<boolean> => {
  try {
    console.log('Testing session storage...');
    
    const sessionData = {
      sessionId: `test_session_${Date.now()}`,
      ipAddress: '127.0.0.1',
      location: 'Test Location',
      deviceInfo: 'Test Device',
      startTime: new Date().toISOString(),
      visitedPages: ['/'],
      userActivities: [{
        timestamp: new Date().toISOString(),
        action: 'test_action',
        page: '/',
        details: { test: true }
      }],
      userData: {
        medicalRecords: [],
        searchHistory: [],
        userName: 'Test User',
        preferences: {}
      },
      isActive: true,
      lastActivity: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'sessions'), sessionData);
    console.log('✅ Successfully created test session with ID:', docRef.id);
    
    return true;
  } catch (error) {
    console.error('❌ Session storage test failed:', error);
    return false;
  }
};

/**
 * Run all Firebase tests
 */
export const runFirebaseTests = async (): Promise<void> => {
  console.log('🔥 Starting Firebase tests...');
  
  const connectionTest = await testFirebaseConnection();
  const sessionTest = await testSessionStorage();
  
  if (connectionTest && sessionTest) {
    console.log('🎉 All Firebase tests passed!');
  } else {
    console.log('⚠️ Some Firebase tests failed. Check the logs above.');
  }
};
