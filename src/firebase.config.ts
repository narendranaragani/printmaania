// src/firebase.config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Hard-coded Firebase config for reliability in this project
// (You can switch back to process.env once everything is stable.)
const firebaseConfig = {
  apiKey: "AIzaSyDKRnCeRCwAevqsRF-wweyTu-gQnPIjEmg",
  authDomain: "printmaania-3b9be.firebaseapp.com",
  projectId: "printmaania-3b9be",
  storageBucket: "printmaania-3b9be.appspot.com",
  messagingSenderId: "53082590456",
  appId: "1:53082590456:web:694a8cd0d93551ffe27f0d",
  measurementId: "G-5PKVSRCJSR",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

auth.useDeviceLanguage();

export { app, auth, db, googleProvider };
