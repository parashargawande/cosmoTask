import {
  doc,
  firestore,
  serverTimestamp,
  auth,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "src/services/firebase/firebaseService";
import { bindSnapshotListner } from "./firebase";

const createTodo = async (todo: any) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }
  todo.createdAt = serverTimestamp();
  console.log("Adding todo:", todo);

  const todosRef = collection(firestore, "users", user.uid, "todos");
  return await addDoc(todosRef, todo);
};

const readTodo = (setData: any) => {
  let unsubscribe;
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not logged in");
    }
    const todosRef = collection(firestore, "users", user.uid, "todos");
    const todosQuery = query(todosRef, orderBy("createdAt", "desc"));

    unsubscribe = onSnapshot(todosQuery, (querySnapshot) => {
      const data =
        querySnapshot?.docs?.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) || [];

      setData(data);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error reading todos:", error);
    throw error;
  }
};

const updateTodo = async (todo: any) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  if (!todo.id) {
    throw new Error("Todo must have an ID to update.");
  }
  const { id, ...data } = todo;
  console.log("Updating todo with ID:", todo.id);

  const todoDoc = doc(firestore, "users", user.uid, "todos", todo.id);
  return await updateDoc(todoDoc, data);
};

const deleteTodo = async (id: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  const todoDoc = doc(firestore, "users", user.uid, "todos", id);
  console.log("Deleting todo with ID:", id);
  return await deleteDoc(todoDoc);
};

export { createTodo, readTodo, updateTodo, deleteTodo };
