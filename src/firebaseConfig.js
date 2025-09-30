// src/firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwEG1-AWkl1LRpJZeiSUXdA-5FEppW0_M",
  authDomain: "la-resaca-deportiva.firebaseapp.com",
  projectId: "la-resaca-deportiva",
  storageBucket: "la-resaca-deportiva.firebasestorage.app",
  messagingSenderId: "166207721507",
  appId: "1:166207721507:web:4d2e977f40a6a6660d6196",
  measurementId: "G-RXNK7V4RFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);