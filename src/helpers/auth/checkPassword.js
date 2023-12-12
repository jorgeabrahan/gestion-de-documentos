export const checkPassword = (password = '') => {
  if (password.trim().length === 0)
    return { isValid: false, error: 'Por favor ingrese la contraseña' }
  if (password.trim().length < 8)
    return {
      isValid: false,
      error: 'La contraseña no puede tener menos de 8 caracteres'
    }
  if (password.includes(' '))
    return { isValid: false, error: 'La contraseña no puede contener espacios' }
  if (!/[A-Z]/.test(password))
    return {
      isValid: false,
      error: 'La contraseña debe contener al menos un carácter en mayúscula'
    }
  if (!/[a-z]/.test(password))
    return {
      isValid: false,
      error: 'La contraseña debe contener al menos un carácter en minúscula'
    }
  if (!/[0-9]/.test(password))
    return {
      isValid: false,
      error: 'La contraseña debe contener al menos un número'
    }
  return { isValid: true, error: null }
}
