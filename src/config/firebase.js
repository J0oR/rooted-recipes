// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS4VaaSXZ6MHYffqkRsPkpN43z4pUh2BU",
  authDomain: "rooted-recipes.firebaseapp.com",
  projectId: "rooted-recipes",
  storageBucket: "rooted-recipes.firebasestorage.app",
  messagingSenderId: "323244172450",
  appId: "1:323244172450:web:d3c091644ea56403d063fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

export { auth, provider };



export const db = getFirestore(app);