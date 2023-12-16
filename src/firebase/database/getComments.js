import { collection, getDocs } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const getComments = async (documentId) => {
  try {
    // Crea una referencia a la colección 'documents/{documentId}/comments'
    const collectionRef = collection(
      FirebaseFirestore,
      'documents',
      documentId,
      'comments'
    )
    // Obtiene todos los documentos en la colección
    const querySnapshot = await getDocs(collectionRef)
    // Crea un arreglo de comentarios
    const comments = querySnapshot.docs.map((doc) => {
        return { id: doc?.id, ...doc.data() }
    })
    return { comments, error: null }
  } catch (error) {
    return { comments: null, error }
  }
}
