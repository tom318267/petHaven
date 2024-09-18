import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADhQ91TsLh7k4gMawUtaA5G2a7i3c9Q14",
  authDomain: "pet-haven-31d73.firebaseapp.com",
  projectId: "pet-haven-31d73",
  storageBucket: "pet-haven-31d73.appspot.com",
  messagingSenderId: "642491021704",
  appId: "1:642491021704:web:6565cb72ffa66f676b623d",
  measurementId: "G-N1EG9RHMMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, analytics };
