import { doc, deleteDoc } from 'firebase/firestore';
import { FirebaseFirestore } from '../config';

export const deleteDocumentType = async (id) => {
  try {
    // Crea una referencia al documento en la colección 'config/documentsConfig/documentTypes'
    const docRef = doc(FirebaseFirestore, 'config', 'documentsConfig', 'documentTypes', id);

    // Elimina el documento
    await deleteDoc(docRef);

    return { deleted: true, error: null }
  } catch (error) {
    return { deleted: false, error }
  }
};
