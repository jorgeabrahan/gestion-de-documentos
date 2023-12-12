export const checkName = (name = '') => {
  if (name.trim().length === 0)
    return { isValid: false, error: 'Por favor ingrese su nombre' }
  if (name.trim().replace(/\s+/g, ' ') !== name.trim())
    return {
      isValid: false,
      error: 'No deje mas de un espacio entre cada nombre'
    }
  if (name.trim().split(' ').length < 2)
    return {
      isValid: false,
      error: 'Ingrese por lo menos un nombre y un apellido'
    }
  return { isValid: true, error: null }
}
