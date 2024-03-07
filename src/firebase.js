// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3tU8XK5NxHzJyBx7VvABO7a_XT5g1wTc",
  authDomain: "fir-rest-e104b.firebaseapp.com",
  projectId: "fir-rest-e104b",
  storageBucket: "fir-rest-e104b.appspot.com",
  messagingSenderId: "466377530922",
  appId: "1:466377530922:web:d82d748c8ae0523c5ead53"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//const db = getFirestore(app)
export { auth, provider,app }
