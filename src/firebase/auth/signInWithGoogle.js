import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth } from '../config'

const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleAuthProvider)
    const user = result?.user
    if (user === undefined)
      return {
        ok: false,
        errorMessage: 'El usuario no existe'
      }
    const { displayName, email, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (err) {
    let errorMessage = ''
    switch (err.code) {
      case 'auth/cancelled-popup-request':
      case 'auth/popup-closed-by-user':
        errorMessage =
          'La ventana emergente de inicio de sesión fue cerrada o cancelada'
        break
      case 'auth/popup-blocked':
        errorMessage =
          'La ventana emergente de inicio de sesión fue bloqueada por el navegador'
        break
      case 'auth/operation-not-allowed':
        errorMessage = 'El inicio de sesión con Google no está habilitado'
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
