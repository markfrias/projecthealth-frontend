import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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

// Add the public key generated from the console here.
/*messaging.getToken({vapidKey: "BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY"});*/



// Remove registration for now
/*
// Get registration token
getToken(messaging, { vapidKey: 'BH1QU2v_dSx50cCbq51BdAovW-yidS4pStShao_A1uxHKFVVPDsw2k3WlL89DDwCzj0O0opIW48rQ5CtxOYTwxY' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken)
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
*/

export { messaging };