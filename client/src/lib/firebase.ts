import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration provided in requirements
const firebaseConfig = {
  apiKey: "AIzaSyBUhxn2VsPPpsRwZMfLBZQbAdnGUEuoOMM",
  authDomain: "mmnjj-6255d.firebaseapp.com",
  projectId: "mmnjj-6255d",
  storageBucket: "mmnjj-6255d.firebasestorage.app",
  messagingSenderId: "116111119332",
  appId: "1:116111119332:web:9fa3546d0b3fb5afa02df1",
  measurementId: "G-LK3HCK03NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
