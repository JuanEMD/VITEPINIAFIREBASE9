// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA58mxQVENunYe4pwm_5CGBZJUZEEE1JQs",
  authDomain: "vitepiniafirebase.firebaseapp.com",
  projectId: "vitepiniafirebase",
  storageBucket: "vitepiniafirebase.appspot.com",
  messagingSenderId: "617634081079",
  appId: "1:617634081079:web:8dd904b9089dd0350292b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

export { auth };