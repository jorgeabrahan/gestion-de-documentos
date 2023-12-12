import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from '../config'

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, displayName, photoURL } = resp.user
    return {
      ok: true,
      uid,
      displayName,
      photoURL
    }
  } catch (err) {
    let errorMessage = ''
    switch (err.code) {
      case 'auth/invalid-credential':
        errorMessage = 'No se encontro un usuario con estas credenciales'
        break
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es correcto'
        break
      case 'auth/user-disabled':
        errorMessage = 'Este usuario ha sido deshabilitado'
        break
      case 'auth/user-not-found':
        errorMessage = 'No existe un usuario con este correo'
        break
      case 'auth/wrong-password':
        errorMessage = 'La contraseña es incorrecta'
        break
      case 'auth/too-many-requests':
        errorMessage =
          'Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo de nuevo más tarde'
        break
      case 'auth/network-request-failed':
        errorMessage =
          'Hubo un problema de red al intentar iniciar sesión. Por favor, verifica tu conexión a internet'
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
