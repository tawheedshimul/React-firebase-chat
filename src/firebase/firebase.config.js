
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBMmXXWShrGZgD028qM46ElPipaVK6ti4A",
    authDomain: "tchat-832bb.firebaseapp.com",
    projectId: "tchat-832bb",
    storageBucket: "tchat-832bb.appspot.com",
    messagingSenderId: "396691519873",
    appId: "1:396691519873:web:89db7e527ccd9fdfc09080"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();