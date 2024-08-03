import serviceAccount from '../../firebase-service-key.json';
import { credential } from 'firebase-admin';
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'hopeisapp.firebaseapp.com',
  projectId: 'hopeisapp',
  storageBucket: 'hopeisapp.appspot.com',
  messagingSenderId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: 'G-ELGXH8ZP63',
  credential: credential.cert(serviceAccount),
};
