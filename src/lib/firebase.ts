
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // These are public configuration values - safe to include in frontend
  apiKey: "demo-api-key",
  authDomain: "medibee-demo.firebaseapp.com", 
  projectId: "medibee-demo",
  storageBucket: "medibee-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
