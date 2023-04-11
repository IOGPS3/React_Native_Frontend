// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-AosxxsI8-GqCly86lfAg4lJ7Ortzgiw",
    authDomain: "gps3-669ff.firebaseapp.com",
    databaseURL: "https://gps3-669ff-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gps3-669ff",
    storageBucket: "gps3-669ff.appspot.com",
    messagingSenderId: "626107041662",
    appId: "1:626107041662:web:7c0a176131755bbe07152f"
};

// Initialize Firebase
initializeApp(firebaseConfig);