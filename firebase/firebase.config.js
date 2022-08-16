import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//require('dotenv').config({path: "./vars/.env.local"});
require('dotenv').config({path: "./vars/.env"});


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

/*
const firebaseConfig = {
  apiKey: "AIzaSyD52vVRfDYZgLdp0x9ykT5RbAS55dC2j10",
  authDomain: "winnobearznft.firebaseapp.com",
  projectId: "winnobearznft",
  storageBucket: "winnobearznft.appspot.com",
  messagingSenderId: "462203420048",
  appId: "1:462203420048:web:2421178264238d2e018715",
  measurementId: "G-R0FZ8NJJ41"
};
*/
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);