import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC9JXJSoOL1iNC28Mq24fvYgSLDhGT9lI",
  authDomain: "flavorfetch.firebaseapp.com",
  projectId: "flavorfetch",
  storageBucket: "flavorfetch.appspot.com",
  messagingSenderId: "992905961077",
  appId: "1:992905961077:web:d07b4db5858e6f2758623c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
