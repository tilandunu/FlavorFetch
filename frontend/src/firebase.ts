// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ_W56ZOEmsRIyCV2-1XaHdWNVMumdFPs",
  authDomain: "login-auth-c9143.firebaseapp.com",
  projectId: "login-auth-c9143",
  storageBucket: "login-auth-c9143.appspot.com",
  messagingSenderId: "991604233762",
  appId: "1:991604233762:web:466190a804dccc226f1c7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
