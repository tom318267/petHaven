import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:
    "AIzaSyD155555555555555555555555555555555555555555555555555555555555555",
  authDomain: "pet-haven-123456.firebaseapp.com",
  projectId: "pet-haven-123456",
  storageBucket: "pet-haven-123456.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
