import { getFirestore } from "@react-native-firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID_3 } from "../../utils/constants";
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID_3,
});

const firestore = getFirestore();
const auth = getAuth();

const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;

    if (!idToken) throw new Error("Google ID token not found");

    const googleCredential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, googleCredential);
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export {
  GoogleSignin,
  SignInResponse,
} from "@react-native-google-signin/google-signin";
export {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
export {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@react-native-firebase/firestore";
export { auth, firestore, loginWithGoogle };
