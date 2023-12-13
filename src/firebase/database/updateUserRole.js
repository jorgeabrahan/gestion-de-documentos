import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseFirestore } from '../config';

export const updateUserRole = async (uid, newRole) => {
  // Actualiza el rol del usuario en la colección 'users'
  const userRef = doc(FirebaseFirestore, 'users', uid);
  await updateDoc(userRef, { role: newRole });

  // Actualiza el rol del usuario en la colección 'usersList'
  const userListRef = doc(FirebaseFirestore, 'usersList', uid);
  await updateDoc(userListRef, { role: newRole });
};
