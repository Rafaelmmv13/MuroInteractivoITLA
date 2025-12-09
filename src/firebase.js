import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAA60rF8D-btaimeXfac1K4gUuggq0mAiQ",
  authDomain: "murointeractivoitla.firebaseapp.com",
  projectId: "murointeractivoitla",
  storageBucket: "murointeractivoitla.firebasestorage.app",
  messagingSenderId: "211847350354",
  appId: "1:211847350354:web:9807d8a49ae0d6b8dbb78b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);