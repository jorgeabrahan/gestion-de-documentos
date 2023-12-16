import { collection, addDoc } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const addComment = async (documentId, comment) => {
  try {
    // Crea una nueva referencia de documento en la colección 'documents/{documentId}/comments'
    const docRef = await addDoc(
      collection(FirebaseFirestore, 'documents', documentId, 'comments'),
      comment
    )
    return { id: docRef.id, error: null }
  } catch (error) {
    return { id: null, error }
  }
}
