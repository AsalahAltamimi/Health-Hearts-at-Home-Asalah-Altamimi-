import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDztxYG_rF2MKbq8UA8tWMY05Ab1zfCPZk",
  authDomain: "health-hearts-at-home.firebaseapp.com",
  projectId: "health-hearts-at-home",
  storageBucket: "health-hearts-at-home.firebasestorage.app",
  messagingSenderId: "528298830604",
  appId: "1:528298830604:web:7fd66be900f01518837729",
  measurementId: "G-96T9PXGKZ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

