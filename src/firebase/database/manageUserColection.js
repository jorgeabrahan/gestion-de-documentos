import { doc, setDoc, getDoc } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const createUserColection = async (uid, role = 'pending') => {
  // se crea una referencia al documento con la configuracion base del usuario
  const docRef = doc(FirebaseFirestore, 'users', uid)
  // se intenta obtener el documento utilizando la referencia creada
  const docSnap = await getDoc(docRef)
  // si el documento ya existe
  if (docSnap.exists()) {
    // se retorna el role actual del usuario
    return docSnap.data()
  } else {
    // Si el documento no existe, crea uno nuevo
    await setDoc(docRef, { role })
    return { role }
  }
}

