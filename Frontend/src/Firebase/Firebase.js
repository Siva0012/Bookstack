    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxU3uCkXsdbqEXtj5LKRQqfFafSBIDXus",
  authDomain: "bookstock-389406.firebaseapp.com",
  projectId: "bookstock-389406",
  storageBucket: "bookstock-389406.appspot.com",
  messagingSenderId: "422107966113",
  appId: "1:422107966113:web:b4a61218bff34f1aa19ee0",
  measurementId: "G-TDNMHVW6D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);