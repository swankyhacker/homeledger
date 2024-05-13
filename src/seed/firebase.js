// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  getFirestore,
  connectFirestoreEmulator,
} = require("firebase/firestore");
const {
  getFunctions,
  connectFunctionsEmulator,
} = require("firebase/functions");
const { getAuth, connectAuthEmulator } = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtmF7DzRMleTJDzSZMaUbNpkAI1VjbGms",
  authDomain: "homeledger-c3fa6.firebaseapp.com",
  projectId: "homeledger-c3fa6",
  storageBucket: "homeledger-c3fa6.appspot.com",
  messagingSenderId: "814567055871",
  appId: "1:814567055871:web:ce3a5ffadbe30508aa87ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore
const db = getFirestore(app);
// Initialize Cloud Functions
const functions = getFunctions(app);
// Initialize Firebase Auth
const auth = getAuth(app);

// eslint-disable-next-line no-restricted-globals
// if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectAuthEmulator(auth, `http://localhost:9099`);
// }

module.exports = { auth, db, functions };
