// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-c700d.firebaseapp.com",
  projectId: "ai-interview-c700d",
  storageBucket: "ai-interview-c700d.firebasestorage.app",
  messagingSenderId: "1037857865103",
  appId: "1:1037857865103:web:82249098ba785fcc381ffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}