import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG, ENVIRONMENT } from '../config';

const app = initializeApp(FIREBASE_CONFIG);

export const db = getFirestore(app);
export const auth = getAuth(app);

if (ENVIRONMENT === 'development') {
  connectAuthEmulator(auth, `http://localhost:9099`);
  connectFirestoreEmulator(db, 'localhost', 8080);
}
