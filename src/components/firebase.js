import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD88HpnqsSRni91xOZOqvG_1nRDOErdoYg",
    authDomain: "healevate-c3688.firebaseapp.com",
    projectId: "healevate-c3688",
    storageBucket: "healevate-c3688.appspot.com",
    messagingSenderId: "798975874598",
    appId: "1:798975874598:web:c5814636dcd645312b38e7",
    measurementId: "G-7ZBZF5PN0V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const messaging = getMessaging(app);



export { messaging };