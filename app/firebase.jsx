'use client'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBNXFucWbgbHJpmXYRPCwoSK_pk3Dqx0-g",
    authDomain: "pantrytracker-348a1.firebaseapp.com",
    projectId: "pantrytracker-348a1",
    storageBucket: "pantrytracker-348a1.appspot.com",
    messagingSenderId: "633135355749",
    appId: "1:633135355749:web:238d0e7f4a31dd08c2f38c",
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);