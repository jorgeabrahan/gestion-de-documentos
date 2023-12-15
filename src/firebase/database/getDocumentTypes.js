import { collection, getDocs } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const getDocumentTypes = async () => {
  try {
    // Crea una referencia a la colección 'config/documentsConfig/documentTypes'
    const collectionRef = collection(
      FirebaseFirestore,
      'config',
      'documentsConfig',
      'documentTypes'
    )
    // Obtiene todos los documentos en la colección
    const querySnapshot = await getDocs(collectionRef)
    // Crea un arreglo de documentTypes
    const documentTypes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      label: doc.data().label
    }))
    return { documentTypes, error: null }
  } catch (error) {
    return { documentTypes: null, error }
  }
}
