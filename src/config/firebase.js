// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_API_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_API_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_API_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

//const db = getFirestore(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager()
  })
});
export { auth, provider, db };