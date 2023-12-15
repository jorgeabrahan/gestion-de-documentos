import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FirebaseStorage } from '../../config'

export const uploadFile = async (id, file) => {
  const storageRef = ref(FirebaseStorage, `documents/${id}/${file.name}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}
