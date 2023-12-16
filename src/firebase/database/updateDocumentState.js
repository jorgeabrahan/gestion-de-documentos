import { doc, updateDoc } from "firebase/firestore";
import { FirebaseFirestore } from "../config";

export const updateDocumentState = async (id, newState) => {
  try {
    const docRef = doc(FirebaseFirestore, 'documents', id);
    await updateDoc(docRef, {
      state: newState
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};
