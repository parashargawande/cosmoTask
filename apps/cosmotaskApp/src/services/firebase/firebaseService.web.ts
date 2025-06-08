import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl8d-pSyrIu0rI_o-gy3Qvrv7DzdmjSEs",
  authDomain: "cosmotask-d7e5f.firebaseapp.com",
  projectId: "cosmotask-d7e5f",
  storageBucket: "cosmotask-d7e5f.appspot.com",
  messagingSenderId: "365736312446",
  appId: "1:365736312446:android:cd42dd7a08484797ed222f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);

const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};

export {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  orderBy,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
export { auth, firestore, loginWithGoogle };
