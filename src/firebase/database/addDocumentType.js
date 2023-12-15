import { collection, addDoc } from 'firebase/firestore';
import { FirebaseFirestore } from '../config';

export const addDocumentType = async (documentType) => {
  try {
    // Crea una nueva referencia de documento en la colección 'config/documentsConfig/documentTypes'
    const docRef = await addDoc(collection(FirebaseFirestore, 'config', 'documentsConfig', 'documentTypes'), {
      label: documentType,
    });

    return { id: docRef.id, error: null };
  } catch (error) {
    return { id: null, error };
  }
};
