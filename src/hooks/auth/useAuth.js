import { logoutFirebase } from '../../firebase/auth'
import { AUTH_STATUS, USER_ROLES, authStore, initialUser } from '../../stores'

export const useAuth = () => {
  const { setUser, setStatus, setError } = authStore((store) => store)
  const startChecking = () => {
    setError(null)
    setStatus(AUTH_STATUS.checking)
  }
  const login = (user) => {
    setUser({ displayName: user.displayName, email: user.email, uid: user.uid, role: user.role })
    setError(null)
    if (user.role === USER_ROLES.disabled) {
      setStatus(AUTH_STATUS.unauthorized)
      logoutFirebase()
      return
    }
    setStatus(AUTH_STATUS.authorized)
  }
  const logout = () => {
    setUser(initialUser)
    setStatus(AUTH_STATUS.unauthorized)
    logoutFirebase()
  }
  const logoutWithError = (error = null) => {
    logout()
    setError(error)
  }
  return { startChecking, login, logout, logoutWithError }
}
