import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  loginWithGoogle,
  onAuthStateChanged,
  onSnapshot,
  doc,
  firestore,
  getDoc,
  serverTimestamp,
  setDoc,
} from "src/services/firebase/firebaseService";

const loginWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login with email error:", error);
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
    return true;
  } catch (error) {
    console.error("Error during sign-out:", error);
    return false;
  }
};

const bindSnapshotListner = (
  snapshotHandler: (snapshot: any) => void,
  path: string
) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const docRef = doc(firestore, "users", user.uid, ...path.split("/"));
  return onSnapshot(docRef, snapshotHandler);
};

const getDocumentData = async (path: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }
    const docRef = doc(firestore, "users", user.uid, ...path.split("/"));
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document does not exists");
    }
    return docSnap.data();
  } catch (error) {
    console.log("fetching document failed :", error);
    throw error;
  }
};

const updateDocumentData = async (data: any, path: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }
    const docRef = doc(firestore, "users", user.uid, ...path.split("/"));

    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.log("updating document failed :", error);
    throw error;
  }
};

export {
  loginWithGoogle,
  loginWithEmail,
  signOutUser,
  onAuthStateChanged,
  auth,
  bindSnapshotListner,
  getDocumentData,
  updateDocumentData,
};
