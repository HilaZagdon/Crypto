import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkGFGdy8_Sg9x25qH55yQSgL-UcsJwIDw",
  authDomain: "crypto-currency-1a03e.firebaseapp.com",
  projectId: "crypto-currency-1a03e",
  storageBucket: "crypto-currency-1a03e.appspot.com",
  messagingSenderId: "455468681277",
  appId: "1:455468681277:web:d86de14339f6ac30c18254",
  measurementId: "G-LRTNQD97KL"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };