import { collection, getDocs } from 'firebase/firestore'
import { FirebaseFirestore } from '../config'

export const getAllUsers = async () => {
  try {
    const usersListRef = collection(FirebaseFirestore, 'usersList')
    const userSnapshots = await getDocs(usersListRef)
    const users = userSnapshots.docs.map((doc) => doc.data())
    return { users, error: null }
  } catch (error) {
    return { users: null, error }
  }
}
