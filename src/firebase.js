import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBNjuYhns9Bc5MowHb8ETp7DDsM2T-UMao",
    authDomain: "jarnnong-116c9.firebaseapp.com",
    projectId: "jarnnong-116c9",
    storageBucket: "jarnnong-116c9.firebasestorage.app",
    messagingSenderId: "617993556071",
    appId: "1:617993556071:web:64c4787cbd93b99ed604c2",
    measurementId: "G-ZQEWHZ0YT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
