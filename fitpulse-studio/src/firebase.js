// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY2cZVSOpzo-OamhAMkjinAwH0VGe2gpc",
  authDomain: "fir-b62c8.firebaseapp.com",
  projectId: "fir-b62c8",
  storageBucket: "fir-b62c8.firebasestorage.app",
  messagingSenderId: "372361373618",
  appId: "1:372361373618:web:794b9578f926d8d09f26ab",
  measurementId: "G-83MX9JMQL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Auth
export const auth = getAuth(app);