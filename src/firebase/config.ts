import { getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD155555555555555555555555555555555555555555555555555555555555",
  authDomain: "pet-haven-123456.firebaseapp.com",
  projectId: "pet-haven-123456",
  storageBucket: "pet-haven-123456.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
