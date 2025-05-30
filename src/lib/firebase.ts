
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA9TFqP_ZDa24aC1ODt5JTS7SF_6TbW3w",
  authDomain: "medibee-1.firebaseapp.com",
  projectId: "medibee-1",
  storageBucket: "medibee-1.firebasestorage.app",
  messagingSenderId: "334297475626",
  appId: "1:334297475626:web:f0513cffa4fcebe5a8b153",
  measurementId: "G-X1YKVVPDTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;
