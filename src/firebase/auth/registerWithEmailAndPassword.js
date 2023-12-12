import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from '../config'

export const registerWithEmailAndPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const { uid, photoURL } = resp.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (err) {
    let errorMessage = ''
    switch (err.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Ya existe una cuenta con este correo electrónico'
        break
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es correcto'
        break
      case 'auth/operation-not-allowed':
        errorMessage =
          'La autenticación por correo electrónico y contraseña no está habilitada'
        break
      case 'auth/weak-password':
        errorMessage = 'La contraseña es demasiado débil'
        break
      default:
        errorMessage = err.message
    }
    return {
      ok: false,
      errorMessage
    }
  }
}
