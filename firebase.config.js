// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmZjkJanUuBUT8btGF9mzmCRKNfqg0wkM",
  authDomain: "share-trip-76008.firebaseapp.com",
  projectId: "share-trip-76008",
  storageBucket: "share-trip-76008.firebasestorage.app",
  messagingSenderId: "386800467593",
  appId: "1:386800467593:web:4c3f9148480e1e24fcd058",
  measurementId: "G-0NH0Y4EBGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
