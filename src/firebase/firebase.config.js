// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJlYbpddZGGg4JrcWQM9eI_p3ZcbRAKCI",
  authDomain: "ser0vial.firebaseapp.com",
  projectId: "ser0vial",
  storageBucket: "ser0vial.firebasestorage.app",
  messagingSenderId: "684999950989",
  appId: "1:684999950989:web:3dd7867bbcd7da6d0cd8c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app