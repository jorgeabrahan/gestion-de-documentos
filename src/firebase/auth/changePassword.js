import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { FirebaseAuth } from '../config'

export const changePassword = (currentPassword = '', newPassword = '') => {
  return new Promise((resolve, reject) => {
    const user = FirebaseAuth.currentUser
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              resolve({ isChanged: true, error: null })
            })
            .catch(() => {
              reject({
                isChanged: false,
                error: 'No se pudo actualizar la contraseña'
              })
            })
        })
        .catch(() => {
          reject({ isChanged: false, error: 'No se pudo reautenticar al usuario' })
        })
    } else {
      reject({
        isChanged: false,
        error: 'No se pudo validar el usuario, intente iniciar sesión nuevamente'
      })
    }
  })
}
