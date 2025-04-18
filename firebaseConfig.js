import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth'; // Correct import for authentication
import database from '@react-native-firebase/database'; // Correct import for Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyCDcKp12TCs8DoNSsExHyK01dVNIwv880A",
    authDomain: "chatapp-35fe8.firebaseapp.com",
    databaseURL: "https://chatapp-35fe8-default-rtdb.firebaseio.com", // Added databaseURL for Realtime Database
    projectId: "chatapp-35fe8",
    storageBucket: "chatapp-35fe8.appspot.com", // Corrected storage bucket
    messagingSenderId: "456369871095",
    appId: "1:456369871095:web:16322168aba9cf45519bf2",
    measurementId: "G-Z3XVZNYFXC",
};

// Initialize Firebase only if it hasn't been initialized already
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // Use the existing instance if already initialized
}

// Firebase authentication and database references
export { auth, database }
// Access Realtime Database

export default firebase;
