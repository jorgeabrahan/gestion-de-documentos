import { FirebaseAuth } from '../config'

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
