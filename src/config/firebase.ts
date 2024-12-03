import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "fast-food-restaurant-e102e.firebaseapp.com",
  projectId: "fast-food-restaurant-e102e",
  storageBucket: "fast-food-restaurant-e102e.firebasestorage.app",
  messagingSenderId: "932924228618",
  appId: "1:932924228618:web:5e0089bfed5c9d5f084bf3",
  measurementId: "G-LPVY2N7NHX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
