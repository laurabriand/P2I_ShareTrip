// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXwFZWHPWMJ5S1bkAlCAgyBwBK7_1ojgA",
  authDomain: "sharetrip-864e1.firebaseapp.com",
  projectId: "sharetrip-864e1",
  storageBucket: "sharetrip-864e1.firebasestorage.app",
  messagingSenderId: "729692880225",
  appId: "1:729692880225:web:7493e2e71839a02a549920",
  measurementId: "G-01M0SS2810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
