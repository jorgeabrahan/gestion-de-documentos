import { doc, setDoc } from 'firebase/firestore';
import { FirebaseFirestore } from '../config';

export const addDocument = async (document) => {
  try {
    const docRef = doc(FirebaseFirestore, 'documents', document.id);

    await setDoc(docRef, document);

    return { id: docRef.id, error: null }
  } catch (error) {
    return { id: null, error }
  }
};
