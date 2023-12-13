import { doc, setDoc } from "firebase/firestore";
import { FirebaseFirestore } from "../config";
export const createUserInFirestore = async (user) => {
  const userRef = doc(FirebaseFirestore, 'usersList', user.uid);
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
  };
  await setDoc(userRef, userData);
};
