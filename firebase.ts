// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the Firebase Authentication 
import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKCYYTzpEaM2yt7tjxn207Ws5fCCugh_U",
  authDomain: "dv300-class-project-2025.firebaseapp.com",
  projectId: "dv300-class-project-2025",
  storageBucket: "dv300-class-project-2025.firebasestorage.app",
  messagingSenderId: "1029296300411",
  appId: "1:1029296300411:web:e0891bc79bbc53a3df1dde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//app variable represents the Firebase app instance

//Initialize all our services for the app
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

