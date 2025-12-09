// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-state-59eaf.firebaseapp.com",
  projectId: "mern-real-state-59eaf",
  storageBucket: "mern-real-state-59eaf.firebasestorage.app",
  messagingSenderId: "200759067168",
  appId: "1:200759067168:web:29dd952483ea97e3f13245",
  measurementId: "G-ZK0Q5T3FZG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
