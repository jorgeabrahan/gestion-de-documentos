import { collection, getDocs } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const getDocuments = async () => {
  try {
    // Crea una referencia a la colección 'documents'
    const collectionRef = collection(FirebaseFirestore, 'documents')

    // Obtiene todos los documentos en la colección
    const querySnapshot = await getDocs(collectionRef)

    // Crea un arreglo de documentos
    const documents = querySnapshot.docs.map((doc) => doc.data())

    return { documents, error: null }
  } catch (error) {
    return { documents: null, error }
  }
}
