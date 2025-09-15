import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvv_ZgPN8IFLyUQBSD4s3P7QqlROOUQ6k",
  authDomain: "alertaid-c5394.firebaseapp.com",
  projectId: "alertaid-c5394",
  storageBucket: "alertaid-c5394.firebasestorage.app",
  messagingSenderId: "349308386957",
  appId: "1:349308386957:web:2e64847938cc9b513a2cc4",
  measurementId: "G-2NGD5LFFHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Fix Auth for React Native
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore
export const db = getFirestore(app);
